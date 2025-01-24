<template>
    <h2>{{ $t('system.operator_title') }}</h2>
    <input v-model="searchValue" type="text" v-bind:placeholder="$t('data_search.operators_search')"
    class="searcherInput" name="filter">

    <div class="flex-container">
        <blockquote class="searcherWindow">
            <figure class="data-figure" style="height: 100%;">
                <hr/>
                <div v-if="operatorList.length" class="dataScroll">
                    <div v-for="(operator, index) in operatorList" :key="index">
                        <button v-if="operator.androids != 0" @click="showTypeInfo(operator)" 
                        class="button button-list" id="menu" style="width: 100%;">
                            <img src="../assets/Operator_Icon.png" width="24" height="18" 
                            style="vertical-align: middle; float: left;"/>
                            &nbsp; {{ operator.name.name }}
                        </button>

                        <button v-else @click="showTypeInfo(operator)" 
                        class="button button-list" id="menu" style="width: 100%;">
                            <img src="../assets/Operator_NoAndroid_Icon.png" width="23" height="18" 
                            style="vertical-align: middle; float: left;"/>
                            &nbsp;{{ operator.name.name }}
                            <img src="../assets/New_Icon.png" width="23" height="17" 
                            style="vertical-align: middle; float: right;"/>
                        </button>
                    </div>
                </div>
                <div v-else class="dataScroll" style="text-align: left;">{{ $t('data_search.android_message')}}</div>
                <hr/>
            </figure>
        </blockquote>

        <InfoWindow class="infoWindow" :dataUse="selectedOperator" :dataType="'operator'" :addWindow="addWindow" style="margin-top: -35px;"/>
    </div>
    <hr/>
</template>

<script>
import searcher from '../utils/Searcher'
import InfoWindow from './InfoWindow.vue'

export default {
    name: "Operator",
    components: {
        InfoWindow
    },
    props: {
        operators: {
            type: Object,
            req: true
        }
    },
    data: {
        selectedOperator: null,
        addWindow: 0
    },
    mixins: [searcher],
    methods: {
        showTypeInfo(operator) {
                this.selectedOperator = operator;
                this.addWindow= 1;
		}
    }

}
</script>