import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { computed } from "vue";
import categoriesService from "@/service/categories.service";

export function useUsers() {
    const queryClient = useQueryClient();

    function retrieveCategories() {
        const { data: categories } = useQuery({
            queryKey: ["categories"],
            queryFn: () => categoriesService.getCategories(),
        });

        return {
            categories,
        };
    }
    return {
        retrieveCategories,
    };
}
