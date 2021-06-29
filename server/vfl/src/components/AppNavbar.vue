<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark static-top">
  <div class="container">
    <div class="navbar-brand">
          <div class="ml-3">VFL</div>  
    </div>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
    <div class="collapse navbar-collapse" id="navbarResponsive">
      <ul class="navbar-nav ml-auto text-center mr-2">
        <li class="nav-item">
          <router-link class="nav-link" to="/" >Home</router-link>
        </li>
         <li class="nav-item" v-if= "role === 'admin'">
          <router-link class="nav-link" to="/add-product" >Add Product</router-link>
        </li>
        <li class="nav-item mr-2" v-if=" role !== 'admin' ">
             <router-link to='/cart'><img src="https://i.ibb.co/PNjjx3y/cart.png" alt="" width="30px" height="30px" class="ml-1" /></router-link>
             <span class="cart-count">{{cartSize}}</span>
        </li>
        <template v-if="isAuthenticated">
          <li class="nav-item">
            <span class="nav-link ml-2 cursor" @click="logout()" >Logout</span>
          </li>
        </template>
        <template v-else>
          <li class="nav-item">
          <router-link class="nav-link ml-2" to='/login'>Login</router-link>
          </li>
        </template>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
export default {
    name: 'AppNavbar',
    computed: {
      cartSize(){
        return this.$store.getters.cartSize;
      },
      email() {
        return this.$store.state.auth.email;
      },
      isAuthenticated() {
        return this.$store.getters.isAuthenticated;
      },
      role() {
           return this.$store.state.auth.userType;
      }

    },
    methods: {
      logout() {
        this.$store.dispatch( 'logout' )
            .then( () => this.$router.push( { name: 'login' } ) );
      }
    }
};
</script>

<style scoped>
.cart-count{
  font-size: 15px;
  color: #d4570cf2;
  padding: 0 5px;
  margin-left: -35px;
  background: white;
  height: 20px;
  border-radius: 50%;
  width:20px;
}
.cursor {
  cursor: pointer;
}
</style>