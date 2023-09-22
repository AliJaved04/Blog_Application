<template>
  <div class="single-post">
    <v-container>
      <v-card class="post-card" elevation="2">
        <v-card-title class="text-h6">{{ this.title }}</v-card-title>

        <v-card-text>{{ this.description }}</v-card-text>
      </v-card>

      <CommentComponent :propName="dataToPass" />
    </v-container>
  </div>
</template>

<script>
//import axios from "axios";

import CommentComponent from "./CommentComponent.vue";

export default {
  components: {
    CommentComponent,
  },

  //  http://10.0.10.211:3300/api/posts/1/comments

  data() {
    return {
      post: [],
      dataToPass: null,
      title: "",
      description: "",
    };
  },

  beforeMount() {
    const postId = this.$route.params.id; // Assuming the route parameter is named "id"
    const postTitle = this.$route.params.title;
    const postDescription = this.$route.params.description;
    this.dataToPass = postId;
    this.title = postTitle;
    this.description = postDescription;
  },
};
</script>

<style scoped>
.single-post {
  padding: 20px;
}

.post-card {
  margin-bottom: 20px;
}
</style>
