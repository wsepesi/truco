import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { BASE_URL } from "../configs/vars"
import { useQuery } from 'react-query';

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