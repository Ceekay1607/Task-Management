import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import projectsService from "@/service/projects.service";
import { computed } from "vue";

export function useProjects() {
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

    return {
        retrieveProjectsQuery,
    };
}
