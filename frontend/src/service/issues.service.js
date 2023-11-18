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
        const response = await fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(issue),
        }).then((res) => res.json());
        console.log(response);
        return response;
    }

    async function updateIssue(issue) {
        let url = `${baseUrl}/${issue.projectId}/issue/${issue.number}`;
        const response = await fetch(url, {
            method: "PUT",
            headers,
            body: JSON.stringify(issue),
        }).then((res) => res.json());
        console.log(response);
        return response;
    }

    async function deleteIssue(issue) {
        let url = `${baseUrl}/${issue.projectId}/issue/${issue.number}`;
        return await fetch(url, {
            method: "DELETE",
        }).then((res) => res.json());
    }

    return {
        getIssues,
        createIssue,
        updateIssue,
        deleteIssue,
    };
}

export default makeIssueService();
