.PHONY: help install dev test test-frontend test-backend lint format format-check typecheck contract-check check docker-build docker-run

help:
	@echo "richmiles.xyz"
	@echo ""
	@echo "Commands:"
	@echo "  make install         Install dependencies"
	@echo "  make dev             Run local container on :8000"
	@echo "  make test-frontend   Run frontend component tests"
	@echo "  make test-backend    Run backend API tests"
	@echo "  make test            Run all tests"
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
	@$(MAKE) test-frontend
	@$(MAKE) test-backend

test-frontend:
	@npm run test

test-backend:
	@docker build -t richmiles-xyz:test .
	@docker run --rm --entrypoint python3 richmiles-xyz:test -m unittest discover -s backend/tests -p 'test*.py' -t /app

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
	@$(MAKE) test

docker-build:
	@docker build -t ghcr.io/miles-automation/richmiles-xyz-app:latest .

docker-run:
	@docker run --rm -p 8000:8000 ghcr.io/miles-automation/richmiles-xyz-app:latest
