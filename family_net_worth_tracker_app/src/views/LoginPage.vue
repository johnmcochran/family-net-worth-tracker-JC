<!-- LoginPage.vue -->

<template>
  <div>
    <h2>Login</h2>
    <h3>Existing User</h3>
    <form @submit.prevent="login">
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="login_username" />

      <label for="password">Password:</label>
      <input type="password" id="password" v-model="login_password" />

      <button type="submit">Login</button>
    </form>
    <h3> New User</h3>
    <form @submit.prevent="create_user">
      <label for="create_username">Username:</label>
      <input type="text" id="create_username" v-model="create_username" />

      <label for="create_password">Password:</label>
      <input type="create_password" id="create_password" v-model="create_password" />

      <button type="submit">Create Account</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    login() {
      // Handle login logic here
      console.log('Login clicked with username:', this.login_username, 'and password:', this.login_password);
    },
    create_user() {
      console.log('Create Account clicked with username:', this.create_username, 'and password:', this.create_password);
    }
  },
};
</script>

<style scoped>
/* Component styles go here */
</style>