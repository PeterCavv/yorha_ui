<template>
    <form>
        <fieldset>
            <legend>{{ $t('report.create_legend') }}</legend>

            <label>{{ $t('report.create_title') }}</label>

            &nbsp;

            <input v-model="report.name" type="text" class="android-attribute" style="padding-right: 0px;"
            placeholder="Report Title"/>

            <label>{{ $t('report.create_date') }}</label>

            &nbsp;

            <input v-model="report.date" type="date" class="android-attribute" style="padding-right: 0px;">
        
            <br/>

            <p>
                <br/>
                <label for="textarea">{{ $t('report.create_content') }}</label>
                <textarea v-model="report.content" class="full" id="textarea" rows="8" 
                placeholder="This report is about..." :maxlength="350" style="padding-right: 0px;"></textarea>
            </p>

            <button type="submit" @click="" class="button-menu">{{ $t('form.submit') }}</button>
        </fieldset>
    </form>
</template>

<script>
import axios from 'axios';
import messageModal from '../utils/MessageModal.mjs'

export default {
    el: 'ReportForm',
    props: {
        report: {
            type: Object,
            required: true
        }
    },
    data(){
        return{
            succesfullMessage: false
        }
    },
    mixins: [messageModal],
    methods: {
        sendReport(){
            if(!report.id){
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
                
            } else {
                await axios.patch(connection + "reports", JSON.stringify(report), {
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
            }
        }
    },
    beforeRouteLeave(to, from, next) {
        this.report = {}
        sessionStorage.removeItem('report');
        next();
    }
}

</script>
