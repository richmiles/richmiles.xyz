"""Structured logging configuration for richmiles.xyz.

- JSON output in prod (one JSON object per line, easy to parse).
- Human-readable output in dev (standard format with timestamps).
"""

from __future__ import annotations

import json
import logging
import sys
from datetime import datetime, timezone


class JSONFormatter(logging.Formatter):
    """Emit each log record as a single JSON line."""

    def format(self, record: logging.LogRecord) -> str:
        payload: dict = {
            "timestamp": datetime.fromtimestamp(record.created, tz=timezone.utc).isoformat(),
            "level": record.levelname,
            "logger": record.name,
            "message": record.getMessage(),
        }

        for key in ("request_id", "user_id", "method", "path", "status_code", "duration_ms"):
            value = getattr(record, key, None)
            if value is not None:
                payload[key] = value

        if record.exc_info and record.exc_info[0] is not None:
            payload["exception"] = self.formatException(record.exc_info)

        return json.dumps(payload, default=str)


_DEV_FORMAT = "%(asctime)s %(levelname)-8s [%(name)s] %(message)s"


def configure_logging(environment: str) -> None:
    """Set up root logger. Call once at app startup."""
    root = logging.getLogger()

    # Clear any existing handlers (e.g. uvicorn defaults)
    root.handlers.clear()

    handler = logging.StreamHandler(sys.stdout)

    if environment in ("prod", "production"):
        handler.setFormatter(JSONFormatter())
        root.setLevel(logging.INFO)
    else:
        handler.setFormatter(logging.Formatter(_DEV_FORMAT))
        root.setLevel(logging.DEBUG)

    root.addHandler(handler)

    # Quiet down noisy third-party loggers
    for name in ("uvicorn.access", "httpx", "httpcore"):
        logging.getLogger(name).setLevel(logging.WARNING)
