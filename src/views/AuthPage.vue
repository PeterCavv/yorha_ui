<template>
    <div class="centrado" style="padding-top: 15%; text-transform: uppercase; opacity: 0.90; 
    letter-spacing: 0.5rem; text-shadow: 0.3rem 0.3rem 0 #bab5a1; font-weight: normal; opacity: 0.90;">
        <span class="centrado" style="font-size: 5rem; cursor: default;">
            {{ $t('auth.title') }}
        </span>
        <br/>
        <span style="text-shadow: 0em 0em 0em; letter-spacing: 0.1rem; font-size: 1.1rem; ">
            {{ $t('auth.subtitle1') }}
        </span>
        <br/>
        <span style="text-shadow: 0em 0em 0em; font-size: 0.8rem; letter-spacing: 0.5rem;">
            {{ $t('auth.subtitle2') }}
        </span>
    </div>
        
    <br/>

    <div class="centrado">
        <div v-if="hideButton">
            <input id="inName" v-model="inName" type="text" style="margin-bottom: 5px; 
            width: 15rem;" v-bind:placeholder="$t('loggin.user')">
            <br/>
            <input id="inPass" v-model="inPass" type="password" style="margin-bottom: 20px; 
            width: 15rem;" v-bind:placeholder="$t('loggin.password')">
            <br/>
            <small v-if="errors">
                {{ $t('auth.error_pass_message') }}
                <br/><br/>
            </small>
            <button @click="wait()" class="button centrado" style="text-align: center; 
            text-transform:uppercase; width: 10rem;">
                {{ $t('auth.button') }}
            </button>
        </div>

        <h3 v-if="!hideButton" class="centrado" style="text-transform:uppercase; letter-spacing: 0.5rem;">
            {{ $t('auth.loading_message1') }}
            <small style="text-transform:none;letter-spacing: 0.2rem;">
                {{ $t('auth.loading_message2') }}
            </small>
        </h3>
        <h5 v-if="!hideButton" class="fuente centrado">
            {{ $t('auth.loading_success') }}
        </h5>
    
    </div>
</template>

<script>
import { storeToRefs } from 'pinia';
import { connection } from '../services/ApiConnection'
import { useAuthStore } from '../stores/UserStore';

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
        setup() {
            const store = useAuthStore();
            return{
                ...storeToRefs(store),
                setRole: store.setRole,
                role: store.user.role
            }
        },
        methods: {
            showTemplate(destination){
                switch(destination){
                case "StartMenu":
                    this.showData = 1;
                    break;
                case "DataBase":
                    this.showData = 2;
                    break;
                case "System":
                    this.showData = 3;
                    break;
                default:
                    break;
                }
            },
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

<style>
.full { 
  width: 100% 
}

@media only screen and (max-width: 602px){
    .button-select{
		display:block;
		margin-bottom: 10px;
		width: 100%;
    }
}

@media only screen and (min-width: 602px){
    .button-select{
		margin-left: 40px;
		margin-right: -20px;
		width: 15em;
		display:inline-block;
    }
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