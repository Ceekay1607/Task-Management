import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import issueService from "@/service/issues.service";
import { computed } from "vue";

export function useIssues() {
    const queryClient = useQueryClient();

    function retrieveIssues(projectId) {
        const { data: issues } = useQuery({
            queryKey: ["issues"],
            queryFn: () => issueService.getIssues(projectId),
        });

        return {
            issues,
        };
    }

    return { retrieveIssues };
}
