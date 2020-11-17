// import logo from './logo.svg';
import './App.css';
import LoginPage from './components/Login/LoginPage';
import HomePage from './components/Home/HomePage';
import { Router } from '@reach/router';

function App() {
    return (
        <div>
            <Router>
                <LoginPage path={'/'}/>
                <HomePage path={'/home'}/>
            </Router>
        </div>
    )
}

export default App;
