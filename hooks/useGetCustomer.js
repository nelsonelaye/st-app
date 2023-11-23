import { useQuery } from 'react-query';
import { fetcher } from '../config';
import useAuthContext from './useAuth';
import { useState } from 'react';

export const getAllCustomers = async (token) => {
  return await fetcher({
    method: 'Get',
    url: '/v1/Customers/All-Customers',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getSearchCustomers = async (token, key) => {
  return await fetcher({
    method: 'Get',
    url: `/v1/Customers/Search-Customer?filter=${key}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getCustomer = async (token, id) => {
  return await fetcher({
    method: 'Get',
    url: `/v1/Customers/Get-Customer?CustomerId=${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useGetAllCustomers = () => {
  const [searchkeyword, setSearchkeyword] = useState();

  const search = (key) => {
    if (!key || key.lenght < 1) setSearchkeyword(undefined);
    else setSearchkeyword(key);
  };

  const { token } = useAuthContext();

  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: searchkeyword
      ? ['search-customers', searchkeyword]
      : ['all-customers'],
    queryFn: () =>
      searchkeyword
        ? getSearchCustomers(token, searchkeyword)
        : getAllCustomers(token),
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
    customers_list: data,
    isLoading,
    refetch_list: () => {
      if (searchkeyword) {
        setSearchkeyword(undefined);
      }
      refetch();
    },
    search,
    isFetching,
  };
};

export const useGetCustomer = (id) => {
  const { token } = useAuthContext();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['one-customer'],
    queryFn: () => getCustomer(token, id),
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
    customer: data,
    isLoading,
    refetch,
  };
};

// export const useProductDetails = (id) => {
//   const { token } = useAuthContext();

//   const { data, isLoading, refetch } = useQuery({
//     queryKey: ["products-details"],
//     queryFn: () => getProductDetails(token, id),
//     retry: false,
//     enabled: Boolean(token),
//     refetchOnWindowFocus: false,
//     refetchOnMount: false,
//     refetchOnReconnect: false,
//     keepPreviousData: true,
//     onError(err) {
//       console.log(err);
//     },
//   });
//   return {
//     product_detail: data,
//     isLoading,
//     refetch,
//   };
// };
// export const useProductByStore = (id) => {
//   const { token } = useAuthContext();

//   const { data, isLoading, refetch } = useQuery({
//     queryKey: ["products-by-store"],
//     queryFn: () => getProductByStore(token, id),
//     retry: false,
//     enabled: false,
//     refetchOnWindowFocus: false,
//     refetchOnMount: false,
//     refetchOnReconnect: false,
//     keepPreviousData: true,
//     onError(err) {
//       console.log(err);
//     },
//   });
//   return {
//     product_bystore: data,
//     isLoading,
//     refetch,
//   };
// };
// export const useProductByBrand = (id) => {
//   const { token } = useAuthContext();

//   const { data, isLoading, refetch } = useQuery({
//     queryKey: ["products-by-brand"],
//     queryFn: () => getProductByBrand(token, id),
//     retry: false,
//     enabled: false,
//     refetchOnWindowFocus: false,
//     refetchOnMount: false,
//     refetchOnReconnect: false,
//     keepPreviousData: true,
//     onError(err) {
//       console.log(err);
//     },
//   });
//   return {
//     product_bybrand: data,
//     isLoading,
//     brandRefetch: refetch,
//   };
// };
// export const useProductByCat = (id) => {
//   const { token } = useAuthContext();

//   const { data, isLoading, refetch } = useQuery({
//     queryKey: ["products-by-cat"],
//     queryFn: () => getProductByCat(token, id),
//     retry: false,
//     enabled: false,
//     refetchOnWindowFocus: false,
//     refetchOnMount: false,
//     refetchOnReconnect: false,
//     keepPreviousData: true,
//     onError(err) {
//       console.log(err);
//     },
//   });
//   return {
//     product_bycat: data,
//     isLoading,
//     refetchCat: refetch,
//   };
// };
// export const useProductSearch = (query, keyword) => {
//   const { token } = useAuthContext();

//   const { data, isLoading, refetch } = useQuery({
//     queryKey: ["products-search"],
//     queryFn: () => getProductSearch(token, keyword),
//     retry: false,
//     enabled: query,
//     refetchOnWindowFocus: false,
//     refetchOnMount: false,
//     refetchOnReconnect: false,
//     keepPreviousData: true,
//     onError(err) {
//       console.log(err);
//     },
//   });
//   return {
//     product_search: data,
//     isLoading,
//     refetchSearch: refetch,
//   };
// };
// export const useProductByCode = (keyword) => {
//   const { token } = useAuthContext();

//   const { data, isLoading, refetch } = useQuery({
//     queryKey: ["products-code"],
//     queryFn: () => getProductByCode(token, keyword),
//     retry: false,
//     enabled: false,
//     refetchOnWindowFocus: false,
//     refetchOnMount: false,
//     refetchOnReconnect: false,
//     keepPreviousData: true,
//     onError(err) {
//       console.log(err);
//     },
//   });
//   return {
//     product_code: data,
//     isLoading,
//     refetchCode: refetch,
//   };
// };
