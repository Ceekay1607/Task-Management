function makeProjectService() {
    const baseUrl = "/api/project";
    const headers = {
        "Content-type": "application/json",
    };

    async function getProjects() {
        let url = `${baseUrl}`;
        return await fetch(url).then((res) => res.json());
    }

    return {
        getProjects,
    };
}

export default makeProjectService();
