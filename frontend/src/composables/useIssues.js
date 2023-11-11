import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import issueService from "@/service/issues.service";
import { computed } from "vue";

export function useIssues() {
    const queryClient = useQueryClient();

    function retrieveProjectsQuery() {
        const { data: projects } = useQuery({
            queryKey: ["projects"],
            queryFn: () => projectsService.getProjects(),
        });

        return {
            projects,
        };
    }

    function retrieveProjectById(id) {
        const { data: project } = useQuery({
            queryKey: ["project"],
            queryFn: () => projectsService.getProjectById(id),
        });

        return {
            project,
        };
    }

    return {
        retrieveProjectsQuery,
        retrieveProjectById,
    };
}
