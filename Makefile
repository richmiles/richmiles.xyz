.PHONY: install dev test lint format check docker-build docker-run

install:
	@echo "No deps (static site)."

dev:
	@docker build -t richmiles-xyz:dev .
	@docker run --rm -p 8000:8000 richmiles-xyz:dev

test:
	@echo "No tests yet (static site)."

lint:
	@echo "No linter configured."

format:
	@echo "No formatter configured."

check:
	@python3 scripts/check_contract.py

docker-build:
	@docker build -t ghcr.io/richmiles/richmiles-xyz-app:latest .

docker-run:
	@docker run --rm -p 8000:8000 ghcr.io/richmiles/richmiles-xyz-app:latest

