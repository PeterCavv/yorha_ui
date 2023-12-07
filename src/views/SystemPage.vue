<template>
    <br/><br/><br/>
    <hr/>
    <h1 style="text-align:left; padding-left:2rem;">
        <span>{{ $t('system.title') }}
        <font size="4">{{ $t('system.subtitle') }}</font></span>
    </h1>

    <h2>{{ $t('system.page_title') }}</h2>
    <figure>
        <figcaption>{{ $t('system.info_title') }}</figcaption>
        <p>{{ $t('system.info_desc') }} <mark>{{ $t('system.mark_desc') }}</mark> 
            {{ $t('system.info_desc2') }}</p>
        <p style="font-size: 11.5px;"><mark style=" text-transform: uppercase;">{{ $t('system.caution') }}</mark> 
            {{ $t('system.caution_desc') }}</p>
    </figure>
    <hr/>

    <nav style="margin-top: -15px;">
        <ul>
            <li><button @click="show('operator');" class="button button-menu" id="menu">
                {{ $t('system.operators') }}
                <img v-if="checkOperators" src="../assets/New_Icon.png" width="24" height="18" 
                style="vertical-align: middle; float: right;"/>
            </button></li>
            <li>&nbsp;&nbsp;&nbsp;</li>
            <li><button @click="show('type');" class="button button-menu" id="menu">{{ $t('system.types') }}</button></li>
            <li>&nbsp;&nbsp;&nbsp;</li>
            <li><button @click="show('report');" class="button button-menu" id="menu">{{ $t('system.execute') }}</button></li>
            <li>&nbsp;&nbsp;&nbsp;</li>
        </ul>
    </nav>
    <br/><br/>

    <OperatorPage :operators="operators" v-if="dataOperator"/>
    <TypePage :types="types" v-if="dataType"/>

</template>

<script>
import OperatorPage from '../components/OperatorPage.vue';
import TypePage from '../components/TypePage.vue';
import { connection } from '../services/ApiConnection';

export default {
    el: 'SystemPage',
    data() {
        return{
            dataOperator: false,
            dataType: false,
            types: [],
            operators: []
        }
    },
    components: {
        OperatorPage,
        TypePage
    },
    methods: {
        async getTypes() {
            this.types = [];
            await fetch(connection + "types")
            .then(response => response.json())
            .then(data =>{
                this.types = data;
            })
        },
        async getOperators() {
            await fetch(connection + "operators")
            .then(response => response.json())
            .then(data =>{
                this.operators = data;
                
            })
        },
        show(typeData) {
			switch (typeData) {
				case "operator":
					this.dataType = false;
					this.dataOperator = true;
					break;
				case "type":
					this.dataOperator = false;
					this.dataType = true;
					break;
				default:
					break;
			}
		},
        checkOperators(){
            this.operators.forEach(operator => {
                if(operator.androids.length == 0){
                    return true
                } else {
                    return false
                }
            });
        }
    },
    mounted() {
        this.getTypes();
        this.getOperators();
    }
}
</script>

<style>
.innerbox{
	min-width: 35rem;
    max-width: 35rem;
}

.innerbox2{
    min-width: 25rem;
    max-width: 25rem;
}
</style>