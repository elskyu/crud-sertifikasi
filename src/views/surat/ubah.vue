<script setup>
// Import necessary modules
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import api from "../../api";

// Initialize router and route
const router = useRouter();
const route = useRoute();

// Define state variables
const nomorSurat = ref("");
const kategoriSurat = ref("");
const judulSurat = ref("");
const pdfSurat = ref(null);
const pdfSuratUrl = ref(""); // To store the URL of the current PDF
const waktu = ref("");
const errors = ref([]);

// Fetch detail data for the letter by ID on component mount
onMounted(async () => {
  try {
    const response = await api.get(`/api/arsip/${route.params.id}`);
    nomorSurat.value = response.data.data.nomor_surat;
    kategoriSurat.value = response.data.data.kategori;
    judulSurat.value = response.data.data.judul;
    waktu.value = response.data.data.created_at;
    pdfSuratUrl.value = response.data.data.pdf_url; // Assuming the API response includes a URL for the PDF
  } catch (error) {
    console.error("Error fetching surat:", error);
  }
});

// Method to handle file changes
const handleFileChange = (e) => {
  pdfSurat.value = e.target.files[0];
};

// Method to update the surat
const updateSurat = async () => {
  // Initialize formData
  let formData = new FormData();
  
  // Assign state values to formData
  formData.append("nomor_surat", nomorSurat.value);
  formData.append("kategori", kategoriSurat.value);
  formData.append("judul", judulSurat.value);
  if (pdfSurat.value) {
    formData.append("pdf", pdfSurat.value);
  }
  formData.append("_method", "PUT");

  // Send data to the API to update the surat
  try {
    await api.post(`/api/arsip/${route.params.id}`, formData);
    router.push({ name: "surat.dashboard" });
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
            <form @submit.prevent="updateSurat()">
              <div class="mb-3">
                <label class="form-label fw-bold">Nomor Surat</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="nomorSurat"
                  placeholder="Nomor Surat" />
                <div v-if="errors.nomor_surat" class="alert alert-danger mt-2">
                  <span>{{ errors.nomor_surat[0] }}</span>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Kategori</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="kategoriSurat"
                  placeholder="Kategori" />
                <div v-if="errors.kategori" class="alert alert-danger mt-2">
                  <span>{{ errors.kategori[0] }}</span>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Judul</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="judulSurat"
                  placeholder="Judul" />
                <div v-if="errors.judul" class="alert alert-danger mt-2">
                  <span>{{ errors.judul[0] }}</span>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">File PDF</label>
                <input
                  type="file"
                  class="form-control"
                  @change="handleFileChange" />
                <div v-if="pdfSuratUrl" class="mt-2">
                  <a :href="pdfSuratUrl" target="_blank">View Current PDF</a>
                </div>
                <div v-if="errors.pdf" class="alert alert-danger mt-2">
                  <span>{{ errors.pdf[0] }}</span>
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
