<script setup>
import { ref } from 'vue';

const addWindow = ref(false);
</script>

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
                                <button @click="() => {showTypeInfo(type); addWindow = true}" 
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

            <InfoWindow class="infoWindow" :addWindow="addWindow" :edit="false" style="margin-top: -35px;">
                <template #title>
                    {{ $t('data_base.types', { n: selectedType.name, m: selectedType.resume }) }}
                </template>
                <template #body>
                    <p><cite>{{ $t('data_base.type_desc') }}</cite></p>
                    <p>{{ selectedType.desc }}</p>
                    <br/>
                    <button class="button" id="menu"
                    style="margin-bottom: 6px; text-align: center; float: right; text-transform: none; width: 30%"
                    @click="">
                        {{ $t('data_base.edit_type') }}
                    </button>
                </template>
            </InfoWindow>
 
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
    },
    mixins: [searcher],
    methods: {
        showTypeInfo(type) {
                this.selectedType = type;
		}
    }

}
</script>