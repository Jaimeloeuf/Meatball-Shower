/*  
    @Todo
*/

<template>
  <div class="sign-up">
    <h3>Let's create a new account!</h3>
    <input v-autofocus type="text" v-model="email" placeholder="Email">
    <br>
    <input type="password" v-model="password" placeholder="Password">
    <p class="error">{{ error_msg }}</p>
    <button @click="signUp">Sign Up</button>
    <span>
      or go back to
      <router-link to="/login">login</router-link>.
    </span>
  </div>
</template>

 <script>
import firebase from "firebase";

// Function to map and return a given err.code to a user friendly message
function error_msg(err) {
  switch (err.code) {
    case "auth/wrong-password":
      return "Invalid password or email.";
    case "auth/email-already-in-use":
      return "Email already in use, please log in instead. Reset password if you have forgotten it.";
    case "auth/network-request-failed":
      return "Oops, please check your internet connection!";
    default:
      return "Ugh, something went wrong! Try again please?";
  }
}

export default {
  name: "signUp",
  data() {
    return {
      email: "",
      password: "",
      error_msg: ""
    };
  },
  methods: {
    signUp: function() {
      // After signup, user will be automatically signed in, thus redirect to the notes view
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
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
.sign-up {
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

span {
  display: block;
  margin-top: 1em;
  font-size: 1em;
}
</style>