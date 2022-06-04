var bodyParser = require('body-parser');
var express = require('express');
var cors = require('cors');
var {authenticate, createUser} = require('./userHelper');
var {getAllEmployees, createEmployee} = require('./employeeHelper');
var {getAllnews, createNews} = require('./newsHelper');
var {getAllMeetings, createMeeting} = require('./meetingHelper');

var app = express();
const port = 8080;
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.get('/api/authenticate', async function (req, res) {
    try {
	console.info("get authenticate called");
	console.info(req.headers);
	const result = await authenticate(req.headers.username, req.headers.password);
	console.log(result);
	res.status(200).json(result.toString());

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
        res.status(200).json(JSON.parse(result.toString()));

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
        process.exit(1);
    }
});
app.get('/api/getAllNews', async function (req, res) {
    try {
        const result = await getAllnews();
	console.log(result);
//        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        res.status(200).json(JSON.parse(result.toString()));

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
        process.exit(1);
    }
});
app.get('/api/getAllMeetings', async function (req, res) {
    try {
        const result = await getAllMeetings();
	console.log(result);
//        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        res.status(200).json(JSON.parse(result.toString()));

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
        process.exit(1);
    }
});

app.post('/api/employee', async function (req, res) {
    try{
	let employee_id = req.body.employee_id;
	let name = req.body.name;
	let title = req.body.title;
	let birthday = req.body.birthday;
	let year = req.body.year;
	let month = req.body.month;
	let day = req.body.day;
	let position = req.body.position;

	await createEmployee(employee_id, name, title, birthday, year, month, day, position);
        console.log('Transaction has been submitted');
        res.send('Transaction has been submitted');

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
})
app.post('/api/news', async function (req, res) {
    try{
	let id = req.body.id;
	let title = req.body.title;
	let body = req.body.body;
	let author = req.body.author;
	let date = req.body.date;

	await createNews(id, title, body, author, date);
        console.log('Transaction has been submitted');
        res.send('Transaction has been submitted');

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
})
app.post('/api/meeting', async function (req, res) {
    try{
	let id = req.body.id;
	let title = req.body.title;
	let from = req.body.from;
	let to = req.body.to;
	let host = req.body.host;
	let link = req.body.link;

	await createNews(id, title, from, to, host, link);
        console.log('Transaction has been submitted');
        res.send('Transaction has been submitted');

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
})
app.post('/api/user', async function (req, res) {
    try{
	let username = req.body.username;
	let password = req.body.password;
	let role = req.body.role;

	await createUser(id, username, password, role);
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
