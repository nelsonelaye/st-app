import { useQuery } from "react-query"
import { fetcher } from "../config"
import useAuthContext from "./useAuth"

export const getRoles = async(token) => {
    return await fetcher({
        method : "Get",
        url : '/v1/ManageUsers/Get-Roles',
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
}

export const useGetRoles = () => {
    const { token } = useAuthContext();

    const { data, isLoading, refetch } = useQuery({
        queryKey : ["all-roles"],
        queryFn : () => getRoles(token),
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
        all_roles : data,
        isLoading,
        refetch
    }
}