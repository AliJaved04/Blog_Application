<template>
  <v-container class="main mt-16">
    <p class="text-h4">Login Form</p>
    <v-sheet width="400">
      <v-form fast-fail @submit.prevent>
        <v-text-field
          v-model="email"
          outlined
          dense
          color="blue"
          :rules="emailRules"
          label="Email"
          class="mt-4"
        ></v-text-field>
        <v-text-field
          v-model="password"
          outlined
          dense
          color="blue"
          class="mt-4"
          :rules="passwordRules"
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
        >
        </v-text-field>
        <v-btn type="submit" @click="submitHandlerFetch" block class="mt-2"
          >Submit</v-btn
        >
        <div class="btnDiv">
          <h1 class="text-h6 mt-4">Are you not registered?</h1>
          <v-btn @click="goToSignUp" class="mt-4 ml-4">SignUp</v-btn>
        </div>
      </v-form>
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    password: "",
    email: "",
    showPassword: false,

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
  }),

  methods: {
    goToSignUp() {
      this.$router.push("/register");
    },
    async submitHandlerFetch() {
      if (!this.email || !this.password) {
        console.log("Fill all the fields");
      } else {
        const res = await fetch("http://10.0.10.211:3300/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        });

        if (res.ok) {
          const data = await res.json(); // Wait for the JSON promise to resolve
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("email", this.email);
          if (this.email === "admin@gmai.com") {
            this.$router.push("/adminDashboard");
          } else {
            this.$router.push("./userDashboard");
          }
        }
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

.btnDiv {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
