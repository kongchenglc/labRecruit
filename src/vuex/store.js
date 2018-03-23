import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

function set_SessionStorage(theData, identity) {
    sessionStorage.setItem(identity, JSON.stringify(theData));
}
function take_sessionStorage(identity) {
    return JSON.parse(sessionStorage.getItem(identity));
}


export default new Vuex.Store({
    state: {
        userData: {
        },
        AdminData: {
        },
        onesMessage: {
        }
    },
    mutations: {
        setUserData(state, data) {
            state.userData = data;
            set_SessionStorage(data, 'userData');
        },
        setAdminData(state, data) {
            state.AdminData = data;
            set_SessionStorage(data, 'adminData');
        },
        setOnesMessage(state, data) {
            state.onesMessage = data;
            set_SessionStorage(data, 'onesMessage');
        },
     },
    getters: {
        getUserData(state) {
            if (state.userData.sNumber) {
                return state.userData;
            } else if (take_sessionStorage('userData')) {
                return take_sessionStorage('userData');
            } else {
                return { sNumber: 'who is your dad' };
            }
        },
        getAdminData(state) {
            if (state.AdminData.identity) {
                return state.AdminData.identity
            } else if (take_sessionStorage('adminData')) {
                return take_sessionStorage('adminData').identity;
            } else {
                return 'who is your dad';
            }
        },
        getOnesMessage(state) {
            if (state.onesMessage.sNumber) {
                return state.onesMessage
            } else if (take_sessionStorage('onesMessage')) {
                return take_sessionStorage('onesMessage');
            } else {
                return { 
                    sNumber: 'who is your dad??',
                    status: '',
                };
            }
        }
    },
    actions: {
    }
})