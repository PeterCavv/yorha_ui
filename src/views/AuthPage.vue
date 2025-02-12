<template>
    <div class="center-container">
        <div class="inOneLine-vertical-center" style="text-transform: uppercase; opacity: 0.90; 
        letter-spacing: 0.5rem; text-shadow: 0.3rem 0.3rem 0 #bab5a1; font-weight: normal; margin-bottom: 15px;">
            <span style="font-size: 5rem;">
                {{ $t('auth.title') }}
            </span>
            <span style="text-shadow: 0em 0em 0em; letter-spacing: 0.1rem; font-size: 1.1rem; ">
                {{ $t('auth.subtitle1') }}
            </span>
            <span style="text-shadow: 0em 0em 0em; font-size: 0.8rem; letter-spacing: 0.5rem;">
                {{ $t('auth.subtitle2') }}
            </span>
        </div>

        <div>
            <div class="inOneLine-vertical-center" v-if="hideButton">
                <input id="name" v-model="inName" type="text" style="margin-bottom: 5px; 
                width: 15rem;" v-bind:placeholder="$t('loggin.user')">
                <input id="pass" v-model="inPass" type="password" style="margin-bottom: 20px; 
                width: 15rem;" v-bind:placeholder="$t('loggin.password')">
                <small style="margin-bottom: 15px;" v-if="errors">
                    {{ $t('auth.error_pass_message') }}
                </small>
                <button @click="wait()" class="button" style="text-align: center; 
                text-transform: uppercase; width: 10rem;">
                    {{ $t('auth.button') }}
                </button>
                <a @click="showModal = true" style="margin-top: 15px;">How can I sing up?</a>
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
                        Questions & Answers
                    </template>
                    <template #body>
                        <div class="dataScroll" style="height: 400px;">
                            <h2>How can I sing up?</h2>
                            <p><b>You can't create an account on your own.</b> If you want to enter into YoRHa's terminal, it is 
                            necessary to talk to an administrator.</p>

                            <h2 style="margin-top: 40px;">Where can I find an Administrator?</h2>
                            <p>You can contact to the main administrator of the terminal by clicking <b>here</b>.
                            It is very important that you provide some data:</p>
                                <ul>
                                    <li>
                                        <b>Email</b>: You need to provide your email to recive important information from the terminal.
                                    </li>
                                    <br/>
                                    <li>
                                        <b>Role</b>: Priviliges you want to have (Operator, Executioner or User).
                                    </li>
                                </ul>
                            <p>When the admin creates your account, it will send to you your credentials to access to the terminal.
                                When you long in, please remember to change your password and username.
                            </p>
                            <h2>I forgot my password and/or user</h2>
                            <p>If you forgot your credentials to access to the terminal, just click <b>here</b> and follow the instructions.</p>
                            
                                
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