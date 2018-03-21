<template>
    
    <div id="container">
        <h1 id="subTitle">ThoughtCoding</h1>

        <article>
            <section>
                <p>{{getOnesMessage}}</p>
            </section>
        </article>
    </div>


</template>

<script>
import {mapGetters} from 'Vuex'

export default {
    computed: {
        ...mapGetters(['getOnesMessage']),
    },
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

</style>
