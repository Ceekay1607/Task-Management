import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { computed } from "vue";
import usersService from "../service/users.service";

export function useUsers() {
    const queryClient = useQueryClient();

    function retrieveUser() {
        const { data: user } = useQuery({
            queryKey: ["user"],
            queryFn: () => usersService.getUserInfo(),
        });

        // console.log(user);

        return {
            user,
        };
    }
    return {
        retrieveUser,
    };
}
