function makeUserService() {
    const baseUrl = "/api/user";
    const headers = {
        "Content-type": "application/json",
    };

    async function getUsers() {
        let url = `${baseUrl}`;
        return await fetch(url).then((res) => res.json());
    }

    async function getUserInfo() {
        let url = `/api/user/info`;
        return await fetch(url).then((res) => res.json());
    }

    return {
        getUsers,
        getUserInfo,
    };
}

export default makeUserService();
