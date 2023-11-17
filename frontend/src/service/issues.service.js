function makeIssueService() {
    const baseUrl = "/api/project";
    const headers = {
        "Content-type": "application/json",
    };

    async function getIssues(projectId) {
        let url = `${baseUrl}/${projectId.value}/issue`;
        return await fetch(url).then((res) => res.json());
    }

    async function createIssue(issue) {
        let url = `${baseUrl}/${issue.projectId}/issue`;
        console.log(url);
        console.log(issue);
        const response = await fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(issue),
        }).then((res) => res.json());
        console.log(response);
        return response;
    }

    return {
        getIssues,
        createIssue,
    };
}

export default makeIssueService();
