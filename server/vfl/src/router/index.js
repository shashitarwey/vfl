import Router from 'vue-router';
import AppHome from '@/components/AppHome';
// import AppProduct from '@/components/AppProduct';
import ProductDetails from '@/components/ProductDetails';
import AppCart from '@/components/AppCart';
import AppLogin from '@/components/AppLogin';
import AppSignUp from '@/components/AppSignUp';
import AddProduct from '@/components/AddProduct';
import PageNotFound from '@/components/PageNotFound'
import { store } from '@/store';

// import AppContactUs from '@/components/AppContactUs';
// import AppAboutUs from '@/components/AppAboutUs';
const meta = {
     authorize : [ ] 
};
const router = new Router({
    mode: 'history',
    routes: [
        {
            name: 'home',
            path: '/',
            component: AppHome
        },
        {
            name: 'product-details',
            path: '/product/:id',
            component: ProductDetails,
            meta
        },
        {
            name: 'cart',
            path: '/cart',
            component: AppCart
        },
        {
            name: 'addproduct',
            path: '/add-product',
            component: AddProduct,
            meta
        },
        {
            name: 'login',
            path: '/login',
            component: AppLogin
        },
        {
            name: 'signup',
            path: '/signup',
            component: AppSignUp
        },
        {
            name: 'pagenotfound',
            path: '*',
            component: PageNotFound
        }
    ]
})

router.beforeEach(( to, from, next ) => {
    if( to.meta.authorize && !store.getters.isAuthenticated ){
        next({
            name: 'login'
        });
    } else {
        next();
    }
});
export default router;
