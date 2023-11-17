import { useQuery } from "@tanstack/vue-query";
import prioritiesService from "@/service/priorities.service";

export function usePriorities() {
    function retrievePriorities() {
        const { data: priorities } = useQuery({
            queryKey: ["priorities"],
            queryFn: () => prioritiesService.getPriorities(),
        });

        return {
            priorities,
        };
    }

    return { retrievePriorities };
}
