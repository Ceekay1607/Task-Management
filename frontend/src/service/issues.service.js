function makeIssueService() {
    const baseUrl = "/api/project/:project-number/issue";
    const headers = {
        "Content-type": "application/json",
    };

    async function getProjects() {
        let url = `${baseUrl}`;
        return await fetch(url).then((res) => res.json());
    }

    async function getProjectById(id) {
        let url = `${baseUrl}/${id}`;
        return await fetch(url).then((res) => res.json());
    }

    return {
        getProjects,
        getProjectById,
    };
}

export default makeIssueService();
