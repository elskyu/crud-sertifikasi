<script setup>
import { ref } from 'vue';
import api from '../../api';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const router = useRouter();
const toast = useToast();

// State variables
const nomor_surat = ref('');
const selected_kategori = ref('');
const judul = ref('');
const file_pdf = ref(null);
const errors = ref([]);
const kategoriOptions = ref([]);

// Fetch categories for dropdown
const fetchCategories = async () => {
  try {
    const response = await api.get('/api/kategori');
    kategoriOptions.value = response.data.data.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

// Run hook "onMounted"
import { onMounted } from 'vue';
onMounted(fetchCategories);

// Method to store new surat
const storeSurat = async () => {
  try {
    const formData = new FormData();
    formData.append('nomor_surat', nomor_surat.value);
    formData.append('kategori', selected_kategori.value);
    formData.append('judul', judul.value);
    formData.append('pdf', file_pdf.value);

    await api.post('/api/arsip', formData);
    toast.success('Data berhasil ditambahkan ke database');
    router.push({ name: 'surat.dashboard' });
  } catch (error) {
    errors.value = error.response.data.errors;
  }
};

// Method to handle file change
const handleFileChange = (event) => {
  file_pdf.value = event.target.files[0];
};
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h3 class="card-title">Tambah Surat</h3>
            <form @submit.prevent="storeSurat">
              <div class="mb-3">
                <label class="form-label fw-bold">Nomor Surat</label>
                <input type="text" class="form-control" v-model="nomor_surat" placeholder="Nomor Surat" required>
                <div v-if="errors.nomor_surat" class="alert alert-danger mt-2">
                  <span>{{ errors.nomor_surat[0] }}</span>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Kategori</label>
                <select class="form-select" v-model="selected_kategori" required>
                  <option v-for="kategori in kategoriOptions" :key="kategori.id_kategori" :value="kategori.id_kategori">
                    {{ kategori.nama_kategori }}
                  </option>
                </select>
                <div v-if="errors.kategori" class="alert alert-danger mt-2">
                  <span>{{ errors.kategori[0] }}</span>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Judul</label>
                <input type="text" class="form-control" v-model="judul" placeholder="Judul" required>
                <div v-if="errors.judul" class="alert alert-danger mt-2">
                  <span>{{ errors.judul[0] }}</span>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Upload File PDF</label>
                <input type="file" class="form-control" @change="handleFileChange">
                <div v-if="errors.file_pdf" class="alert alert-danger mt-2">
                  <span>{{ errors.file_pdf[0] }}</span>
                </div>
              </div>
              <router-link :to="{ name: 'surat.dashboard' }" class="btn btn-md btn-primary rounded-sm shadow border-0 me-2" ><< Kembali</router-link>
              <button type="submit" class="btn btn-md btn-primary rounded-sm shadow border-0">Simpan</button>
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
