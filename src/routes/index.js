import { createRouter, createWebHistory } from 'vue-router'
import RegisterComponent from '../components/RegisterComponent.vue'
import AdminDashboard from '../components/AdminDashboard.vue'
import UserDashboard from '../components/UserDashboard.vue'
import LoginComponent from '../components/LoginComponent.vue'
import SinglePost from '../components/SinglePost.vue'
import AddPosts from '../components/AddPosts.vue'
import AllPosts from '../components/AllPosts.vue'
import AllPostsUser from '../components/AllPostsUser.vue'
import AllUsers from '../components/AllUsers.vue'
const routes = [
    {
        path: "/register",
        name: "Register_Component",
        component: RegisterComponent,

    },

    {
        name: "SinglePost",
        path: "/SinglePost/:id/:title/:description",
        component: SinglePost,
        props: true,
    },
    {
        path: "/addpost",
        name: "AddPosts",
        component: AddPosts,

    },
    {
        path: "/",
        name: "LoginComponent",
        component: LoginComponent,

    },

    {
        path: "/userDashboard",
        name: "UserDashboard",
        component: UserDashboard,
        children:
            [
                {
                    path: "addpost",
                    name: "AddPosts",
                    component: AddPosts

                },
                {
                    path: "allpostsuser",
                    name: "AllPostsUser",
                    component: AllPostsUser
                },
            ]
    }, {
        path: "/adminDashboard",
        name: "AdminDashboard",
        component: AdminDashboard,
        children:
            [
                {
                    path: "allUsers",
                    name: "AllUsers",
                    component: AllUsers

                },
                {
                    path: "allposts",
                    name: "AllPosts",
                    component: AllPosts
                },
            ]
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
