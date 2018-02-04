<template>
  <div id="app">
    <div id="bgd"></div>
    <header>  
      <div id="goBack" @click='goBack'>
      <i class="fa fa-chevron-left"></i>
        返回
      </div>
      <h4 id='title'>{{$route.name}}</h4>
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
html, body, h4 {
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: white;
  padding: 20px;
}
#bgd {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  background-image: url('./assets/background-img.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(5px);
}
#title {
  text-align: center;
}
#goBack {
  position: absolute;
  top: 20px;
  left: 20px;
  cursor: pointer;
}

</style>
