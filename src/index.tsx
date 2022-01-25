import 'reflect-metadata';

import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { UserList } from './components/UserList';
import { User } from './components/User';
import { ContainerProvider } from './ioc/components/ContainerProvider';
import { container } from './ioc/inversify.config';

import './index.css';

const App = (): React.ReactElement => {
    return (
        <ContainerProvider container={container}>
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
        </ContainerProvider>
    );
};

ReactDOM.render(<React.StrictMode><App /></React.StrictMode>, document.getElementById('root'));
