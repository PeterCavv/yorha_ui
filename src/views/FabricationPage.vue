<template>
    <br/><br/><br/>
    <hr/>
    <h1 style="text-align:left; padding-left:2rem;">
        <span>
            {{ $t('start.fabrication_title') }}
            <font size="4">
                {{ $t('fabrication.subtitle') }}
            </font>
        </span>
    </h1>	

    <h2>
        {{ $t('fabrication.form_title') }}
    </h2>

    <figure>
        <figcaption style="font-weight:bold;">{{ $t('fabrication.caution') }}</figcaption>
        <p>{{ $t('fabrication.caution_message') }}</p>
        <ul>
            <li>{{ $t('fabrication.caution_list1') }}</li>
            <li>{{ $t('fabrication.caution_list2') }}</li>
            <li>{{ $t('fabrication.caution_list3') }}
                <mark>
                    {{ $t('fabrication.caution_list3_mark') }}
                </mark>
            </li>
        </ul>
        <p style="font-size: 11.5px;">
            {{ $t('fabrication.subcaution') }}
        </p>
    </figure>

        <fieldset>
                <legend>{{ $t('start.fabrication_desc2_title2') }}</legend>
                <span>
                    <label>{{ $t('start.fabrication_desc2_info2') }}:</label>
                    &nbsp;
                    <select v-model="selectedModel" style="width: 15rem; margin-right: 18px;">
                        <option v-for="model in models" :key="model">
                            {{ model.name }}
                        </option>
                    </select>

                    <label>{{ $t('start.fabrication_desc2_info3') }}:</label>
                    &nbsp;
                    <select v-if="selectedModel != 'YoRHa'" v-model="selectedType" style="width: 15rem; margin-right: 18px;" disabled/>
                    <select v-else-if="selectedModel == 'YoRHa'" v-model="selectedType" style="width: 15rem; margin-right: 18px;">
                        <option v-for="typeA in types" :key="typeA" >
                            {{ typeA.name }}
                        </option>
                    </select>
                
                    <br/><br/>
                    <label for="text">{{ $t('start.fabrication_desc2_info1') }}:</label>
                    &nbsp;
                    <input v-if="(selectedModel != 'YoRHa' && selectedModel != 'Special')"  type="text" 
                    style="width: 15rem; margin-right: 18px;" disabled/>
                    <input v-else-if="(selectedModel != 'YoRHa' && selectedModel == 'Special')" v-model="androidName" id="specialModel" 
                    type="text" style="width: 15rem; margin-right: 18px;" :placeholder="$t('fabrication.insert_name')" :maxlength="25"/>
                    <input v-else-if="(selectedModel == 'YoRHa' && selectedModel == undefinded)" :value="selectedType.name" type="text" 
                    style="width: 15rem; margin-right: 18px;" disabled/>
                    <input v-else :value="selectedModel + ' Type ' + selectedType.charAt(0)"  id="yorhaModel" type="text" style="width: 15rem; 
                    margin-right: 18px;" disabled/>

                    <label>{{ $t('start.fabrication_desc2_title1') }}:</label>
                    &nbsp;
                    <select v-model="selectedAppearance" style="width: 15rem; margin-right: 18px;">
                        <option v-for="a in appe" :key="a">{{ a.name }}</option>
                    </select>
                </span>

                <p>
                    <label for="textarea">{{ $t('start.fabrication_desc2_info4') }}:</label>
                    <textarea v-model="bio" class="full" id="textarea" rows="8" placeholder="This android..." :maxlength="500"></textarea>
                </p>
                <p v-if="(selectedModel == 'YoRHa' && selectedType == 'Operator')" style="font-size:small; font-style: normal;">
                    <cite>{{ $t('fabrication.operator_info') }}</cite></p>
                <button v-if="selectedModel == '' " type="submit" class="button-menu" disabled>{{ $t('form.submit') }}</button>
                <button v-else-if="(selectedModel == 'YoRHa' && selectedType == '')" type="submit" class="button-menu" disabled>
                    {{ $t('form.submit') }}
                </button>
                <button v-else-if="selectedModel == 'Special' && androidName == ''" type="submit" class="button-menu" disabled>
                    {{ $t('form.submit') }}
                </button>
                <button v-else type="button" @click="addAndroid()" class="button-menu">{{ $t('form.submit') }}</button>
        </fieldset>
    <hr/>
</template>

<script>
import { connection } from '@/services/ApiConnection'

  export default {
    el: 'FabricationPage',
    components: {},
    data(){
        return{
            showCreate: false,
            selectedType: "",
            selectedModel: "",
            selectedAppearance: "Female",
            androidName: "",
            saveName: "",
            bio: "",
            types: [],
            models: [],
            appe: [],
            androids: [],
            state: []
        }
    },
    methods: {
        changeName(){
            switch (this.selectedModel){
                case "YoRHa":
                    this.androidName = document.getElementById("yorhaModel").value;
                    console.log(this.androidName);
                    break;
                case "Special":
                    this.androidName = document.getElementById("specialModel").value;
                    console.log(this.androidName);
                    break;
                default:
                    break;
            }
        },
        async getTypes(){
            await fetch(connection + "types")
            .then(response => response.json())
            .then(data =>{
                this.types = data;
            })
        },
        async getModels(){
            await fetch(connection + "models")
            .then(response => response.json())
            .then(data =>{
                this.models = data;
            })
        },
        async getAppearances(){
            await fetch(connection + "appearances")
            .then(response => response.json())
            .then(data =>{
                this.appe = data;
            })
        },
        async getStates() {
            await fetch(connection + "states")
            .then(response => response.json())
            .then(data =>{
                this.state = data;
            })
        },
        async getAndroids() {
            await fetch(connection + "androids")
            .then(response => response.json())
            .then(data =>{
                this.androids = data;
            })
        },
        async addAndroid(){
            let androidNumber = 0;

            this.androids.forEach(android => {
                if(android.type != null && android.type.name == this.selectedType && androidNumber <= android.type_number){ 
                    androidNumber = android.type_number + 1;
                }
            });
            if(androidNumber == 0){
                androidNumber = 1;
            }

            let androidAppearance = this.appe.find(element => element.name == this.selectedAppearance);
            let androidModelSel = this.models.find(element => element.name == this.selectedModel);
            let androidTypeSel = this.types.find(element => element.name == this.selectedType);
            let stateAndroid = this.state.find(element => element.name == "Operational");
            this.saveName = this.selectedModel + " No." + androidNumber + " Type " + this.selectedType.charAt(0);
            let shortName = androidNumber + this.selectedType.charAt(0);

            var newAndroid = {name: this.saveName, short_name: shortName, modelId: androidModelSel.id, typeId: androidTypeSel.id, 
            type_number: androidNumber, appearanceId: androidAppearance.id, stateId: stateAndroid.id, desc: this.bio};

            console.log(newAndroid);
        
            await fetch(connection + "androids", {
                method: "POST", 
                body: JSON.stringify(newAndroid),
                headers:{
                    "Content-Type": "application/json"
                }
            })
            .then((res) => res.json())
            .catch((error) => console.error("Error: " + error))
            .then((response) => console.log("Success: " + response))
        }
    },
    mounted() {
        this.getTypes();
        this.getModels();
        this.getAppearances();
        this.getAndroids();
        this.getStates();

    }
  }
</script>

<style>
    .full { 
      width: 100% 
    }

    #menu{
      text-transform: uppercase;
    }

    .button-menu{
      text-align: left;
      padding-right: 10rem; 
      width: 10rem;
      text-align: center;
    }

    .button-list{
      text-align: left;
      padding-right: 10rem; 
      width: 15rem;
    }

    .data-figure{
      background-color: #dcd8c06b;
    }

    .button-submit{
      text-align: center;
      padding-right: 10rem; 
      width: 6rem;
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

    .mayus{
      font-weight: normal;
      text-transform: uppercase;

    }
</style>
