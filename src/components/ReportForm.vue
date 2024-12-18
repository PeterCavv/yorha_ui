<script setup>
import { useReportData } from '../stores/ReportStore';

const store = useReportData();
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <fieldset>
            <legend>{{ $t('report.create_legend') }}</legend>

            <label>{{ $t('report.create_title') }}</label>

            &nbsp;

            <input v-model="store.options['title']" type="text" class="android-attribute" style="padding-right: 0px;"
            placeholder="Report Title"/>

            <label>{{ $t('report.create_date') }}</label>

            &nbsp;

            <input v-model="store.options['date']" type="date" class="android-attribute" style="padding-right: 0px;">
        
            <br/>

            <p>
                <br/>
                <label for="textarea">{{ $t('report.create_content') }}</label>
                <textarea v-model="store.options['content']" class="full" id="textarea" rows="8" 
                placeholder="This report is about..." :maxlength="350" style="padding-right: 0px;"></textarea>
            </p>

            <button @click="() => {
                    //While auth isn't applied, it going to send commander's ID.
                    let report = {
                        name: store.options['title'],
                        content: store.options['content'],
                        androidId: '65d76f4fe2fdc5580b0482bc'
                    }
                    
                    store.options['id'] ? updateReport(report, store.options['id']) : postReport(report);
                    
                }" 
                class="button-menu">{{ $t('form.submit') }}</button>
        </fieldset>
    </form>
</template>

<script>
import { connection } from '@/services/ApiConnection'
import axios from 'axios';
import messageModal from '../utils/MessageModal.mjs'

export default {
    el: 'ReportForm',
    data(){

    },
    mixins: [messageModal],
    methods: {
        async postReport(report){
            await axios.post(connection + "reports", JSON.stringify(report), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                console.log("API Answer: " + res)
                this.msg = this.createMessage(
                    messageModal.data.httpMethod.CREATE, 
                    messageModal.data.object.REPORT, 
                    messageModal.data.status.SUCCESSFUL
                );
            })
            .catch((error) => this.msg = this.createMessage("", "", messageModal.data.status.ERROR)
            );
        },
        async updateReport(report, reportId){
            await axios.put(connection + `reports/${reportId}`, JSON.stringify(report), {
                headers : {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                console.log("API Answer: " + res)
                this.msg = this.createMessage(
                    messageModal.data.httpMethod.CREATE, 
                    messageModal.data.object.REPORT, 
                    messageModal.data.status.SUCCESSFUL
                );
            })
            .catch((error) => this.msg = this.createMessage("", "", messageModal.data.status.ERROR)
            );
        }
    }
}

</script>
