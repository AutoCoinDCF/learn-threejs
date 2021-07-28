<template>
  <div id="app">
    <hello-component msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import helloComponent from './components/helloThree';

export default {
  name: 'App',
  components: {
    helloComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
