import { useQuery } from 'react-query';
import { fetcher } from '../config';
import useAuthContext from './useAuth';
import { useState } from 'react';

export const getSupplier = async (token, email) => {
  return await fetcher({
    method: 'Get',
    url: `/v1/Supplier/Get-Supplier?Email=${email}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getSupplierList = async (token) => {
  return await fetcher({
    method: 'Get',
    url: '/v1/Supplier/All-Suppliers',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getSearchSupplier = async (token, key) => {
  return await fetcher({
    method: 'Get',
    url: `/v1/Supplier/Search-Supplier?filter=${key}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useGetSupplierList = () => {
  const { token } = useAuthContext();

  const [searchkeyword, setSearchkeyword] = useState();

  const search = (key) => {
    if (!key || key.lenght < 1) setSearchkeyword(undefined);
    else setSearchkeyword(key);
  };

  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: searchkeyword
      ? ['search-customer', searchkeyword]
      : ['all-suppliers'],
    queryFn: () =>
      searchkeyword
        ? getSearchSupplier(token, searchkeyword)
        : getSupplierList(token),
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
    supplier_list: data,
    isLoading,
    refetch_list: () => {
      if (searchkeyword) {
        setSearchkeyword();
      }
      refetch;
    },
    search,
    isFetching,
  };
};

export const useGetSupplier = (email) => {
  const { token } = useAuthContext();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['supplier'],
    queryFn: () => getSupplier(token, email),
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
    supplier: data,
    isLoading,
    refetch,
  };
};
