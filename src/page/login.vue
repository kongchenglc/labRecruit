<template>
    <div id="container">
        <h1 id="subTitle">ThoughtCoding</h1>

        <input-item itemtype="text">
            <i class="fa fa-user-o"></i>
        </input-item>
        <input-item itemtype="password">
            <i class="fa fa-key"></i>
        </input-item>
        <img @click="reloadcode" id="checkcodeimg" :src="checkcodesrc" alt="1">
        <div id="checkcode">
            <input-item>
                <i class="fa fa-shield"></i>
            </input-item>
        </div>
        <p id="notes">
            <small>
                *{{thenote}}
            </small>
        </p>
        <input-item id="thesubm" itemtype="submit" @click.prevent="logInSubmit">
        </input-item>
    </div>
</template>

<script>
import inputItem from '@/components/input-item';
export default {
    data() {
        return {
            checkcodesrc: 'http://222.24.62.120/CheckCode.aspx',
            thenote: '使用教务系统账号密码登录',
        }
    },
    components: {
        inputItem,
    },
    methods: {
        reloadcode() {
            this.checkcodesrc += '?';
        },
        logInSubmit() {

        }
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
    height: 37px;
    width: 30%;
    margin: 0;
    margin-left: 5%;
}

#checkcode {
    /* overflow: hidden; */
    margin-top: -20px;
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
}



@media screen and (min-width: 600px) {
    #container {
        width: 450px;
        margin: 0 auto;
    }
}
</style>