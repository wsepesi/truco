import { Link } from 'react-router-dom';
import React from 'react';

const Test = (): React.ReactElement => {
    return(
        <div className="Test">
            <h1>Test page</h1>
            <Link to="/">Home</Link>
        </div>)
}

export default Test;