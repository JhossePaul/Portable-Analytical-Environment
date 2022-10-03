start:
	docker stack deploy -c docker-compose.yml portable-analytical
stop:
	docker stack rm portable-analytical
list:
	docker stack ps portable-analytical

build:
	cd worker/ && npm install
	cd client/ && npm install && npm run build:prod
	docker-compose build
install-dependencies:
	cd worker/ && npm install
	cd client/ && npm install && npm run build:prod
install-images:
	docker pull rabbitmq:3-management
	docker-compose build
install:
	docker pull rabbitmq:3-management
	cd worker/ && npm install
	cd client/ && npm install && npm run build:prod
	docker-compose build

clean:
	rm -rf worker/node_modules/ client/node_modules/ client/public/
remove:
	rm -rf worker/node_modules/ client/node_modules/ client/public/
	docker rmi postgres rabbitmq:3-management worker client etl

test-queue:
	docker run -d \
		-p 5672:5672 \
		-p 15672:15672 \
		--name test-queue \
		--hostname rabbit \
		rabbitmq:3-management
test-db:
	docker run -d \
		--name test-db \
		-e POSTGRES_PASSWORD=user \
		-e POSTGRES_USER=pass \
		-e POSTGRES_DB=default \
		-p 5432:5432 \
		postgres
test-db-client:
	docker run --rm -it \
		--link test-db:db \
		postgres \
		psql -h db -U user
