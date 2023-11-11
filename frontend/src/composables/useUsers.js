import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { computed } from "vue";
import usersService from "../service/users.service";

export function useUsers() {
    const queryClient = useQueryClient();

    function retrieveUsersQuery() {
        const { data: usersArray } = useQuery({
            queryKey: ["users"],
            queryFn: () => usersService.getUsers(),
        });

        const users = computed(() => {
            const tempUser = usersArray.value?.users.map((user) => user) ?? [];

            return tempUser.sort((current, next) =>
                current.name.localeCompare(next.name)
            );
        });

        return {
            users,
        };
    }

    function retrieveUser() {
        const { data: user } = useQuery({
            queryKey: ["user"],
            queryFn: () => usersService.getUserInfo(),
        });

        console.log(user);

        return {
            user,
        };
    }
    return {
        retrieveUsersQuery,
        retrieveUser,
    };
}
