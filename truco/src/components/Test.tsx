import React from 'react';
import useTestExpress from '../hooks/testExpress';

const Test = (): React.ReactElement => {
    const { data, status } = useTestExpress();

    return(
        <div className="Test">
            <h1>Test result:</h1>
            <h1>{(status === "success" && data) ? data.data : "ERROR"}</h1>
        </div>)
}

export default Test;