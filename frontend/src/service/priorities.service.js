function makePriorityService() {
    const baseUrl = "/api/priority";
    const headers = {
        "Content-type": "application/json",
    };

    async function getPriorities() {
        let url = `${baseUrl}`;
        return await fetch(url).then((res) => res.json());
    }

    return {
        getPriorities,
    };
}

export default makePriorityService();
