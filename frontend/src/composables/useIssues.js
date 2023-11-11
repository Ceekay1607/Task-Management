import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import issueService from "@/service/issues.service";
import { computed } from "vue";

export function useIssues() {
    const queryClient = useQueryClient();

    return {};
}
