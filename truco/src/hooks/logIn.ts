import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { useQuery } from 'react-query';

const BASE_URL = 'http://localhost:5000/';

type LoginResult = {
    success: boolean,
}

const logIn = async (username: string): Promise<LoginResult> => {
    const requestOptions: AxiosRequestConfig = {
        method: 'POST',
        url: `${BASE_URL}/login`,
        data: {
            username
        }
    };
    const result: AxiosResponse<LoginResult> = await axios(requestOptions);
    return result.data;
}

const useLogIn = (username: string, queryOptions?: any) => { //FIXME: type this right
    return useQuery('logIn', () => logIn(username), {
        ...queryOptions,
        refetchOnWindowFocus: false
    });
};

export default useLogIn;