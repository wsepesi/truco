import { Link } from 'react-router-dom';
import React from 'react';
import logo from '../logo.svg';
import useTestExpress from '../hooks/testExpress';

const AppContent = (): React.ReactElement => {
    
    const { data, status, isError, error } = useTestExpress();

    if (isError) console.log(error);
    return(
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                Learn React
                </a>
                {data && <p>{data.data}</p>}
                <p>{status}</p>
            </header>
            <Link to="/test">Test</Link>
        </div>)
}

export default AppContent;