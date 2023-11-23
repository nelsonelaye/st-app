import { useQuery } from "react-query"
import { fetcher } from "../config"
import useAuthContext from "./useAuth"
import { toast } from "react-hot-toast"

export const getProductCategory = async(token) => {
    return await fetcher({
        method : "Get",
        url : '/v1/ProductCategory/All',
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
}

export const getMainCategory = async(token) => {
    return await fetcher({
        method : "Get",
        url : '/v1/ProductCategory/Get-Main-Category-Items',
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
}
export const getSubCategory = async(token) => {
    return await fetcher({
        method : "Get",
        url : '/v1/ProductCategory/Get-Sub-Category-Items',
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
}
export const getCategorySearch = async(token, keyword) => {
    return await fetcher({
        method : "Get",
        url : `/v1/ProductCategory/seach-Category?filter=${keyword}`,
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
}

export const getCategoryById = async(token, id) => {
    return await fetcher({
        method : "Get",
        url : `/v1/ProductCategory/Get-Category-Detail/${id}`,
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
}

export const getSubCategoryByMain = async(token, id) => {
    return await fetcher({
        method : "Get",
        url : `/v1/ProductCategory/Sub-Category-Items/${id}`,
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
}

export const useProductCategory = () => {
    const { token } = useAuthContext();

    const { data, isLoading, refetch } = useQuery({
        queryKey : ["all-categories"],
        queryFn : () => getProductCategory(token),
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
        all_categories : data,
        isLoading,
        refetch
    }
}
export const useMainCategory = () => {
    const { token } = useAuthContext();

    const { data, isLoading, refetch } = useQuery({
        queryKey : ["main-categories"],
        queryFn : () => getMainCategory(token),
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
        main_categories : data,
        isLoading,
        refetch
    }
}
export const useSubCategory = () => {
    const { token } = useAuthContext();

    const { data, isLoading, refetch } = useQuery({
        queryKey : ["sub-categories"],
        queryFn : () => getSubCategory(token),
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
        sub_categories : data,
        isLoading,
        refetch
    }
}
export const useCategoryById = (id) => {
    const { token } = useAuthContext();

    const { data, isLoading, refetch } = useQuery({
        queryKey : ["id-categories"],
        queryFn : () => getCategoryById(token, id),
        retry : false,
        enabled : false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        keepPreviousData : true,
        onError(err){
            console.log(err)
        }
    })
    return {
        category_by_id : data,
        isLoading,
        refetch_by_id: refetch
    }
}
export const useCategorySearch = (query, keyword, setQuery) => {
    const { token } = useAuthContext();

    const { data, isLoading, refetch } = useQuery({
        queryKey : ["categories-search"],
        queryFn : () => getCategorySearch(token, keyword),
        retry : false,
        enabled : query,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        keepPreviousData : true,
        onError(err){
            console.log(err)
            setQuery(false)
            toast.error("Search not found")
        }
    })
    return {
        category_type : data,
        isLoading,
        refetch_by_search: refetch
    }
}
export const useSubCategoryMain = ( keyword ) => {
    const { token } = useAuthContext();

    const { data, isLoading, refetch } = useQuery({
        queryKey : ["subcategories-main"],
        queryFn : () => getSubCategoryByMain(token, keyword),
        retry : false,
        enabled : false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        keepPreviousData : true,
        onError(err){
            console.log(err)
        }
    })
    return {
        subcatergories : data,
        isLoading,
        refetch_subcategories: refetch
    }
}