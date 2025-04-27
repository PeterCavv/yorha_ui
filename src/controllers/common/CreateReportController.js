import { ref, computed } from 'vue';
import { useReportData } from '../../stores/ReportStore';
import axios from 'axios';
import { connection } from '@/services/ApiConnection.js';
import { useLoadingStore } from '@/stores/LoadingStore';
// import { useMessageModal } from '@/utils/MessageModal.mjs';

const store = useReportData();
const showModal = ref(false);

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
});

const loadingStore = useLoadingStore();
// const messageModal = useMessageModal();

/**
 * Function to create a new report
 * @param {JSON} report 
 */
async function createReport(report) {
    loadingStore.showLoader();

    console.log(report);
    
    try{
        const response = await axios.post(`${connection}reports`, JSON.stringify(report), {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log(response.data);

        // msg.value = messageModal.createMessage(
        //     messageModal.data().httpMethod.CREATE,
        //     messageModal.data().object.REPORT,
        //     messageModal.data().status.SUCCESSFUL
        // )

    } catch (err) {
        // msg.value = messageModal.createMessage(
        //     '', '', messageModal.data().status.ERROR
        // )

    } finally {
        loadingStore.hideLoader()
    }
}

/**
 * Function to edit an existing report
 * @param {JSON} report 
 */
async function editReport(report, id) {
    loadingStore.showLoader();

    console.log(report);
    console.log(id);

    try{
        const response = await axios.put(`${connection}reports/${id}`, JSON.stringify(report), {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log(response.data);

        // msg.value = messageModal.createMessage(
        //     messageModal.data().httpMethod.UPDATE,
        //     messageModal.data().object.REPORT,
        //     messageModal.data().status.SUCCESSFUL
        // )

    } catch (err) {
        // msg.value = messageModal.createMessage(
        //     '', '', messageModal.data().status.ERROR
        // )

    } finally {
        loadingStore.hideLoader()
    }
}

async function deleteReport(id) {
    loadingStore.showLoader();

    try{
        const response = await axios.delete(`${connection}reports/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log(response.data);

        // msg.value = messageModal.createMessage(
        //     messageModal.data().httpMethod.DELETE,
        //     messageModal.data().object.REPORT,
        //     messageModal.data().status.SUCCESSFUL
        // )

    } catch (err) {
        // msg.value = messageModal.createMessage(
        //     '', '', messageModal.data().status.ERROR
        // )

    } finally {
        loadingStore.hideLoader()
    }
}

export const useCreateReportController = {
    id,
    title,
    date,
    content,
    showModal,
    createReport,
    editReport,
    deleteReport
}


