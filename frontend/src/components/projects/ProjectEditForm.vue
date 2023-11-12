<template>
    <div class="col-md-8 col-lg-6 col-xl-4 mx-4 my-3">
        <form>
            <div class="d-flex flex-row">
                <p class="lead fw-normal me-3 fs-3 fw-bold">Project Details</p>
            </div>

            <div class="form-outline mb-4">
                <label class="form-label fs-5" for="name">Name</label>
                <input
                    type="name"
                    id="name"
                    class="form-control form-control-lg"
                    required
                />
            </div>

            <div class="form-outline mb-4">
                <label class="form-label fs-5" for="description"
                    >Description</label
                >
                <input
                    type="text"
                    id="description"
                    class="form-control form-control-lg"
                    required
                />
            </div>

            <div class="form-outline mb-4">
                <label class="form-label fs-5" for="members">Add members</label>
                <input
                    type="text"
                    id="members"
                    class="form-control form-control-lg"
                    required
                />
            </div>
        </form>
    </div>
</template>

<script setup></script>
