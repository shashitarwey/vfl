import { login } from '@/services/auth';

const KEY_TOKEN = 'token';
const KEY_EMAIL = 'email';
const KEY_userType = 'userType';

const auth  = {
    state: {
        token: localStorage.getItem( KEY_TOKEN ) || '',
        email: localStorage.getItem( KEY_EMAIL ) || '',
        userType: localStorage.getItem( KEY_userType ) || '',
    },
    getters: {
        isAuthenticated( state ){
            return !!state.token;
        }
    },
    mutations: {
        setToken ( state, token ){
            state.token = token;
        },
        setEmail ( state, email ){
            state.email = email;
        },
        setuserType ( state, userType ) {
            state.userType = userType;
        }
    },
    actions: {
        // credentials = { email: string, password: string}
        login( { commit }, credentials ) {
            return login( credentials )
                            .then( data => {
                                const { token, email, userType } = data

                                localStorage.setItem( KEY_TOKEN, token );
                                localStorage.setItem( KEY_EMAIL, email );
                                localStorage.setItem( KEY_userType, userType );

                                commit( 'setToken', token );
                                commit( 'setEmail', email );
                                commit( 'setuserType', userType );

                                return ( email, userType );
                            });
        },
        logout ( { commit } ) {
            localStorage.removeItem( KEY_TOKEN );
            localStorage.removeItem( KEY_EMAIL );
            localStorage.removeItem( KEY_userType );

            commit( 'setToken', '' );
            commit( 'setEmail', '' );
            commit( 'setuserType', '' );

            return Promise.resolve();
        }
    }
}

export default auth;