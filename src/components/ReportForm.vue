<script setup>
import { useReportData } from '../stores/ReportStore';

const store = useReportData();
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <fieldset>
            <legend>{{ $t('report.create_legend') }}</legend>

            <div class="inOneLine-form">
                <label for="inputTitle">{{ $t('report.create_title') }}</label>
                <input v-model="store.options['title']" type="text" class="android-attribute" id="inputTitle" 
                style="padding-right: 0px;" placeholder="Report Title"/>

                <label for="inputDate">{{ $t('report.create_date') }}</label>
                <input v-if="store.options['id'] === null || compareDates(store.options['date'])" v-model="store.options['date']" type="date" class="android-attribute" id="inputDate"
                style="padding-right: 0px;" :min="minDate">
                <input v-else v-model="store.options['date']" type="date" class="android-attribute" id="inputDate"
                style="padding-right: 0px;" :min="minDate" disabled>
            </div>

            <label for="textarea">{{ $t('report.create_content') }}</label>
            <textarea v-model="store.options['content']" class="full" id="textarea" rows="8" 
            placeholder="This report is about..." :maxlength="800" style="padding-right: 0px;"></textarea>

            <div class="inOneLine">
                
            </div>

            <button style="margin-top: 10px;" @click="() => {
                    //While auth isn't applied, it going to send commander's ID.
                    let report = {
                        name: store.options['title'],
                        content: store.options['content'],
                        publishDate: formatDateToDDMMYYYY(store.options['date']),
                        androidId: '67a0e518debbc114fd37d4eb'
                    }
                    
                    store.options['id'] ? updateReport(report, store.options['id']) : postReport(report);
                    
                }" 
                class="button-menu">{{ $t('form.submit') }}</button>

            <button v-if="!compareDates(store.options['date']) || store.options['id'] !== null" class="button-menu" 
            style="float: right; margin-top: 10px;" @click="showModal = true;">{{ $t('report.delete_report') }}</button>
            
        </fieldset>
    </form>

    <ConfirmationModal
      :isVisible="showModal"
      @update:isVisible="showModal = $event"
    />
</template>

<script>
import { connection } from '@/services/ApiConnection'
import axios from 'axios';
import { useLoadingStore } from '../stores/LoadingStore';
import ConfirmationModal from './partials/ConfirmationModal.vue';
import messageModal from '../utils/MessageModal.mjs';

export default {
    el: 'ReportForm',
    components: {
        ConfirmationModal
    },
    data(){
        return{
            minDate: "",
            showModal: false,
        }
    },
    mixins: [messageModal],
    methods: {
        async postReport(report){
            const loadingStore = useLoadingStore();

            loadingStore.showLoader();

            await axios.post(connection + "reports", JSON.stringify(report), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                console.log("API Answer: " + res)
                this.msg = this.createMessage(
                    messageModal.data().httpMethod.CREATE, 
                    messageModal.data().object.REPORT, 
                    messageModal.data().status.SUCCESSFUL
                );

                this.backToDatabase();
            })
            .catch((error) => this.msg = this.createMessage("", "", messageModal.data().status.ERROR)
            );

            loadingStore.hideLoader();
        },
        async updateReport(report, reportId){
            const loadingStore = useLoadingStore();

            loadingStore.showLoader();

            await axios.put(connection + `reports/${reportId}`, JSON.stringify(report), {
                headers : {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                console.log("API Answer: " + res)
                this.msg = this.createMessage(
                    messageModal.data().httpMethod.CREATE, 
                    messageModal.data().object.REPORT, 
                    messageModal.data().status.SUCCESSFUL
                );

                this.backToDatabase();
            })
            .catch((error) => this.msg = this.createMessage("", "", messageModal.data().status.ERROR)
            );

            loadingStore.hideLoader();   
        },
        formatDateToDDMMYYYY(date) {
            const [year, month, day] = date.split('-');
            return `${day}/${month}/${year}`;
        },
        setMinDate() {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0'); 
            const day = String(today.getDate()).padStart(2, '0');
            this.minDate = `${year}-${month}-${day}`;  
        },
        compareDates(date){
            if(date === null){
                return false;
            }

            const inputDate = new Date(date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if(inputDate < today || inputDate === today){
                return false;
            } else {
                return true;
            }
        },
        backToDatabase(){
            this.$router.push({name: 'database'});
        }
    },
    created() {
        this.setMinDate();
    },
}

</script>
