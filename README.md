# EMPLOYEE DASHBOARD APPLICATION

This app does some basic dashboard operations like showing birthdays of employees, news etc.

## Technologies used

1. Hyperledger Fabric
5. React.js

## Steps to run locally

1. Clone the repository
2. Install required softwares and dependencies
3. Start the network and install chaincodes
4. Install certificates
5. Start the server
6. Start the frontend

### Step 1. Clone the repository

`git clone https://github.com/spandanx/Employee-dashboard.git`

### Step 2. Install required softwares and dependencies

`Node.js`
`virtual box`
`Ubuntu 20.04`
`docker 20.10`
`node 12.22`
`react`

Install dependencies:

`cd application/server`

`npm i`


`cd application/UI`

`npm i`

### Step 3. Start the network and install chaincodes

`cd network-initializer`

`./startFabric.sh javascript`

### Step 4. Install certificates

`cd network-initializer/javascript`

`./enrollAdmin.js`

`./registerUser.js`

### Step 5. Start the server

`cd application/server`

`node server.js`

### Step 6. Start the frontend

`cd application/UI`

`npm run start`

Application would be running on port 3000.

## Youtube link

[https://youtu.be/C4y4Zh9KtRQ](https://youtu.be/r4YLdngxeqQ)
