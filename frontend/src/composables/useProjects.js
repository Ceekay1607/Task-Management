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

    function retrieveProjectById(id) {
        const { data: project } = useQuery({
            queryKey: ["project", id],
            queryFn: () => projectsService.getProjectById(id),
        });

        return {
            project,
        };
    }

    const createProjectMutation = useMutation({
        mutationFn: projectsService.createProject,
        onSuccess: (data) =>
            queryClient.setQueriesData(["project", "create"], data),
    });

    const updateProjectMutation = useMutation({
        mutationFn: projectsService.updateProject,
        onSuccess: (data) =>
            queryClient.setQueriesData(["project", "update"], data),
    });

    const deleteProjectMutation = useMutation({
        mutationFn: projectsService.deleteProject,
        onSuccess: (data) =>
            queryClient.setQueriesData(["project", "delete"], data),
    });

    return {
        retrieveProjectsQuery,
        retrieveProjectById,
        createProject: createProjectMutation.mutate,
        updateProject: updateProjectMutation.mutate,
        deleteProject: deleteProjectMutation.mutate,
    };
}
