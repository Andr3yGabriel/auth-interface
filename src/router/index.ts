import { createRouter, createWebHistory } from "vue-router";
import ChangePassword from "../pages/ChangePassword.vue";
import ListUsers from "../pages/ListUsers.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";


const routes = [
    {
        path: '/',
        name: 'Register',
        component: Register
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/changePassword',
        name: 'ChangePassword',
        component: ChangePassword
    },
    {
        path: '/list',
        name: 'List',
        component: ListUsers
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;