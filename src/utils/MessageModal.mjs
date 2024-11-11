const messageModal = {
    data: {
        msg: "",
        status: {
            SUCCESSFUL: 'SUCCESSFUL',
            ERROR: 'ERROR'
        },
        httpMethod: {
            CREATE: 'CREATE',
            DELETE: 'DELETE',
            UPDATE: 'UPDATE'
        },
        object: {
            ANDROID: 'ANDROID',
            REPORT: 'REPORT',
            OPERATOR_ADD_ANDROID: 'OPERATOR_ADD_ANDROID'
        }
    },
    methods: {
        createMessage(httpMethod, object, status) {
            console.log(status)
            if( status == this.status.SUCCESSFUL ){
                return this.checkobject(httpMethod, object);

            } else {
                return this.$t('messages.error');

            }
        },
        checkobject(httpMethod, object){
            switch(object){
                case this.object.ANDROID:
                    return this.createAndroidMessage(httpMethod);

                case this.object.REPORT:
                    return this.createReportMessage(httpMethod);
                
                case this.object.OPERATOR_ADD_ANDROID:
                    return this.createOperatorMessage(httpMethod);

                default:
                    break;
            }
        },
        createAndroidMessage(httpMethod){
            switch(httpMethod){
                case this.httpMethod.CREATE:
                    return this.$t('messages.success_created_android');

                default:
                    break;
            }
        },
        createReportMessage(httpMethod){
            switch(httpMethod){
                case this.httpMethod.CREATE:
                    return this.$t('messages.success_created_report');

                case this.httpMethod.UPDATE:
                    return this.$t('messages.success_edited_report')

                default:
                    break;
            }
        }
    },  
}

export { messageModal as default }