<template>
    <div>
        <h4 class="p-1 text-center text-dark m-0 n-border-h">Новые заявки</h4>
        <div class="table">
            <div class="t-head bg-dark text-light">
                <div>Пользователь</div>
                <div>Название</div>
                <div>Полное Имя</div>
                <div>Номер телефона</div>
                <div>Статус</div>
                <div>Действие</div>
            </div>
            <div v-for="(store, key) in stores" :key="key">
                <div v-if="!store.status" class="t-content">
                    <div>{{store.login}}</div>
                    <div>{{store.storeName}}</div>
                    <div>{{store.fullName}}</div>
                    <div>{{store.phone}}</div>
                    <div :class="{'bg-warning':!store.status}">{{store.status}}</div>
                    <div class="cursor-pointer" @click="openChange(store._id)"><font-awesome-icon icon="cog"/></div>
                </div>
            </div>
        </div>
        <Modal v-if="show" :openChange="openChange" :change="change" />
    </div>
</template>

<script>
import Modal from '@/components/stores/change-modal'
export default {
    data(){return{
        stores: this.$store.getters['stores/getData'],
        show: false,
        change: {}
    }},
    components: {
        Modal
    },
    middleware: 'GetStores',
    methods: {
        openChange(_id){
            this.change = this.$store.getters['stores/getOne'](_id)
            this.show = !this.show
        }
    }
}
</script>

<style lang="scss" scoped>
$table-grid-template: auto / 2fr 2fr 3fr 3fr 1fr 1fr; 

.t-head {
  display: grid;
  grid-template: $table-grid-template;
  text-align: center;
}

 .t-head div{
   padding: 5px;
 }

 .t-content {
     
     &:nth-child(1) {
        display: grid;
        grid-template: $table-grid-template;
        text-align: center;
     }
 }

 .t-content div:nth-child(odd){
     background-color: rgba(17, 17, 17, 0.158);
 }

</style>