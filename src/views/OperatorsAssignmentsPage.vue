<script setup>
import { ref } from 'vue';
import { useOperatorData } from '../stores/OperatorStore';
import { storeToRefs } from 'pinia';

const store = useOperatorData();

const showModal = ref(false);

const { options } = storeToRefs(store);
const operator = options.value.operator;
</script>

<template>
<br/><br/><br/>
  <hr/>
    <h1 class="title">
        <span>
          {{ $t("operator.assg_title") }}
          <font size="4">
            {{ $t("operator.subtitle") }}
          </font>
        </span>
    </h1>

    <h2>
      {{ $t("operator.other_androids") }}
    </h2>

    <figure>
      <figcaption>
        {{ $t("operator.this_data", { n: operator.name.name }) }}
      </figcaption>
      <p>{{ $t('operator.add_android_desc') }}</p>
      <cite style="font-size: small">{{  $t('operator.cite_add_android') }}</cite>
    </figure>

  <div class="table-center-container">
    <div class="input-group">
      <input class="searcher-assign" v-model="searchValue" type="text" v-bind:placeholder="$t('data_search.android_search')">
      
      <div class="showSelect" style="flex-direction: row;">
        <label for="selectShow" style="margin-right: 10px;">Show: </label>
        <select v-model="showList" name="selectAndroidsToShow" id="selectShow" style="width: 10rem;">
          <option value="available">{{ $t("operator.available_search") }}</option>
          <option value="owned">{{ $t("operator.owned_search") }}</option>
          <option value="every">{{ $t("operator.every_search") }}</option>
        </select>
      </div>
    </div>

    <table style="width: 100%; margin: 0 auto">
      <thead>
        <tr>
            <th width="35%">{{ $t("start.fabrication_desc2_info1") }}</th>
            <th width="20%">{{  $t("android.type") }}</th>
            <th width="20%">{{  $t("android.available") }}</th>
            <th width="20%">{{  $t("operator.name_type") }}</th>
            <th></th>
        </tr>
      </thead>
      <tbody>
        <template v-if="androidList.length">
          <template v-if="showAllAndroids" v-for="( android, index ) in filteredAndroidList(operator)" :key="index">
            <tr class="interactive" style="height: 30px;">
              <td>{{ android.name }}</td>
              <td>{{ android.type.name }}</td>
              <td v-if="android.state.name == 'Operational' && android.assigned_operator == null" 
              style="color: #22c05f;">{{ $t('simple_response.affirmative') }}</td>
              <td v-else style="color: #c02222">{{ $t('simple_response.negative') }}</td>
              <td v-if="android.assigned_operator != null">{{ android.assigned_operator.name.name }}</td>
              <td v-else>-</td>
              <td v-if="android.state.name == 'Operational' && android.assigned_operator == null">
                <a @click="() => {assingAndroid(android.id, operator.id);}" name="add">
                  <img src="../assets/assing_icon.png" style="width: 20px;">
                </a>
              </td>
              <td v-else-if="android.assigned_operator != null && android.assigned_operator.name.name === operator.name.name">
                <a @click="() => {selectedAndroid = android; showModal = true;}">
                  <img src="../assets/Block_Icon.png" style="width: 20px; margin-top: 5px;">
                </a>
              </td>
              <td></td>
            </tr>
          </template>
        </template>
        <template v-else class="dataScroll">{{ $t('data_search.android_message')}}</template>
    </tbody>
    </table>

    <ConfirmationModal :isVisible="showModal" @update:isVisible="showModal = $event">
      <template #text>
          <p style="padding-bottom: 30px;">
              {{ $t("modal.unassing_message") }}
          </p>
      </template>
      
      <template #button>
          <button class="button-menu" style="margin-left: auto;" 
          @click="removeAssignedAndroid(selectedAndroid.id, operator.id);">{{ $t("modal.unassing_btn") }}</button>
      </template>
    </ConfirmationModal>
  </div>

  <hr class="bottom-screen"/>
</template>
<script>
import ConfirmationModal from '../components/partials/ConfirmationModal.vue';
import searcher from '../utils/Searcher'
import messageModal from '../utils/MessageModal.mjs';
import axios from 'axios';
import { connection } from '@/services/ApiConnection'

export default {
    name: "OperatorsAssigmentsPage",
    props: {
        androids: {
            type: Object,
            required: true
        }
    },
    components: {
      ConfirmationModal
    },
    data: {
        selectedAndroid: null,
        showList: "available",
        showAllAndroids: true

    },
    mixins: [searcher, messageModal],
    methods: {
      changeShow() {
        this.showList = this.showAvailable ? false : true;
		  },
      filteredAndroidList(operator) {
        const android = this.androidList.filter(
          android => android.type.name != 'Operator' && android.name != 'Commander White' && android.model.name != 'Special'
        );

        if ( this.showList == "available" ) {
          return android.filter(
            android => android.state.name === 'Operational' && android.assigned_operator == null
          );
        }

        if( this.showList == "owned") {
          return android.filter(
            android => android.assigned_operator != null && android.assigned_operator.name.name === operator.name.name
          ); 
        }

        return android;
      },
      async assingAndroid(androidId, operatorId){
        await axios.put(connection + `androids/add/${androidId}/${operatorId}`)
            .then((res) => {
                console.log("API Answer: " + res)
                this.msg = this.createMessage(
                    messageModal.data().httpMethod.UPDATE, 
                    messageModal.data().object.ANDROID, 
                    messageModal.data().status.SUCCESSFUL
                );
                this.backToSystem();
            })
            .catch((error) => this.msg = this.createMessage("", "", messageModal.data().status.ERROR)
            );
      },
      async removeAssignedAndroid(androidId, operatorId){
        await axios.put(connection + `androids/remove/${androidId}/${operatorId}`)
            .then((res) => {
              console.log("API Answer: " + res);
              this.msg = this.createMessage(
                    messageModal.data().httpMethod.DELETE, 
                    messageModal.data().object.ANDROID, 
                    messageModal.data().status.SUCCESSFUL
              );
              this.backToSystem();
            })
            .catch((error) => this.msg = this.createMessage("", "", messageModal.data().status.ERROR)
            );
      },
      backToSystem(){
        this.$router.push({name: 'system'});
      }
    }
}
</script>
<style scoped>

  .bottom-screen{
    position: fixed;
    bottom: 5px; 
    left: 0;
    width: 100%;

  }

  .interactive:hover,
  .interactive:focus{
    background-color: #747266;
    color: #cac6b3;
  }

  .interactive td{
    vertical-align: middle;
  }

  .table-center-container {
    display: flex;
    flex-direction: column; 
    justify-content: center;
    align-items: center;
    margin-left: 10%;
    margin-right: 10%;
  }

  .input-group {
    display: flex;
    gap: 10px;                
    align-self: flex-start; 
    margin-left: 0 auto;
    width: 50vw;
    margin-bottom: 10px;
  }

  .searcher-assign{
    width: 25vw;
  }

  @media only screen and (max-width: 602px){
    .input-group{
      gap: 0px;
      flex-direction: column;
      margin-bottom: 10px;
      width: 95%;
    }
    .searcher-assign{
      width: 100%;
    }
    .center-container{
      margin-left: 0px;
      margin-right: 0px;
    }
    .bottom-screen{
      position: none;
      width: 0;
      border: none;
    }
    .showSelect{
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .interactive td{
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }
</style>