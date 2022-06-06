chatty-up-build:
	docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up -d --build
chatty-up:
	docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up -d
chatty-down:
	docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml down
chatty-api-logs:
	docker logs -f chatty-api
chatty-ui-logs:
	docker logs -f chatty-ui
chatty-api-cli:
	docker exec -it chatty-api /bin/sh