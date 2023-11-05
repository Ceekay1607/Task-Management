<template>
    <div
        class="container d-flex flex-column justify-content-center align-items-center min-vh-100"
    >
        <div class="w-50 text-center">
            <h1 class="font-weight-bold text-center mb-4">Select login user</h1>
            <form @submit.prevent="handleSubmit" class="text-center">
                <div class="form-group">
                    <select
                        v-model="selectedValue"
                        class="form-control w-50 mx-auto"
                        @change="onValueChange"
                        id="userSelect"
                    >
                        <option value="" disabled>Select user</option>
                        <option
                            v-for="user in users"
                            :key="user.id"
                            :value="user"
                            class="d-flex align-items-center"
                        >
                            {{ user.name }}
                        </option>
                    </select>
                </div>
                <button
                    type="submit"
                    name="_action"
                    value="setUser"
                    class="btn btn-primary btn-block mt-3 w-50 mx-auto"
                >
                    Login
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useUsers } from "../composables/useUsers";

const { retrieveUsersQuery } = useUsers();
const { users } = retrieveUsersQuery();

const selectedUser = ref(null);
const selectedValue = ref(null);

const onValueChange = () => {
    console.log("Selected User changed:", selectedValue.value.id);
    selectedUser.value = selectedValue.value;
};

const handleSubmit = () => {};
</script>
