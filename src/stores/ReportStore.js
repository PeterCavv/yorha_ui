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
            const formatDateToYYYYMMDD = () => {
                const [day, month, year] = report.publish_date.split('/');
                return `${year}-${month}-${day}`;
            }
            this.options.id = report.id;
            this.options.title = report.name;
            this.options.content = report.content;
            this.options.date = formatDateToYYYYMMDD();
            this.options.android = report.android;

        },

    }

})