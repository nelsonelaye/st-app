import { useQuery } from 'react-query';
import { fetcher } from '../config';
import useAuthContext from './useAuth';
import { useState } from 'react';
import Fuse from 'fuse.js';

export const getExpense = async (token, id) => {
  return await fetcher({
    method: 'Get',
    url: `/v1/Expenses/Expense/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getExpenseList = async (token, filter) => {
  return await fetcher({
    method: 'Get',
    url: !filter
      ? '/v1/Expenses/All'
      : filter.type === 'date'
      ? `/v1/Expenses/ByDate?expDate=${new Date(filter?.value).toISOString()}`
      : filter.type === 'monthly'
      ? `/v1/Expenses/Monthly?month=${filter?.value}`
      : filter.type === 'date-range'
      ? `/v1/Expenses/ByDateRange?dateFrom=${new Date(
          filter?.value[0]
        ).toISOString()}&dateTo=${new Date(filter?.value[1]).toISOString()}`
      : filter.type === 'saved'
      ? '/v1/Expenses/allSavedExpenses'
      : filter.type === 'rejected'
      ? '/v1/Expenses/RejectedExpenses'
      : '',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getCategories = async (token) => {
  return await fetcher({
    method: 'Get',
    url: '/v1/Expenses/ExpenseCategories',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useGetExpenseList = () => {
  const { token } = useAuthContext();
  const [filter, setFilter] = useState();

  const [searchkeyword, setSearchkeyword] = useState();

  const search = (key) => {
    if (!key || key.lenght < 1) setSearchkeyword(undefined);
    else setSearchkeyword(key);
  };

  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: filter ? ['expenses', filter] : ['all-expenses'],
    queryFn: () => getExpenseList(token, filter),
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

  const fuse = new Fuse(data?.data || [], {
    keys: ['categoryName', 'description', 'expenseFor'],
  });
  const filteredData = {
    data: searchkeyword && fuse.search(searchkeyword).map((hit) => hit.item),
  };

  return {
    expense_list: searchkeyword ? filteredData : data,
    isLoading,
    refetch_list: () => {
      if (searchkeyword) {
        setSearchkeyword(undefined);
      }
      refetch();
    },
    search,
    isFetching,
    filterExpense: setFilter,
  };
};

export const useGetExpense = (id) => {
  const { token } = useAuthContext();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['single-expense', id],
    queryFn: () => getExpense(token, id),
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
    expense: data,
    isLoading,
    refetch,
  };
};

export const useGetCategories = () => {
  const { token } = useAuthContext();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['expense-categories'],
    queryFn: () => getCategories(token),
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
    categories: data,
    isLoading,
    refetch,
  };
};
