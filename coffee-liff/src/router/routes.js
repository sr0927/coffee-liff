import router from ".";

const routes = [
    {
        path: "/",
        name: "home",
        title: "首頁",
        component: () => import("@/views/home.vue"),
        beforeEach: (to, from) => {
            localStorage.setItem("isReload", false);
            //localStorage.removeItem("isReload");
            //localStorage.clear()
            return false
        }
    },
    {
        path: "/personal",
        name: "personal",
        title: "個人管理",
        component: () => import("@/views/personal.vue"),
        beforeEach: (to, from) => {
            localStorage.setItem("isReload", false);
            return false
        }
    },
    {
        path: "/brew",
        name: "brew",
        title: "沖煮",
        component: () => import("@/views/brew.vue"),
    },
    {
        path: "/machine",
        name: "machine",
        title: "機器管理",
        component: () => import("@/views/machine.vue"),
    },
    {
        path: "/temperature",
        name: "temperature",
        title: "水溫",
        component: () => import("@/views/temperature.vue"),
    }

];


export default routes;