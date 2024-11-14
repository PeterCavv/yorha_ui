import { defineStore } from "pinia";

export const useReportData = defineStore("report", {
    state: () =>{
        title = "",
        content= "",
        date = "",
        android =""
    },
    actions: {
        createReport(){
            this.title = "";
            this.content = "";
            this.date = "";
            this.android = "";

        },
        editReport(report){
            this.title = report.title;
            this.content = report.content;
            this.date = report.date;
            this.android = report.android;
        }
    }

})