import { useQuery } from "react-query"
import { fetcher } from "../config"
import useAuthContext from "./useAuth"

export const getUsers = async(token) => {
    return await fetcher({
        method : "Get",
        url : '/v1/ManageUsers/Get-Users',
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
}

export const useGetUsers = () => {
    const { token } = useAuthContext();

    const { data, isLoading, refetch } = useQuery({
        queryKey : ["all-users"],
        queryFn : () => getUsers(token),
        retry : false,
        enabled : Boolean(token),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        keepPreviousData : true,
        onError(err){
            console.log(err)
        }
    })
    return {
        all_users : data,
        isLoading,
        refetch
    }
}