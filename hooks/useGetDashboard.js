import { useQuery } from 'react-query';
import { fetcher } from '../config';
import useAuthContext from './useAuth';

export const getDashboardData = async (token) => {
  return await fetcher({
    method: 'Get',
    url: `/v1/DashboardOverView/Data`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useDashboardData = () => {
  const { token } = useAuthContext();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['dashboard-data'],
    queryFn: () => getDashboardData(token),
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
    dashboard_data: data,
    isLoading,
    refetch,
  };
};

export const getDashboardChartData = async (token, yearValue) => {
  return await fetcher({
    method: 'Get',
    url: `/v1/DashboardOverView/ChartData/${yearValue}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useDashboardChartData = (yearValue) => {
  const { token } = useAuthContext();

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['dashboard-chart-data', yearValue],
    queryFn: () => getDashboardChartData(token, yearValue),
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
    dashboard_chart_data: data,
    isLoading,
    isFetching,
    refetch,
  };
};
