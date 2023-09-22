<template>
  <v-container class="main mt-16">
    <p class="text-h4">SignUp Form</p>
    <v-sheet width="400">
      <v-form fast-fail @submit.prevent>
        <v-text-field
          outlined
          dense
          color="blue"
          class="mt-10"
          label="Username"
          v-model="signUpData.username"
          :rules="usernameRules"
        ></v-text-field>
        <v-text-field
          v-model="signUpData.email"
          outlined
          dense
          color="blue"
          :rules="emailRules"
          label="Email"
          class="mt-4"
        ></v-text-field>
        <v-text-field
          v-model="signUpData.password"
          outlined
          dense
          color="blue"
          autocomplete
          class="mt-4"
          :rules="passwordRules"
          label="Password"
          ref="myPass"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
        >
        </v-text-field>
        <v-text-field
          v-model="signUpData.confirmPassword"
          outlined
          dense
          color="blue"
          class="mt-4"
          autocomplete
          :rules="confirmPasswordRules"
          label="Confirm Password"
          :type="showConfirmPassword ? 'text' : 'password'"
          :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showConfirmPassword = !showConfirmPassword"
        >
        </v-text-field>
        <v-btn type="submit" @click="submitHandler" block class="mt-2"
          >Submit</v-btn
        >
      </v-form>
    </v-sheet>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      signUpData: {
        username: "",
        password: "",
        email: "",
      },
      showPassword: false,
      showConfirmPassword: false,

      usernameRules: [
        (value) => {
          if (value?.length > 3) return true;

          return "Username must be at least 3 characters";
        },
      ],
      confirmPasswordRules: [
        (value) => {
          if (value === this.signUpData.password) return true;

          return "Password and confirm password are not same";
        },
      ],

      passwordRules: [
        (value) => {
          if (value?.length > 8) return true;

          return "Password must be at least 8 characters";
        },
      ],
      emailRules: [
        (value) => {
          if (/^[a-z0-9.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;

          return "Must be a valid e-mail.";
        },
      ],
    };
  },

  methods: {
    beforeMount() {
      if (!localStorage.getItem("access_token")) {
        this.$router.push("/");
      }
    },
    submitHandler() {
      if (
        !this.signUpData.email ||
        !this.signUpData.password ||
        !this.signUpData.username
      ) {
        console.log("Cannot Send");
      } else {
        fetch("http://10.0.10.211:3300/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: this.signUpData.username,
            email: this.signUpData.email,
            password: this.signUpData.password,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            this.$router.push("/");
          });
      }
    },
  },
};
</script>
<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
