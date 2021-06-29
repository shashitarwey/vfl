<template>
  <div id="app">
    <AppNavbar />
    <div class="container">
      <router-view></router-view>
    </div>
</div>
</template>

<script>
import AppNavbar from '@/components/AppNavbar';
import { store } from '@/store/index';

export default {
  name: 'App',
  components: {
    AppNavbar
  },
  mounted() {
    store.commit( 'updateCartFromLocalStorage' );
  }
}
</script>

<style>

</style>
