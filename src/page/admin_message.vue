<template>
    
    <div id="container">
        <h1 id="subTitle">ThoughtCoding</h1>

        <article>
            <section>
                <p class="items" v-for="(item, index) of getOnesMessage" :key="index">
                    {{
                        index === 'sNumber'
                        ? '学号'
                        : index === 'sName'
                            ? '姓名'
                            : index === 'sClass'
                                ? '班级'
                                : index === 'sPhone'
                                    ? '电话'
                                    : index === 'sSubject'
                                        ? '方向'
                                        : index === 'status'
                                            ? '状态' : '不识别属性'
                    }}: 
                    <span class="item-value">
                        {{
                            index === 'status'
                            ? item === ''
                                ? '等待沟通 ' 
                                : item === '1'
                                    ? '一面通过 '
                                    : item === '11'
                                        ? '二面通过 '
                                        : item === '111'
                                            ?'已通过   ': '面试未通过'
                            :item
                        }}
                    </span> 
                </p>

                <div v-show="theOldStatus[theOldStatusLength - 1] !== '0'">

                    <div id="change-status" v-show="theOldStatusLength === 0">
                        <div class="select_radio">
                            <input v-model="theStatus" type="radio" name="status" value="1" id="firstover">
                            <label for="firstover">一面通过</label>
                        </div>
                        <div class="select_radio">
                            <input v-model="theStatus" type="radio" name="status" value="0" id="firstpass">
                            <label for="firstpass">一面不通过</label>
                        </div>
                    </div>

                    <div id="change-status" v-show="theOldStatusLength === 1">
                        <div class="select_radio">
                            <input v-model="theStatus" type="radio" name="status" value="11" id="secondover">
                            <label for="secondover">二面通过</label>
                        </div>
                        <div class="select_radio">
                            <input v-model="theStatus" type="radio" name="status" value="10" id="secondpass">
                            <label for="secondpass">二面不通过</label>
                        </div>
                    </div>

                    <div id="change-status" v-show="theOldStatusLength === 2">
                        <div class="select_radio">
                            <input v-model="theStatus" type="radio" name="status" value="111" id="thirdover">
                            <label for="thirdover">终面通过</label>
                        </div>
                        <div class="select_radio">
                            <input v-model="theStatus" type="radio" name="status" value="110" id="thirdpass">
                            <label for="thirdpass">终面不通过</label>
                        </div>
                    </div>

                </div>

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
        }
    },
    computed: {
        theSNumber() {
            return this.getOnesMessage.sNumber;
        },
        theOldStatus() {
            return this.getOnesMessage.status;
        },
        theOldStatusLength() {
            return this.theOldStatus.length;
        },
        ...mapGetters(['getOnesMessage', 'getAdminData']),
    },
    methods: {
        confirm() {
            if( window.confirm('确定修改？') ) {
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
                        alert('更新成功')
                        this.$router.push('/admin_messages')
                    } else {
                        alert('更新失败')
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        },
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
    display: flex;
}

.select_radio {
    float: left;
    flex: 1;
}


#thesubm {
    padding-left: 15px;
    margin:40px 0 60px 0;
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
}
</style>
