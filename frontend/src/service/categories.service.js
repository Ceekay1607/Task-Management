function makeCategoryService() {
    const baseUrl = "/api/category";
    const headers = {
        "Content-type": "application/json",
    };

    async function getCategories() {
        let url = `${baseUrl}`;
        return await fetch(url).then((res) => res.json());
    }

    return {
        getCategories,
    };
}

export default makeCategoryService();
