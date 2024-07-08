<script setup>
import { ref, onMounted, computed } from 'vue';
import api from '../../api';

// State for storing posts
const posts = ref([]);
const searchQuery = ref(''); // State for search query
const tempSearchQuery = ref(''); // Temporary state for holding input value

// Function to fetch posts from the API
const fetchDataPosts = async () => {
  try {
    const response = await api.get('/api/kategori');
    console.log(response); // Log the response to inspect its structure
    posts.value = response.data.data.data; // Adjust based on the actual response structure
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}

// Run hook "onMounted"
onMounted(() => {
  // Call method "fetchDataPosts"
  fetchDataPosts();
});

// Computed property to filter posts based on search query
const filteredPosts = computed(() => {
  if (!searchQuery.value) {
    return posts.value;
  }
  return posts.value.filter(post => 
    post.nama_kategori.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Method deletePost with confirmation
const deletePost = async (id) => {
  if (window.confirm('Apakah Anda yakin ingin menghapus kategori ini?')) {
    // Delete post with API
    await api.delete(`/api/kategori/${id}`)
      .then(() => {
        // Call method "fetchDataPosts"
        fetchDataPosts();
      })
      .catch((error) => {
        console.error('Error deleting post:', error);
      });
  }
};

// Method to handle the search button click
const handleSearch = () => {
  searchQuery.value = tempSearchQuery.value.toLowerCase();
};
</script>

<template>
  <div class="container mt-5 mb-5">
    <div class="row">
      <h3 style="font-weight: bold;">Kategori Surat</h3>
      <p>Berikut merupakan kategori yang bisa digunakan untuk melabeli surat, klik "Tambah" untuk menambahkan kategori baru</p>

      <div class="col-md-6 mb-3">
        <router-link :to="{ name: 'posts.create' }" class="btn btn-md btn-success rounded shadow border-0">TAMBAH KATEGORI</router-link>
      </div>
      <div class="col-md-6 mb-3">
        <!-- Search Bar -->
        <div class="d-flex justify-content-end">
          <input type="text" class="form-control me-2" placeholder="cari berdasarkan nama" v-model="tempSearchQuery">
          <button @click="handleSearch" class="btn btn-primary">CARI</button>
        </div>
      </div>

      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <table class="table table-bordered">
              <thead class="bg-dark text-white text-center">
                <tr>
                  <th scope="col">ID Kategori</th>
                  <th scope="col">Nama Kategori</th>
                  <th scope="col">Keterangan</th>
                  <th scope="col" style="width:15%">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="posts.length === 0">
                  <td colspan="4" class="text-center">
                    <div class="alert alert-danger mb-0">
                      Data Belum Tersedia!
                    </div>
                  </td>
                </tr>
                <tr v-else v-for="(post, index) in filteredPosts" :key="index">
                  <td class="text-center">{{ post.id_kategori }}</td>
                  <td>{{ post.nama_kategori }}</td>
                  <td>{{ post.judul }}</td>
                  <td class="text-center">
                    <router-link :to="{ name: 'posts.edit', params:{id: post.id_kategori} }" class="btn btn-sm btn-primary rounded-sm shadow border-0 me-2">EDIT</router-link>
                    <button @click.prevent="deletePost(post.id_kategori)" class="btn btn-sm btn-danger rounded-sm shadow border-0">HAPUS</button>
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
