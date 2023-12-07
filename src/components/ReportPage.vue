<template>
    <h2>{{ $t('data_base.reports_data') }}</h2>
    <table>
        <tr>
            <td style="padding-right:10rem; ">
                <input v-model="searchValue" type="text" v-bind:placeholder="$t('data_search.reports_search')"
                style="width:20rem; margin-left: 3rem;">

                <blockquote class="full">
                    <figure class="data-figure">
                        <ul>
                            <div v-if="reportList.length">
                                <div v-for="(report, index) in reportList" :key="index">
                                    <li style= "margin-top: 5px;">
                                        <button @click="showTypeInfo(report)" 
                                        class="button button-list" id="menu" style="margin-bottom: 10px;">
                                            {{ report.name }}
                                        </button>
                                    </li>
                                </div>
                            </div>
                            <div v-else style="text-align: left;">{{ $t('data_search.reports_message')}}</div>
                        </ul>
                    </figure>
                </blockquote>
            </td>

            <InfoWindow :dataUse="selectedReport" :dataType="'report'" :addWindow="addWindow"/>

        </tr>
    </table>
    <hr/>
</template>

<script>
import searcher from '../mixins/Searcher'
import InfoWindow from './InfoWindow.vue'

export default {
    name: "Report",
    components: {
        InfoWindow
    },
    props: {
        reports: {
            type: Object,
            required: true
        }
    },
    data: {
        selectedReport: null,
        addWindow: 0
    },
    mixins: [searcher],
    methods: {
        showTypeInfo(report) {
                this.selectedReport = report;
                this.addWindow= 1;
		}
    }

}
</script>