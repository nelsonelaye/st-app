import { useQuery } from "react-query";
import useAuthContext from "./useAuth";
import { fetcher } from "../config";

export const getEcommerceSetup = async (token) => {
  return await fetcher({
    method: "Get",
    url: `/v1/EcommerceManagement/getEcommerceSetUp`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useGetEcommerceSetup = () => {
  const { token } = useAuthContext();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["ecommerce details"],
    queryFn: () => getEcommerceSetup(token),
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
    ecommerce_details: data,
    isLoading,
    refetch,
  };
};
