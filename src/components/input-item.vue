<template>
    <div class="input-item" @click="formSubmit">
        <slot></slot>
        <input :type="itemtype" :class="{'itssub':isSub}" :value="itemvalue" :placeholder="itemhold">
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    props: ['itemtype', 'itemvalue', 'itemhold'],
    computed: {
        isSub() {
            return this.itemtype === 'submit'
        }
    },
    methods: {
        formSubmit() {
            this.isSub && this.submitAjax();
        },
        submitAjax() {
            // $store.
            this.$axios({
                method: 'get',
                url: 'http://localhost:8080/#/',
            }).then((result)=>{
                console.log(result.headers);
            })
        }
    }
}
</script>

<style scoped>
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
    box-shadow: 0 1px 4px rgba(0, 0, 0, .2) inset;
}

.itssub {
    margin-left: 8%;
    cursor: pointer;
}
</style>