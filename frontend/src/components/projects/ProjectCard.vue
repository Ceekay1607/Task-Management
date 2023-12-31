<template>
    <div class="col-12 col-md-6 col-lg-4">
        <!-- <router-link
            style="text-decoration: none; color: inherit"
            :to="{
                name: 'issues',
                params: { projectId: project.projectId },
            }"
        > -->
        <div class="card dark" @click="navigate(project.projectId)">
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
            </div>
        </div>
        <!-- </router-link> -->

        <button class="btn btn-danger mb-4 my-1" @click="onDeleteProject">
            <i class="fa-solid fa-trash"></i> Delete
        </button>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useProjects } from "@/composables/useProjects";
import { useRouter } from "vue-router";
const { deleteProject } = useProjects();

const router = useRouter();
const navigate = (projectId) => {
    router.push({ name: "issues", params: { projectId: projectId } });
};

const { project } = defineProps({
    project: { type: Object, required: true },
});

const $emit = defineEmits(["submit:delete"]);

const onDeleteProject = () => {
    const message = "Do you want to remove " + project.projectName + "?";
    if (confirm(message)) {
        deleteProject(project.projectId, {
            onSuccess: () => {
                $emit("submit:delete", true);
            },
        });
        // window.location.reload();
    }
};
</script>

<style scoped>
.card {
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
