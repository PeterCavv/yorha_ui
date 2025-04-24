import axios from 'axios';
import { connection } from '@/services/ApiConnection.js'
import { ref, toRefs, computed } from 'vue';
import { useLoadingStore } from '@/stores/LoadingStore';
import messageModal  from '@/utils/MessageModal.mjs'


export function fabricationController(props) {
    const { types, models, appe, androids } = toRefs(props)

    const selectedType = ref('');
    const selectedModel = ref('');
    const selectedAppearance = ref('Female');
    const androidName = ref('');
    const bio = ref('');

    const androidAppearanceSel = computed(() => {
        return appe.value.find(
            appearance => appearance.name === selectedAppearance.value)
    });

    const androidModelSel = computed(() => {
        return models.value.find(
            model => model.name === selectedModel.value)
    });

    const androidTypeSel = computed(() => {
        if(selectedModel.value === 'YoRHa'){
            return types.value.find(
                type => type.name === selectedType.value
            );
        } 

        return types.find(
            type => type.name === 'NoType'
        );
    });

    const androidNumber = computed(() => {
        let num = 0;
        androids.value.find(
            android => {
                if(android.type?.name === selectedType.value &&
                    num <= android.type_number){
                        num = android.type_number + 1;
                }
            }
        );

        if (num === 0 && selectedModel.value === 'YoRHa') 
            num = 1;
        
        return num;
    });

    const msg = ref(null);
    const loadingStore = useLoadingStore();

    /**
     * * Function to create an Android
     */
    async function createAndroid() {
        loadingStore.showLoader();

        const isOperator = androidTypeSel.value.name === 'Operator';
        const isExecutioner = androidTypeSel.value.name === 'Executioner';
        const name = androidModelSel.value.name === 'Special' ? androidName.value : '';

        const android = {
            name,
            modelId: androidModelSel.value.id,
            typeId: androidTypeSel.value.id,
            type_number: androidNumber.value,
            appearanceId: androidAppearanceSel.value.id,
            desc: bio.value,
            isOperator,
            isExecutioner,
        }

        try{
            const response = await axios.post(connection + "androids", JSON.stringify(android), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log(response.data);

            // msg.value = messageModal.createMessage(
            //     messageModal.data().httpMethod.CREATE,
            //     messageModal.data().object.ANDROID,
            //     messageModal.data().status.SUCCESSFUL
            // )

        } catch (err) {
            // msg.value = messageModal.createMessage(
            //     '', '', messageModal.data().status.ERROR
            // )

        } finally {
            loadingStore.hideLoader()
        }
        
    }

    return {
        selectedType,
        selectedModel,
        selectedAppearance,
        androidName,
        androidAppearanceSel,
        androidModelSel,
        androidTypeSel,
        bio,
        androidNumber,
        msg,
        createAndroid,
    }
}