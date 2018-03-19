<template>
    <div id="container">
        
        <h1 id="subTitle">ThoughtCoding</h1>

        <div id="search-div">
            <input v-model="searchText" id="search-input" type="text" placeholder="搜索" @keyup.enter="search">
            <i id="search-ico" class="fa fa-search" @click="search"></i> 
        </div>
        
    </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
    data() {
        return {
            searchText: '',
        }
    },
    methods: {
        search() {
            if(this.searchText) {
                console.log(this.searchText);
                this.$axios({
                    method: 'post',
                    url: this.$route.path,
                    data : {
                        searchText : this.searchText,
                    }
                }).then(result => {
                    console.log(result.data);
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

@media screen and (min-width: 600px) {
    #container {
        width: 450px;
        margin: 0 auto;
    }
}
</style>
