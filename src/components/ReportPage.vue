<script setup>
import { ref } from 'vue';
import { useReportData } from '../stores/ReportStore';

const store = useReportData();
const addWindow = ref(false);
</script>

<template>
    <h2>{{ $t('data_base.reports_data') }}</h2>
    <div class="inOneLine">
        <input v-model="searchValue" type="text" v-bind:placeholder="$t('data_search.reports_search')"
        class="searcherInput" name="filter">

        <button @click="createReport => {store.createReport(); $router.push({name: 'create-report'})}"
            class="btn-createReport">
            {{ $t("report.create_report")}}
        </button>
    </div>
    <div class="flex-container">
        <blockquote class="searcherWindow">
            <figure class="data-figure" style="height: 100%;">
                <hr/>
                <div v-if="reportList.length" class="dataScroll">
                    <div v-for="(report, index) in reportList" :key="index">
                        <button @click="() => {showTypeInfo(report); addWindow = true}" 
                        class="button button-list" id="menu" style="width: 100%;">

                            {{ report.name }}

                        </button>
                    </div>
                </div>
                <div v-else class="dataScroll" style="text-align: left;">{{ $t('data_search.reports_message')}}</div>
                <hr/>
            </figure>
        </blockquote>

        <InfoWindow class="infoWindow" :addWindow="addWindow" style="margin-top: -35px;">
            <template #title>
                {{ selectedReport.name }}
            </template>
            <template #body>
                <p><cite>{{ $t('information.content') }}</cite></p>
                <p>{{ selectedReport.content }}</p>

                <p style="margin-top: 10px;">- {{ selectedReport.android.name }} {{ selectedReport.publish_date }} </p>

                <button v-if="compareDates(formatDateToYYYYMMDD(selectedReport.publish_date))" class="button" id="menu"
                style="margin-bottom: 6px; text-align: center; margin-left: auto; text-transform: none; width: 30%"
                @click="() => {store.editReport(selectedReport); $router.push({name: 'create-report'})}">
                    {{ $t('report.edit_report') }}
                </button>
            </template>
        </InfoWindow>
    </div>
    <hr/>
</template>

<script>
import searcher from '../utils/Searcher.mjs'
import InfoWindow from './InfoWindow.vue'
import dateUtils  from '../utils/DateUtils.mjs'

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
        report: {}
    },
    mixins: [searcher, dateUtils],
    methods: {
        showTypeInfo(report) {
                this.selectedReport = report;
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