<template>
    <div id="container">
        <h1 id="subTitle">ThoughtCoding</h1>

         <div class="input-item">
            &nbsp;<i class="fa fa-user"></i>
            <input type="text" required placeholder="请输入姓名" v-model="sName"></input>
        </div>

        <div class="input-item">
            <i class="fa fa-group"></i>
            <input type="text" required placeholder="请输入班级" v-model="sClass"></input>
        </div>

        <div class="input-item">
            &nbsp;<i class="fa fa-phone"></i>
            <input type="tel" required placeholder="请输入电话号码" v-model="sPhone"></input>
        </div>

        
        <div class="input-item" id="select-subjects" @click="displaySubjects">
            <i class="fa fa-laptop"></i>
            <input class="placeholder" :class="selected?'':'placeholder2'" readonly :value="sSubject" @keyup.enter="submitAjax"></input>
            <ul id="subjects"  v-show="selecting">
                 <li class="subject" @click="select(index)" v-for='(item, index) of subjects' :key="index">{{item}}</li> 
            </ul>
            <i id="the-arrow" class="fa fa-chevron-down" :class="selecting?'arrow-selecting':''"></i>
        </div>

        <p id="notes">
            <small :class="selecting?'blur':''">
                {{thenote}}
            </small>
        </p>

        <div id="thesubm" class="input-item"  @click="submitAjax">
            <input :class="selecting?'blur':'itssub'" class="itssub" type="submit" value="提交"></input>
        </div>

    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';

export default {
    data() {
        return {
            selecting: false,
            selected: false,
            subjects: {
                0: '前端',
                1: '后台',
                2: '安卓',
                3: '嵌入式'
            },
            sName: '',
            sClass: '',
            sPhone: '',
            sSubject: '请选择方向',
            thenote: ' ',
            control: true,
        }
    },
    methods: {
        displaySubjects() {
            this.selecting = !this.selecting;
        },
        submitAjax() {
            console.log(this.control)
            if(this.control === true) {
                if(this.sName && this.sClass && this.sPhone && this.selected) {
                    this.control = false;
                    console.log(this.control)
                    this.thenote = '* 请稍后...'
                    let sData = {
                        sNumber: this.getUserData.sNumber,
                        sName: this.sName,
                        sClass: this.sClass,
                        sPhone: this.sPhone,
                        sSubject: this.sSubject,
                        status: '',
                    }
                    //sessionStorage
                    this.$axios({
                        method: 'post',
                        url: this.$route.path,
                        data: sData,
                    }).then(result => {
                        if(result.data === 'saveSuccess') {
                            this.setUserData(sData);
                            this.$router.replace('/success');
                        }
                        this.control = true;
                    }).catch(err => {
                        this.control = true;
                        console.log(err);
                    })
                } else {
                    this.thenote = '* 请填写完整信息'
                }
            } else {
                this.thenote = '* 请不要重复提交'
            }
        },
        select(index) {
            this.sSubject = this.subjects[index];
            this.selected = true;
        },
        ...mapMutations(['setUserData']),
    },
    computed: {
        ...mapGetters(['getUserData']),
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
input::placeholder {
    color: rgba(220, 220, 220, .8);
}
.placeholder {
    text-shadow: none;
    padding-left: 5px;
    line-height: 35px;
    width: 80%;
}
.placeholder2 {
    color: rgba(220, 220, 220, .8);
}
.input-item {
    padding-left: 15px;
    margin: 20px 0;
    border: 1px solid #fff;
    border-radius: 500px;
    box-shadow: 0 2px 10px 5px rgba(0, 0, 0, .2) inset;
}


#select-subjects{
    position: relative;
    user-select: none;    
}
#subjects {
    z-index: 1;    
    position: absolute;
    margin: 0;
    padding: 0; 
    left: calc(10% - 8px); 
    padding: 8px;
    width: 80%;
    border: 1px solid white;
    box-shadow: 0 2px 10px 5px rgba(0, 0, 0, .2);
    background-color: rgba(50, 50, 50, .2);
    border-radius: 0 0 10px 10px;
}
.subject {
    cursor: pointer;
    padding: 5px;
    color: white;
    border-bottom: 1px solid rgba(100, 100, 100, .2); 
}
.subject:hover {
    background-color: rgba(0, 0, 0, .2);
}

li {
    list-style: none;    
}
#the-arrow {
    position: absolute;
    right: 15px;
    top: 10px;
    cursor: pointer;
    transition: all .3s;
}
.arrow-selecting {
    transform: rotateX(180deg) rotateY(180deg);
}



#notes {
    margin-left: 7%;
    height: 21px;
}


#thesubm {
    cursor: pointer;
    border-color: #2CAC62;
    background-color: #2CAC62;
    box-shadow: 0 7px 30px 10px rgba(255, 255, 255, .2) inset, 0 1px 4px 0 rgba(0, 0, 0, .2);
}
.itssub {
    margin-left: 8%;
    cursor: pointer;
}
.blur {
    filter: blur(2px);    
}



@media screen and (min-width: 600px) {
    #container {
        width: 450px;
        margin: 0 auto;
    }
}
</style>