import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import cart from './modules/cart';

Vue.use( Vuex )

export const store = new Vuex.Store({
    modules:{
        auth: auth,
        cart: cart
    }
});

// export const storeCart = new Vuex.Store({
//     modules:{
//         cart: cart
//     }
// });

// module.exports = {
//     store,
//     storeCart
// };
