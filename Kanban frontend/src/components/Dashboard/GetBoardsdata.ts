import { useQuery } from "@tanstack/react-query";
import {get} from "@/lib/Api"
import { IBoardWithTasks } from "@/Types/types";

export const useGetBoardData = () => {
    return useQuery<IBoardWithTasks[], Error>({
        queryKey: ["getBoardsWithTasks"],
        queryFn: async () => {
            const response = await get<IBoardWithTasks[]>("/boards");
            return response;
        }
    });
};