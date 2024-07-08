<script setup>
// Import necessary modules
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import api from "../../api";
import { useToast } from 'vue-toastification';

// Initialize router
const router = useRouter();
const toast = useToast();

// Define state
const posts = ref([]);
const id_kategori = ref("");
const nama_kategori = ref("");
const judul = ref("");
const errors = ref([]);

const fetchAllCategories = async () => {
    try {
        const response = await api.get('/api/kategori');
        posts.value = response.data.data.data; // Adjust based on actual response structure

        if (posts.value.length === 0) {
            id_kategori.value = 1;
        } else {
            // Determine the next available ID
            const maxId = Math.max(...posts.value.map(post => post.id_kategori));
            id_kategori.value = maxId + 1;
        }
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};

// Run hook "onMounted"
onMounted(() => {
    // Call method "fetchAllCategories"
    fetchAllCategories();
});

// Method "storeCategory"
const storeCategory = async () => {
    // Initialize formData
    let formData = new FormData();

    // Assign state values to formData
    formData.append("id_kategori", id_kategori.value);
    formData.append("nama_kategori", nama_kategori.value);
    formData.append("judul", judul.value);

    // Store data with API
    await api.post('/api/kategori', formData)
    .then(() => {
        // Redirect to the categories index page
        toast.success('Kategori ditambahkan ke database');
        router.push({ name: "posts.index" });
    })
    .catch((error) => {
        // Assign response error data to state "errors"
        errors.value = error.response.data.errors;
    });
};
</script>

<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <form @submit.prevent="storeCategory()">
                            <div class="mb-3">
                                <label class="form-label fw-bold">ID Kategori</label>
                                <input type="text" class="form-control" v-model="id_kategori" placeholder="ID Kategori" readonly>
                                <div v-if="errors.id_kategori" class="alert alert-danger mt-2">
                                    <span>{{ errors.id_kategori[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Nama Kategori</label>
                                <input type="text" class="form-control" v-model="nama_kategori" placeholder="Nama Kategori">
                                <div v-if="errors.nama_kategori" class="alert alert-danger mt-2">
                                    <span>{{ errors.nama_kategori[0] }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Judul</label>
                                <input type="text" class="form-control" v-model="judul" placeholder="Judul">
                                <div v-if="errors.judul" class="alert alert-danger mt-2">
                                    <span>{{ errors.judul[0] }}</span>
                                </div>
                            </div>
                            <router-link :to="{ name: 'posts.index' }" class="btn btn-md btn-primary rounded-sm shadow border-0 me-2" ><< Kembali</router-link>
                            <button type="submit" class="btn btn-md btn-primary rounded-sm shadow border-0">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600&display=swap');

body {
  font-family: 'Fredoka', sans-serif;
}

h3, p {
  font-family: 'Fredoka', sans-serif;
}
</style>
