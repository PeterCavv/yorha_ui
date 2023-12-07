<template>
    <h2>{{ $t('system.operator_title') }}</h2>
    <table>
        <tr>
            <td style="padding-right:10rem; ">
                <input v-model="searchValue" type="text" v-bind:placeholder="$t('data_search.operators')" 
                style="width:20rem; margin-left: 3rem;">

                <blockquote class="full">
                    <figure class="data-figure">
                        <ul>
                            <div v-if="operatorList.length">
                                <div v-for="(operator, index) in operatorList" :key="index">
                                    <li style= "margin-top: 5px;">
                                        <button v-if="operator.androids != 0" @click="showTypeInfo(operator)" 
                                        class="button button-list" id="menu" style="margin-bottom: 10px;">
                                            <img src="../assets/Operator_Icon.png" width="24" height="18" 
                                            style="vertical-align: middle; float: left;"/>
                                            &nbsp; {{ operator.name.name }}
                                        </button>

                                        <button v-else @click="showTypeInfo(operator)" 
                                        class="button button-list" id="menu" style="margin-bottom: 10px;">
                                            <img src="../assets/Operator_NoAndroid_Icon.png" width="23" height="18" 
                                            style="vertical-align: middle; float: left;"/>
                                            &nbsp;{{ operator.name.name }}
                                            <img src="../assets/New_Icon.png" width="23" height="17" 
                                            style="vertical-align: middle; float: right;"/>
                                        </button>
                                    </li>
                                </div>
                            </div>
                            <div v-else style="text-align: left;">{{ $t('data_search.operator_message')}}</div>
                        </ul>
                    </figure>
                </blockquote>
            </td>

            <InfoWindow :dataUse="selectedOperator" :dataType="'operator'" :addWindow="addWindow"/>

        </tr>
    </table>
    <hr/>
</template>

<script>
import searcher from '../mixins/Searcher'
import InfoWindow from './InfoWindow.vue'

export default {
    name: "Operator",
    components: {
        InfoWindow
    },
    props: {
        operators: {
            type: Object,
            required: true
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