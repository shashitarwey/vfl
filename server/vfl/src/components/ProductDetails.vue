<template>
    <div class="d-flex food-details-outer">
        <div class="food-details">
            <div class="container mb-5">
                <h4 class="my-4 fw-600">Add Item to Cart</h4>
                <div class="row">
                    <div class="col-md-4 cursor">
                        <img src="../assets/Vegetables/vegetables.jpg" alt="" width="300px" height="300px" style="border-radius: 15px">
                    </div>
                    <div class="col-md-4 cursor">
                       <h5 class="my-4 fw-600">Name: {{product.name}}</h5>
                       <h5 class="my-4 fw-600">Price: {{product.price}}</h5>
                       <div v-if=" role === 'admin' ">
                           <button class="btn btn-danger" v-on:click="remove"> Remove Product</button>
                       </div>
                       <div v-else>
                           <button class="btn btn-success" v-on:click="addToCart">Add to Cart</button>
                           <button class="btn btn-danger ml-2" v-on:click="removeItem">Remove From Cart</button>
                       </div>
                       
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { getProductbyId } from '@/services/product';
import { removeProductbyId } from '@/services/product';
export default {
    name: "ProductDetails",
    data() {
        return {
            status: 'LOADING',
            product: '',
            error: null
        }
    },
    computed: {
        role() {
           return this.$store.state.auth.userType;
      }
    },
    created() { 
        this.status = 'LOADING';
       
        const id = this.$route.params.id;
        getProductbyId( id )
            .then( product => {
                //console.log(product);
                this.product = product;
                this.status = 'LOADED';
            })
            .catch( error => {
                this.error = error;
                this.status = 'ERROR';
            });
    },
    methods: {
        addToCart() {
            this.$store.dispatch( "addToCart", this.product )
        },
        removeItem() {
            this.$store.dispatch( "removeItem", this.product )
        },
        // remove() {
        //     removeProductbyId( id ) {

        //     }
        // }
        remove(){
            removeProductbyId( this.product._id )
            .then( () =>  {
                    this.$router.push( { name: 'home' } )  
                     Vue.$toast.open({
                        message: `Product has been successfully deleted`,
                        type: 'success'
                    });
                })
                .catch( error => {
                    Vue.$toast.open({
                        message: error.response.data.message,
                        type: 'error'
                    });
                });
        }
    }
   
}
</script>

<style scoped>
.food-details-outer {
    flex-direction: column;
    height: 100vh;
}
.food-details {
    background: #eeffee;
    flex: 1;
    overflow-y: auto;
}
.fw-600 {
    font-weight: 600;
}
.cursor {
    cursor: pointer;
}
.text-deco-none {
    text-decoration: none;
}
</style>