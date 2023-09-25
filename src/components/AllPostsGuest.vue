<template>
  <div class="post-list">
    <v-container>
      <v-row>
        <v-col v-for="post in posts" :key="post.id" cols="12" md="6" lg="4">
          <v-card class="post-card" elevation="2">
            <v-card-title class="text-h6">{{ post.title }}</v-card-title>
            <v-card-text>{{ post.description }}</v-card-text>
            <div style="margin: 20px">
              <v-row justify="end">
                <v-btn
                  @click="
                    navigateToProductDetail(
                      post.id,

                      post.description,

                      post.title
                    )
                  "
                >
                  Details
                </v-btn>
              </v-row>
            </div>
            <v-dialog v-model="isEditPopupVisible" max-width="600">
              <v-card>
                <v-card-title>Edit Post</v-card-title>
                <v-card-text>
                  <v-text-field
                    v-model="editPost.title"
                    label="Title"
                  ></v-text-field>
                  <v-textarea
                    v-model="editPost.description"
                    label="Description"
                  ></v-textarea>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  async beforeMount() {
    const value = await axios.get("http://10.0.10.211:3300/api/posts");
    this.posts = value.data.data;
  },

  data() {
    return {
      posts: [],
      editPost: null,
      isEditPopupVisible: false,
    };
  },
  methods: {
    navigateToProductDetail(postId, postTitle, postDescription) {
      this.$router.push({
        name: "SinglePost",
        params: { id: postId, title: postTitle, description: postDescription },
      });
    },
  },
};
</script>
