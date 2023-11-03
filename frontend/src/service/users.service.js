function makeUserService() {
    const baseUrl = "/api/user";
    const headers = {
        "Content-type": "application/json",
    };

    async function getUsers() {
        let url = `${baseUrl}`;
        return await fetch(url).then((res) => res.json());
    }

    return {
        getUsers,
    };
}

export default makeUserService();
