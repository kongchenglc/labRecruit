import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userData: {
            sNumber: '1111',
            sName: '12138',
        }
    },
    mutations: {
        setUserData(state, data) {
            console.log(state, data);
            state.userData = data; 
        }
        // sessionStorage.setItem('token','12136');
    },
    getters: {
        token() {
            return sessionStorage.getItem('token');
        }
    },
    actions: {

    }
})