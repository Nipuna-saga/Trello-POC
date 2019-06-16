# Trello-POC


## Getting Started
Clone this repository with `git clone git@github.com:Nipuna-saga/Trello-POC.git`

### Prerequisites 
As of this stage you need the following installed
- Python **3**
- Node 8.x or 10.x
- Postgresql
- Docker

### Installation of Prerequisite 


Install dockers  (if your already have dockers  you may skip this step) 

https://docs.docker.com/compose/install/


### Running the project


**Using dockers**

Go to `Trello-POC/`

Run (to run the backend,frontend and db)

`sudo docker-compose up`

**You can see the output**

for frontend

open http://localhost:3000/ on your browser

for backend

open http://localhost:8000/ on your browser

**You can see how the system works from below videos**

[Project walk-through](https://youtu.be/pYxL_OPbgGE)



**Troubleshoot**
if you are getting error
"Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled."


enable bellow browser extension 
https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en

