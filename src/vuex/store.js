import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

function set_SessionStorage(theData) {
    sessionStorage.setItem('userData', JSON.stringify(theData));
}
function take_sessionStorage() {
    return JSON.parse(sessionStorage.getItem('userData'));
}


export default new Vuex.Store({
    state: {
        userData: {
        },
        AdminData: {
        }
    },
    mutations: {
        setUserData(state, data) {
            state.userData = data; 
            set_SessionStorage(data);
        }
    },
    getters: {
        getUserData(state) {
            if(state.userData.sNumber) {
                return state.userData;
            } else if (take_sessionStorage()) {
                return take_sessionStorage();
            } else {
                return {sNumber: 'who is your dad'};
            }
        }
    },
    actions: {

    }
})