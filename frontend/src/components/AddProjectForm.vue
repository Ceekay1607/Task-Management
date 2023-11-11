<template>
    <div class="col-md-8 col-lg-6 col-xl-4">
        <form v-show="showForm" @submit.prevent="handleSubmit">
            <div class="d-flex flex-row">
                <p class="lead fw-normal me-3 fs-2 fw-bold m-1">
                    Project Details
                </p>
            </div>

            <div class="form-outline mb-4">
                <label class="form-label" for="name">Name</label>
                <input
                    type="name"
                    id="name"
                    class="form-control form-control-lg"
                    required
                />
            </div>

            <div class="form-outline mb-4">
                <label class="form-label" for="email">Description</label>
                <input
                    type="description"
                    id="description"
                    class="form-control form-control-lg"
                    required
                />
            </div>

            <div class="form-outline mb-4">
                <label class="form-label" for="users">Description</label>

                <select
                    class="form-select form-select-lg"
                    aria-label="Default select example"
                    type="users"
                    id="users"
                    required
                >
                    <option selected>Open this select menu</option>
                    <option value="1"></option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script setup></script>
