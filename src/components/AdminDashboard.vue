<template>
  <v-app>
    <AdminNavbar />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import AdminNavbar from "./AdminNavbar.vue";
export default {
  beforeMount() {
    if (!localStorage.getItem("access_token")) {
      this.$router.push("/");
    }
  },
  name: "App",
  components: {
    AdminNavbar,
  },
};
</script>
