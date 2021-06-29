<template>
    <div>
        <div class="header">
            <h2>Add Product</h2>
        </div>
        <div class="wrapper">
            <form method="POST" enctype="multipart/form-data" @submit.prevent="upload">
                <label for="name">Name <span class="isrequired">*</span></label>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Product Name" 
                    v-model= "form.name"
                    @blur = "$v.form.name.$touch()"
                    :class = "{
                    'is-invalid' : shouldAppendErrorClass($v.form.name),
                    'is-valid'   : shouldAppendValidClass($v.form.name)
                    }"
                >
                <div class="form-text text-muted" v-if = "$v.form.name.$error">
                <div v-if = "!$v.form.name.required">
                    <small class="text-danger mb-2">Name is required</small>
                </div>
                </div>
                <label for="price">Price <span class="isrequired">*</span></label>
                <input 
                    type="number" 
                    name="price" 
                    placeholder="Price" 
                    v-model= "form.price"
                    @blur = "$v.form.price.$touch()"
                    :class = "{
                    'is-invalid' : shouldAppendErrorClass($v.form.price),
                    'is-valid'   : shouldAppendValidClass($v.form.price)
                }"
                >
                <div class="form-text text-muted" v-if = "$v.form.price.$error">
                <div v-if = "!$v.form.price.required">
                    <small class="text-danger mb-2">Price is required</small>
                </div>
                </div>
                <label for="quantity">Quantity <span class="isrequired">*</span></label>
                <input 
                    type="number" 
                    name="quantity" 
                    placeholder="Quantity"
                    v-model= "form.quantity"
                    @blur = "$v.form.quantity.$touch()"
                    :class = "{
                    'is-invalid' : shouldAppendErrorClass($v.form.quantity),
                    'is-valid'   : shouldAppendValidClass($v.form.quantity)
                    }"
                >
                <div class="form-text text-muted" v-if = "$v.form.quantity.$error">
                <div v-if = "!$v.form.quantity.required">
                    <small class="text-danger mb-2">Quantity is required</small>
                </div>
                </div>
                <label for="file">Product Image</label>
                 <input 
                    type="file" 
                    name="file"
                >
                <div>
                    <small><span class="isrequired">*</span> marked fields are required</small>
                </div>
                <div>
                    <button class="btn btn-primary w-100 my-2">Upload</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { postProduct } from '@/services/product';
import { required } from 'vuelidate/lib/validators';
export default {
    name: "AddProduct",
    data() {
        return {
            form: {
                name:'',
                price:0,
                quantity:0,
                //imageUrl:''
            }
        }
    },
    validations: {
        form: {
            name: {
                required
            },
            price: {
                required
            },
            quantity: {
                required
            }
        }    
    },
    methods: {
        shouldAppendValidClass( field ){
            return !field.invalid && field.$model && field.$dirty;
        },
        shouldAppendErrorClass( field ){
            return field.$error;
        },
        upload() {
            this.$v.form.$touch();
            if ( !this.$v.form.$invalid )
            {
            postProduct({ name: this.form.name, price: this.form.price, quantity: this.form.quantity/*imageUrl: this.form.imageUrl*/ })
                .then( () => {
                    Vue.$toast.success( 
                        'Product Added Succesfully',
                        {
                            timeout: 3000
                        });
                        this.$router.push( { name: 'product' } )
                })
                .catch( error => {
                    Vue.$toast.error(
                        `${error.response.data.message}`,
                        {
                            timeout: 3000
                        });
                });
            } else {
                Vue.$toast.error(
                    `Invalid Input`,
                    {
                        timeout: 3000
                    });
            }
        },
    }
}
</script>

<style scoped>
*{
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
}
body{
    background: #f1f1f2;
    padding: 0;
    font-family: sans-serif;
}
.wrapper {
    border: 1px solid grey;
    max-width: 600px;
    margin: auto ;
    padding: 10px;
    font-size: 18px;
    font-weight: bold;
}
.header {
    background: #4180c5;
    text-align: center;
    max-width: 600px;
    color: aliceblue;
    padding: 10px;
    margin: auto;
    border: 1px solid gray;
    border-bottom: none;
}
.header h2 {
    margin: 0;
    padding: 15px;
}
form {
    margin-top: 15px;
}
input[type=text],input[type=number],input[type=file] {
    margin-bottom: 20px;
    margin-top: 10px;
    width: 100%;
    padding: 15px;
    border-radius: 5px;
    border: 1px solid #7ac9b7;
    font-size: 15px;
}
.isrequired {
    color: red
}

</style>