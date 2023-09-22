<template>
  <v-sheet width="1100" class="mx-auto">
    <v-form @submit.prevent>
      <v-textarea
        v-model="comment"
        :rules="rules"
        label="Write Comment"
      ></v-textarea>

      <v-btn
        style="background-color: black; color: white"
        type="submit"
        block
        class="mt-2"
        @click="submitHandlerAxios"
        >Submit</v-btn
      >
    </v-form>
  </v-sheet>
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
    async submitHandlerAxios() {
      const response = await axios.post(
        "http://10.0.10.211:3300/api/create/comment",

        {
          comment: this.comment,

          post_id: this.propName,

          id: 0,
        },

        {
          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      console.log(response.data);
    },
  },

  props: {
    propName: Number,
  },

  data: () => ({
    comment: "",

    rules: [
      (value) => {
        if (value) return true;

        return "You must enter a comment.";
      },
    ],
  }),
};
</script>
