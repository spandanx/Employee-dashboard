var bodyParser = require('body-parser');
var express = require('express');
var cors = require('cors');
var {authenticate} = require('./userHelper');
var {getAllEmployees} = require('./employeeHelper');

var app = express();
const port = 8080;
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.get('/api/authenticate', async function (req, res) {
    try {
	console.info("get authenticate called");
	console.info(req);
	//const result = await authenticate();
//        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
//        res.status(200).json({response: result.toString()});

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
        process.exit(1);
    }
});


app.get('/api/getAllEmployees', async function (req, res) {
    try {
        const result = await getAllEmployees();
	console.log(result);
//        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        res.status(200).json({response: JSON.parse(result.toString())});

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
        process.exit(1);
    }
});

app.post('/api/addcar/', async function (req, res) {
    try{
//        await contract.submitTransaction('createCar', req.body.carid, req.body.make, req.body.model, req.body.colour, req.body.owner);
        console.log('Transaction has been submitted');
        res.send('Transaction has been submitted');

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
})

app.put('/api/changeowner/:car_index', async function (req, res) {
    try {
        //await contract.submitTransaction('changeCarOwner', req.params.car_index, req.body.owner);
        console.log('Transaction has been submitted');
        res.send('Transaction has been submitted');

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }	
})

app.listen(port);
console.log(`Application is listening to port ${port}`);
