<template>
  <div class="d-flex">
    <nav class="sidebar custom-sidebar">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link :to="{ name: 'surat.dashboard' }" class="nav-link active" style="font-weight: bold; margin-left: 0px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="icon">
              <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
              <path fill-rule="evenodd" d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087Zm6.163 3.75A.75.75 0 0 1 10 12h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
            </svg>
            <span>ARSIP</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'posts.index' }" class="nav-link active" aria-current="page" style="font-weight: bold; margin-left: 0px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="icon">
              <path fill-rule="evenodd" d="M5.25 2.25a3 3 0 0 0-3 3v4.318a3 3 0 0 0 .879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 0 0 5.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 0 0-2.122-.879H5.25ZM6.375 7.5a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z" clip-rule="evenodd" />
            </svg>
            <span>KATEGORI SURAT</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'about' }" class="nav-link active" aria-current="page" style="font-weight: bold; margin-left: 0px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="icon">
              <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
            </svg>
            <span>ABOUT</span>
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- Main content area -->
    <div class="content-area">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

:root {
  --color-default: #004f83;
  --color-second: #0067ac;
  --color-white: #fff;
  --color-body: #e4e9f7;
  --color-light: #e0e0e0;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

body {
  min-height: 100vh;
}

.d-flex {
  display: flex;
}

.custom-sidebar {
  width: 200px; /* Lebar sidebar */
  height: 100vh; /* Tinggi penuh */
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgb(14, 199, 106); /* Warna sidebar */
  padding-top: 20px;
  z-index: 1000;
}

.content-area {
  margin-left: 215px; /* Sesuaikan dengan lebar sidebar */
  padding-left: 15px;
  padding-right: 15px;
  width: calc(100% - 250px); /* Kurangi lebar sidebar */
}

.nav-link {
  display: flex;
  align-items: center;
  font-size: small;
  font-weight: bold;
  color: var(--color-white); /* Change text color to white */
  padding: 10px; /* Atur padding */
  transition: background-color 0.5s ease, color 0.5s ease;
  width: 100%;
  text-decoration: none;
  position: relative; /* Necessary for the pseudo-element */
}

.nav-link.active {
  color: var(--color-white);
}

.nav-link::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  transform: scaleX(0);
  background-color: white; /* Warna hover untuk teks dan ikon */
  transition: transform 0.3s ease-in-out;
  transform-origin: left;
  z-index: -1; /* Ensure it is behind the text */
}

.nav-link:hover::after {
  transform: scaleX(1);
}

.nav-link:hover span {
  color: rgb(14, 199, 106); /* Warna teks saat hover */
}

.nav-link:hover .icon {
  fill: rgb(14, 199, 106); /* Warna ikon saat hover */
}

.icon {
  width: 24px; /* Atur lebar ikon */
  height: 24px; /* Atur tinggi ikon */
  margin-right: 15px; /* Sesuaikan jarak antara ikon dan teks */
  fill: white; /* Change icon color to white */
  transition: fill 0.3s ease; /* Transisi warna ikon */
}

span {
  color: white; /* Change text color to white */
  transition: color 0.3s ease; /* Transisi warna teks */
}
</style>

