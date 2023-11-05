import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import userService from "../service/users.service";
import { computed } from "vue";

export function useUsers() {
    const queryClient = useQueryClient();

    function retrieveUsersQuery() {
        const { data: usersArray } = useQuery({
            queryKey: ["users"],
            queryFn: () => userService.getUsers(),
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

    return {
        retrieveUsersQuery,
    };
}
