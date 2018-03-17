<template>

    <div id="container">
        <h1 id="subTitle">ThoughtCoding</h1>
        <article>
            <section class="section_a">
                <h3>
                    <span class="fa fa-user"> 个人信息</span>
                </h3>
                <p>
                    <span class="key">姓名：</span>
                    <span>{{this.getUserData.sName}}</span>
                </p>
                <p>
                    <span class="key">学号：</span>
                    <span>{{this.getUserData.sNumber}}</span>
                </p>
                <p>
                    <span class="key">班级：</span>
                    <span>{{this.getUserData.sClass}}</span>
                </p>
                <p>
                    <span class="key">选择方向：</span>
                    <span>{{this.getUserData.sSubject}}</span>
                </p>
                <p>
                    <span class="key">电话号码：</span>
                    <span>{{this.getUserData.sPhone}}</span>
                </p>

            </section>
            <section class="section_b">
                <h3>
                    <span class="fa fa-files-o"> 面试进程</span>
                </h3>

                <div id="interview_status">
                        <div class="point passed"></div>
                    <div :class="statusFirst?'passed':''">
                        <div class="line"></div>
                        <div class="point"></div>
                    </div>
                    <div :class="statusSecond?'passed':''">
                        <div class="line"></div>
                        <div class="point"></div>
                    </div>
                    <div :class="statusThrid?'passed':''">
                        <div class="line"></div>
                        <div class="point"></div>
                    </div>
                </div>

                <p>
                    <span class="key">当前状态：</span>
                    <span>{{statusText}}</span>
                </p>

            </section>
        </article>
    </div>

</template>

<script>
import {mapGetters} from 'vuex';

    export default {
        data() {
            return {
                statusText: '等待沟通'
            }
        },
        computed: {
            ...mapGetters(['getUserData']),
            status() {
                if(this.getUserData.status) {
                    return this.getUserData.status.split('');
                } else {
                    return ['0','0','0'];
                }
            },
            statusFirst() {
                if(Number(this.status[0])) {
                    this.statusText = '一面通过'
                    return 1;
                }
                return 0;
            },
            statusSecond() {
                if(Number(this.status[1])) {
                    this.statusText = '二面通过'
                    return 1;
                }
                return 0;
            },
            statusThrid() {
                if(Number(this.status[2])) {
                    this.statusText = '欢迎加入小组'
                    return 1;
                }
                return 0;
            },
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

section {
    padding: 50px;
    margin-bottom: 30px;
    border: 1px solid white;
    border-radius: 35px;
    position: relative;
    box-shadow: 0 2px 10px 5px rgba(0, 0, 0, .2) inset;
}

h3 {
    margin: 0 0 15% 0;
}
p {
    margin: 15px 0 15px 30%;
    border-bottom: 1px solid snow;
    text-align: center;
}

.key {
    position: absolute;
    left: 13%;
}

#interview_status {
    width: 165px;
    height: 20px;
    margin: 40px auto;
    overflow: hidden;
}
.point {
    width: 15px;
    height: 15px;
    background-color: rgba(200, 200, 200, .8);
    border-radius: 50%;
    box-shadow: inset 0 3px 15px 6px rgba(255,255,255,.2), 0 1px 4px 0 rgba(0,0,0,.2);
    float: left;
    position: relative;
    z-index: 1;
}
.line {
    width: 40px;
    height: 7px;
    background-color: rgba(200,200,200,.3);
    margin: 4px -3px;
     box-shadow: inset 0 7px 30px 10px hsla(0,0%,100%,.2), 0 1px 4px 0 rgba(0,0,0,.2);     
    float: left;
}
.passed>div,
.passed {
    background-color: #2cac62;
}



    
@media screen and (min-width: 600px) {
    #container {
        width: 450px;
        margin: 0 auto;
    }
}

@media screen and (min-width: 1000px) {
    #container {
        width: 80%;
        margin: 0 auto;
    }
    section {
        width: 35%;
    }
    .section_a {
        float: left;
    }
    .section_b {
        float: right;
    }
}
</style>
