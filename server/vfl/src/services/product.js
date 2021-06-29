import axios from 'axios';
import { successHandler, errorHandler } from './helper';

export const postProduct =( productDetails ) =>{

    return axios.post( `https://vfl-fynd-app.herokuapp.com/product`, productDetails, 
         {
             headers: {
                 'Content-Type' : 'application/json'
             }
         },
         { withCredentials: true }
     )
     .then( successHandler )
     .catch( errorHandler );
 };
 export const getProduct =( ) =>{

    return axios.get( `https://vfl-fynd-app.herokuapp.com/product`, 
         {
             headers: {
                 'Content-Type' : 'application/json',
                 
             }
         }
     )
     .then( successHandler )
     .catch( errorHandler );
 };
 export const getProductbyId =( id ) =>{

    return axios.get( `https://vfl-fynd-app.herokuapp.com/product/${id}`, 
         {
             headers: {
                 'Content-Type' : 'application/json'
             }
         },
             { withCredentials: true }
     )
     .then( successHandler )
     .catch( errorHandler );
 };
 export const removeProductbyId =( id ) =>{

    return axios.delete( `https://vfl-fynd-app.herokuapp.com/product/${id}`, 
         {
             headers: {
                 'Content-Type' : 'application/json'
             }
         }
     )
     .then( successHandler )
     .catch( errorHandler );
 };

 export const updateProduct =( productDetails,id ) =>{

    return axios.delete( `https://vfl-fynd-app.herokuapp.com/product/${id}`,productDetails, 
         {
             headers: {
                 'Content-Type' : 'application/json'
             }
         }
     )
     .then( successHandler )
     .catch( errorHandler );
 };