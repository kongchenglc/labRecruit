<template>
    <div id="container">

        <h1 id="subTitle">ThoughtCoding</h1>

        <div class="input-item">
            <i class="fa fa-user-o"></i>
            <input type="text" placeholder="请输入管理员账号" v-model="aNumber"></input>
        </div>

        <div class="input-item">
            <i class="fa fa-key"></i>
            <input type="password" placeholder="请输入密码" v-model="aPassword" @keyup.enter="submit"></input>
        </div>

        <div id="thesubm" class="input-item" @click="submit">
            <input class="itssub" type="submit" value="登录"></input>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
           aNumber: '',
           aPassword: ''
        }
    },
    methods: {
        submit() {
            this.axios({
                data: {
                    aNumber: this.aNumber,
                    aPassword: this.aPassword,
                }
            })
        }
    }
}
</script>

<style scoped>
#container {
    padding: 10px;
}

#subTitle {
    text-align: center;
    margin: 60px 0 50px 0;
    font-weight: 500;
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
    box-shadow: 0 2px 10px 5px rgba(0, 0, 0, .2) inset;
}
input::placeholder {
    color: rgba(220, 220, 220, .8);
}


.itssub {
    margin-left: 8%;
    cursor: pointer;
}

#thesubm {
    margin-top: 50px;
    cursor: pointer;
    border-color: #2CAC62;
    background-color: #2CAC62;
    box-shadow: 0 7px 30px 10px rgba(255, 255, 255, .2) inset, 0 1px 4px 0 rgba(0, 0, 0, .2);
}



@media screen and (min-width: 600px) {
    #container {
        width: 450px;
        margin: 0 auto;
    }
}
</style>