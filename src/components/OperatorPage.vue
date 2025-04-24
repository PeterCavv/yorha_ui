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
                        <button v-if="operator.androids != 0" @click="() => showTypeInfo(operator)" class="button button-list" id="menu" style="width: 100%;">
                            <img src="../assets/images/Operator_Icon.png" width="24" height="18" 
                            style="vertical-align: middle; float: left;"/>
                            &nbsp; {{ operator.name }}
                        </button>

                        <button v-else @click="() => showTypeInfo(operator)" 
                        class="button button-list" id="menu" style="width: 100%;">
                            <img src="../assets/images/Operator_NoAndroid_Icon.png" width="23" height="18" 
                            style="vertical-align: middle; float: left;"/>
                            &nbsp;{{ operator.name }}
                            <img src="../assets/images/New_Icon.png" width="23" height="17" 
                            style="vertical-align: middle; float: right;"/>
                        </button>
                    </div>
                </div>
                <div v-else class="dataScroll" style="text-align: left;">{{ $t('data_search.android_message')}}</div>
                <hr/>
            </figure>
        </blockquote>

        <InfoWindow class="infoWindow" :addWindow="addWindow" style="margin-top: -35px;">
            <template #title>
                {{ $t('data_base.android_info', { n: selectedOperator.name}) }}
            </template>

            <template #body>
                <p for="androidList"><cite>{{ $t('data_base.androids') }}</cite></p>
                <ul id="androidList">
                    <div v-if="selectedOperator.androids.length">
                        <li>
                            {{ $t("operator.androids_assigned", { n: selectedOperator.androids.length }) }}
                        </li>
                    </div>
                    <div v-else>
                        <li style="text-transform: uppercase;">
                            {{ $t('information.null_desc') }}
                        </li>
                    </div>
                </ul>
                <br/>
                <div>
                    <button class="button" id="menu" @click="() => { 
                        store.editOperator(selectedOperator);
                        router.push({name: 'assing-android'})
                        }"
                        style="margin-bottom: 6px; text-align: center; float: right; text-transform: none; width: 45%">
                        {{ $t('data_base.btn_assing_android') }}
                    </button>
                </div>
            </template>
        </InfoWindow>   

    </div>
    <hr/>
</template>

<script setup>
    import { ref, toRef } from 'vue';
    import { useOperatorData } from '../stores/OperatorStore';
    import InfoWindow from '../components/common/InfoWindow.vue';
    import { useSearcher } from '../utils/Searcher.mjs';
    import { useRouter } from 'vue-router';

    const props = defineProps({
        operators: {
            type: Object,
            required: true
        }
    });

    const { searchValue, filteredList: operatorList } = useSearcher(
        toRef(props, 'operators'), 'name'
    );

    const addWindow = ref(false);
    const selectedOperator = ref(null);

    const store = useOperatorData();
    const router = useRouter();

    // HANDLER UI

    function showTypeInfo(operator) {
        selectedOperator.value = operator;
        addWindow.value = true;
    }

    // END HANDLER UI
</script>

<!-- <script>
import searcher from '../utils/Searcher'
import InfoWindow from '../components/common/InfoWindow.vue'

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
    data() {
        return {
            selectedOperator: null,
        }
    },
    mixins: [searcher],
    methods: {
        showTypeInfo(operator) {
                this.selectedOperator = operator;
		}
    }

}
</script> -->