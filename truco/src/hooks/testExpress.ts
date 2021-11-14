import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { useQuery } from 'react-query';

const BASE_URL = 'http://localhost:5000/';

type TestResult = {
    data: string;
}

const testExpress = async (): Promise<TestResult> => {
    const requestOptions: AxiosRequestConfig = {
        method: 'GET',
        url: `${BASE_URL}`
    };
    const result: AxiosResponse<string> = await axios(requestOptions);
    return {
        data: result.data
    };
}

const useTestExpress = (queryOptions?: any) => { //FIXME: type this right
    return useQuery('test', () => testExpress(), {
        ...queryOptions,
        refetchOnWindowFocus: false
    });
};

export default useTestExpress;