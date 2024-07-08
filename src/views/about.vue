<template>
    <h3 style="font-weight: bold; margin-top: 50px;">ABOUT</h3>
    <div class="center-wrapper">
      <div class="container">
        <div class="image">
          <img :src="imageSrc" alt="Profile Image" />
        </div>
        <div class="details">
          <p>Aplikasi ini dibuat oleh :</p>
          <p><strong>Nama    :</strong> {{ name }}</p>
          <p><strong>Prodi   :</strong> {{ prodi }}</p>
          <p><strong>NIM     :</strong> {{ nim }}</p>
          <p><strong>Tanggal :</strong> {{ tanggal }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import imageSrc from '../images/mancing-perkoro.jpeg'; // Gunakan path relatif dari lokasi komponen ini
  
  export default {
    data() {
      return {
        imageSrc,
        name: 'Dian Wahyu Aditiya Pratama',
        prodi: 'D3 Manajemen Informatika',
        nim: '2231730065',
        tanggal: '10 Juli 2024'
      };
    }
  };
  </script>
  
  <style scoped>
  .center-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    height: 85vh;
    margin-top: 20px;
    margin-left: -10px;
  }
  
  .container {
    display: flex;
    align-items: flex-start;
  }
  
  .image img {
    width: 185px; /* Ganti ukuran sesuai kebutuhan */
    height: auto;
    margin-right: 20px;
  }
  
  .details {
    display: flex;
    flex-direction: column;
  }
  </style>
  