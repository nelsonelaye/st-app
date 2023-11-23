import { useQuery } from "react-query";
import useAuthContext from "./useAuth";
import { fetcher } from "../config";

export const getUnReadNotifications = async (token) => {
  return await fetcher({
    method: "Get",
    url: `/v1/DashboardOverView/UnReadNotifications`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useGetUnreadNotification = () => {
  const { token } = useAuthContext();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["unread-notifications"],
    queryFn: () => getUnReadNotifications(token),
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
    unread_notifications: data,
    isLoading,
    refetch,
  };
};
export const getAllNotifications = async (token) => {
  return await fetcher({
    method: "Get",
    url: `/v1/DashboardOverView/UnReadNotifications`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useGetAllreadNotification = () => {
  const { token } = useAuthContext();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["all-notifications"],
    queryFn: () => getAllNotifications(token),
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
    all_notifications: data,
    isLoading,
    refetch,
  };
};
