<template>
    <div class="main fixed-top container-fluid">
        <AppHeader :user="user" />
        <div class="container-fluid">
            <div class="row">
                <SideBar />
                <div class="col-md-10 main-page">
                    <router-view />
                </div>
            </div>
        </div>
    </div>

    <!-- Popup issue modal -->
    <div
        class="modal fade"
        id="addIssueModal"
        tabindex="-1"
        aria-labelledby="addIssueModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-2 fw-bold" id="addIssueModal">
                        New Issue
                    </h1>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body">
                    <IssueModal />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import AppHeader from "@/components/header/AppHeader.vue";
import SideBar from "@/components/navigation/SideBar.vue";
import IssueModal from "@/components/issues/IssueModal.vue";
import { useUsers } from "@/composables/useUsers";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const projectId = computed(() => route.params.projectId);
const { retrieveUser } = useUsers();

const { user } = retrieveUser();
</script>

<style>
div {
    font-family: "Poppins", sans-serif;
}

.main {
    height: 100%;
}

.main-page {
    margin-top: 75px;
}

.modal-backdrop {
    position: fixed;
    z-index: 1050;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #000;
}
</style>
