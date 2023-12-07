<template>
    <h2>{{ $t('data_base.android_data') }}</h2>
    <table>
        <tr>
            <td style="padding-right:10rem; ">
                <input v-model="searchValue" type="text" v-bind:placeholder="$t('data_search.android_search')"
                style="width:20rem; margin-left: 3rem;">

                <blockquote class="full">
                    <figure class="data-figure">
                        <ul>
                            <div v-if="androidList.length">
                                <div v-for="(android, index) in androidList" :key="index">
                                    <li style= "margin-top: 5px;">
                                        <button @click="showTypeInfo(android)" 
                                        class="button button-list" id="menu" style="margin-bottom: 10px;">
                                            {{ android.name }}
                                            <img v-if="android.state.name === 'Operational'" 
                                            src="../assets/Operative_Icon.png" width="12" height="10" 
                                            style="vertical-align: middle; float:right"/>
                                            <img v-else src="../assets/No_Operative_Icon.png" width="10" height="8" 
                                            style="vertical-align: middle; float:right"/>
                                        </button>
                                    </li>
                                </div>
                            </div>
                            <div v-else style="text-align: left;">{{ $t('data_search.reports_message')}}</div>
                        </ul>
                    </figure>
                </blockquote>
            </td>

            <InfoWindow :dataUse="selectedAndroid" :dataType="'android'" :addWindow="addWindow"/>

        </tr>
    </table>
    <hr/>
</template>

<script>
import searcher from '../mixins/Searcher'
import InfoWindow from './InfoWindow.vue'

export default {
    name: "AndroidPage",
    components: {
        InfoWindow
    },
    props: {
        androids: {
            type: Object,
            required: true
        }
    },
    data: {
        selectedAndroid: null,
        addWindow: 0

    },
    mixins: [searcher],
    methods: {
        showTypeInfo(android) {
                this.selectedAndroid = android;
                this.addWindow= 1;
		}
    }
}
</script>