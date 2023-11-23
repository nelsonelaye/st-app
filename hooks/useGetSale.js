import { useQuery } from 'react-query';
import { fetcher } from '../config';
import useAuthContext from './useAuth';
import Fuse from 'fuse.js';
import { useState } from 'react';

export const getSale = async (token, orderRef) => {
  return await fetcher({
    method: 'Get',
    url: `/v1/ManageSales/SalesDetails?orderRef=${orderRef}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getSales = async (token) => {
  return await fetcher({
    method: 'Get',
    url: '/v1/ManageSales/MySalesHistories',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getStockReport = async (token) => {
  return await fetcher({
    method: 'Get',
    url: '/v1/ManageSales/StockReports',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getInStockProducts = async (token) => {
  return await fetcher({
    method: 'Get',
    url: '/v1/ManageSales/InStockProducts',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getOutStockProducts = async (token) => {
  return await fetcher({
    method: 'Get',
    url: '/v1/ManageSales/OutOfStockProducts',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getSaleStatistics = async (token) => {
  return await fetcher({
    method: 'Get',
    url: `/v1/ManageSales/MySalesStatistic/Daily`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getSalesChart = async (token) => {
  return await fetcher({
    method: 'Get',
    url: `/v1/ManageSales/SalesChartData`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useGetSales = () => {
  const { token } = useAuthContext();

  const [searchkeyword, setSearchkeyword] = useState();

  const search = (key) => {
    if (!key || key.lenght < 1) setSearchkeyword(undefined);
    else setSearchkeyword(key);
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['all-sales-history'],
    queryFn: () => getSales(token),
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
    keys: ['customerName', 'salePersonName', 'customerCode', 'orderRef'],
  });
  const filteredData = {
    data: searchkeyword && fuse.search(searchkeyword).map((hit) => hit.item),
  };

  return {
    all_sales: searchkeyword ? filteredData : data,
    isLoading,
    search,
    refetch,
  };
};

export const useGetStockReport = () => {
  const { token } = useAuthContext();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['stock-reports'],
    queryFn: () => getStockReport(token),
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
    all_reports: data,
    isLoading,
    refetch,
  };
};

export const useGetInStockProducts = () => {
  const { token } = useAuthContext();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['in-stock-reports'],
    queryFn: () => getInStockProducts(token),
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
    stocks: data,
    isLoading,
    refetch,
  };
};
export const useGetOustockProducts = () => {
  const { token } = useAuthContext();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['out-stock-products'],
    queryFn: () => getOutStockProducts(token),
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
    stocks: data,
    isLoading,
    refetch,
  };
};

export const useGetSale = (orderRef) => {
  const { token } = useAuthContext();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['single-sale'],
    queryFn: () => getSale(token, orderRef),
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
    sale: data,
    isLoading,
    refetch,
  };
};

export const useGetSaleStatistics = () => {
  const { token } = useAuthContext();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['sale-statistics'],
    queryFn: () => getSaleStatistics(token),
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
    sale_statistics: data,
    isLoading,
    refetchStatistics: refetch,
  };
};

export const useGetSalesChart = (query) => {
  const { token } = useAuthContext();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['sales-chart'],
    queryFn: () => getSalesChart(token),
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
    sale_chart: data,
    isLoading,
    refetchStatistics: refetch,
  };
};
