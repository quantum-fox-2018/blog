<template>
  <div class="login">
    <h3>Login: </h3>
    <form>
      <div class="form-group">
        <label for="email" class="labelRegis">Email:</label>
        <input type="email" class="form-control" id="email" v-model="email">
      </div>
      <div class="form-group">
        <label for="pwd" class="labelRegis">Password:</label>
        <input type="password" class="form-control" id="pwd" v-model="password">
      </div>
      <button type="button" class="btn btn-default" @click="login">Login</button>
      <div class="toregister">
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginAdmin',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      if (this.email && this.password) {
        axios.post('http://35.197.139.113/login', {
        email: this.email,
        password: this.password
      })
        .then(response => {
          console.log(response);
          if(response.data.user.role === 'admin') {
            localStorage.setItem("token", response.data.token);
            this.password = ''
            this.password = ''
            this.$router.push('/admin-page');
          } else {
            alert('Bukan admin!')
          }
        })
        .catch(err => {
          alert(`Login failed!`)
          console.error(err);
        })
      } else {
        alert('enter email and password');
      }
    }
  },
  mounted: () => {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  text-align: left;
  font-family: Vivaldi, cursive;
  margin-bottom: 20px;
}

a {
    color: black;
}

.login {
  height: auto;
  max-width: 350px;
  margin: auto;
  border: 2px solid #000000;
  background-color: rgba(255,255,255,0.5);
  border-radius: 20px;
  padding: 20px;
}

.labelRegis {
  font-family: Vivaldi, cursive;
  float: left;
  font-weight: bold;
}

.toregister {
  margin-top: 10px;
}
</style>
