<template>
    <div id="container">
        <h1 id="subTitle">ThoughtCoding</h1>

         <div class="input-item">
            &nbsp;<i class="fa fa-user"></i>
            <input type="text" required placeholder="请输入姓名" v-model="sNumber"></input>
        </div>

        <div class="input-item">
            <i class="fa fa-group"></i>
            <input type="text" required placeholder="请输入班级" v-model="sNumber"></input>
        </div>


        <div class="input-item">
            &nbsp;<i class="fa fa-phone"></i>
            <input type="tel" required placeholder="请输入电话号码" v-model="sNumber"></input>
        </div>

        
        <div class="input-item" id="select-subjects">
            <i class="fa fa-laptop"></i>
            <span class="placeholder">{{"请选择方向"}}</span>
            <ul id="subjects"  v-show="selecting" >
                 <li class="subject" v-for='(item, index) of subjects' :key="index">{{item}}</li> 
            </ul>
            <i id="the-arrow" class="fa fa-chevron-down" @click="displaySubject"></i>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            selecting: false,
            subjects: ['前端','后台','安卓','嵌入式']
        }
    },
    methods: {
        displaySubject() {
            this.selecting = !this.selecting;
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
input::placeholder {
    color: rgba(220, 220, 220, .8);
}
.placeholder {
    color: rgba(220, 220, 220, .8);
    text-shadow: none;
    padding-left: 5px;
    line-height: 35px;
    width: 80%;
}
.input-item {
    padding-left: 15px;
    margin: 20px 0;
    border: 1px solid #fff;
    border-radius: 500px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, .2) inset;
}


#select-subjects{
    position: relative;
    user-select: none;    
}
#subjects {
    position: absolute;
    margin: 0;
    padding: 0; 
    left: calc(10% - 8px); 
    padding: 8px;
    width: 80%;
    border: 1px solid white;
    box-shadow: 0 1px 4px rgba(0, 0, 0, .2);
    background-color: rgba(255, 255, 255, .1);
    border-radius: 0 0 10px 10px;
}
.subject {
    cursor: pointer;
    padding: 5px;
    color: white;
}
.subject:hover {
    background-color: rgba(0, 0, 0, .1);
}

li {
    list-style: none;    
}
#the-arrow {
    position: absolute;
    right: 15px;
    top: 10px;
    cursor: pointer;
}

@media screen and (min-width: 600px) {
    #container {
        width: 450px;
        margin: 0 auto;
    }
}
</style>