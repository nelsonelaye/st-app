import { useQuery } from 'react-query';
import { fetcher } from '../config';
import useAuthContext from './useAuth';
import { useState } from 'react';

export const getInventory = async (token, receiptNo) => {
  return await fetcher({
    method: 'Get',
    url: `/v1/Inventory/GetInventory/RNo/${receiptNo}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getSearchInventory = async (token, key) => {
  return await fetcher({
    method: 'Get',
    url: `/v1/Inventory/Search/Filter?filter=${key}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getInventoryList = async (token, status) => {
  return await fetcher({
    method: 'Get',
    url:
      status === 'all'
        ? '/v1/Inventory/All'
        : status === 'approved'
        ? '/v1/Inventory/ApprovedInventories'
        : status === 'pending' && '/v1/Inventory/PendingInventories',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useGetInventoryList = () => {
  const { token } = useAuthContext();
  const [status, setStatus] = useState('all');
  const [searchkeyword, setSearchkeyword] = useState();

  const search = (key) => {
    if (!key || key.lenght < 1) setSearchkeyword(undefined);
    else setSearchkeyword(key);
  };

  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: searchkeyword
      ? ['search-inventories', searchkeyword]
      : ['all-inventories', status],
    queryFn: () =>
      searchkeyword
        ? getSearchInventory(token, searchkeyword)
        : getInventoryList(token, status),
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
    inventory_list: data,
    isLoading,
    refetch_list: () => {
      if (searchkeyword) {
        setSearchkeyword(undefined);
      }
      refetch();
    },
    search,
    isFetching,
    status,
    setStatus,
  };
};

export const useGetInventory = (receiptNo) => {
  const { token } = useAuthContext();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['single-inventory', receiptNo],
    queryFn: () => getInventory(token, receiptNo),
    retry: false,
    enabled: Boolean(token),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: false,
    // keepPreviousData: true,
    onError(err) {
      console.log(err);
    },
  });
  return {
    inventory: data,
    isLoading,
    refetch,
  };
};
