import { useQuery } from "react-query"
import { fetcher } from "../config"
import useAuthContext from "./useAuth"

export const getBrandList = async(token) => {
    return await fetcher({
        method : "Get",
        url : '/v1/ProductBrand/All',
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
}
export const getBrandSearch = async(token, keyword) => {
    return await fetcher({
        method : "Get",
        url :  `/v1/ProductBrand/SearchBrand?filter=${keyword}`,
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
}


export const useBrandList = () => {
    const { token } = useAuthContext();

    const { data, isLoading, refetch } = useQuery({
        queryKey : ["all-brand"],
        queryFn : () => getBrandList(token),
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
        brand_list : data,
        isLoading,
        refetch
    }
}
export const useBrandSearch = (keyword, query) => {
    const { token } = useAuthContext();

    const { data, isLoading, refetch, status } = useQuery({
        queryKey : ["search-brand"],
        queryFn : () => getBrandSearch(token, keyword),
        retry : false,
        enabled : query,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        keepPreviousData : true,
        onError(err){
            console.log(err)
        }
    })
    return {
        brand_search : data,
        isLoading,
        status,
        brand_refetch : refetch
    }
}
