import { fetcher } from "../config";
import useAuthContext from "./useAuth";
import { useMutation } from "react-query";

export const fetcherProps = {
  url: "",
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  data: "",
};

export const useMutate = () => {
  const { token } = useAuthContext();

  const singleMutation = (arg) =>
    fetcher({
      ...arg,

      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  const mutuation = useMutation(singleMutation);

  return mutuation;
};
