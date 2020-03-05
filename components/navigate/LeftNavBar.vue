<template>
    <div class="left-bar n-bg-gblue">
        <b-link class="item" to="stores" active-class="item-active">
            <font-awesome-icon :icon="['fas', 'store']"  />
        </b-link>
        <b-link to="upwork" active-class="item-active" class="item">
            <font-awesome-icon icon="pen-square"/>
        </b-link>
        <b-link to="catalogs" active-class="item-active" class="item">
            <font-awesome-icon icon="list" />
        </b-link>
        <b-link to="settings" active-class="item-active" class="item">
            <font-awesome-icon icon="cog"/>
        </b-link>
    </div>
</template>

<script>
    export default {
        methods:{
            log(event) {
                console.log(event)
            }
        }
    }
</script>

<style lang="scss" scoped>
.left-bar{
    .item-active {
        background-color: rgba(0, 0, 0, 0.2);
    }
    .item {
        display: block;
        cursor: pointer;
        padding: 10px;
        color: whitesmoke;
        transition: 0.3s;
    }

    .item:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
}
</style>