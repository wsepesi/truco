import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { User } from '../configs/types';
import { useQuery } from 'react-query';

const BASE_URL = 'http://localhost:5000/';

const getUsers = async (): Promise<User[]> => {
    const requestOptions: AxiosRequestConfig = {
        method: 'GET',
        url: `${BASE_URL}db/users`
    };
    const result: AxiosResponse<User[]> = await axios(requestOptions);
    return result.data;
}

const useGetUsers = (queryOptions?: any) => { //FIXME: type this right
    return useQuery('users', () => getUsers(), {
        ...queryOptions,
        refetchOnWindowFocus: false
    });
};

export default useGetUsers;