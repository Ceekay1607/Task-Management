import { useQuery } from "@tanstack/vue-query";
import issueService from "@/service/issues.service";
import { computed } from "vue";

export function useIssues() {
    function retrieveIssues(projectId) {
        const { data: issuesArray } = useQuery({
            queryKey: ["issues", projectId],
            queryFn: () => issueService.getIssues(projectId),
        });

        const issues = computed(() => {
            const tempIssues =
                issuesArray.value?.map((issue) => ({ ...issue })) ?? [];
            return tempIssues;
        });

        return {
            issues,
        };
    }

    return { retrieveIssues };
}
