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
      login_username: '',
      login_password: '',
      create_username: '',
      create_password: '',
    };
  },
  methods: {
    async login() {
      // Handle login logic here
      console.log('Login clicked with username:', this.login_username, 'and password:', this.login_password);
      
      try {
        const response = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.login_username,
            password: this.login_password
          }),
        });

        const response_message = this.parseLoginResponse(response)
        alert(response_message)
      }
      catch (error) {
        console.error('Error logging in: ', error);
        alert('An error occurred while attempting to log in.');
      }     
    
    },
    parseLoginResponse(response) {
      switch (response.status) {
        case 200:
          return 'Login Successful.';
        case 401:
          return 'Username or password is incorrect. Please try again.';
        case 500:
          return 'An error occurred on the server';
        default:
          return 'Unexpected error occurred';
      }
    },
    async create_user() {
      console.log('Create Account clicked with username:', this.create_username, 'and password:', this.create_password);
      
      try {
        const response = await fetch('http://localhost:3000/api/createuser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.create_username,
            password: this.create_password
          }),
        });

        const response_message = this.parseCreateUserResponse(response)
        alert(response_message)
      }
      catch (error) {
        console.error('Error creating user: ', error);
        alert('An error occurred while creating the user');
      }     
    },
    parseCreateUserResponse(response) {
      switch (response.status) {
        case 201:
          return 'User created successfully';
        case 400:
          return 'User already exists, please think of another username and try again';
        case 500:
          return 'An error occurred on the server';
        default:
          return 'Unexpected error occurred';
      }
    },

    // forgot_password() {}
  },
};
</script>

<style scoped>
/* Component styles go here */
</style>