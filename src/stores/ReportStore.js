import { defineStore } from "pinia";

export const useReportData = defineStore("report", {
    state: () => ({
        options: {
            id: null,
            title: "",
            content: "",
            date: "",
            android: ""
        }
    }),
    actions: {
        createReport(){
            this.options.id = null;
            this.options.title = "";
            this.options.content = "";
            this.options.date = "";
            this.options.android = "";

        },
        editReport(report){
            this.options.id = report.id;
            this.options.title = report.name;
            this.options.content = report.content;
            this.options.date = report.publish_date;
            this.options.android = report.android;

        }
    }

})