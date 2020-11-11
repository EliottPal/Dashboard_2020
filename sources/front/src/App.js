// import logo from './logo.svg';
import './App.css';
import LoginPage from './components/LoginPage';
import HomePage from './components/Home/HomePage';
import ProfilePage from './components/Profile/ProfilePage';
import { Router } from '@reach/router';

function App() {
    return (
        <div>
            <Router>
                <LoginPage path={'/'}/>
                <HomePage path={'/home'}/>
                <ProfilePage path={'/profile'}/>
            </Router>
        </div>
    )
}

export default App;
