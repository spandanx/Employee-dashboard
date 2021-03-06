var bodyParser = require('body-parser');
var express = require('express');
var cors = require('cors');
var {authenticate, createUser, checkIfExists} = require('./userHelper');
var {getAllEmployees, createEmployee, getFilteredEmployeesPaginated} = require('./employeeHelper');
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
app.get('/api/getFilteredEmployees', async function (req, res) {
    try {
	let month = req.headers.month;
	let day = req.headers.day;
	let pagesize = req.headers.pagesize;
//	let bookmark = req.headers.bookmark;
	let pagenumber = req.headers.pagenumber;	

	console.log('Received headers: ');
	console.log(month);
	console.log(day);
	console.log(pagesize);
	console.log(pagenumber);
	console.log('----------');

        const result = await getFilteredEmployeesPaginated(month, day, pagenumber, pagesize);
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
	console.log("Recieved request");
	let id = req.body.id;
	let title = req.body.title;
	let from = req.body.from;
	let to = req.body.to;
	let host = req.body.host;
	let link = req.body.link;

	await createMeeting(id, title, from, to, host, link);
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

	await createUser(username, password, role);
        console.log('Transaction has been submitted');
        res.send('Transaction has been submitted');

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
})
app.get('/api/checkIfexists', async function (req, res) {
    try{
	let username = req.headers.username;

	const result = await checkIfExists(username);
	console.log(result);
	res.status(200).json(result.toString());

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
})


app.listen(port);
console.log(`Application is listening to port ${port}`);
