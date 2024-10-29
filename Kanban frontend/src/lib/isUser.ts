import { useQuery } from "@tanstack/react-query";
import { get } from "@/lib/Api";
import { CheckAuthResponse } from "@/Types/types";


export const useIsAuthenticated = () => {
    return useQuery<CheckAuthResponse, Error>({
        queryKey: ["checkAuth"], 
        queryFn: async () => {
            const response = await get<CheckAuthResponse>("/check-auth");
            return response;
        }
    });
};