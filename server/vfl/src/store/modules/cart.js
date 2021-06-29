import Vue from 'vue';
import Vuex from 'vuex';


function updateLocalStorage( cartItems ) {
    localStorage.setItem( 'cartItems' , JSON.stringify( cartItems ))
}


Vue.use( Vuex )
const store = {
    state: {
        cartItemCount: 0,
        cartItems: []
    },
    getters:{
        cartSize: state =>{
            return state.cartItems.length;
        }
    },
    mutations: {
        addToCart( state, product ){
            let item = state.cartItems.find( i => i._id === product._id );

            if( item ){
                item.quantity++;
            }
            else{
                state.cartItems.push( {...product, quantity: 1 } );
            }
            updateLocalStorage(state.cartItems);
            state.cartItemCount++;
        },
        // addToCart( state, payload ) {
           
        //     let item = payload;
        //     item = { ...item, quantity: 1 }
        //     if( state.cartItems.length > 0 ) {
        //         let bool = state.cartItems.some( i => i.id ===  item.id )
        //         if( bool ) {
        //             let itemIndex = state.cartItems.findIndex( el => el.id === item.id )
        //             state.cartItems[itemIndex]["quantity"] += 1;
        //         } else {
        //             state.cartItems.push( item )
        //         }
        //     } else {
        //         state.cartItems.push( item )
        //     }
        //     state.cartItemCount++;
        // },
        makeCartEmpty( state ) {
            while( state.cartItems.length ){
                state.cartItems.pop();
            }
        },
        removeItem( state, payload ) {
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
        },
       
        updateCartFromLocalStorage( state ){
            const cartItems = localStorage.getItem( 'cartItems' )
            if( cartItems ){
                state.cartItems = JSON.parse( cartItems )
            }
        }
    },
    actions: {
        addToCart: ( context, payload ) =>  {
            context.commit("addToCart", payload )
        },
        removeItem: ( context, paylaod ) => {
            context.commit("removeItem", paylaod);
        },
        makeCartEmpty( context, paylaod ) {
            context.commit( "makeCartEmpty", paylaod )
        },
    }
};

export default store;
