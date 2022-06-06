import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { AiOutlineReload, AiOutlineClockCircle } from "react-icons/ai";
import { BsPlusCircle } from "react-icons/bs";
import DatePicker from "react-datepicker";
import { toast, ToastContainer } from 'react-toastify';
import DateTimePicker from 'react-datetime-picker';


import "react-datepicker/dist/react-datepicker.css";

const port = 8080;

const DashboardComponent = () => {

    const navigate = useNavigate();
    const [birthdays, setBirthdays] = useState([]);
    const [news, setNews] = useState([]);
    const [meetings, setMeetings] = useState([]);
    const newdate = new Date();
    const [years, setYears] = useState([]);
    const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
     ];
    

    //create NewsBill
    const [fundAddress, setFundAddress] = useState('');
    const [rootDepartmentAddress, setRootDepartmentAddress] = useState('');

    const [subDepAddress, setSubDepAddress] = useState('');
    const [createFundLength, setCreateFundLength] = useState(0);
    const [createDepLength, setCreateDepLength] = useState(0);
    const [createFundPageNumber, setCreateFundPageNumber] = useState(0);
    const [createDepPageNumber, setCreateDepPageNumber] = useState(0);

    const [billName, setBillName] = useState('');
    const [description, setDescription] = useState('');
    const [threshold, setThreshold] = useState('');
    const [amount, setAmount] = useState('');

    const [fundsCreateBill, setFundsCreateBill] = useState([]);
    const [currentPageFundCreateBill, setCurrentPageFundCreateBill] = useState(0);

    const bills = [];

    //modals
    // birthday
    const [showModalBirthday, setShowModalBirthday] = useState(false);
    const handleShowBirthday = () => setShowModalBirthday(true);
    const handleCloseBirthday = () => setShowModalBirthday(false);

    const [b_empID, setB_empID] = useState('');
    const [b_empName, setB_empName] = useState('');
    const [b_empTitle, setB_empTitle] = useState('');
    const [b_empPos, setB_empPos] = useState('');
    const [b_startDate, setB_startDate] = useState(new Date());
    const [b_year, setB_year] = useState('');
    const [b_month, setB_month] = useState('');
    const [b_day, setB_day] = useState('');
    const [b_validForm, setB_validForm] = useState(false);

    //news
    const [showModalNews, setShowModalNews] = useState(false);
    const handleShowNews = () => setShowModalNews(true);
    const handleCloseNews = () => setShowModalNews(false);

    const [n_id, setN_id] = useState('');
    const [n_title, setN_title] = useState('');
    const [n_body, setN_body] = useState('');
    const [n_author, setN_author] = useState('');
    const [n_date, setN_date] = useState('');
    const [n_validForm, setN_validForm] = useState(false);

    //meeting
    const [showModalMeeting, setShowModalMeeting] = useState(false);
    const handleShowMeeting = () => setShowModalMeeting(true);
    const handleCloseMeeting = () => setShowModalMeeting(false);

    const [m_id, setM_id] = useState('');
    const [m_title, setM_title] = useState('');
    const [m_from, setM_from] = useState('');
    const [m_to, setM_to] = useState('');
    const [m_host, setM_host] = useState('');
    const [m_link, setM_link] = useState('');
    const [m_validForm, setM_validForm] = useState(false);


    useEffect(()=>{
	getBirthdays();
	getAllNews();
	getAllMeetings();
	let tempyears = [];
	for (let i=1990; i<newdate.getFullYear() + 1; i+=1){
		tempyears.push(i);
		}
	setYears(tempyears);
	},[]);
    useEffect(()=>{
		setB_year(b_startDate.getFullYear()+"");
		setB_month(((b_startDate.getMonth()+"").length==1 ? "0":"")+b_startDate.getMonth());
		setB_day(((b_startDate.getDate()+"").length==1 ? "0":"")+ b_startDate.getDate());
		if (b_empID && b_empName && b_empTitle && b_empPos && b_startDate && b_year && b_month && b_day){setB_validForm(true)}
		else {setB_validForm(false)}
		console.log("Year: "+b_year+" : Month "+b_month+" : Day: "+b_day);
	},[b_empID, b_empName, b_empTitle, b_empPos, b_startDate]);

    useEffect(()=>{
	if (n_title && n_body && n_id){
		setN_author(window.localStorage.getItem("username"));
		let timestamp = (new Date()).getTime();
		setN_date(timestamp);
		setN_validForm(true);
	}
	else {setN_validForm(false);}
	
	},[n_title, n_body, n_id]);

    useEffect(()=>{
	if (m_id && m_title && m_from && m_to && m_host && m_link){
		setM_validForm(true);
	}
	else {setM_validForm(false);}
	
	},[m_id, m_title, m_from, m_to, m_host, m_link]);

	const getToast = (msg, type) => {
		let structure = {
		position: "bottom-right",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		pauseOnFocusLoss: false,
		draggable: true,
		progress: undefined
		};
		if (type=="ERROR"){
		    return toast.error(msg, structure);
		}
		if (type=="SUCCESS"){
		    return toast.success(msg, structure);
		}
		return toast.info(msg, structure);
	}
	const convertTime = (timestamp) => {
	    if (timestamp.length==10){
		timestamp+="000";
	    }
	    let d = new Date(parseInt(timestamp));
	    console.log("Date: "+timestamp);
	    console.log("Date: "+d);
	    let datestring = "";
	    let hour = ""+d.getHours();
	    let minute = ""+d.getMinutes();
	    if (hour.length==1){
		hour = "0"+hour;
	    }
	    if (minute.length==1){
		minute = "0"+minute;
	    }
	    datestring = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
		hour + ":" + minute;
	    //.toString().substring(2)
	    // 16-5-2015 9:50
	    return datestring;
	  }
    const createEmployee = () => {
	handleCloseBirthday();
	getToast("Creating employee", "INFO");
	fetch(`http://localhost:${port}/api/employee`, {
		    method: "POST",
		    headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		    },
		    body : JSON.stringify({
			employee_id: b_empID,
			name: b_empName,
			title: b_empTitle,
			birthday: b_year+b_month+b_day,
			year: b_year,
			month: b_month,
			day: b_day,
			position: b_empPos
		    })
		})
		.then(response => {
			getToast("Created employee", "SUCCESS");
			getBirthdays();
			})
		.catch((err)=>{console.log(err)});
    }
    const createNews = () => {
	handleCloseNews();
	getToast("Creating news", "INFO");
	fetch(`http://localhost:${port}/api/news`, {
		    method: "POST",
		    headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		    },
		    body : JSON.stringify({
			id: n_id,
			title: n_title,
			body: n_body,
			author: n_author,
			date: n_date
		    })
		})
		.then(response => {
			getToast("Created news", "SUCCESS");
			getAllNews();
			})
		.catch((err)=>{console.log(err)});
    }
    const createMeeting = () => {
	handleCloseMeeting();
	getToast("Creating meeting", "INFO");
	console.log(m_id);
	console.log(m_title);
	console.log(m_from.getTime());
	console.log(m_to.getTime());
	console.log(m_host);
	console.log(m_link);
	fetch(`http://localhost:${port}/api/meeting`, {
		    method: "POST",
		    headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		    },
		    body : JSON.stringify({
			id: m_id,
			title: m_title,
			from: m_from.getTime(),
			to: m_to.getTime(),
			host: m_host,
			link: m_link
		    })
		})
		.then(response => {
			getToast("Created meeting", "SUCCESS");
			getAllMeetings();
			})
		.catch((err)=>{console.log(err)});
    }

    const getBirthdays = () => {
	fetch(`http://localhost:${port}/api/getAllEmployees`, {
		    method: "GET",
		    headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		    },
		})
		.then(response => response.json())
		.then(data => 
		{
			console.log('getBirthdays');
			console.log(data);
			setBirthdays(data);

		})
		.catch((err)=>{});
    }
    const getAllNews = () => {
	fetch(`http://localhost:${port}/api/getAllNews`, {
		    method: "GET",
		    headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		    },
		})
		.then(response => response.json())
		.then(data => 
		{
			console.log('getAllNews');
			console.log(data);
			setNews(data);

		})
		.catch((err)=>{});
    }
    const getAllMeetings = () => {
	fetch(`http://localhost:${port}/api/getAllMeetings`, {
		    method: "GET",
		    headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		    },
		})
		.then(response => response.json())
		.then(data => 
		{
			console.log('getAllMeetings');
			console.log(data);
			setMeetings(data);
		})
		.catch((err)=>{});
    }

    //const [username, setUsername]= useState('');
    //const [password, setPassword]= useState('');
    //const [validForm, setValidForm]= useState(false);
    const getBirthdayCard = (item) => {
	return (
        <div class="border-1 mt-2">
            
            <div class="accordion px-1" id="accordionExample">
		    <div class="card">
			    <div class="card-header collapsed">
				<div class="row">
				    <h5 class="col-md-12">
				    {item.Record.name + " "+item.Record.title}
				    </h5>
				</div>
				<div class="row">
				    <div class="col-md-12">
				        <p class="card-text py-1 border border-light rounded-2">Employee id: {item.Record.employee_id}</p>
				    </div>
				</div>
				<div class="row">
				    <div class="col-md-12">
				        <p class="card-text py-1 border border-light rounded-2">{item.Record.position}</p>
				    </div>
				</div>
			     </div>
		    </div>
            </div>

            <div class="card-body">
            
            </div>
        </div>
	);
    }
    const getNewsCard = (item) => {
	return (
        <div class="border-1 mt-2">
            
            <div class="accordion px-1" id="accordionExample">
		    <div class="card-header collapsed">
			<div class="row">
			    <h5 class="col-md-12">
			    {item.Record.title}
			    </h5>
			</div>
			<div class="row">
			    <div class="col-md-12">
				<p class="card-text py-1 border border-light rounded-2"> {item.Record.body?.substring(0, 60)}...</p>
			    </div>
			</div>
			<div class="row">
			    <div class="col-md-12">
				<p class="card-text py-1 border border-light rounded-2">{item.Record.position}</p>
			    </div>
			</div>
		     </div>
            </div>
        </div>
	);
    }
    const getMeetingsCard = (item) => {
	return (
        <div class="border-1 mt-2">
            
            <div class="accordion px-1" id="accordionExample">
		    <div class="card-header collapsed">
			<div class="row">
			    <h5 class="col-md-12">
			    {item.Record.title}
			    </h5>
			</div>
			<div class="row">
			    <div class="col-md-8">
				<span><AiOutlineClockCircle/>  {convertTime(item.Record.from)} to {convertTime(item.Record.to)} </span>
			    </div>
			    <div class="col-md-4">
			    </div>
			</div>
			<div class="row">
			    <div class="col-md-12">
				<span class="card-text py-1 border border-light rounded-2">Meeting link: 
				</span>
				<a rhef={item.Record.link}>{item.Record.link}</a>
			    </div>
			</div>
		     </div>
            </div>
        </div>
	);
    }

    const getTopBar = (name, refreshfunc, modalShowfunc, roles) => {
        return (
          <ul class="nav justify-content-between border-top border-bottom p-2 my-2">
	      <li class="nav-item mx-2">
		{name}
              </li>
              <li class="nav-item justify-content-between">
		{roles.length==1 && window.localStorage.getItem("role")==roles[0] &&
		        <Button variant="none" onClick={modalShowfunc}>
		          <BsPlusCircle/>
		        </Button>
		}
		{roles.length==0 &&
		        <Button variant="none" onClick={modalShowfunc}>
		          <BsPlusCircle/>
		        </Button>
		}
                <button class="btn btn-none" onClick={()=>refreshfunc()}>
                  <AiOutlineReload/>
                </button>
              </li>
          </ul>
        );
      }
    const getModalMeeting = () => {
	return (
          <Modal show={showModalMeeting} onHide={handleCloseMeeting}>
            <Modal.Header closeButton>
              <Modal.Title>Create new meeting</Modal.Title>
            </Modal.Header>
            <Modal.Body>
	    <div class="row my-3">
                <input type="text" class="form-control select2-offscreen" id="accountName" placeholder="ID" tabIndex="-1"
                        value={m_id} 
                        onChange={(event) => setM_id(event.target.value)}
                />
            </div>
            <div class="row my-3">
                <input type="text" class="form-control select2-offscreen" id="accountName" placeholder="Title" tabIndex="-1"
                        value={m_title} 
                        onChange={(event) => setM_title(event.target.value)}
                />
            </div>
	    <div class="row my-3">
                <input type="text" class="form-control select2-offscreen" id="accountName" placeholder="Host" tabIndex="-1"
                        value={m_host} 
                        onChange={(event) => setM_host(event.target.value)}
                />
            </div>
            <div class="row my-3">
                <input type="text" class="form-control" id="message" name="body" rows="3" placeholder="link"
                    value={m_link} 
                    onChange={(event) => setM_link(event.target.value)}
                />
            </div>
	    <div class="row my-3">
		<div class="col-md-3">From: </div>
		<div class="col-md-9">
                    <DateTimePicker onChange={setM_from} value={m_from}/>
		</div>
            </div>
	    <div class="row my-3">
		<div class="col-md-3">To: </div>
		<div class="col-md-9">
                 <DateTimePicker onChange={setM_to} value={m_to}/>
		</div>
            </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseMeeting}>
                Close
              </Button>
              <Button variant="primary" onClick={()=>createMeeting()} disabled={!m_validForm}>
                Create Meeting
              </Button>
            </Modal.Footer>
          </Modal>
        );
    }
    
    const getModalNews = () => {
	return (
          <Modal show={showModalNews} onHide={handleCloseNews}>
            <Modal.Header closeButton>
              <Modal.Title>Create new News</Modal.Title>
            </Modal.Header>
            <Modal.Body>
	    <div class="row my-3">
                <input type="text" class="form-control select2-offscreen" id="accountName" placeholder="ID" tabIndex="-1"
                        value={n_id} 
                        onChange={(event) => setN_id(event.target.value)}
                />
            </div>
            <div class="row my-3">
                <input type="text" class="form-control select2-offscreen" id="accountName" placeholder="Title" tabIndex="-1"
                        value={n_title} 
                        onChange={(event) => setN_title(event.target.value)}
                />
            </div>
            <div class="row my-3">
                <textarea class="form-control" id="message" name="body" rows="3" placeholder="Body"
                    value={n_body} 
                    onChange={(event) => setN_body(event.target.value)}
                ></textarea>
            </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseNews}>
                Close
              </Button>
              <Button variant="primary" onClick={()=>createNews()} disabled={!n_validForm}>
                Create News
              </Button>
            </Modal.Footer>
          </Modal>
        );
    }

    const getModalBirthday = () => {
        return (
          <Modal show={showModalBirthday} onHide={handleCloseBirthday}>
            <Modal.Header closeButton>
              <Modal.Title>Create new Employee</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div class="row my-3">
                <input type="text" class="form-control select2-offscreen" id="accountName" placeholder="Employee ID" tabIndex="-1"
                        value={b_empID} 
                        onChange={(event) => setB_empID(event.target.value)}
                />
            </div>
            <div class="row my-3">
                <input type="text" class="form-control" id="message" name="body" rows="3" placeholder="Employee name"
                    value={b_empName} 
                    onChange={(event) => setB_empName(event.target.value)}
                />
            </div>
            <div class="row my-3">
                <input type="text" class="form-control" id="message" name="body" rows="3" placeholder="Employee title"
                    value={b_empTitle} 
                    onChange={(event) => setB_empTitle(event.target.value)}
                />
            </div>
            <div class="row my-3">
                <input type="text" class="form-control select2-offscreen" id="accountName" placeholder="Employee position" tabIndex="-1"
                        value={b_empPos}
                        onChange={(event) => setB_empPos(event.target.value)}
                />
            </div>
	    <div class="row">
                <div class="col-md-5">
                  <p>Select employee date of birth</p>
                </div>
                <div class="col-md-7 py-1">
                  <DatePicker
		      renderCustomHeader={({
			date,
			changeYear,
			changeMonth,
			decreaseMonth,
			increaseMonth,
			prevMonthButtonDisabled,
			nextMonthButtonDisabled,
		      }) => (
			<div
			  style={{
			    margin: 10,
			    display: "flex",
			    justifyContent: "center",
			  }}
			>
			  <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
			    {"<"}
			  </button>
			  <select
			    value={date.getFullYear()}
			    onChange={({ target: { value } }) => changeYear(value)}
			  >
			    {years.map((option) => (
			      <option key={option} value={option}>
				{option}
			      </option>
			    ))}
			  </select>

			  <select
			    value={months[date.getMonth()]}
			    onChange={({ target: { value } }) =>
			      changeMonth(months.indexOf(value))
			    }
			  >
			    {months.map((option) => (
			      <option key={option} value={option}>
				{option}
			      </option>
			    ))}
			  </select>

			  <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
			    {">"}
			  </button>
			</div>
		      )}
		      selected={b_startDate}
		      onChange={(date) => setB_startDate(date)}
		    />
                </div>
              </div>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseBirthday}>
                Close
              </Button>
              <Button variant="primary" onClick={()=>createEmployee()} disabled={!b_validForm}>
                Create Employee
              </Button>
            </Modal.Footer>
          </Modal>
        );
    }

	
    return (
	<div class="row col-md-12 m-2">
		<div class="col-md-6 border">
			{getTopBar("Birthdays", getBirthdays, handleShowBirthday, ['admin'])}
			{getModalBirthday()}
			{birthdays.map((bday)=> getBirthdayCard(bday))}
		</div>
		<div class="col-md-6 row row-md-12">
			<div class="row row-md-12">
				<div class="row-md-4 border overflow-auto mb-2">
					{getTopBar("News", getAllNews, handleShowNews, ['admin'])}
					{getModalNews()}
					{news.map((bday)=> getNewsCard(bday))}
				</div>
				<div class="row-md-8 border overflow-auto">
					{getTopBar("Meetings", getAllMeetings, handleShowMeeting, ['admin'])}
					{getModalMeeting()}
					{meetings.map((bday)=> getMeetingsCard(bday))}
				</div>
			</div>
		</div>
	</div>
    );
}

export default DashboardComponent
