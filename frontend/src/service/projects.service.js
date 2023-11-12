function makeProjectService() {
    const baseUrl = "/api/project";
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

    async function createProject(project) {
        return await fetch(baseUrl, {
            method: "POST",
            headers,
            body: JSON.stringify(project),
        }).then((res) => res.json());
    }

    async function deleteProject(id) {
        let url = `${baseUrl}/${id}`;
        return await fetch(url, {
            method: "DELETE",
        }).then((res) => res.json());
    }

    return {
        getProjects,
        getProjectById,
        createProject,
        deleteProject,
    };
}

export default makeProjectService();
