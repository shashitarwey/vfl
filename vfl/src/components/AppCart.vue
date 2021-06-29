<template>
    
<div class="container cart-page">
  <div>
  <table>
    <tr>
      <th>Product</th>
      <th>Quantity</th>
      <th>Subtotal</th>
    </tr>

    <tr v-for="items in cartItems" :key="items.id">
      <td>
        <div class="cart-info">
          <img src="../assets/Vegetables/vegetables.jpg" alt="" />
          <div>
            <p>{{items.name}}</p>
            <span>&#8377; {{items.price}}/Kg</span>
          </div>
        </div>
      </td>
      <td> 
        <button class="add mr-2" type="button" v-on:click="removeItem(items)">-</button>
        <span class="cart-quantity">{{items.quantity}} Kg.</span>
        <button class="remove ml-2" type="button" v-on:click="addItem(items)">+</button>
      </td>
      <td>&#8377; {{items.price * items.quantity}}</td>
    </tr>
  </table>
  <div class="total-price">
    <table>
      <tr>
        <td>Total</td>
        <td>&#8377; {{totalPrice}}</td>
      </tr>
    </table>
  </div>
  <div class="d-flex justify-content-end">
      <button class="btn btn-secondary" type="button" v-on:click="checkout" :disabled="!isAuthenticated || totalPrice === 0">Checkout</button>
  </div>
  </div>
</div>
</template>

<script>
import swal from 'sweetalert';
export default {
    name: 'AppCart',
    computed: {
      cartItems() {
          return this.$store.state.cart.cartItems;
      },
      cartlength() {
          return this.$store.state.cart.cartItems.length;
      },
      isAuthenticated() {
        return this.$store.getters.isAuthenticated;
      },
      totalPrice() {
          let price = 0;
          this.$store.state.cart.cartItems.map( el => {
              price += el["quantity"] * el["price"]
          })
          return price;
      }
    },
    methods: {
      addItem( items ) {
        this.$store.dispatch("addToCart",items )
      },
      removeItem( items ) {
        this.$store.dispatch("removeItem", items )
      },
      checkout() {
        swal( "Good Job!", "Your order is placed successfully!", "success").then(
          ( items) => {
            this.$store.dispatch( "makeCartEmpty", items );
          }
        )
        
      }
    }
}
</script>

<style scoped>
.cart-page {
    margin: 90px auto;
  }
 table {
    width: 100%;
    border-collapse: collapse;
  }

  .cart-info {
    display: flex;
    flex-wrap: wrap;
  }

  th {
    text-align: left;
    padding: 5px;
    color: #ffffff;
    background: #ff523b;
    font-weight: normal;
  }
  td {
    padding: 10px 5px;
  }

  td input {
    width: 40px;
    height: 30px;
    padding: 5px;
  }

  td a {
    color: #ff523b;
    font-size: 12px;
  }

  td img {
    width: 80px;
    height: 80px;
    margin-right: 10px;
  }

  .total-price {
    display: flex;
    justify-content: flex-end;
  }

  .total-price table {
    border-top: 3px solid #ff523b;
    width: 100%;
    max-width: 400px;
  }

  td:last-child {
    text-align: right;
  }

  th:last-child {
    text-align: right;
  }
  .add,
.remove {
    width: 28px;
    height: 28px;
    background: linear-gradient(#fff, #f9f9f9);
    border: 1px solid #c2c2c2;
    cursor: pointer;
    font-size: 16px;
    border-radius: 7px;
    padding-top: 1px;
    outline: none;
}
</style>