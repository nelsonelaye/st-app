import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuthContext = () => {
    if (!AuthContext) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return useContext(AuthContext);
};

export default useAuthContext;