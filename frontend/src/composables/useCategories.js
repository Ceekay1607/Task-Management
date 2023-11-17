import { useQuery, useQueryClient } from "@tanstack/vue-query";
import categoriesService from "@/service/categories.service";
import { computed } from "vue";

export function useCategories() {
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

    return { retrieveCategories };
}
