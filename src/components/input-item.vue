<template>
    <div class="input-item">
        <slot></slot>
        <input :type="itemtype" :class="{'itssub':isSub}">
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    props: ['itemtype'],
    computed: {
        isSub() {
            return this.itemtype === 'submit'
        }
    }
}
</script>

<style scoped>
input {
    background: transparent;
    border: none;
    outline: none;
    color: #fff;
    width: 80%;
    line-height: 35px;
    font-size: 20px;
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