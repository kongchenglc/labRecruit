<template>
    <div id="container">
        
    <router-link id="adminlink" to="/admin_login">
        <i class="fa fa-user"></i>
    </router-link>

        <h1 id="subTitle">ThoughtCoding</h1>

        <div class="input-item">
            <i class="fa fa-user-o"></i>
            <input type="text" required placeholder="请输入学号" v-model="sNumber"></input>
        </div>

        <div class="input-item">
            <i class="fa fa-key"></i>
            <input type="password" required placeholder="请输入密码" v-model="sPassword"></input>
        </div>

        <div id='lodingBox'>
            <i id="loding" class="fa fa-spinner fa-spin"></i>
        </div> 
        <img v-if="!checkcodeLoding" @click="reloadcode" id="checkcodeimg" :src="checkcodesrc" alt="验证码">

        <div class="input-item" id="checkcode">
            <i class="fa fa-shield"></i>
            <input placeholder="请输入验证码" required v-model="checkcode" @keyup.enter="submitAjax"></input>
        </div>

        <p id="notes">
            <small>
                *{{thenote}}
            </small>
        </p>

        <div id="thesubm" class="input-item" @click="submitAjax">
            <input class="itssub" type="submit" value="登录"></input>
        </div>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            checkcodesrc: 'http://localhost:3000/CheckCode.aspx',
            thenote: ' 使用教务系统账号密码登录',
            sNumber: '',
            sPassword: '',
            checkcode: '',
            checkcodeLoding: false,
        }
    },
    methods: {
        reloadcode() {
            let newImg = new Image();
            newImg.src = this.checkcodesrc + '?';
            this.checkcodeLoding = true;
            newImg.onload = () => {
                this.checkcodeLoding = false;
                this.checkcodesrc = newImg.src;
            }
                // sessionStorage.setItem('token','12136');
        },
        submitAjax() {
            if(this.sNumber && this.sPassword && this.checkcode) {
                // $store.
                this.$axios({
                    method: 'post',
                    url: 'http://localhost:3000/login',
                    data: {
                        sNumber: this.sNumber,
                        sPassword: this.sPassword,
                        checkcode: this.checkcode,
                    }
                }).then((result) => {
                    console.log(result.data);
                    if(result.data === 'unregistered') {
                        this.$router.push('/signup');
                    } else if(result.data.sNumber === this.sNumber) {
                        this.$router.push('/message');
                        console.log('已注册 显示信息')
                    } else {
                        this.reloadcode();
                        this.sNumber = '';
                        this.sPassword = '';
                        this.checkcode = '';
                        this.thenote = ' 输入错误，请重新登录'
                    } 
                })
                this.thenote = ' 正在登录，请稍后...'
            } else {
                this.thenote = ' 请输入完整信息'
            }
        }
    },
    computed: {
        ...mapGetters(['token'])
    },
}
</script>

<style scoped>
#adminlink {
    text-decoration: none;
    position: absolute;
    top: 20px;
    right: 25px;
    color: #eee;
}

#subTitle {
    text-align: center;
    margin: 60px 0 50px 0;
    font-weight: 500;
}

#container {
    padding: 10px;
}

#checkcodeimg {
    cursor: pointer;
    height: 37px;
    width: 30%;
    margin: 0;
    margin-left: 5%;
}
#lodingBox {
    position: relative;
}
#loding {
    z-index: -1;
    position: absolute;
    left: 20%;
    margin-top: 3%;
}

#checkcode {
    /* overflow: hidden; */
    margin-top: 0;
    float: right;
    width: 50%;
}

#notes {
    clear: both;
    padding-left: 10px;
}

#thesubm {
    cursor: pointer;
    border-color: #2CAC62;
    background-color: #2CAC62;
    box-shadow: 0 1px 4px rgba(0, 0, 0, .2);
    box-shadow: 0 7px 30px 10px rgba(255, 255, 255, .2) inset, 0 1px 4px 0 rgba(0, 0, 0, .2);
}

input {
    background: transparent;
    border: none;
    padding-left: 5px;
    outline: none;
    color: #fff;
    width: 80%;
    line-height: 35px;
    font-size: 15px;
    vertical-align: baseline;
}
input::placeholder {
    color: rgba(220, 220, 220, .8);
}
.input-item {
    padding-left: 15px;
    margin: 20px 0;
    border: 1px solid #fff;
    border-radius: 500px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, .2) inset;
}

.itssub {
    margin-left: 8%;
    cursor: pointer;
}



@media screen and (min-width: 600px) {
    #container {
        width: 450px;
        margin: 0 auto;
    }
}
</style>