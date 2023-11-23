import { useQuery } from "react-query"
import { fetcher } from "../config"
import useAuthContext from "./useAuth"

export const getCurrentUserProfile = async(token) => {
    return await fetcher({
        method : "Get",
        url : '/v1/ManageUsers/Get-Profile',
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
}

export const useCurrentUserProfile = () => {
    const { token } = useAuthContext();

    const { data, isLoading, refetch } = useQuery({
        queryKey : ["profile"],
        queryFn : () => getCurrentUserProfile(token),
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
        profile : data,
        isLoading,
        refetch
    }
}