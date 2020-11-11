// import logo from './logo.svg';
import './App.css';
import LoginPage from './components/LoginPage';
import { Router } from '@reach/router';

function App() {
    return (
        <div>
            <Router>
                <LoginPage path={'/'}/>
            </Router>
        </div>
    )
}

export default App;
