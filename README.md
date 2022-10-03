# A Docker Swarm to mount a portable analytical environment

## Description
I created this mock project to mount a portable scalable analytical
environment in my clients infrastructure. The project implements
a variety of technologies: an automated ETL, a R Serve Worker, a
PostgreSQL database, a web user interface and a queue to send request to
workers. A bunch of technologies used all at once in a single project.

### Folder structure

```bash
|__  client/
|    |__ backend/                       # Simple express.js backend
|    |    |__ server.js                 # Main backend file
|    |    |__ api/                      # API controllers (if required)
|    |__ config/                        # Webpack compiler configuration
|    |    |__ bundler.js                # Webpack bundler for express.js
|    |    |__ helpers.js                # Helper functions
|    |    |__ webpack.common.js         # Webpack common configuration
|    |    |__ webpack.dev.js            # Webpack development configuration
|    |    |__ webpack.prod.js           # Webpack production configuration
|    |__ docs/                          # Autogenerated docs with npm run doc
|    |__ public/                        # Compiled app destination
|    |__ src/                           # Frontend source code
|    |    |__ app/
|    |    |    |__ common/              # Common components and services
|    |    |    |__ components/          # App main components
|    |    |    |__ app.component.js     # Main app component declaration
|    |    |    |__ app.controller.js    # Main app controller
|    |    |    |__ app.css              # Main app styles
|    |    |    |__ app.html             # Main app view
|    |    |    |__ index.js             # App and dependencies definition
|    |    |__ assets/
|    |    |__ index.html                # HTML skeleton and head definition
|    |    |__ main.browser.js           # Main JS src file to compile
|    |    |__ polyfills.browser.js      # Required polyfills
|    |    |__ vendor.browser.js         # Third-party packages imports
|    |__ .babelrc                       # Babel transpiler configuration
|    |__ .bootstraprc                   # Bootstrap loader configuration
|    |__ .eslintrc                      # ESlint configuration
|    |__ .htmlhintrc                    # HTMLhint configuration
|    |__ .tern-project                  # Tern for Vim configuration
|    |__ esdoc.json                     # ESDoc configuration
|    |__ index.js                       # Deamonized NPM compiler
|    |__ package.json                   # Package definition
|    |__ Dockerfile                     # Docker build definition
|    |__ README.md
|__  worker/
|    |__ r/                             # Relevant R scripts
|    |    |__ dependencies.R            # Install general R dependencies
|    |    |__ worker.R                  # R worker invoked in the JS interface
|    |__ Dockerfile                     # Docker build definition
|    |__ index.js                       # JavaScript worker and interface
|    |__ Makefile                       # Makefile to start Rserve and worker
|    |__ package.json                   # Package definition
|    |__ README.md
|__  README.md
|__  stack.yml                          # Docker stack definition
```

## System requirements
- Git
- Docker
- node.js
- GNU Make (optional)

## Infrastructure

### Overview

- rabbitmq:3-management: A distributed scalable queue based on
  the AMQP¨protocol. The queue will balance the requests to the
  workers and stablish a Remote Call Procedure (RPC) protocol.
- worker: R worker, this container will consume all the
  available messages from the RabbitMQ broker.
- client: UI, a simple interface to send messages to
  the RabbitMQ broker written in JavaScript.

Communication through containers is based on the AMQP protocol and
in the JavaScript interfaces through the JSON format.

#### User Interface
The current stack for the UI is based on a full JavaScript environment.
A simple express.js server runs a API and stablish communication with the
queue through ampqlib.js. The client frontend is based on the AngularJS
framework completely written in ES7 specification and transpiled with babel.js.
The source code includes the views, styles, controllers and services as
described in the folder structure and is bundled with Webpack.

This image exposes the client in the port 8080

More details in client/README.md file.

#### Worker
A Worker is composed of two components. A interface with the AMQP protocol
and a computing R server. The interface is written in JavaScript and consumes
messages from the Queue with the amqplib.js library. A Rserve process is spawn
in each container and the connection with the interface is implemented with the
rio.js library. Finally, the rio.js library communicates with the Rserve process
with a simple R script. This container is intented to ran multiple replicas and
can be easily scaled to many cloud instances if necesary.

#### Message Broker and Queue
The queue is based RabbitMQ and communicates with services through the AMQP
protocol. This let us implement very flexible message brokers and Remote Call
Procedures (RPC protocols). This container can be scaled to a distributed
architecture with multiple mirrors for high availability and performance through
Earlang cookies.

This image exposes two ports:

- 5672: The AMQP default port
- 15672: A nice admin and monitor interface

## Usage

### Docker CLI usage
**Note for Windows**: In order to start the Docker environment you must
start a Virtual Machine (VM) and evaluate the environment variables:

```bash
docker-machine start
eval $(docker-machine env)
```

To build the images for first time you must run:

```bash
docker-compose build
```

To start the whole stack run the following in a Docker environment

```bash
docker stack deploy -c docker-compose.yml portable-analytical
```

This development pattern let you introduce as many worker nodes
as needed and limit resources in a very efficient way. You can also
scale the server to a Docker Swarm or other distributed system,
e.g. DCOS, if you need more computing power.  To update the stack
just run the previous line and the cluster will update modified services.

You can monitor the status of the services with the folowing line:

```bash
docker stack ps portable-analytical
```

Finally, to remove the stack simply run the following line:

```bash
docker stack rm portable-analytical
```

This will stop all the services and remove the Docker stack. If you
started the Docker Swarm mode, you must leave the swarm also.

### GNU Make Usage
The tasks described in the previuos section are implemented in a Makefile
for a more user-friendly approach. Available commands are:

- start: Start the Portable Environment
- stop: Stop and remove the Portable Environmentt
- list: List the services in the Portable Environment
- build: Build the Portable Environment services
- install: Pull dependencies and build Portable Environment services.
           Useful for first time runs.
- remove: Remove the Portable Environment images from the system
