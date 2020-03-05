<template>
  <b-row class="n-bg-g-dblue-gBlue n-h-100 m-0">
    <b-col cols="10" md="6" lg="4" class="mx-auto my-auto rounded n-bg-light">
      <div class="text-center lead mb-2">
        Привет!
      </div>
      <div>
        <b-form @submit.prevent="login">
          <b-form-group id="auth-login-group" label-for="auth-login-input" placeholder="Логин">
            <b-input id="auth-login-input" v-model="form.login"></b-input>
            <div class="pl-2 mt-1">
              <small v-if="!form.login">Введите логин</small>
              <small v-if="form.login && form.login.length <= 3">Логин состоит минимум из 4 символов.</small>
              <small v-if="form.login.length >= 4" class="text-success">Спасибо!</small>
            </div>
          </b-form-group>
          <b-form-group id="auth-password-group" label-for="auth-password-input" placeholder="Логин">
            <b-input type="password" id="auth-password-input" v-model="form.password"></b-input>
            <div class="pl-2 mt-1">
              <small v-if="!form.password">Введите пароль</small>
              <small v-if="form.password && form.password.length <= 5">Введите 6 или более символов</small>
              <small v-if="form.password.length >= 6" class="text-success">Верно!</small>
            </div>
          </b-form-group>
          <b-form-group class="text-center">
            <b-button type="submit" variant="success" class="w-100" :disabled="buttonState">Войти</b-button>
          </b-form-group>
        </b-form>
      </div>
    </b-col>
  </b-row>
</template>

<script>
    export default {
      computed: {
        buttonState() {
          return this.form.password.length <= 5 || this.form.login.length <= 3 ? true : false
        }
      },
      data() {
        return {
          form: {
            login: '',
            password: ''
          }
        }
			},
			methods: {
				login(){
          this.$auth.loginWith('local', {data: this.form})
						.then(res => {
              this.$notify({
                group: 'foo',
                text: 'Добро пожаловать!',
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
					// this.$axios	
					// 	.post('/crm/auth/login', this.form)
				}
			}
			
    }
</script>

