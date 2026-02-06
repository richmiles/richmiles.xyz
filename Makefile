.PHONY: help install dev test lint format format-check typecheck contract-check check docker-build docker-run

help:
	@echo "richmiles.xyz"
	@echo ""
	@echo "Commands:"
	@echo "  make install         Install dependencies"
	@echo "  make dev             Run local container on :8000"
	@echo "  make lint            Run ESLint"
	@echo "  make format          Check Prettier formatting"
	@echo "  make format-check    Check Prettier formatting"
	@echo "  make typecheck       Run TypeScript typecheck"
	@echo "  make contract-check  Verify fleet contract"
	@echo "  make check           Run lint + format-check + typecheck + contract-check"
	@echo "  make docker-build    Build production image"

install:
	@npm install

dev:
	@docker build -t richmiles-xyz:dev .
	@docker run --rm -p 8000:8000 richmiles-xyz:dev

test:
	@echo "No tests yet."

lint:
	@npm run lint

format:
	@npm run format

format-check: format

typecheck:
	@npx tsc -b

contract-check:
	@python3 scripts/check_contract.py

check:
	@$(MAKE) lint
	@$(MAKE) format-check
	@$(MAKE) typecheck
	@$(MAKE) contract-check

docker-build:
	@docker build -t ghcr.io/richmiles/richmiles-xyz-app:latest .

docker-run:
	@docker run --rm -p 8000:8000 ghcr.io/richmiles/richmiles-xyz-app:latest
