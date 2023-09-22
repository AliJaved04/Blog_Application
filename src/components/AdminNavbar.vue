<template>
  <VNavigationDrawer expand-on-hover rail>
    <VList density="compact" nav>
      <VListItem
        prepend-icon="mdi-account-group"
        value="View All Users"
        title="View All Users"
        @click="usersClick"
      />
      <VListItem
        prepend-icon="mdi-post"
        value="Posts"
        title="Posts"
        @click="postsClick"
      />
      <VListItem
        prepend-icon="mdi-logout"
        value="Logout"
        title="Logout"
        @click="logout"
      />
    </VList>
  </VNavigationDrawer>
</template>

<script>
import axios from "axios";
export default {
  methods: {
    beforeMount() {
      if (!localStorage.getItem("access_token")) {
        this.$router.push("/");
      }
    },
    usersClick() {
      this.$router.push("/adminDashboard/allusers");
    },
    postsClick() {
      this.$router.push("/adminDashboard/allposts");
    },
    async logout() {
      const response = await axios.post(
        "http://10.0.10.211:3300/api/logout",
        { title: this.title, description: this.description },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      const data = await response.data;
      if (data.message === "Logout successful") {
        localStorage.removeItem("access_token");
        this.$router.push("/");
      } else {
        console.log("Cannot Logout");
      }
    },
  },
};
</script>
