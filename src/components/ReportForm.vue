<script setup>
import { ref, computed } from 'vue';
import { useReportData } from '../stores/ReportStore';
import messageModal from '../utils/MessageModal.mjs';

const store = useReportData();
const showModal = ref(false);

//DATA FROM STORE

const id = computed({
    get: () => store.options.id,
    set: (val) => (store.options.id = val)
});
const title = computed({
    get: () => store.options.title,
    set: (val) => (store.options.title = val)
});
const date = computed({
    get: () => store.options.date,
    set: (val) => (store.options.date = val)
});
const content = computed({
    get: () => store.options.content,
    set: (val) => (store.options.content = val)
})

//END DATA FROM STORE

</script>

<template>
    <form @submit.prevent="handleSubmit">
        <fieldset>
            <legend>{{ $t('report.create_legend') }}</legend>

            <div class="inOneLine-form">
                <label for="inputTitle">{{ $t('report.create_title') }}</label>
                <input v-model="title" type="text" class="android-attribute" id="inputTitle" 
                style="padding-right: 0px;" v-bind:placeholder="$t('placeholder.report_title')" required/>

                <label for="inputDate">{{ $t('report.create_date') }}</label>
                <input v-if="id === null || compareDates(date)" v-model="date" type="date" class="android-attribute" id="inputDate"
                style="padding-right: 0px;" :min="minDate" required>
                <input v-else v-model="date" type="date" class="android-attribute" id="inputDate"
                style="padding-right: 0px;" :min="minDate" disabled>
            </div>

            <label for="textarea">{{ $t('report.create_content') }}</label>
            <textarea v-model="content" class="full" id="textarea" rows="8" required
            v-bind:placeholder="$t('placeholder.report_content')" :maxlength="800" style="padding-right: 0px;"></textarea>

            <div class="inOneLine">
                
            </div>

            <button type="submit" style="margin-top: 10px;" @click="() => {
                    //While auth isn't applied, it going to send commander's ID.
                    let report = {
                        name: title,
                        content: content,
                        publishDate: formatDateToDDMMYYYY(date),
                        androidId: '67a0e518debbc114fd37d4eb'
                    }
                    
                    id ? updateReport(report, id) : postReport(report);
                    
                }" 
                class="button-menu">{{ $t('form.submit') }}</button>

            <button v-if="!compareDates(date) || id !== null" class="button-menu" 
            style="float: right; margin-top: 10px;" @click="showModal = true;">{{ $t('report.delete_report') }}</button>
            
        </fieldset>
    </form>

    <ConfirmationModal :isVisible="showModal" @update:isVisible="showModal = $event">
        <template #text>
            <p style="padding-bottom: 30px;">
                {{ $t('modal.delete_message') }}
            </p>
        </template>
        
        <template #button>
            <button class="button button-menu" style="margin-left: auto;" @click="deleteReport(id)">{{ $t('report.delete_report') }}</button>
        </template>
    </ConfirmationModal>
    
</template>

<script>
import { connection } from '@/services/ApiConnection'
import axios from 'axios';
import { useLoadingStore } from '../stores/LoadingStore';
import ConfirmationModal from './partials/ConfirmationModal.vue';
import messageModal from '../utils/MessageModal.mjs';
import dateUtils from '../utils/DateUtils.mjs';

export default {
    el: 'ReportForm',
    components: {
        ConfirmationModal
    },
    data(){
        return{
            minDate: "",
        }
    },
    mixins: [messageModal, dateUtils],
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
        async deleteReport(id){

            const loadingStore = useLoadingStore();

            loadingStore.showLoader();

            console.log(id)

            await axios.delete(connection + `reports/${id}`, {
                headers : {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                console.log("API Answer: " + res)
                this.msg = this.createMessage(
                    messageModal.data().httpMethod.DELETE, 
                    messageModal.data().object.REPORT, 
                    messageModal.data().status.SUCCESSFUL
                );

                this.backToDatabase();
            })
            .catch((error) => this.msg = this.createMessage("", "", messageModal.data().status.ERROR)
            );

            loadingStore.hideLoader();
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


