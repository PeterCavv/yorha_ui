<template>
    <h2>{{ $t('system.types_title') }}</h2>

        <div class="inOneLine">
            <input v-model="searchValue" type="text" v-bind:placeholder="$t('data_search.types')" 
            class="searcherInput" name="filter">
        </div>

        <div class="flex-container">
            <blockquote class="searcherWindow">
                <figure class="data-figure" style="height: 100%;">
                    <hr/>
                    <div v-if="typeList.length" class="dataScroll">
                        <div v-for="(type, index) in typeList" :key="index">
                            <div v-show="type.name != 'NoType'">
                                <button @click="showTypeInfo(type)" 
                                class="button button-list" id="menu" style="width: 100%;">
                                    {{ type.name }}
                                </button>
                            </div>
                        </div> 
                    </div>
                    <div v-else class="dataScroll" style="text-align: left;">{{ $t('data_search.type_message')}}</div>
                    <hr/>
                </figure>
            </blockquote>   

            <InfoWindow class="infoWindow" :dataUse="selectedType" :dataType="'type'" :addWindow="addWindow" :edit="false" style="margin-top: -35px;"/>
 
        </div>
        <hr/>
</template>

<script>
import searcher from '../utils/Searcher'
import InfoWindow from './InfoWindow.vue'

export default {
    name: "Type",
    components: {
        InfoWindow
    },
    props: {
        types: {
            type: Object,
            required: true
        }
    },
    data: {
        selectedType: null,
        addWindow: 0
    },
    mixins: [searcher],
    methods: {
        showTypeInfo(type) {
                this.selectedType = type;
                this.addWindow= 1;
		}
    }

}
</script>