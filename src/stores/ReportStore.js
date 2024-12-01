import { defineStore } from "pinia";

export const useReportData = defineStore("report", {
    state: () => ({
        options: {
            title: "",
            content: "",
            date: "",
            android: ""
        }
    }),
    actions: {
        createReport(){
            this.options.title = "";
            this.options.content = "";
            this.options.date = "";
            this.options.android = "";

        },
        editReport(report){
            this.options.title = report.name;
            this.options.content = report.content;
            this.options.date = report.date;
            this.options.android = report.android;

        }
    }

})