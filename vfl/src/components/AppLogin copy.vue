<template>
    <div class="jumbotron container my-5 w-75">
        <h2 class="text-center mb-4">Login</h2>
        <hr/>
        <form method="POST" @submit.prevent="login">
        <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input 
                type="email"   
                class="form-control" 
                id="exampleInputEmail1" 
                aria-describedby="emailHelp" 
                placeholder="Enter email"
                v-model= "form.email"
                @blur = "$v.form.email.$touch()"
                :class = "{
                    'is-invalid' : shouldAppendErrorClass($v.form.email),
                    'is-valid'   : shouldAppendValidClass($v.form.email)
                }"
            >
            <small id="emailHelp" class="form-text">We'll never share your email with anyone else.</small>
            <div class="form-text text-muted" v-if = "$v.form.email.$error">
                <div v-if = "!$v.form.email.required">
                    <small class="text-danger">Email is required</small>
                </div>
            </div>
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input 
                type="password"    
                class="form-control" 
                id="exampleInputPassword1" 
                placeholder="Password"
                v-model= "form.password"
                @blur= "$v.form.password.$touch()"
                :class= "{
                    'is-invalid' : shouldAppendErrorClass($v.form.password),
                    'is-valid'   : shouldAppendValidClass($v.form.password)
                }"
            >
        </div>
        <div class="form-text text-muted" v-if = "$v.form.password.$error">

            <div v-if = "!$v.form.password.required">
                <small class="text-danger">Password is required</small>
            </div>

            <div v-if = "!$v.form.password.minLength" >
                <small class="text-danger">Password must contain 8 characters</small>
            </div>

            <div v-if = "!$v.form.password.containsUppercase" >
                <small class="text-danger">Password must have atleast 1 uppercase character [A-Z]</small>
            </div>

            <div v-if = "!$v.form.password.containsLowercase" >
                <small class="text-danger">Password must have atleast 1 lowercase character [a-z]</small>
            </div>

            <div v-if = "!$v.form.password.containsNumber" >
                <small class="text-danger">Password must have atleast 1 Number</small>
            </div>

            <div v-if = "!$v.form.password.containsSpecial" >
                <small class="text-danger">Password must have atleast 1 special character {#?!@$%^&*-}</small>
            </div>
        </div>

         <div class="mb-3">
            <button type="submit" class="btn btn-primary my-2">Login</button>
            <p class="my-2">Don't Have an Account? <router-link to="/signup" class="text-deco">Register Here</router-link></p>
        </div>

        </form>
    </div>
</template>

<script>
import Vue from 'vue';
import { email, required, minLength } from 'vuelidate/lib/validators';
export default {
   name: 'AppLogin',
   data() {
        return{
            form:{
                email:'',
                password:''
            }
        }
    },
    validations: {
        form: {
            email: {
                email,
                required
            },
            password: {
                required,
                minLength : minLength(8),

                containsUppercase: function( value ){
                    return /[A-Z]/.test( value );
                },
                 containsLowercase : function( value ){
                    return /[a-z]/.test( value );
                },
                 containsNumber : function( value ){
                    return /[0-9]/.test( value );
                },
                 containsSpecial : function( value ){
                    return /[#?!@$%^&*-]/.test( value );
                }
    
            }
        }
    },
    methods: {
         login(){
            this.$v.form.$touch();

            if( !this.$v.form.$invalid ) {
                this.$store.dispatch( 'login', this.form )
                .then( () => { 
                    this.$router.push( { name: 'home' } );
                    Vue.$toast.open({
                    message: "Logged in Succesfully",
                    duration: 3000,
                    type: 'success',
                  });
                })
                .catch( error => {
                    Vue.$toast.open({
                        message: error.response.data.message,
                        duration: 3000,
                        type: 'error'
                    });
                });
            } else {
                console.log( 'invalid input values' );
            }
        },
        shouldAppendValidClass( field ){
            return !field.invalid && field.$model && field.$dirty;
        },
        shouldAppendErrorClass( field ){
            return field.$error;
        }
       
    }
}
</script>

<style scoped>
.text-deco{
    text-decoration: none;
}
</style>