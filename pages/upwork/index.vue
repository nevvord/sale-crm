<template>
    <div>
        <div class="upworks">
            <div v-for="(upwork, index) in upworks" :key="index" class="work" :class="upwork.type">
                <div class="work-type">{{upwork.type | capitalize}}</div>
                <div class="work-title">{{upwork.title}}</div>
                <div class="work-content">
                    <div v-for="(work, i) in upwork.works" :key="i">
                      {{work.status}}
                        <b-form-checkbox value="orange" size="sm"  @change="changeWork(upwork._id, work._id)" :checked="work.status">{{work.name}}</b-form-checkbox>
                    </div>
                </div>
                <div class="btn-change" :class="{'btn-change-active':showChangeWindow[index].status}" @click="toggleChangeWindow(index)">
                    <font-awesome-icon icon="cog"/>
                </div>
                <div v-if="showChangeWindow[index].status" class="change-window">
                    <div>Изменить</div>
                    <div @click="del(upwork._id)">Удалить</div>
                </div>
            </div>
        </div>
        <AddModal v-show="showModal" :toggleModal="toggleModal" :pushStatus="pushStatus"/>
        <button class="btn-add" @click="toggleModal">
            Add
        </button>
    </div>
</template>

<script>
import AddModal from '@/components/upworks/add-modal'
export default {
    middleware: 'GetUpWorks',
    components: {
        AddModal
    },
    data(){return{
        upworks: this.$store.getters['upworks/getData'],
        showModal: false,
        showChangeWindow: [].map.call(this.$store.getters['upworks/getData'], (item, i) => {
            return {status: false}
        })
    }},
    methods: {
        toggleModal() { this.showModal = !this.showModal },
        toggleChangeWindow(index) { this.showChangeWindow[index].status = !this.showChangeWindow[index].status },
        changeWork(UpworkID, WorkID) { // Изминение статуса работы (true/false)
            this.$axios
                .get(`/crm/board/work/${UpworkID}/${WorkID}`)
                .then(res => {
                  console.log(res)
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
        pushStatus() {
            this.showChangeWindow.push({status: false})
        },
        del(_id) {
            this.$axios.delete(`crm/upworks/delete/${_id}`)
                .then(res => {
                    this.$store.commit('upworks/delete', _id)
                    this.upworks = this.$store.getters['upworks/getData']
                    this.$notify({
                        group: 'foo',
                        status: res.status,
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

<style lang="scss">
$btn-size: 0rem .8rem;

.btn-add {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  padding: .5rem;
  border: none;
  background: #bee5eb;
  color: #17a2b8;
  font-weight: 600;
  border-radius: 2px;
  transition: .3s;

  &:hover {
    background: #007bff;
    color: #bee5eb;
  }
}

$grid-padding: 1rem;
$grid-box-shadow: 0px 5px 15px rgba(0,0,0,0.15);

@media screen {
  .upworks {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: $grid-padding;
  }
}

@media screen and (min-width: 480px) {
  .upworks {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: $grid-padding;
  }
}

@media screen and (min-width: 800px) {
  .upworks {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: $grid-padding;
  }
}

@media screen and (min-width: 1000px) {
  .upworks {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: $grid-padding;
  }
}

@media screen and (min-width: 1200px) {
  .upworks {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-gap: $grid-padding;
  }
}

.upworks {
  .backend {
    background-color: #343a40;
    border-radius: 3px;
    color: #f8f9fa;

    .btn-change-active {
        background-color: #607d8b;
        
    }

    .change-window {
        background-color: #607d8b;

        div:hover {
            background-color: #506570;
        }
        
    }
  }

  .frontend {
    background-color: #17a2b8;
    border-radius: 3px;
    color: #f8f9fa;

    .btn-change-active {
        background-color: #00bcd4;
        
    }

    .change-window {
        background-color: #00bcd4;

        div:hover {
            background-color: #009688;
        }
        
    }
  }

  .any {
    background-color: #ffeeba;
    border-radius: 3px;

    .btn-change-active {
        background-color: #fff17a;
        
    }

    .change-window {
        background-color: #fff17a;

        div:hover {
            background-color: #dbcf62;
        }
        
    }
  }

  .work {
    padding: 1rem;
    position: relative;
    box-shadow: $grid-box-shadow;


    &-type {
      text-align: right;
      font-size: 11px;
    }

    &-title {
      font-size: 13px;
      font-weight: 600;
      border-bottom: 1px solid rgba(0,0,0,0.15);
    }

    .change-window {
        position: absolute;
        right: 0rem;
        bottom: -3rem;
        border-radius: 3px;
        z-index: 5;
        transition: 1s;

        div {
            padding: .3rem;
            font-size: .8rem;
            cursor: pointer;
        }
    }
    .btn-change {
      position: absolute;
      right: 0rem;
      bottom: 0rem;
      padding: .5rem;
      cursor: pointer;
      transition: .2s;
      border-top-left-radius: 3px;

      &:hover {
        color: #e91e63;
      }

      &:active {
          transform: rotate(360deg)
      }

      

    }
  }
}
</style>