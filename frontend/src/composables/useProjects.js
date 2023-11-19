import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import projectsService from "@/service/projects.service";
import { computed } from "vue";

export function useProjects() {
    const queryClient = useQueryClient();

    function retrieveProjectsQuery() {
        const { data: projects, refetch } = useQuery({
            queryKey: ["projects"],
            queryFn: () => projectsService.getProjects(),
            keepPreviousData: true,
        });

        return {
            projects,
            refetch,
        };
    }

    function retrieveProjectById(id) {
        const { data: project, refetch } = useQuery({
            queryKey: ["project", id],
            queryFn: () => projectsService.getProjectById(id),
        });

        return {
            project,
            refetch,
        };
    }

    const createProjectMutation = useMutation({
        mutationFn: projectsService.createProject,
        onSuccess: (data) => {
            queryClient.setQueryData(["projects"], data);
        },
    });

    const updateProjectMutation = useMutation({
        mutationFn: projectsService.updateProject,
        onSuccess: (data) =>
            queryClient.setQueriesData(["projects", "update"], data),
    });

    const deleteProjectMutation = useMutation({
        mutationFn: projectsService.deleteProject,
    });

    return {
        retrieveProjectsQuery,
        retrieveProjectById,
        createProject: createProjectMutation.mutate,
        updateProject: updateProjectMutation.mutate,
        deleteProject: deleteProjectMutation.mutate,
    };
}
