# mini-remesh

## Tech Stack:
#### Database:
###### Postgres 

#### Backend
###### Node.js, Express.js, supertest

#### Frontend
###### React.js
###### React Testing Library

## What you will Need:
#### Postgres
#### Node Version #16.3.0


## Setting up Server Side
* After cloning this repo, from your terminal, navigate to the root directory of the project and ensure you are in the ``master`` branch 
* Run ``git pull origin master`` 
* From there, navigate to the server folder. From the root directory of the server folder, run the following scripts in this order:

1. ``npm install``  This is to install all node dependencies on the server side.
2. ``npm run setup:dev``  This script drops the ``miniremesh`` database and recreates it. Your terminal should output a message indicating the database was dropped then created. 
3. ``npm run migrate:dev``  This script creates the Conversations, Messages, and Thoughts tables. Your terminal should output "CREATE TABLE" 3 TIMES.
4. ``npm run dev``  This script starts the backend server 

## Setting up Client Side
* With the serer from step 4 running, open a new tab/window in your terminal and navigate to the root directory of the client folder and run the following scripts in this order:
1. ``npm install``  This is to install all node dependencies on the server side.
2. ``npm run start``  This starts the server on the client side.


## Running Tests
* From the root directory of the ``server`` folder, run the following script:
``npm run test``

* From the root directory of the ``client`` folder, run the following script:
``npm run test``


