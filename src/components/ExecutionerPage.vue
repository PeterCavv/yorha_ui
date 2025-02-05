<template>
    <h2>{{ $t('system.execute_title') }}</h2>
    <input v-model="searchValue" type="text" v-bind:placeholder="$t('data_search.execute_search')"
    class="searcherInput" name="filter">

    <div class="flex-container">
        <blockquote class="searcherWindow">
            <figure class="data-figure" style="height: 100%;">
                <hr/>
                <div v-if="executeList.length" class="dataScroll">
                    <div v-for="( executioner, index ) in executeList" :key="index">
                        <button @click="showTypeInfo( weexecutionerapon )" 
                        class="button button-list" id="menu" style="width: 100%">
                            <!-- <img src="../assets/executioner_icon.png" width="18" height="22" 
                            style="vertical-align: middle; float: left; margin-right: 10px;"/> -->
                            {{ executioner.name.name }}

                        </button>
                    </div>
                </div>
                <div v-else class="dataScroll" style="text-align: left;">{{ $t('data_search.execute_message')}}</div>
                <hr/>
            </figure>
        </blockquote>

        <InfoWindow class="infoWindow" :dataUse="selectedExecutioner" :dataType="'executioner'" :addWindow="addWindow" style="margin-top: -35px;"/>
    </div>
    <hr/>
</template>

<script>
import InfoWindow from './InfoWindow.vue';
import searcher from '../utils/Searcher.mjs';


    export default {
        name: 'ExecutionerPage',
        components: {
            InfoWindow
        },
        props: {
            executioners: {
                type: Object,
                required: true
            }
        },
        data: {
            selectedExecutioner: '',
            addWindow: 0
        },
        mixins: [searcher],
        methods: {
            showTypeInfo(executioner){
                this.selectedExecutioner = executioner;
                this.addWindow = 1;
            }
        }
}

</script>