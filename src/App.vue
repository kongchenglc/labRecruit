<template>
  <div id="app">
    <div id="bgd"></div>

    <header>
      <div id="goBack" @click='goBack'>
        <i class="fa fa-chevron-left"></i>
        返回
      </div>

      <h4 id='title'>{{$route.name}}</h4>
      
      <router-link to="/admin_login">
        <i v-show="$route.name==='Log In'" id="adminlink" class="fa fa-user"></i>
      </router-link>
    </header>

    <transition name='slide-fade' mode="out-in">
      <router-view/>
    </transition>

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
  background-color: #2E2E2F;
  background-image: url('./assets/background-img.gif');
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: -150px;
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


.slide-fade-enter-active {
  transition: all .3s ease;
}

.slide-fade-leave-active {
  transition: all .2s linear;
}

.slide-fade-enter{
  transform: translateX(200px);
  opacity: 0;  
}
.slide-fade-leave-to
{
  transform: translateX(-200px);
  opacity: 0;
}



@media screen and (min-width: 600px) {
  #title {
    display: none;
  }
  #bgd {
    filter: blur(10px); 
    background-position-x: 0;
  }
}
</style>
