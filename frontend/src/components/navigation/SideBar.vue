<template>
    <div class="row flex-nowrap main-page">
        <aside id="sidebar" class="col-md-2 vh-100 bg-light">
            <router-link to="/">
                <div class="sidebar-logo">
                    <a href="#" class="text-dark fs-3">Project</a>
                </div>
            </router-link>

            <ul class="nav flex-column nav-tabs">
                <li class="nav-item">
                    <router-link
                        :to="{ name: 'board' }"
                        class="nav-link text-dark fs-5"
                    >
                        Dashboard
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link
                        :to="{ name: 'editProject' }"
                        class="nav-link text-dark fs-5"
                    >
                        Settings
                    </router-link>
                </li>
            </ul>
        </aside>
        <router-view class="col-md-10" />
    </div>
</template>

<script setup>
// const props = defineProps({
//   project: { type: Object, require: true },
// });
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

a {
    cursor: pointer;
    text-decoration: none;
    font-family: "Poppins", sans-serif;
}

li {
    list-style: none;
}

.sidebar-item:hover {
    background-color: rgb(218, 218, 218);
    margin-right: -5%;
}

#sidebar {
    width: 260px;
    box-shadow: 5px 0 5px -5px gray;
}

.sidebar-logo {
    padding: 1.15rem 1.7rem;
}

.sidebar-logo a {
    font-size: 1.5rem;
    font-weight: 600;
}

.nav {
    padding: 0;
}

a.nav-link {
    padding: 0.625rem 1.625rem;
    display: block;
    font-size: 1rem;
}
</style>
