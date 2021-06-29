import Vue from 'vue';
import Vuex from 'vuex';

// import cabbage from '@/assets/vegetables/cabbage.jpg';
// import onion from '@/assets/vegetables/onion.jpg';
// import cauliflower from '@/assets/vegetables/cauliflower.jpg';

Vue.use( Vuex )
const store = {
    state: {
        // vegetables: [   
        //             { id: 1, name: 'Cabbage', price: 35,url: cabbage, rate: 4.1},
        //             { id: 2, name: 'Onion', price: 25,url: onion, rate: 3.9},
        //             { id: 3, name: 'Cauliflower', price: 30,url: cauliflower, rate: 3.7 }
        // ],

        cartItemCount: 0,
        cartItems: []
    },
    mutations: {
        addToCart( state, payload ) {
            // we will add the qty by 1
            // if cart items > 0
            // check if payload already exists in cart items
            // yes -> find the index of payload in Cart item and update its qty by 1
            // no -> push the item
            // else -> push the item
            let item = payload;
            item = { ...item, quantity: 1 }
            if( state.cartItems.length > 0 ) {
                let bool = state.cartItems.some( i => i.id ===  item.id )
                if( bool ) {
                    let itemIndex = state.cartItems.findIndex( el => el.id === item.id )
                    state.cartItems[itemIndex]["quantity"] += 1;
                } else {
                    state.cartItems.push( item )
                }
            } else {
                state.cartItems.push( item )
            }
            state.cartItemCount++;
        },
        removeItem( state, payload ) {
            // check if cart items length > 0
            // yes -> check if payload already exists in cart items
            // yes -> find the index of payload in cart index and delete its qty by 1
            // update the list
            if( state.cartItems.length > 0 ) {
                let bool = state.cartItems.some( i => i.id === payload.id )

                if( bool ) {
                    let index = state.cartItems.findIndex( el => el.id === payload.id )
                    if( state.cartItems[index]["quantity"] !== 0) {
                        state.cartItems[ index ]["quantity"] -= 1
                        state.cartItemCount--;
                    }
                    if( state.cartItems[index]["quantity"] === 0 ) {
                        state.cartItems.splice( index, 1 );
                    }
                   
                }
            }
        }
    },
    actions: {
        addToCart: ( context, payload ) =>  {
            context.commit("addToCart", payload )
        },
        removeItem: ( context, paylaod ) => {
            context.commit("removeItem", paylaod);
        }
    }
};

export default store;
