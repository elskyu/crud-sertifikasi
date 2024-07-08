<script setup>
// Import necessary modules
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import api from "../../api";

// Initialize router and route
const router = useRouter();
const route = useRoute();

// Define state variables
const idKategori = ref("");
const namaKategori = ref("");
const judul = ref("");
const errors = ref([]);

// Fetch detail data for the category by ID on component mount
onMounted(async () => {
  try {
    const response = await api.get(`/api/kategori/${route.params.id}`);
    idKategori.value = response.data.data.id_kategori;
    namaKategori.value = response.data.data.nama_kategori;
    judul.value = response.data.data.judul;
  } catch (error) {
    console.error("Error fetching category:", error);
  }
});

// Method to handle file changes (if needed for future use)
const handleFileChange = (e) => {
  // This can be implemented if file handling is required
};

// Method to update the category
const updateKategori = async () => {
  // Initialize formData
  let formData = new FormData();
  
  // Assign state values to formData
  formData.append("id_kategori", idKategori.value);
  formData.append("nama_kategori", namaKategori.value);
  formData.append("judul", judul.value);
  formData.append("_method", "PATCH");

  // Send data to the API to update the category
  try {
    await api.post(`/api/kategori/${route.params.id}`, formData);
    router.push({ path: "/kategori" });
    router.push({ name: "posts.index" });
  } catch (error) {
    errors.value = error.response.data.errors;
  }
};
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <form @submit.prevent="updateKategori()">
              <div class="mb-3">
                <label class="form-label fw-bold">ID Kategori</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="idKategori"
                  placeholder="ID Kategori"
                  readonly />
                <div v-if="errors.id_kategori" class="alert alert-danger mt-2">
                  <span>{{ errors.id_kategori[0] }}</span>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Nama Kategori</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="namaKategori"
                  placeholder="Nama Kategori" />
                <div v-if="errors.nama_kategori" class="alert alert-danger mt-2">
                  <span>{{ errors.nama_kategori[0] }}</span>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Judul</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="judul"
                  placeholder="Judul" />
                <div v-if="errors.judul" class="alert alert-danger mt-2">
                  <span>{{ errors.judul[0] }}</span>
                </div>
              </div>
              <button
                type="submit"
                class="btn btn-md btn-primary rounded-sm shadow border-0">
                Update
              </button>
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
