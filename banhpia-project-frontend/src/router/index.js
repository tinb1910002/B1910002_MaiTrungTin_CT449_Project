import { createWebHistory, createRouter } from "vue-router";
import ProductBook from "@/views/ProductAdmin.vue";
import LoginPage from "../components/Login.vue";
import RegisterPage from "../components/Register.vue";
import HomePage from "../components/Home.vue";
import IntroducePage from "../components/Introduce.vue";
import ShoppingCart from "../components/ShoppingCart.vue"


const routes = [
    {
        path: "/home",
        name: "HomePage",
        component: HomePage,
        props: true
    },
    {
        path: "/product",
        name: "ProductPage",
        component: () => import("@/views/ProductScreen.vue"),
    },
    
    {
        path: "/introduce",
        name: "IntroducePage",
        component: IntroducePage,
        props: true
    },
    {
        path: "/shopping_cart",
        name: "ShoppingCart",
        component: ShoppingCart,
        props: true
    },

    {
        path: "/admin",
        name: "productbook",
        component: ProductBook,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
    {
        path: "/products/:id",
        name: "product.edit",
        component: () => import("@/views/ProductsEdit.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/products/",
        name: "product.add",
        component: () => import("@/views/ProductsEdit.vue"),
        props: true
    },
    {
        path: "/",
        name: "LoginPage",
        component: LoginPage,
        props: true
    },
    {
        path: "/register",
        name: "RegisterPage",
        component: RegisterPage,
        props: true
    },
    
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
