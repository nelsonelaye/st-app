import { useQuery } from "react-query";
import { fetcher } from "../config";
import useAuthContext from "./useAuth";

export const getProductList = async (token) => {
  return await fetcher({
    method: "Get",
    url: "/v1/Product/All",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getProductItems = async (token) => {
  return await fetcher({
    method: "Get",
    url: "/v1/Product/Product-List-Items",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getProductByStore = async (token, id) => {
  return await fetcher({
    method: "Get",
    url: `/v1/Product/StoreProducts?storeId=${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getProductDetails = async (token, id) => {
  return await fetcher({
    method: "Get",
    url: `/v1/Product/Product/Id/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getProductByBrand = async (token, id) => {
  return await fetcher({
    method: "Get",
    url: `/v1/Product/Products/Brand/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getProductByCat = async (token, id) => {
  return await fetcher({
    method: "Get",
    url: `/v1/Product/Products/Category/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getProductSearch = async (token, keyword) => {
  return await fetcher({
    method: "Get",
    url: `/v1/Product/Search-Product?searchItem=${keyword}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getProductByCode = async (token, keyword) => {
  return await fetcher({
    method: "Get",
    url: `/v1/Product/ProductCode?ProductCode=${keyword}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useProductList = () => {
  const { token } = useAuthContext();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["all-products"],
    queryFn: () => getProductList(token),
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
    product_list: data,
    isLoading,
    refetch_list: refetch,
  };
};

export const useProductItems = () => {
  const { token } = useAuthContext();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["products-items"],
    queryFn: () => getProductItems(token),
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
    product_item: data,
    isLoading,
    refetch,
  };
};
export const useProductDetails = (id) => {
  const { token } = useAuthContext();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["products-details"],
    queryFn: () => getProductDetails(token, id),
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
    product_detail: data,
    isLoading,
    refetch,
  };
};
export const useProductByStore = (id) => {
  const { token } = useAuthContext();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["products-by-store"],
    queryFn: () => getProductByStore(token, id),
    retry: false,
    enabled: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    keepPreviousData: true,
    onError(err) {
      console.log(err);
    },
  });
  return {
    product_bystore: data,
    isLoading,
    refetch,
  };
};
export const useProductByBrand = (id) => {
  const { token } = useAuthContext();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["products-by-brand"],
    queryFn: () => getProductByBrand(token, id),
    retry: false,
    enabled: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    keepPreviousData: true,
    onError(err) {
      console.log(err);
    },
  });
  return {
    product_bybrand: data,
    isLoading,
    brandRefetch: refetch,
  };
};
export const useProductByCat = (id) => {
  const { token } = useAuthContext();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["products-by-cat"],
    queryFn: () => getProductByCat(token, id),
    retry: false,
    enabled: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    keepPreviousData: true,
    onError(err) {
      console.log(err);
    },
  });
  return {
    product_bycat: data,
    isLoading,
    refetchCat: refetch,
  };
};
export const useProductSearch = (query, keyword) => {
  const { token } = useAuthContext();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["products-search"],
    queryFn: () => getProductSearch(token, keyword),
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
    product_search: data,
    isLoading,
    refetchSearch: refetch,
  };
};
export const useProductByCode = (keyword) => {
  const { token } = useAuthContext();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["products-code"],
    queryFn: () => getProductByCode(token, keyword),
    retry: false,
    enabled: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    keepPreviousData: true,
    onError(err) {
      console.log(err);
    },
  });
  return {
    product_code: data,
    isLoading,
    refetchCode: refetch,
  };
};
