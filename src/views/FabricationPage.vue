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
            <li>
                {{ $t('fabrication.caution_list3') }}
                <mark>
                    {{ $t('fabrication.caution_list3_mark') }}
                </mark>
            </li>
        </ul>
        <p style="font-size: 11.5px;">
            {{ $t('fabrication.subcaution') }}
        </p>
    </figure>

    <form>
        <fieldset>
            <legend>{{ $t('start.fabrication_desc2_title2') }}</legend>

            <div class="inOneLine-form">
                <label for="modelSelect">{{ $t('android.type') }}:</label>

                <select v-model="selectedModel" class="android-attribute" id="modelSelect">
                    <option v-for="model in models" :key="model">
                        {{ model.name }}
                    </option>
                </select>

                <label for="typeSelect">{{ $t('android.model') }}:</label>

                <select v-if="selectedModel != 'YoRHa'" v-model="selectedType" 
                class="android-attribute" id="typeSelect" disabled/>

                <select v-else-if="selectedModel == 'YoRHa'" v-model="selectedType" 
                class="android-attribute" id="typeSelect">
                    <template v-for="(typeA, index) in types" :key="index">
                        <option v-if="typeA.name != 'NoType'">
                            {{ typeA.name }}
                        </option>
                    </template>
                </select>
            </div>
                
            <div class="inOneLine-form">
                <label class="margin-right-input" for="inputText">{{ $t('start.fabrication_desc2_info1') }}:</label>

                <input v-if="(selectedModel != 'YoRHa' && selectedModel != 'Special')"  
                type="text" class="android-attribute" id="inputText" style="padding-right: 0px;" disabled/>

                <input v-else-if="(selectedModel != 'YoRHa' && selectedModel == 'Special')" 
                v-model="androidName" type="text" class="android-attribute" 
                :placeholder="$t('fabrication.insert_name')" :maxlength="25" id="inputText" 
                style="padding-right: 0px;"/>

                <input v-else-if="(selectedModel == 'YoRHa' && selectedModel == undefinded)" 
                :value="selectedType.name" type="text" class="android-attribute" 
                id="inputText" style="padding-right: 0px;" disabled/>

                <input v-else :value="selectedModel + ' Type ' + selectedType.charAt(0)"  
                type="text" class="android-attribute" id="inputText" style="padding-right: 0px;" 
                disabled/>

                <label for="selectAppearance" class="margin-right-input">{{ $t('android.appearance') }}:</label>

                <select v-model="selectedAppearance" class="android-attribute" id="selectAppearance">
                    <option v-for="a in appe" :key="a">{{ a.name }}</option>
                </select>
            </div>
                
            <label for="textarea">{{ $t('android.biography') }}:</label>
            <textarea v-model="bio" class="full" id="textarea" rows="8" 
            v-bind:placeholder="$t('placeholder.android_content')" :maxlength="350" style="padding-right: 0px;"></textarea>

            <p v-if="(selectedModel == 'YoRHa' && selectedType == 'Operator')" 
            style="font-size:small; font-style: normal;">
                <cite>{{ $t('fabrication.operator_info') }}</cite>
            </p>

            <button v-if="selectedModel == '' " type="submit" class="button-menu" style="margin-top: 10px;" disabled>
                {{ $t('form.submit') }}
            </button>

            <button v-else-if="(selectedModel == 'YoRHa' && selectedType == '')" 
            type="submit" class="button-menu" style="margin-top: 10px;" disabled>
                {{ $t('form.submit') }}
            </button>

            <button v-else-if="selectedModel == 'Special' && androidName == ''" type="submit" 
            class="button-menu" style="margin-top: 10px;" disabled>
                {{ $t('form.submit') }}
            </button>

            <button v-else type="button" @click="addAndroid()" class="button-menu" style="margin-top: 10px;">{{ $t('form.submit') }}</button>
        </fieldset>
    </form>

    <hr/>

</template>

<script>
import { connection } from '@/services/ApiConnection'
import messageModal  from '../utils/MessageModal.mjs'
import axios from "axios"
import { useLoadingStore } from '../stores/LoadingStore';

  export default {
    el: 'FabricationPage',
    components: {
        
    },
    data(){
        return{
            selectedType: "",
            selectedModel: "",
            selectedAppearance: "Female",
            androidName: "",
            bio: "",
            newAndroid: {},
        }
    },
    props: {
        types: {
            type: Object,
            req: true
        },
        models: {
            type: Object,
            req: true
        },
		appe: {
			type: Object,
			req: true
		},
        androids: {
            type: Object,
			req: true
        }
    },
    mixins: [messageModal],
    methods: {
        /**
         * This method is going to set an Android on point to send it to the API.
         */
        async addAndroid(){
            const loadingStore = useLoadingStore();
            loadingStore.showLoader();

            //Initializes number to 0 because we want to now if there is another android of this type.
            let androidNumber = 0;

            console.log(this.selectedAppearance)

            //Search the complete object depends on the name selected on the view.
            let androidAppearance = this.appe.find( 
                appearance => appearance.name == this.selectedAppearance );
            var androidModelSel = this.models.find( 
                model => model.name == this.selectedModel );

            var androidTypeSel = this.selectedModel == "YoRHa" ? 
                this.types.find( 
                    type => type.name == this.selectedType ) :
                this.types.find( 
                    type => type.name == 'NoType');

            //To set the number, needs to now if there is another android with this type created. The Special models doesn't
            //have a number higher than 0.
            this.androids.forEach(android => {
                if( android.type != null && android.type.name == this.selectedType 
                && androidNumber <= android.type_number ){ 
                    androidNumber = android.type_number + 1;

                }
            });

            //If there is no android with the type selected and it is a YoRHa model, the number will be 1 because
            //it's going to be the first of its type.
            if( androidNumber == 0 && this.selectedModel == "YoRHa" ){
                androidNumber = 1;
                
            }

            //This boolean was created to see if the android is an Operator or not because the way the API treat the
            //data.
            let isOperator = androidTypeSel.name === "Operator";
            let isExecutioner = androidTypeSel.name === "Executioner";

            //The YoRHa model doesn't have any name because it's going to be created at the API with all the android 
            //data obtained from the view.
            var name = androidModelSel.name === "Special" ? this.androidName : "";

            var newAndroid = {
                name: name, modelId: androidModelSel.id, 
                typeId: androidTypeSel.id, 
                type_number: androidNumber, 
                appearanceId: androidAppearance.id, 
                desc: this.bio, 
                isOperator: isOperator,
                isExecutioner: isExecutioner
            };

            console.log(newAndroid)

            //This is the connection, a HTTP POST request using axios
            await axios.post(connection + "androids", JSON.stringify(newAndroid), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                console.log("API Answer: " + res)
                this.msg = this.createMessage(
                    messageModal.data().httpMethod.CREATE, 
                    messageModal.data().object.ANDROID, 
                    messageModal.data().status.SUCCESSFUL
                );
            })
            .catch((error) => this.msg = this.createMessage("", "", messageModal.data().status.ERROR)
            );

            loadingStore.hideLoader();

        }
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

    .data-figure{
      background-color: #dcd8c06b;
      
    }

    .android-attribute{
        margin-right: 18px;
    }

    @media only screen and (max-width: 602px){
        .android-attribute {
            width: 100%;
        }
    }

    @media only screen and (min-width: 602px){
        .android-attribute {
            width: 10em;
        }
    }

    @media only screen and (min-width: 700px){
        .android-attribute {
            width: 12em;
        }
    }

    @media only screen and (min-width: 992px) {
        .android-attribute {
            width: 20%;
        }
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
    
    .margin-right-input{
        margin-right: 15px;
    }
</style>
