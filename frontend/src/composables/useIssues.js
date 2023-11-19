import { useQueryClient, useMutation, useQuery } from "@tanstack/vue-query";
import issueService from "@/service/issues.service";
import { computed } from "vue";

export function useIssues() {
    const queryClient = useQueryClient();

    function retrieveIssues(projectId) {
        const { data: issues, refetch } = useQuery({
            queryKey: ["issues", projectId],
            queryFn: () => issueService.getIssues(projectId),
        });

        return {
            issues,
            refetch,
        };
    }

    const createIssueMutation = useMutation({
        mutationFn: issueService.createIssue,
        onSuccess: (data) =>
            queryClient.setQueriesData(["issues", "create"], data),
    });

    const updateIssueMutation = useMutation({
        mutationFn: issueService.updateIssue,
        onSuccess: (data) =>
            queryClient.setQueriesData(["issue", "update"], data),
    });

    const deleteIssueMutation = useMutation({
        mutationFn: issueService.deleteIssue,
        onSuccess: (data) =>
            queryClient.setQueriesData(["issue", "delete"], data),
    });

    return {
        retrieveIssues,
        createIssue: createIssueMutation.mutate,
        updateIssue: updateIssueMutation.mutate,
        deleteIssue: deleteIssueMutation.mutate,
    };
}
