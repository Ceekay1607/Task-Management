<template>
    <div class="col-xl-4 col-lg-6 col-md-12">
        <router-link
            style="text-decoration: none; color: inherit"
            :to="{ name: 'issues', params: { projectId: project.projectId } }"
        >
            <div class="card dark mb-5">
                <div class="image-container">
                    <img
                        :src="
                            project.projectImage ||
                            '/images/default-project.png'
                        "
                        class="card-img-top"
                        alt="..."
                    />
                </div>
                <div class="card-body">
                    <div class="text-section">
                        <h5 class="card-title fw-bold">
                            {{ project.projectName }}
                        </h5>
                        <p class="card-text">
                            {{ project.projectDescription }}
                        </p>
                    </div>
                    <div class="cta-section">
                        <div class=""></div>
                        <a href="#" class="btn btn-danger">Delete</a>
                    </div>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script setup>
import { ref } from "vue";

const { project } = defineProps({
    project: { type: Object, required: true },
});
</script>

<style scoped>
.card {
    min-width: 20em;
    flex-direction: row;
    position: relative;
    overflow: hidden;
    transition: transform 0.3s, border 0.2s;
    border: 2px solid #ddd;
    box-shadow: 0 7px 7px rgba(0, 0, 0, 0.1);
}

.card:hover {
    transform: scale(1.05);
    border: 2px solid #007bff;
}

.image-container {
    width: 30%; /* Ajust the width as needed */
    position: relative;
    overflow: hidden;
    padding-bottom: 30%; /* Keep it square */
}

.card img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
    transition: transform 0.2s;
}

.card-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    flex-grow: 1; /* Allow the body to grow */
}

.text-section {
    max-width: 100%;
    overflow-y: auto;
}

.card-title {
    font-size: 1.2em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.card-text {
    font-size: 1em;
    overflow: hidden;
    text-overflow: ellipsis;
}

.cta-section {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.cta-section .btn {
    margin-top: auto;
    padding: 0.2em 0.5em;
    font-size: 1em;
    color: #fff;
}

@media screen and (max-width: 575px) {
    .card-title {
        font-size: 1em;
    }

    .card-text {
        font-size: 0.8em;
    }

    .cta-section .btn {
        font-size: 0.8em;
    }
}
</style>
