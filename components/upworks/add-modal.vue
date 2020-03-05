<template>
  <div>
    <div class="n-modal">
      <div class="n-modal-content">
        <div class="n-modale-close" @click="toggleModal">x</div>
        <div class="n-m-title">
          <div class="n-m-title-info-bloks">
            Добавить - 
          </div>
          <div class="n-m-title-info-bloks">
            <div class="header">
              Тип
            </div>
            <div class="value">
              {{form.type | capitalize}}
            </div>
          </div>
          <span> - </span>
          <div class="n-m-title-info-bloks">
            <div class="header">
              Заголовок
            </div>
            <div class="value">
              {{form.title}}
            </div>
          </div>
        </div>
        <div>
          <form @submit.prevent="add($event)">
            <div class="block">
              <div class="n-form-group">
                <select name="type" id="type" class="n-input w-100" v-model="form.type">
                  <option value="" disabled selected>Тип работы</option>
                  <option value="backend">Backend</option>
                  <option value="frontend">Frontend</option>
                  <option value="any">Any</option>
                </select>
              </div>
              <div class="n-form-group">
                <input type="text" name="title" class="n-input w-100" v-model="form.title" placeholder="Заголовок">
              </div>
            </div>
            <div class="block">
              <div class="works-title">Работы</div>
              <div class="n-form-group">
                <div v-for="(work, index) in form.works" :key="index">
                  <input 
                    type="text" 
                    name="work" 
                    class="n-input w-95" 
                    placeholder="Работа" 
                    v-model="work.name" 
                    @keydown.tab="addWork" 
                  >
                  <span class="btn-x" @click="dellWork(work._id)">x</span>
                </div>
                <div class="btn-add-work" @click="addWork">+</div>
              </div>
            </div>
            <div class="block n-form-group text-right">
              <button class="n-button-green">Добавить</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['toggleModal', 'pushStatus'],
  data() {return {
    form: {
      title: '',
      type: '',
      works: [
        {
          _id: Date.now(),
          name: '',
          status: false
        }
      ]
    }
  }},
  mounted() {
    document.body.addEventListener('keyup', e => {
      if (e.keyCode === 27) {
        this.toggleModal()
      }
    })
  },
  methods: {
    add(event) {
      this.$axios
          .post(`/crm/upworks/add`, this.form)
          .then(res => {
            this.pushStatus()
            this.$store.commit('upworks/add', res.data.resultat)
            event.target.reset();
            this.$notify({
              group: 'foo',
              status: "Успешно",
              text: res.data.msg,
              type: 'success'
            })
            this.toggleModal()  
          })
          .catch(error => {
            this.$notify({
              group: 'foo',
              status: error.status,
              text: error.response.data.msg,
              type: 'error'
            })
          })
    },
    addWork() {
      this.form.works.push({
          _id: Date.now(),
          name: '',
          status: false
        })
    },
    addWorkKey(event) {
      console.log(event);
      
    },
    dellWork(_id) {
      this.form.works = this.form.works.filter( work => work._id !== _id )
    }
  }
  // filters: {
  //   capitalize: function (value) {
  //     if (!value) return ''
  //     value = value.toString()
  //     return value.charAt(0).toUpperCase() + value.slice(1)
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.w-95 {
  width: 94%
}

.btn-x {
  font-weight: 600;
  font-size: 1.5rem;
  color: rgb(189, 80, 80);
  cursor: pointer;
  padding: .5rem;
  max-width: 5%;

  &:hover {
    background: rgb(189, 80, 90);
    color: white;
  }
}
.block {
  background: white;
  border-radius: 3px;
  padding: .5rem;
  box-shadow: 0px 2px 2px gray;
  margin-bottom: 1rem;

  &:nth-child(1) {
  }
}
.works-title {
  margin: 0 1rem;
  font-weight: 600;
  color: #2196f3;
}

.btn-add-work{
  margin-top: .5rem;
  padding: .5rem;
  text-align: center;
  border: solid 1px green;
  color: green;
  font-weight: 600;
  font-size: 1.2rem;
  cursor: pointer;
}

</style>