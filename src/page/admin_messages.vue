<template>
    <div id="container">
        
        <h1 id="subTitle">ThoughtCoding</h1>

        <div id="search-div">
            <input v-model="searchText" id="search-input" type="text" placeholder="姓名、学号、方向或状态" @keyup.enter="search">
            <i id="search-ico" class="fa fa-search" @click="search"></i> 
        </div>

        <article>
            <section>
                <p class="items" v-for="(item, index) of messages" :key="index" @click="changeState(index)">
                    <span class="information">
                        {{item.sNumber}} 
                    </span>

                    <span class="information">
                        {{item.sName}} 
                    </span>
                    
                    <span class="information">
                        {{item.status === '000'
                            ? '等待沟通 ' 
                            : item.status === '100'
                                ? '一面通过 '
                                : item.status === '110'
                                    ? '二面通过 '
                                    : item.status === '111'
                                        ?'已通过   ': 'err'
                        }}
                    </span>
                    <i class="fa fa-chevron-right" id="wrench"></i>
                </p>
            </section>
        </article>
        
    </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
    data() {
        return {
            searchText: '',
            messages: {
            },
        }
    },
    methods: {
        changeState(index) {
            console.log(this.messages[index]);
            this.$store.commit('setOnesMessage', this.messages[index]);
            this.$router.push('/admin_message');
        },
        search() {
            if(this.searchText) {
                this.$axios({
                    method: 'post',
                    url: this.$route.path,
                    data : {
                        searchText : this.searchText,
                    }
                }).then(result => {
                    this.messages = result.data;
                }).catch(err => {
                    console.log(err);
                })
            }
        },
        ...mapActions(['']),
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

#search-div {
    text-align: left;
    color: #fff;
    text-shadow: 0 1px 4px rgba(0,0,0,.5);
    padding-left: 15px;
    margin: 20px 0;
    border: 1px solid #fff;
    border-radius: 500px;
    box-shadow: inset 0 2px 10px 5px rgba(0,0,0,.2);
    position: relative;
}

#search-input {
    background: transparent;
    border: none;
    padding-left: 5px;
    outline: none;
    color: #fff;
    width: 90%;
    line-height: 35px;
    font-size: 15px;
    vertical-align: baseline;
}

#search-ico {
    position: absolute;
    right: 0px;
    top: -10px;
    padding: 20px;
}

.items {
    cursor: pointer;
    padding: 5px;
    color: white;
    border-bottom: 1px solid rgba(100, 100, 100, .2);
    position: relative;
}

.information:first-child { 
    text-align: left;
}

.information:nth-child(2) {
    text-align: center;
}

.information {
    display: inline-block;
    text-align: right;
    width: 30%;
}

#wrench {
    position: absolute;
    top: 9px;
    right: 5px;
}



@media screen and (min-width: 600px) {
    #container {
        width: 450px;
        margin: 0 auto;
    }
}
</style>
