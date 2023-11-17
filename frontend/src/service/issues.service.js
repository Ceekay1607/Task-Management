function makeIssueService() {
    const baseUrl = "/api/project";
    const headers = {
        "Content-type": "application/json",
    };

    async function getIssues(projectId) {
        let url = `${baseUrl}/${projectId.value}/issue`;
        return await fetch(url).then((res) => res.json());
    }

    async function getIssues(projectId) {
        let url = `${baseUrl}/${projectId.value}/issue`;
        return await fetch(url).then((res) => res.json());
    }

    return {
        getIssues,
    };
}

export default makeIssueService();
