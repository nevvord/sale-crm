<template>
  <div>
    <div class="n-modal">
      <div class="n-modal-content">
        <div class="n-modale-close" @click="openChange">x</div>
        <div class="n-m-title">
          <div class="n-m-title-info-bloks">
            Изменить - 
          </div>
          <div class="n-m-title-info-bloks">
            <div class="header">
              Логин
            </div>
            <div class="value">
              {{change.login}}
            </div>
          </div>
          <span> - </span>
          <div class="n-m-title-info-bloks">
            <div class="header">
              Имя магазина
            </div>
            <div class="value">
              {{change.storeName}}
            </div>
          </div>
        </div>
        <div>
          <form @submit.prevent="update">
            <div class="n-form-group">
              <input type="text" name="login" class="n-input" v-model="change.login" placeholder="Логин">
            </div>
            <div class="n-form-group">
              <input type="text" name="full-name" class="n-input" v-model="change.fullName" placeholder="Полное имя">
            </div>
            <div class="n-form-group">
              <input type="text" name="phone" class="n-input" v-model="change.phone" placeholder="Номер телефона">
            </div>
            <div class="n-form-group">
              <input type="text" name="store-name" class="n-input" v-model="change.storeName" placeholder="Название магазина">
            </div>
            <div class="n-form-group">
              <input type="text" name="email" class="n-input" v-model="change.email" placeholder="Электронная почта">
            </div>
            <div class="n-form-group">
              <input type="text" name="mainID" class="n-input" v-model="change.mainID" placeholder="id пользователя">
            </div>
            <div class="n-form-group">
              <b-form-checkbox switch v-model="change.status" :class="{'n-text-ggreen': change.status}">Статус магазина</b-form-checkbox>
            </div>
            <div class="n-form-group">
              Дата добавления: {{change.updated}}
            </div>
            <div class="n-form-group text-right">
              <button class="n-button-green">Сохранить</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['openChange', 'change'],
  data() {return {
  }},
  methods: {
    update() {
      this.$axios
          .post(`/store/update/${this.change._id}`, this.change)
          .then(res => {
            this.$notify({
              group: 'foo',
              status: "Успешно",
              text: res.data.msg,
              type: 'success'
            })
          })
          .catch(error => {
            this.$notify({
              group: 'foo',
              status: error.status,
              text: error.response.data.msg,
              type: 'error'
            })
          })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>