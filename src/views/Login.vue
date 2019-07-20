/*
    @Todo
    - Add in browser's "required" attribute checker for input. Add it to signup view once done.
    - Apply the above directive to the contact view and contact modal too once done
*/

<template>
  <div class="login">
    <h3>Glad to have you back :)</h3>
    <input v-autofocus type="text" v-model="email" placeholder="Email" required>
    <br>
    <input type="password" v-model="password" placeholder="Password" required>
    <p class="error">{{ error_msg }}</p>
    <button @click="login">Login</button>
    <p class="signup">
      Don't have an account yet? Hurry and
      <router-link to="/sign-up">create one now</router-link>!
    </p>
  </div>
</template>

<script>
import firebase from "firebase";

// Function to map and return a given err.code to a user friendly message
function error_msg(err) {
  switch (err.code) {
    case "auth/wrong-password":
      return "Invalid password or email.";
    case "auth/network-request-failed":
      return "Oops, please check your internet connection!";
    default:
      return "Ugh, something went wrong! Try again please?";
  }
}

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      error_msg: ""
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(usr => {
          // Extract the userID out from the user's email address
          const name = usr.user.email.split("@")[0];
          // Route to the user's home page, after login
          this.$router.replace({ name: "user-home", params: { user: name } });
        })
        .catch(err => {
          // @Debug Log the full error message from firebase for debug purposes only
          console.log(err.message);

          // Set the message into the error box to show user the error
          this.error_msg = error_msg(err);
        });
    }
  }
};
</script>

<style scoped>
.login {
  margin-top: 4em;
}

input {
  margin: 1em 0;
  width: 20%;
  padding: 1em;
}

button {
  margin-top: 1em;
  width: 10%;
  cursor: pointer;
}

.error {
  margin-top: 1em;
}

.signup {
  margin-top: 4em;
  font-size: 1em;
}

.signup a {
  text-decoration: underline;
  cursor: pointer;
}
</style>