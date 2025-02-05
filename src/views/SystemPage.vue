<template>
    <br/><br/><br/>
    <hr/>
    <h1 style="text-align:left; padding-left:2rem;">
        <span>
            {{ $t('system.title') }}
            <font size="4">{{ $t('system.subtitle') }}</font>
        </span>
    </h1>

    <h2>{{ $t('system.page_title') }}</h2>
    <figure>
        <figcaption>{{ $t('system.info_title') }}</figcaption>
        <p>{{ $t('system.info_desc') }} <mark>{{ $t('system.mark_desc') }}</mark> 
            {{ $t('system.info_desc2') }}</p>
        <p style="font-size: 11.5px;">
            <mark style=" text-transform: uppercase;">{{ $t('system.caution') }}</mark> 
            {{ $t('system.caution_desc') }}
        </p>
    </figure>
    <hr/>

    <button @click="show('operator');" class="button button-select" id="menu">
        {{ $t('system.operators') }}
        <img v-if="checkOperators" src="../assets/New_Icon.png" width="24" height="18" 
        style="vertical-align: middle; float: right;"/>
    </button>

    <button @click="show('type');" class="button button-select" id="menu">{{ $t('system.types') }}</button>

    <button @click="show('executioner');" class="button button-select" id="menu">{{ $t('system.execute') }}</button>
    <br/>

    <OperatorPage :operators="operators" v-if="dataOperator"/>
    <TypePage :types="types" v-if="dataType"/>
    <ExecutionerPage :executioners="executioners" v-if="dataExectioner"/>

</template>

<script>
import ExecutionerPage from '../components/ExecutionerPage.vue';
import OperatorPage from '../components/OperatorPage.vue';
import TypePage from '../components/TypePage.vue';

export default {
    el: 'SystemPage',
    data() {
        return{
            dataOperator: false,
            dataType: false,
            dataExectioner: false
        }
    },
    props: {
        operators: {
            type: Object,
            req: true
        },
        types: {
            type: Object,
            req: true
        },
        executioners: {
            type: Object,
            req: true  
        }
    },
    components: {
        OperatorPage,
        TypePage,
        ExecutionerPage
    }, 
    computed: {
        checkOperators(){
            return this.operators.filter( (operator) => operator.androids.length == 0).length > 0;
        }
    },
    methods: {
        show(typeData) {
			switch (typeData) {
				case "operator":
					this.dataType = false;
                    this.dataExectioner = false;
					this.dataOperator = true;
					break;
				case "type":
					this.dataOperator = false;
                    this.dataExectioner = false;
					this.dataType = true;
					break;
                case "executioner":
                    this.dataType = false;
                    this.dataOperator = false;
                    this.dataExectioner = true;
				default:
					break;
			}
		}
    }
}
</script>

<style>
.innerbox{
	min-width: 35rem;
    max-width: 35rem;
}

.innerbox2{
    min-width: 28rem;
    max-width: 28rem;
}
</style>