<template>
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal-content" @click.stop>
        <figure class="warning">
            <figcaption style="text-align: center;">
                {{ $t('start.warning_message') }}
            </figcaption>
            <p>
                {{ $t('start.operator_message') }}
            </p>
            <div class="inOneLine" style="margin-top: 10px;">
                <button class="button-menu" @click="closeModal">Go back</button>
                <button class="button-menu" style="margin-left: auto;" @click="deleteReport">Delete</button>
            </div>
        </figure>
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
        width: 500px;
    }

</style>