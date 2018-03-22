<template>
    
    <div id="container">
        <h1 id="subTitle">ThoughtCoding</h1>

        <article>
            <section>
                <p class="items" v-for="(item, index) of getOnesMessage" :key="index">
                    {{index}}: 
                    <span class="item-value">
                        {{item}}
                    </span> 
                </p>

                <div id="change-status">
                    <div  class="select_radio">
                        <input v-model="theStatus" type="radio" name="status" value="000" id="wait">
                        <label for="wait">等待沟通</label>
                    </div>
                    <div  class="select_radio">
                        <input v-model="theStatus" type="radio" name="status" value="100" id="first">
                        <label for="first">一面通过</label>
                    </div>
                    <div  class="select_radio">
                        <input v-model="theStatus" type="radio" name="status" value="110" id="second">
                        <label for="second">二面通过</label>
                    </div>
                    <div  class="select_radio">
                        <input v-model="theStatus" type="radio" name="status" value="111" id="over">
                        <label for="over">终面通过</label>
                    </div>
                </div>

                <p id="notes">
                    <small>
                        {{thenote}}
                    </small>
                </p>

                <div id="thesubm" @click="confirm">
                    <input class="itssub" type="submit" value="更改状态"></input>
                </div>
            </section>
        </article>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'Vuex'

export default {
    data() {
        return {
            theStatus: '',
            thenote: ' ',
        }
    },
    computed: {
        theSNumber() {
            return this.getOnesMessage.sNumber;
        },
        ...mapGetters(['getOnesMessage', 'getAdminData']),
    },
    methods: {
        confirm() {
            this.thenote = '* 正在连接数据库...'
            this.$axios({
                method: 'post',
                url: this.$route.path,
                data: {
                    theStatus: this.theStatus,
                    theSNumber: this.theSNumber,
                    theToken: this.getAdminData,
                }
            }).then(result => {
                if(result.data === 'success') {
                    this.setOnesStatue(this.theStatus);
                    this.thenote = '* 状态更新成功'
                } else {
                    this.thenote = '* 更新失败'
                    console.log(result.data);
                }
                console.log(result.data);
            }).catch(err => {
                console.log(err);
            })
        },
        ...mapMutations(['setOnesStatue']),
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

.items {
    padding: 5px;
    padding-left: 10%;
    color: white;
    border-bottom: 1px solid rgba(100, 100, 100, .2);
    position: relative;
    /* text-align: center; */
    /* width: 200px; */
    margin: 0 auto;
}
.item-value {
    float: right;
    width: 50%;
    text-align: left;
}

#change-status {
    margin: 0 auto;
    margin-top: 40px;
    overflow: hidden;
    width:80%;
}

.select_radio {
    float: left;
    margin: 0 3%;
}

#notes {
    margin-top: 40px;
    margin-left: 7%;
    height: 21px;
}


#thesubm {
    padding-left: 15px;
    margin-bottom: 60px;
    border: 1px solid #fff;
    border-radius: 500px;
    cursor: pointer;
    border-color: #2cac62;
    background-color: #2cac62;
    box-shadow: inset 0 7px 30px 10px hsla(0, 0%, 100%, .2), 0 1px 4px 0 rgba(0, 0, 0, .2);
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

    .select_radio {
        float: left;
        margin: 0;
    }
}
</style>
