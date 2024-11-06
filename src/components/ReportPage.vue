<template>
    <h2>{{ $t('data_base.reports_data') }}</h2>

    <div class="inOneLine">
        <input v-model="searchValue" type="text" v-bind:placeholder="$t('data_search.reports_search')"
        style="width:20rem; margin-left: 3rem;">

        <button @click="createReport()">
            Create Report
        </button>
        
    </div>
    <div class="flex-container">
        <blockquote style="width: 25rem; margin-right: 8rem;">
            <figure class="data-figure" style="height: 100%;">
                <hr/>
                <div v-if="reportList.length" class="dataScroll">
                    <div v-for="(report, index) in reportList" :key="index">
                        <button @click="showTypeInfo(report)" 
                        class="button button-list" id="menu" style="width: 100%;">

                            {{ report.name }}

                        </button>
                    </div>
                </div>
                <div v-else class="dataScroll" style="text-align: left;">{{ $t('data_search.reports_message')}}</div>
                <hr/>
            </figure>
        </blockquote>

        <InfoWindow :dataUse="selectedReport" :dataType="'report'" :addWindow="addWindow" style="margin-top: -35px;"/>
    </div>
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
        addWindow: 0,
        report: {}
    },
    mixins: [searcher],
    methods: {
        showTypeInfo(report) {
                this.selectedReport = report;
                this.addWindow= 1;
		},
        createReport(){
            this.report = {name: "", content: "", date: "", android: ""}

            sessionStorage.setItem('report', JSON.stringify(this.report));
            this.$router.push({name: 'create-report'})
        }
    }

}
</script>

<style>
.img-android{
    width: 20px;
    height: 23px;
    vertical-align: middle;
}
</style>