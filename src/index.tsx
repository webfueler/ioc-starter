import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { UserList } from './components/UserList';
import { User } from './components/User';

import './index.css';

const App = (): React.ReactElement => {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/users">Users</Link>
                        </li>
                    </ul>
                </header>
                <div>
                    <Routes>
                        <Route path="/users" element={<UserList />}>
                            <Route path=":page" element={<UserList />} />
                        </Route>
                        <Route path="/user" element={<User />}>
                            <Route path=":id" element={<User />} />
                        </Route>
                        <Route path="/" element={<h1>Homepage</h1>} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
