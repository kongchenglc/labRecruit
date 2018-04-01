<template>
    <div id="container">

        <h1 id="subTitle">ThoughtCoding</h1>
        <section>
            <h4>
                很遗憾，报名入口已关闭。
            </h4>
        </section>

    </div>
</template>

<script>

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
    padding: 7%;
    border: 1px solid white;
    border-radius: 35px;
    box-shadow: 0 2px 10px 5px rgba(0, 0, 0, .2) inset;
    text-align: center;
    line-height: 200px;
}




@media screen and (min-width: 600px) {
    #container {
        width: 450px;
        margin: 0 auto;
    }
}
</style>