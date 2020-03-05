<template>
    <div class="top-bar n-bg-dblue text-light">
      <div class="item">
        <div class="px-2">N</div>
      </div>
      <div class="item item-right">
        <b-link class="text-light pr-2" @click="logout">Logout</b-link>
      </div>
    </div>
</template>

<script>
    export default {
        methods: {
          logout() {
            this.$auth.logout()
            console.log('132');
            
            
          }
        }
    }
</script>

<style lang="scss" scoped>
.top-bar {
  
}
.item {
  display: inline-block;
  padding: 5px;
}

.item-right{
  float: right;
}
</style>