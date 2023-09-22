<template>
  <VNavigationDrawer expand-on-hover rail>
    <VList density="compact" nav>
      <VListItem
        prepend-icon="mdi-account-group"
        value="Create Post"
        title="CreatePost"
        @click="createPost"
      />
      <VListItem
        prepend-icon="mdi-post"
        value="Posts"
        title="Posts"
        @click="postsClick"
      />
      <VListItem
        prepend-icon="mdi-post"
        value="My Post"
        title="My Post"
        @click="myPosts"
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
    createPost() {
      this.$router.push("/userdashboard/addpost");
    },
    postsClick() {
      this.$router.push("/userdashboard/allpostsuser");
    },
    myPosts() {
      this.$router.push("/userdashboard/myPosts");
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
