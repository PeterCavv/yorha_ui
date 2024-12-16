import { defineStore } from "pinia";

export const useOperatorData = defineStore("operator", {
    state: () => ({
        options: {
            operator: ""
        }
    }),
    actions: {
        editOperator(operator){
            this.options.operator = operator;

        }
    }

})