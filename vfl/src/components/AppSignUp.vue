<template>
     <div class="jumbotron container my-5 w-75">
        <h2 class="text-center mb-4">Register</h2>
        <hr/>
        <form method="POST" @submit.prevent="signup">
        <div class="form-group">
            <label for="exampleInputEmail1">Username</label>
            <input 
                type="text" 
                class="form-control" 
                placeholder="Username"
                v-model= "form.name"
                @blur= "$v.form.name.$touch()"
                :class= "{
                    'is-invalid':shouldAppendErrorClass($v.form.name),
                    'is-valid':shouldAppendValidClass($v.form.name)
                }"
            >
        </div>
         <div class="form-text text-muted" v-if = "$v.form.name.$error">
                <div v-if = "!$v.form.name.required">
                    <small class="text-danger">Username is required</small>
                </div>
        </div>
        <div class="form-group">
            <label for="user-type">User Type (<small>admin/general)</small></label>
            <input 
                type="text" 
                name= "user-type"
                id= "user-type"
                class="form-control" 
                placeholder="admin/general"
                v-model= "form.userType"
                @blur= "$v.form.userType.$touch()"
                :class= "{
                    'is-invalid':shouldAppendErrorClass($v.form.userType),
                    'is-valid':shouldAppendValidClass($v.form.userType)
                }"
            >
        </div>
         <div class="form-text text-muted" v-if = "$v.form.userType.$error">
                <div v-if = "!$v.form.userType.required">
                    <small class="text-danger">userType is required</small>
                </div>
        </div>
        <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input 
                type="email" 
                class="form-control" 
                id="exampleInputEmail1" 
                aria-describedby="emailHelp" 
                placeholder="Enter email"
                v-model = "form.email"
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
                @blur = "$v.form.password.$touch()"
                :class = "{
                    'is-invalid' : shouldAppendErrorClass($v.form.password),
                    'is-valid'   : shouldAppendValidClass($v.form.password)
                }"
            >
        </div>
         <div class="form-text text-muted" v-if= "$v.form.password.$error">

            <div v-if= "!$v.form.password.required">
                <small class="text-danger">Password field is required</small>
            </div>

            <div v-if= "!$v.form.password.minLength">
                <small class="text-danger">Password must contain 8 characters</small>
            </div>

            <div v-if= "!$v.form.password.containsUppercase">
                <small class="text-danger">Password must have atleast 1 uppercase character [A-Z]</small>
            </div>

            <div v-if= "!$v.form.password.containsLowercase">
                <small class="text-danger">Password must have atleast 1 lowercase character [a-z]</small>
            </div>

            <div v-if= "!$v.form.password.containsNumber">
                <small class="text-danger">Password must have atleast 1 Number</small>
            </div>

            <div v-if= "!$v.form.password.containsSpecial">
                <small class="text-danger">Password must have atleast 1 special character {#?!@$%^&*-}</small>
            </div>
        </div>

        <button type="submit" class="btn btn-primary my-2" :disabled = "$v.form.$invalid">Sign Up</button>
         <div class="my-3">
            <p>Already an Account? <router-link to="/login" class="text-deco">Login</router-link></p>
        </div>
        </form>
    </div>
</template>

<script>
import Vue from 'vue';
import { email, required, minLength } from 'vuelidate/lib/validators';
import { fetchUser } from '@/services/auth';
export default {
    name: 'AppSignUp',
    data() {
        return{
            form:{
                name :'',
                email :'',
                password :'',
                userType: '',
            }
        }
    },
    validations :{
        form:{
            name:{
                required
            },
            email:{
                email,
                required
            },
            password:{
                required,
                minLength : minLength(8),

                containsUppercase : function(value){
                    return /[A-Z]/.test(value);
                },
                 containsLowercase : function(value){
                    return /[a-z]/.test(value);
                },
                 containsNumber : function(value){
                    return /[0-9]/.test(value);
                },
                 containsSpecial : function(value){
                    return /[#?!@$%^&*-]/.test(value);
                 }
            },
            userType: {
                required
            }

        },
    },
    methods:{
        shouldAppendErrorClass( field ){
            return field.$error;
        },
        shouldAppendValidClass( field ){
            return !field.invalid && field.$model && field.$dirty
        },
        signup() {
            this.$v.form.$touch();
            if ( !this.$v.form.$invalid )
            {
            fetchUser({ name: this.form.name, email: this.form.email, password: this.form.password,userType: this.form.userType })
                .then( () => {
                    Vue.$toast.success( 
                        'Account Created Succesfully',
                        {
                            timeout: 3000
                        });
                        this.$router.push( { name: 'login' } )
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
.text-deco{
    text-decoration: none;
}
</style>