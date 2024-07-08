//import vue router
import { createRouter, createWebHistory } from 'vue-router';

//define routes
const routes = [
    {
        path: '/',
        redirect: { name: 'surat.dashboard' }
    },
    {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '../views/home.vue')
    },
    {
        path: '/about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '../views/about.vue')
    },
    {
        path: '/posts',
        name: 'posts.index',
        component: () => import(/* webpackChunkName: "index" */ '../views/posts/index.vue')
    },
    {
        path: '/posts/create',
        name: 'posts.create',
        component: () => import(/* webpackChunkName: "create" */ '../views/posts/create.vue')
    },
    {
        path: '/posts/edit/:id',
        name: 'posts.edit',
        component: () => import(/* webpackChunkName: "edit" */ '../views/posts/edit.vue')
    },
    
    // New routes for 'surat' section
    {
        path: '/surat',
        name: 'surat.dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/surat/dashboard.vue')
    },
    {
        path: '/surat/tambah',
        name: 'surat.tambah',
        component: () => import(/* webpackChunkName: "tambah" */ '../views/surat/tambah.vue')
    },
    {
        path: '/surat/lihat/:id',
        name: 'surat.lihat',
        component: () => import(/* webpackChunkName: "lihat" */ '../views/surat/lihat.vue')
    },
    {
        path: '/surat/ubah/:id',
        name: 'surat.ubah',
        component: () => import(/* webpackChunkName: "ubah" */ '../views/surat/ubah.vue')
    }
];

//create router
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
