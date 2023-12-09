<template>
    <h2>{{ $t('system.types_title') }}</h2>
    <table>
        <tr>
            <td style="padding-right:10rem; ">
                <input v-model="searchValue" type="text" v-bind:placeholder="$t('data_search.types')" 
                style="width:20rem; margin-left: 3rem;">

                <blockquote class="full">
                    <figure class="data-figure">
                        <ul>
                            <div v-if="typeList.length">
                                <div v-for="(type, index) in typeList" :key="index">
                                    <li style= "margin-top: 5px;">
                                        <button @click="showTypeInfo(type)" 
                                        class="button button-list" id="menu" style="margin-bottom: 10px;">
                                            {{ type.name }}
                                        </button>
                                    </li>
                                </div> 
                            </div>
                            <div v-else style="text-align: left;">{{ $t('data_search.type_message')}}</div>
                        </ul>
                    </figure>
                </blockquote>
            </td>

            <InfoWindow :dataUse="selectedType" :dataType="'type'" :addWindow="addWindow" :edit="false"/>

        </tr>
    </table>
    <hr/>
</template>

<script>
import searcher from '../mixins/Searcher'
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