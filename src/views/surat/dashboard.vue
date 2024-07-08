<script setup>
import { ref, computed, onMounted } from 'vue';
import api from '../../api';

// State for storing posts
const posts = ref([]);
const categories = ref([]);
const searchQuery = ref(''); // State for search query
const tempSearchQuery = ref(''); // Temporary state for holding input value

// Function to fetch posts from the API
const fetchDataPosts = async () => {
  try {
    const response = await api.get('/api/arsip');
    console.log(response); // Log the response to inspect its structure
    posts.value = response.data.data.data; // Adjust based on the actual response structure
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};

// Function to delete a post
const deletePost = async (nomor_surat) => {
  if (confirm("Apakah anda ingin menghapus data ini?")) {
    try {
      await api.delete(`/api/arsip/${nomor_surat}`);
      // Remove the deleted post from the posts array
      posts.value = posts.value.filter(post => post.nomor_surat !== nomor_surat);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  }
};

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


// Computed property to filter posts based on search query
const filteredPosts = computed(() => {
  if (!searchQuery.value) {
    return posts.value;
  }
  return posts.value.filter(post => 
    post.judul.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Method to handle the search button click
const handleSearch = () => {
  searchQuery.value = tempSearchQuery.value;
};

// Run hook "onMounted"
onMounted(() => {
  fetchDataPosts();
});
</script>

<template>
  <div class="container mt-5 mb-5">
    <div class="row">
      <h3 style="font-weight: bold;">Arsip Surat</h3>
      <p>Berikut ini merupakan surat - surat yang sudah terbit dan diarsipkan. Klik "Lihat" untuk menampilkan surat</p>

      <div class="col-md-6 mb-3">
        <router-link :to="{ name: 'surat.tambah' }" class="btn btn-md btn-success rounded shadow border-0">TAMBAH SURAT</router-link>
      </div>

      <div class="col-md-6 mb-3">
        <!-- Search Bar -->
        <div class="d-flex justify-content-end">
          <input 
            v-model="tempSearchQuery"
            type="text"
            class="form-control"
            placeholder="Cari berdasarkan judul" 
          />
          <button @click="handleSearch" class="btn btn-primary" style="margin-left: 10px;">CARI</button>
        </div>
      </div>

      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <table class="table table-bordered">
              <thead class="bg-dark text-white text-center">
                <tr>
                  <th scope="col" style="width:10%">Nomor Surat</th>
                  <th scope="col" style="width:15%">Kategori</th>
                  <th scope="col" style="width:30%">Judul</th>
                  <th scope="col" style="width:15%">Waktu Pengarsipan</th>
                  <th scope="col" style="width:20%">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="filteredPosts.length === 0">
                  <td colspan="5" class="text-center">
                    <div class="alert alert-danger mb-0">
                      Data Belum Tersedia!
                    </div>
                  </td>
                </tr>
                <tr v-else v-for="(post, index) in filteredPosts" :key="index">
                  <td class="text-center">{{ post.nomor_surat }}</td>
                  <td>{{ post.nama_kategori }}</td>
                  <td>{{ post.judul }}</td>
                  <td>{{ post.created_at }}</td>
                  <td class="text-center">
                    <router-link :to="{ name: 'surat.lihat', params: { id: post.nomor_surat } }" class="btn btn-sm btn-primary rounded-sm shadow border-0 me-2">LIHAT</router-link>
                    <button @click="deletePost(post.nomor_surat)" class="btn btn-sm btn-danger rounded-sm shadow border-0" style="margin-right: 7px;">HAPUS</button>
                    <button @click="downloadPDF(post.nomor_surat)" class="btn btn-sm btn-secondary rounded-sm shadow border-0">DOWNLOAD</button>
                  </td>
                </tr>
              </tbody>
            </table>
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
