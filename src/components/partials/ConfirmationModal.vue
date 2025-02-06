<template>
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal-content" @click.stop>
        <hr class="modal-hr"/>
        <figure class="warning">
            <figcaption style="text-align: center; letter-spacing: 12px; text-transform: uppercase; font-size: 30px;">
                - {{ $t('start.warning_message') }} -
                <hr/>
            </figcaption>
            <div class="modal-text">
                <p>
                    {{ $t('modal.delete_message') }}
                </p>
                <div class="inOneLine" style="margin-top: 10px;">
                    <button class="button-menu" @click="closeModal">{{ $t('report.back_btn') }}</button>
                    <button class="button-menu" style="margin-left: auto;" @click="deleteReport">{{ $t('report.delete_report') }}</button>
                </div>
            </div>
        </figure>
        <hr style="height: 4px; background-color: #454138; border-top: none;"/>
      </div>
    </div>
</template>
  
<script>
import { connection } from '../../services/ApiConnection';
import axios from 'axios';
import messageModal from '../../utils/MessageModal.mjs';
import { useLoadingStore } from '../../stores/LoadingStore';
import { useReportData } from '../../stores/ReportStore';

export default {
    props: {
        isVisible: {
            type: Boolean,
            required: true
        }
    },
    mixins: [messageModal],
    methods: {
        closeModal(){
            this.$emit('update:isVisible', false); 
        },
        async deleteReport(){

            const loadingStore = useLoadingStore();
            const reportStore = useReportData();

            console.log(reportStore.options['id'])
        

            loadingStore.showLoader();

            await axios.delete(connection + `reports/${reportStore.options['id']}`, {
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
    }
}

</script>
  
<style scoped>

    .modal-hr {
        border: none;
        height: 4px; 
        background-color: #454138;
        
    }

    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }

    .modal-content {
        padding: 20px;
        border-radius: 5px;
        width: 100%;
        padding: 0px;
    }

    .warning, .warning figcaption{
        background-color: #454138;
        color: #bab5a1;
    }

</style>