<template>
    <div id="container">

        <h1 id="subTitle">ThoughtCoding</h1>
        <article>
            <section>
                <h2>
                    祝贺你，报名成功！
                </h2> 
                <p>报名须知：</p>
                <ol>
                    <li>请保持手机畅通，以便我们能够随时联系到您。</li>
                    <li>面试过程中，可以登录本纳新系统查询面试进度。</li>
                    <li>建议您加入我们的纳新QQ群(712820463)，以便随时知晓最新变动。</li>
                    <li>对面试过程或者实验室有任何建议或者想法，欢迎联系邮箱ThoughtCoding@163.com</li>
                </ol>
            </section>
            
            <div id="thesubm" @click="confirm">
                <input class="itssub" type="submit" value="确定"></input>
            </div>
        </article>
    </div>
</template>

<script>
    export default {
        methods: {
            confirm() {
                this.$router.push('./message');
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

section {
    padding: 7%;
    border: 1px solid white;
    border-radius: 35px;
    box-shadow: 0 2px 10px 5px rgba(0, 0, 0, .2) inset;
}

li {
    margin: 10px 0;
}


#thesubm {
    padding-left: 15px;
    margin: 40px 0 90px 0;
    border: 1px solid #fff;
    border-radius: 500px;
    cursor: pointer;
    border-color: #2cac62;
    background-color: #2cac62;
    box-shadow: inset 0 7px 30px 10px hsla(0,0%,100%,.2), 0 1px 4px 0 rgba(0,0,0,.2);
}
.itssub {
    background: transparent;
    border: none;
    padding-left: 5px;
    outline: none;
    color: #fff;
    width: 80%;
    line-height: 35px;
    font-size: 15px;
    vertical-align: baseline;
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