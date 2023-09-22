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
                <v-btn icon @click="editClick(post)" class="mr-2">
                  <v-icon color="blue">mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon @click="deleteClick(post.id)">
                  <v-icon color="red">mdi-delete</v-icon>
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
                <v-card-actions>
                  <v-btn color="blue" @click="saveEdit(post.id)">Save</v-btn>
                  <v-btn color="red" @click="cancelEdit">Cancel</v-btn>
                </v-card-actions>
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
    if (!localStorage.getItem("access_token")) {
      this.$router.push("/");
    }
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
    async editClick(post) {
      this.editPost = post;
      this.isEditPopupVisible = true;
    },
    navigateToProductDetail(postId, postTitle, postDescription) {
      this.$router.push({
        name: "SinglePost",
        params: { id: postId, title: postTitle, description: postDescription },
      });
    },

    async deleteClick(id) {
      const token = localStorage.getItem("access_token");

      axios

        .delete(`http://10.0.10.211:3300/api/deletepost/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        .then((response) => {
          // Handle the successful deletion

          console.log("Item deleted successfully.");

          console.log(response.data);

          // Remove the deleted post from the 'posts' array

          this.posts = this.posts.filter((post) => post.id !== id);
        })

        .catch((error) => {
          // Handle the error

          console.error("Error deleting item:", error);
        });
    },
    cancelEdit() {
      this.isEditPopupVisible = false;
      // this.editPost = null;
    },
    async saveEdit(id) {
      this.isEditPopupVisible = false;
      const response = await axios.post(
        `http://10.0.10.211:3300/api/editpost/${id}`,
        { title: this.editPost.title, description: this.editPost.description },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      console.log(response);
    },
  },
};
</script>
