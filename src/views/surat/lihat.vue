<script setup>
import { ref, onMounted } from 'vue';
import api from '../../api';
import { useRoute } from 'vue-router';
import VuePdfEmbed from 'vue-pdf-embed';

const route = useRoute();

const post = ref({});
const nomorSurat = ref("");
const kategoriSurat = ref("");
const judulSurat = ref("");
const pdfSurat = ref("");
const waktu = ref("");
const errors = ref([]);

// Function to download a PDF file
const downloadPDF = async (nomor_surat) => {
  try {
    const timestamp = new Date().getTime(); // Generate a timestamp
    const response = await api.get(`/api/arsip/${nomor_surat}/download?timestamp=${timestamp}`, {
      responseType: 'blob'
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${nomor_surat}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading PDF:', error);
  }
};

onMounted(async () => {
  try {
    const response = await api.get(`/api/arsip/${route.params.id}`);
    post.value = response.data.data;
    nomorSurat.value = response.data.data.nomor_surat;
    kategoriSurat.value = response.data.data.nama_kategori;
    judulSurat.value = response.data.data.judul;
    pdfSurat.value = response.data.data.tampilPdf;
    waktu.value = response.data.data.created_at;
  } catch (error) {
    console.error("Error fetching category:", error);
  }
});
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h3 class="card-title">Detail Surat</h3>
            <div class="mb-3 row">
              <label class="col-sm-3 col-form-label fw-bold">Nomor Surat :</label>
              <div class="col-sm-9">
                <p class="form-control-plaintext">{{ nomorSurat }}</p>
              </div>
            </div>
            <div class="mb-3 row">
              <label class="col-sm-3 col-form-label fw-bold">Kategori :</label>
              <div class="col-sm-9">
                <p class="form-control-plaintext">{{ kategoriSurat }}</p>
              </div>
            </div>
            <div class="mb-3 row">
              <label class="col-sm-3 col-form-label fw-bold">Judul :</label>
              <div class="col-sm-9">
                <p class="form-control-plaintext">{{ judulSurat }}</p>
              </div>
            </div>
            <div class="mb-3 row">
              <label class="col-sm-3 col-form-label fw-bold">Waktu Unggah :</label>
              <div class="col-sm-9">
                <p class="form-control-plaintext">{{ waktu }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-4" v-if="pdfSurat">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h3 class="card-title">File PDF</h3>
            <div class="pdf-container">
              <VuePdfEmbed :source="pdfSurat" style="width: 100%; height: 100%;" /> 
            </div>            
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-4" v-else>
      <div class="col-md-12">
        <div class="alert alert-warning" role="alert">
          File PDF tidak tersedia.
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-12">
        <div class="d-flex">
        <router-link :to="{ name: 'surat.dashboard' }" class="btn btn-md btn-primary rounded-sm shadow border-0 me-2" style="margin-bottom: 25px;"><< Kembali</router-link>
        <router-link :to="{ name: 'surat.ubah', params: { id: route.params.id } }" class="btn btn-md btn-warning rounded-sm shadow border-0 me-2" style="margin-bottom: 25px;">Ubah</router-link>
        <button @click="downloadPDF(nomorSurat)" class="btn btn-sm btn-secondary rounded-sm shadow border-0" style="margin-bottom: 25px;">DOWNLOAD</button>
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

.card-body {
  padding: 1rem;
}

.card-title {
  margin-bottom: 0.5rem;
}

.form-label {
  margin-bottom: 0.25rem;
}

.form-control-plaintext {
  margin-bottom: 0.25rem;
}

.mb-3.row {
  margin-bottom: 0.25rem;
}

p {
  margin-bottom: 0.25rem;
}

.col-form-label {
  padding-right: 0.5rem;
}

.col-sm-9 {
  padding-left: 0.5rem;
}

.card {
  margin-bottom: 1rem;
}

.pdf-container {
  height: 500px;
  overflow: scroll;
}

.container {
  margin-top: 1rem;
}
</style>
