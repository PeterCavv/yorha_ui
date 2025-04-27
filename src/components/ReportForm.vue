<template>
    <form @submit.prevent="handleSubmit">
        <fieldset>
            <legend>{{ $t('report.create_legend') }}</legend>

            <div class="inOneLine-form">
                <label for="inputTitle">{{ $t('report.create_title') }}</label>
                <input v-model="title" type="text" class="android-attribute" id="inputTitle" 
                style="padding-right: 0px;" :maxlength="30" v-bind:placeholder="$t('placeholder.report_title')" required/>

                <label for="inputDate">{{ $t('report.create_date') }}</label>
                <input v-if="id === null || compareDates(date)" v-model="date" type="date" class="android-attribute" id="inputDate"
                style="padding-right: 0px;" :min="minDate" required>
                <input v-else v-model="date" type="date" class="android-attribute" id="inputDate"
                style="padding-right: 0px;" :min="minDate" disabled>
            </div>

            <label for="textarea">{{ $t('report.create_content') }}</label>
            <textarea v-model="content" class="full" id="textarea" rows="8" required
            v-bind:placeholder="$t('placeholder.report_content')" :maxlength="800" style="padding-right: 0px;"></textarea>

            <button type="submit" style="margin-top: 10px;" @click="() => {
                    //While auth isn't applied, it going to send commander's ID.
                    const report = {
                        name: title,
                        content: content,
                        publishDate: formatDateToDDMMYYYY(date),
                        androidId: '67a0e518debbc114fd37d4eb'
                    }
                    
                    id ? onEditReport(report, id) : onCreateReport(report);
                    
                }" 
                class="button-menu">{{ $t('form.submit') }}</button>

            <button v-if="!compareDates(date) || id !== null" class="button-menu" 
            style="float: right; margin-top: 10px;" @click="showModal = true;">{{ $t('modal.delete_btn') }}</button>
            
        </fieldset>
    </form>

    <ConfirmationModal :isVisible="showModal" @update:isVisible="showModal = $event">
        <template #text>
            <p style="padding-bottom: 30px;">
                {{ $t('modal.delete_message') }}
            </p>
        </template>
        
        <template #button>
            <button class="button button-menu" style="margin-left: auto;" @click="onDeleteReport(id)">
                {{ $t('modal.delete_btn') }}
            </button>
        </template>
    </ConfirmationModal>
    
</template>

<script setup>
import ConfirmationModal from '@/components/common/ConfirmationModal.vue';
import { dateUtils } from '../utils/DateUtils.mjs';
import { useCreateReportController } from '../controllers/common/CreateReportController';
import messageModal from '@/utils/MessageModal.mjs';
import { useRouter } from 'vue-router';

const router = useRouter();

const { 
    id,
    title,
    date,
    content,
    showModal,
    createReport,
    editReport,
    deleteReport 
} = useCreateReportController;

const { formatDateToDDMMYYYY, setMinDate, compareDates } = dateUtils;

const minDate = setMinDate();

// HANDLER UI

/**
 * Function to handle the form submission to create a new report.
 * @param report {Object} - Report object to be created.
 */
function onCreateReport(report) {
    createReport(report).then(() => {
        messageModal.data().httpMethod.CREATE;
        router.push({ name: 'database' });
    })
    .catch(() => {
      messageModal.data().status.ERROR;
    });
}

/**
 * Fnction to handle the form submission to edit an existing report.
 * @param report {Object} - Report object to be edited.
 * @param id {string} - ID of the report to be edited.
 */
function onEditReport(report, id) {
    editReport(report).then(() => {
        messageModal.data().httpMethod.UPDATE;
        router.push({ name: 'database' });
    })
    .catch(() => {
      messageModal.data().status.ERROR;
    });
}

/**
 * Function to handle the deletion of a report.
 * @param id {string} - ID of the report to be deleted.
 */
function onDeleteReport(id) {
    deleteReport(id).then(() => {
        messageModal.data().httpMethod.DELETE;
        router.push({ name: 'database' });
    })
    .catch(() => {
      messageModal.data().status.ERROR;
    });
}

// END HANDLER UI

</script>

<!-- <script>
import { connection } from '@/services/ApiConnection'
import axios from 'axios';
import { useLoadingStore } from '../stores/LoadingStore';
import ConfirmationModal from '../components/common/ConfirmationModal.vue';
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
</script> -->


