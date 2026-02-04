.PHONY: install dev test lint format check docker-build docker-run

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

check:
	@python3 scripts/check_contract.py
	@echo "Contract check ok. Run 'make lint' and 'make docker-build' for a deeper check."

docker-build:
	@docker build -t ghcr.io/richmiles/richmiles-xyz-app:latest .

docker-run:
	@docker run --rm -p 8000:8000 ghcr.io/richmiles/richmiles-xyz-app:latest
