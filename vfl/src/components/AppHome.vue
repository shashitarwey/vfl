<template>
    <div class="wrapper">
        <div class="content">
            <div class="container mb-5">
                <h4 class="my-4 fw-600 d-blue text-center">Vegetables</h4>
                <div class="row">
                    <div v-for="item in items" :key="item._id" class="col-md-4 pointer">
                       <router-link :to="'/product/' + item._id">
                        <div>
                    <img src="../assets/Vegetables/vegetables.jpg" alt="" width="300px" height="300px">
                    <h5 class="fw-600 black text-center my-2">{{item.name}}</h5>
                        </div>
                       </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getProduct } from "@/services/product";
export default {
    name: 'AppProduct',
    data() {
        return {
            items : [],
            status: 'LOADING'
        }
    },
    created() { 
        this.status = 'LOADING';
        getProduct()
            .then( items => {
                this.items = items;
                this.status = 'LOADED'
            })
            .catch( error => {
                this.error = error;
                this.status = 'ERROR'
            });
    },

}
</script>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;
}
.content {
    background: #efe9e2;;
    flex: 1;
    overflow-y: auto;
}
.fw-600 {
    font-weight: 600;
}
.d-blue {
    color: dodgerblue;
}
.black  {
    color: black;
}
.pointer {
    cursor: pointer;
}
</style>