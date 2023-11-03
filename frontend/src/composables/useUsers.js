import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import userService from "../service/users.service";

export function useUsers() {
    const queryClient = useQueryClient();

    function retrieveUsersQuery() {
        const { data: users, ...rest } = useQuery({
            queryKey: ["users"],
            queryFn: () => userService.getUsers(),
        });

        return {
            users,
            ...rest,
        };
    }

    return {
        retrieveUsers: retrieveUsersQuery,
    };
}
