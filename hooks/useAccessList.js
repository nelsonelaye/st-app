import { useQuery } from "react-query"
import { fetcher } from "../config"
import useAuthContext from "./useAuth"
import { toast } from "react-hot-toast"

export const getAccessList = async(token) => {
    return await fetcher({
        method : "Get",
        url : '/v1/ManageSetUps/Get-Access-Items',
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
}

export const getUserAccessList = async(token, email) => {
    return await fetcher({
        method : "Get",
        url : `/v1/ManageSetUps/UserAccessItems?userPhoneNumberOrEmail=${email}`,
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
}

export const useAccessLists = () => {
    const { token } = useAuthContext();

    const { data, isLoading, refetch, status } = useQuery({
        queryKey : ["access-lists"],
        queryFn : () => getAccessList(token),
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
        access_lists : data,
        isLoading,
        status,
        refetch_list : refetch
    }
}

export const useUserAccess = (email) => {
    const { token } = useAuthContext();

    const { data, isLoading, refetch, status } = useQuery({
        queryKey : ["access-user"],
        queryFn : () => getUserAccessList(token, email),
        retry : false,
        enabled : false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        keepPreviousData : true,
        onSuccess(data){
            if(data.statusCode == 205){
                toast.error(data.message)
            }
        },
        onError(err){
            console.log(err)
            toast.error(err?.message)
        }
    })
    return {
        user_access: data,
        isLoading,
        status,
        refetch
    }
}
