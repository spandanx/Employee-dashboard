import logo from './logo.svg';
import './App.css';

import LoginComponent from './components/loginComponent';
import DashboardComponent from './components/dashboardComponent';
import TopNavBar from './components/TopNavBar';
import RegisterComponent from './components/registerComponent';

import {
  BrowserRouter as Router,
  Routes ,
  Route,
  Link,
  Navigate
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
	<TopNavBar/>
      <Routes>
          <Route path="/login" element={<LoginComponent />}/>
          <Route path="/register" element={<RegisterComponent />}/>
        </Routes>

      <div class="d-flex align-items-start mt-2">
      <Routes>
          <Route path="/" element={<LoginComponent/>}/>
          <Route path="/dashboard" element={<DashboardComponent />}/>
        </Routes>
    </div>
    </Router>
</>
  );
}

export default App;
