import axios from 'axios';
import { connection } from '@/services/ApiConnection.js'
import { useOperatorData } from '@/stores/OperatorStore.js';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { computed } from 'vue';

export function operatorAssigmentsController() {
    const store = useOperatorData(); 
    const { options } = storeToRefs(store);
    const operator = computed(() => options.value.operator)

    const selectedAndroid = ref(null);
    const showList = ref('available');
    const showAllAndroids = ref(true);
    const showModal = ref(false);

    async function assignAndroid(androidId, operatorId){
        console.log(`${connection}/androids/add/${androidId}/${operatorId}`)
        try{
            const response = await axios.put(`${connection}androids/add/${androidId}/${operatorId}`);
            return response.data;
        } catch (error) {
            console.error('Error assigning Android:', error);
            throw error;
        }
    }

    async function removeAssignedAndroid(androidId, operatorId){
        try{
            const response = await axios.put(`${connection}androids/remove/${androidId}/${operatorId}`);
            return response.data
        } catch (error) {
            console.error('Error removing assigned Android:', error);
            throw error;
        }
    }

    return{
        operator,
        selectedAndroid,
        showList,
        showAllAndroids,
        showModal,
        assignAndroid,
        removeAssignedAndroid
    }
}