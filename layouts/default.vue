<template>
<div>
  <div class="grids" v-if="$auth.loggedIn">
    <TopNavBar />
    <LeftNavBar />
    <div class="content">
      <nuxt />
    </div>
  </div>
  <div v-else>
    <LoginForm />
  </div>
  <notifications group="foo" position="bottom right" />
</div>
</template>
<script>
import LoginForm from '@/components/auth/form'
import TopNavBar from '@/components/navigate/TopNavBar'
import LeftNavBar from '@/components/navigate/LeftNavBar'
export default {
  middleware: '',
  components: {
    TopNavBar,
    LoginForm,
    LeftNavBar
  },
}
</script>

<style lang="scss" scoped>
.grids {
  display: grid;
  height: 100vh;
  grid-template: auto 1fr / auto 1fr;
}

.grids div:nth-child(1){
  grid-column: 1 / -1;
}

.grids div:nth-child(2){
  grid-row: 2 / -1;
}
</style>
