import { createRouter, createWebHistory } from "vue-router";
import JWT from "@/scripts/jwt";
import Main from "@/views/Main.vue";
import Register from "@/views/Register.vue";
import User from "../views/User.vue";
import ChatBox from "../views/Chats.vue";
import Activate from "@/views/Activate.vue";
import Login from "@/views/Login.vue";
import Self from "@/views/Self.vue";
import ChatView from "@/views/ChatView.vue";
import Edit from "@/views/Edit.vue";
import ActivateEmailChange from "@/views/ActivateEmailChange.vue";
import CreateChat from "@/views/CreateChat.vue";

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
    children: [
      {
        path: "/",
        name: "Self",
        component: Self,
      },
      {
        path: "/edit",
        name: "Edit",
        component: Edit,
      },
      {
        path: "/activate/change",
        name: "ActivateEmailChange",
        component: ActivateEmailChange,
      },
      {
        path: "/user/:id",
        name: "User",
        component: User,
      },
      {
        path: "/chat",
        name: "ChatView",
        component: ChatBox,
        children: [
          {
            path: "/chat/:id",
            name: "ChatID",
            component: ChatView,
          },
          {
            path: "/chat/create",
            name: "CreateChat",
            component: CreateChat,
          },
        ],
      },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/activate",
    name: "Activate",
    component: Activate,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!JWT.isLogged()) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
