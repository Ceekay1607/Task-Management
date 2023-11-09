<template>
    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
        <router-link
            style="text-decoration: none; color: inherit"
            :to="{ name: 'issues', params: { projectId: project.projectId } }"
        >
            <div class="card dark mb-5">
                <img
                    :src="project.projectImage || '/images/default-project.png'"
                    class="card-img-top"
                    alt="..."
                />
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

<style scoped>
.card {
    max-width: 30em;
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

.card img {
    width: 25%;
    height: auto;
    padding: 0.5em;
    border-radius: 0.7em;
    object-fit: cover;
    transition: transform 0.2s;
}

.card-body {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    max-height: 250px;
    overflow: hidden;
}

.text-section {
    max-width: 60%;
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
    max-width: 40%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
}

.cta-section .btn {
    padding: 0.2em 0.5em;
    font-size: 1em;
    color: #fff;
}

@media screen and (max-width: 475px) {
    .card-title {
        font-size: 1em;
    }

    .card-text {
        font-size: 0.8em;
    }
}
</style>

<script setup>
import { ref } from "vue";

const { project } = defineProps({
    project: { type: Object, required: true },
});
</script>
