const dateUtils = {
    methods: {
        formatDateToDDMMYYYY(date) {
            const [year, month, day] = date.split('-');
            return `${day}/${month}/${year}`;
        },
        setMinDate() {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0'); 
            const day = String(today.getDate()).padStart(2, '0');
            this.minDate = `${year}-${month}-${day}`;  
        },
        compareDates(date){
            if(date === null){
                return false;
            }

            const inputDate = new Date(date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if(inputDate < today || inputDate === today){
                return false;
            } else {
                return true;
            }
        },
    },
}

export { dateUtils as default };