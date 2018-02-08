<template>
    <div id="container">
        <h1 id="subTitle">ThoughtCoding</h1>

        <div class="input-item">
            <i class="fa fa-user-o"></i>
            <input type="text" placehold="请输入学号"></input>
        </div>

        <div class="input-item">
            <i class="fa fa-key"></i>
            <input type="password" placehold="请输入密码"></input>
        </div>

        <img @click="reloadcode" id="checkcodeimg" :src="checkcodesrc" alt="1">

        <div class="input-item" id="checkcode">
            <i class="fa fa-shield"></i>
            <input placehold="请输入验证码"></input>
        </div>

        <p id="notes">
            <small>
                *{{thenote}}
            </small>
        </p>

        <div id="thesubm" class="input-item">
            <input class="itssub" type="submit" value="登录" @click="submitAjax"></input>
        </div>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            checkcodesrc: 'http://222.24.62.120/CheckCode.aspx',
            thenote: ' 使用教务系统账号密码登录',
        }
    },
    methods: {
        reloadcode() {
            this.checkcodesrc += '?';
        },
        submitAjax() {
            // $store.
            this.$axios({
                method: 'get',
                url: 'http://localhost:8080/#/',
            }).then((result) => {
                // console.log(result);
                console.log(this.token);
            })
        }
    },
    computed: {
        ...mapGetters(['token'])
    }
}
</script>

<style scoped>
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

#checkcode {
    /* overflow: hidden; */
    margin-top: 0;
    float: right;
    width: 60%;
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