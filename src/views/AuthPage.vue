<template>
    <div class="center-container">
        <div class="inOneLine-vertical-center" style="text-transform: uppercase; opacity: 0.90; 
        letter-spacing: 0.5rem; text-shadow: 0.3rem 0.3rem 0 #bab5a1; font-weight: normal; margin-bottom: 15px;">
            <span v-animated-text style="font-size: 5rem;">
                {{ $t('auth.title') }}
            </span>
            <span v-animated-text style="text-shadow: 0em 0em 0em; letter-spacing: 0.1rem; font-size: 1.1rem; ">
                {{ $t('auth.subtitle1') }}
            </span>
            <span v-animated-text style="text-shadow: 0em 0em 0em; font-size: 0.8rem; letter-spacing: 0.5rem;">
                {{ $t('auth.subtitle2') }}
            </span>
        </div>

        <div>
            <div class="inOneLine-vertical-center" v-if="hideButton">
                <input v-expand-input id="name" v-model="inName" type="text" style="margin-bottom: 5px; 
                width: 15rem;" v-bind:placeholder="$t('loggin.user')">
                <input v-expand-input id="pass" v-model="inPass" type="password" style="margin-bottom: 20px; 
                width: 15rem;" v-bind:placeholder="$t('loggin.password')">
                <small style="margin-bottom: 15px;" v-if="errors">
                    {{ $t('auth.error_pass_message') }}
                </small>
                <button @click="wait()" class="button" style="text-align: center; 
                text-transform: uppercase; width: 10rem;">
                    {{ $t('auth.button') }}
                </button>
                <a @click="showModal = true" style="margin-top: 15px;">{{ $t('auth.modal.message_link') }}</a>
            </div>

            <h3 v-if="!hideButton" class="inOneLine" style="text-transform: uppercase; letter-spacing: 0.5rem;">
                {{ $t('auth.loading_message1') }}
                <small style="text-transform:none;letter-spacing: 0.2rem;">
                    {{ $t('auth.loading_message2') }}
                </small>
            </h3>
            <h5 v-if="!hideButton" class="fuente centrado">
                {{ $t('auth.loading_success') }}
            </h5>
        </div>

        <Transition name="fade">
            <div v-if="showModal" class="modal-overlay" @click="showModal = false">
                <InfoWindow class="center-container" :addWindow="showModal">
                    <template #title>
                        {{ $t('auth.modal.questions') }}
                    </template>
                    <template #body>
                        <div class="dataScroll" style="height: 400px;">
                            <h2>{{ $t('auth.modal.message_link') }}</h2>
                            <p>
                                <b>{{ $t('auth.modal.sing_up_answer_bold') }}</b> 
                                {{ $t('auth.modal.sing_up_answer') }}
                            </p>
                            <h2 style="margin-top: 40px;">
                                {{ $t('auth.modal.admin_question') }}
                            </h2>
                            <p>
                                {{ $t('auth.modal.admin_answer') }}
                                <b>{{ $t('auth.modal.link') }}</b>.
                                {{ $t('auth.modal.admin_answer_2') }}
                            </p>
                                <ul>
                                    <li>
                                        <b>{{ $t('auth.modal.mail_bold') }}</b>
                                        {{ $t('auth.modal.mail') }}                                    
                                    </li>
                                    <br/>
                                    <li>
                                        <b>{{ $t('auth.modal.role_bold') }}</b>
                                        {{ $t('auth.modal.role') }}
                                    </li>
                                </ul>
                            <p>
                                {{ $t('auth.modal.admin_answer_3') }}
                            </p>
                            <h2>
                                {{ $t('auth.modal.password_question') }}
                            </h2>
                            <p>
                                {{ $t('auth.modal.password_answer') }}
                                <b>{{ $t('auth.modal.link') }}</b> 
                                {{ $t('auth.modal.password_answer_2') }}</p>
                            
                                
                        </div>
                    </template>
                </InfoWindow>
            </div>
        </Transition>
    </div>
</template>

<script>
import { storeToRefs } from 'pinia';
import { connection } from '../services/ApiConnection'
import { useAuthStore } from '../stores/UserStore';
import InfoWindow from '../components/InfoWindow.vue';
import { ref } from 'vue';

    export default {
        name: 'App',
        data() {
            return{
                showData: 0,
                hideButton: true,
                errors: false,
                inName: null,
                inPass: null,
                users: [],
                userLogged: false
            }
        },
        components: {
            InfoWindow
        },
        setup() {
            const store = useAuthStore();
            return{
                ...storeToRefs(store),
                setRole: store.setRole,
                role: store.user.role,
                showModal: ref(false)
            }
        },
        methods: {
            async getUsers() {
                await fetch(connection + "users")
                    .then(response => response.json())
                    .then(data => {
                    this.users = data;
                });
            },
            wait(){
                if(this.existUser()){
                    this.hideButton = false;
                    setTimeout(() => {this.setRole('admin'); this.$router.push({name: 'startmenu'})}, 10000);
                } else {
                    return false;
                }
            },
            existUser(){
                for(var value of this.users){
                    if(value.user_name !== undefined || value.password !== undefined){
                        if(value.user_name == this.inName && value.password == this.inPass){
                            return true;
                        } 

                        if(value == this.users[this.users.length - 1]){
                            this.errors = true;
                            this.inPass = null;
                            return false;
                        }
                    }
                }
            }
        },
        mounted() {
            this.getUsers();
        }
    }
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.715);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

#menu{
  text-transform: uppercase;
}

.info{
    font-weight: bold;
} 

.centrado{
  text-align: center;
}
.fuente{
  overflow: hidden;
  white-space: nowrap;
  margin: 0 auto;
  border-right: 0.1rem solid #454138;
  animation: typing 1.5s steps(39) 5s 1 normal both, blink 1s steps(1) infinite;
}
@keyframes typing {
  from {
      width: 0;
  }to {
      width: 18rem;
  }
}

@keyframes blink {
  50% {
    border-color: transparent;
  }
}
.mayus{
  font-weight: normal;
  text-transform: uppercase;

}
</style>