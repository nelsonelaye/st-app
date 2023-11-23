import { useQuery } from "react-query";
import { fetcher } from "../config";
import useAuthContext from "./useAuth";

export const getStore = async (token, storeId) => {
  return await fetcher({
    method: "Get",
    url: `/v1/StoreManagement/Store/${storeId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getStores = async (token) => {
  return await fetcher({
    method: "Get",
    url: "/v1/StoreManagement/Store-list",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getStoreSearch = async (token, keyword) => {
  return await fetcher({
    method: "Get",
    url: `/v1/StoreManagement/Search-Store?filter=${keyword}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useGetStores = () => {
  const { token } = useAuthContext();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["all-stores"],
    queryFn: () => getStores(token),
    retry: false,
    enabled: Boolean(token),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    keepPreviousData: true,
    onError(err) {
      console.log(err);
    },
  });
  return {
    all_stores: data,
    isLoading,
    refetch,
  };
};

export const useGetStore = (storeId) => {
  const { token } = useAuthContext();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["single-store"],
    queryFn: () => getStore(token, storeId),
    retry: false,
    enabled: Boolean(token),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    keepPreviousData: true,
    onError(err) {
      console.log(err);
    },
  });
  return {
    store: data,
    isLoading,
    refetch,
  };
};

export const useStoreSearch = (query, keyword) => {
  const { token } = useAuthContext();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["store-search"],
    queryFn: () => getStoreSearch(token, keyword),
    retry: false,
    enabled: query,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    keepPreviousData: true,
    onError(err) {
      console.log(err);
    },
  });
  return {
    store_search: data,
    isLoading,
    refetchSearch: refetch,
  };
};