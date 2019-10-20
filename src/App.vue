<template>
  <div id="app">
    <Navbar />
    <!-- <router-link to="/">Home</router-link> | -->
    <!-- <router-link to="/login">Login</router-link> -->
    <router-view />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style></style>
