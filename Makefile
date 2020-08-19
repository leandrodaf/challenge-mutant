type = patch
comment = Release $(type)
filter= ""

export HOST_USER
export HOST_UID

.PHONY: up
up:
	docker-compose up -d

.PHONY: attach
attach: up
	docker-compose exec app-challenge-mutant ash

.PHONY: install
install: up
	docker-compose exec app-challenge-mutant yarn install

.PHONY: logs
logs:
	docker-compose logs -f --tail 100

.PHONY: stop
stop:
	docker-compose stop

.PHONY: tests
tests: up
	docker-compose exec app-challenge-mutant yarn test

.PHONY: lint
lint: up
	docker-compose exec app-challenge-mutant yarn lint

.PHONY: build-project-production
build-project-production: up
	docker-compose exec app-challenge-mutant yarn build

.PHONY: build-docker-production
build-docker-production:
	docker build -t challenge-mutant:latest . && docker tag challenge-mutant:latest challenge-mutant:latest
