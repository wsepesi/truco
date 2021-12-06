import axios, { AxiosResponse } from "axios"

import { BASE_URL } from "../configs/vars"
import { User } from "../configs/types"

export const getUser = async (socketId: string): Promise<User | null> => {
    console.log(socketId);
    const result: AxiosResponse<User> = await axios({
        method: "GET",
        url: `${BASE_URL}db/users/${socketId}`,
    })

    if (result.status === 200) {
        return result.data
    } else return null;
}