const searcher= {
    data: {
        searchValue: ""
    },
    computed: {
        androidList(){
            if(this.searchValue.trim().length > 0) {
                return this.androids.filter((android) => android.name.toLowerCase().includes(this.searchValue.trim().toLowerCase()));
            }
            return this.androids;
        },
        reportList(){
            if( this.searchValue.trim().length > 0 ) {
                return this.reports.filter((report) => report.name.toLowerCase().includes(this.searchValue.trim().toLowerCase()));
            }
            return this.reports;
        },
        operatorList(){
            if( this.searchValue.trim().length > 0 ) {
                return this.operators.filter((operator) => operator.name.name.toLowerCase().includes(this.searchValue.trim().toLowerCase()));
            }
            return this.operators;
        },
        typeList(){
            if( this.searchValue.trim().length > 0 ) {
                return this.types.filter((type) => type.name.toLowerCase().includes(this.searchValue.trim().toLowerCase()));
            }
            return this.types;
        },
        weaponList(){
            if( this.searchValue.trim().length > 0 ){
                return this.weapons.filter((weapon) => weapon.name.toLowerCase().includes(this.searchValue.trim().toLowerCase()));
            }
            return this.weapons;
        }
    }
}

export { searcher as default }