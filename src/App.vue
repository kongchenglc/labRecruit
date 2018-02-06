<template>
  <div id="app">
    <div id="bgd"></div>
    <header>
      <div id="goBack" @click='goBack'>
        <i class="fa fa-chevron-left"></i>
        返回
      </div>
      <h4 id='title'>{{$route.name}}</h4>
      <router-link id="adminlink" to="/signin"><i class="fa fa-user"></i></router-link>
    </header>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #fff;
  text-shadow: 0 1px 4px rgba(0, 0, 0, .5);
  padding: 20px;
}

#bgd {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  background-image: url('./assets/background-img.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(7px);
}

#title {
  text-align: center;
  margin: 0;
}

#goBack {
  position: absolute;
  top: 20px;
  left: 20px;
  cursor: pointer;
}

#adminlink {
  text-decoration: none;
  position: absolute;
  top: 20px;
  right: 25px;
  color: #eee;
}


@media screen and (min-width: 600px) {
  #title {
    display: none;
  }
  #bgd {
    filter: blur(10px);
  }
}
</style>
