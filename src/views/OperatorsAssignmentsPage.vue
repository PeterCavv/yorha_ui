<script setup>
import { useOperatorData } from '../stores/OperatorStore';

const store = useOperatorData();
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
        {{ $t("operator.this_data", { n: store.options['operator'].name.name }) }}
      </figcaption>
      <p>{{ $t('operator.add_android_desc') }}</p>
      <cite style="font-size: small">{{  $t('operator.cite_add_android') }}</cite>
    </figure>

  <div class="center-container">
    <div class="input-group">
      <input class="searcher-assign" v-model="searchValue" type="text" v-bind:placeholder="$t('data_search.android_search')">
      
      <div style="flex-direction: row;">
        <label>Only Available</label>
        <input type="checkbox" checked @change="changeShow()">
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
          <template v-if="showAllAndroids" v-for="( android, index ) in filteredAndroidList()" :key="index">
            <tr class="interactive" style="height: 30px;">
              <td>{{ android.name }}</td>
              <td>{{ android.type.name }}</td>
              <td v-if="android.state.name == 'Operational' && android.assigned_operator == null" 
              style="color: #22c05f;">{{ $t('simple_response.affirmative') }}</td>
              <td v-else style="color: #c02222">{{ $t('simple_response.negative') }}</td>
              <td v-if="android.assigned_operator != null">{{android.assigned_operator.name.name}}</td>
              <td v-else>-</td>
              <td v-if="android.state.name == 'Operational' && android.assigned_operator == null">
                <a @click="() => {assingAndroid(android.id, store.options['operator'].id); $router.push({name: 'system'})}">
                  <img src="../assets/assing_icon.png" style="width: 20px;">
                </a>
              </td>
              <td></td>
            </tr>
          </template>
        </template>
        <template v-else class="dataScroll">{{ $t('data_search.android_message')}}</template>
    </tbody>
    </table>
  </div>
  <hr class="bottom-screen"/>
</template>

<style>

  .bottom-screen{
    position: fixed;
    bottom: 5px; /* Ajusta la distancia desde la parte inferior */
    left: 0;
    width: 100%; /* No tiene que ocupar el 100% del ancho */

  }

  .interactive:hover,
  .interactive:focus{
    background-color: #747266;
    color: #cac6b3;
  }

  .interactive td{
    vertical-align: middle;
  }

  .center-container {
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
  }
</style>

<script>
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
    data: {
        selectedAndroid: null,
        showAvailable: true,
        showAllAndroids: true

    },
    mixins: [searcher],
    methods: {
      changeShow() {
        this.showAvailable = this.showAvailable ? false : true;
		  },

      filteredAndroidList() {
        const android = this.androidList.filter(
          android => android.type.name != 'Operator' && android.name != 'Commander White' && android.model.name != 'Special'
        );

        if ( this.showAvailable ) {
          return android.filter(
            android => android.state.name === 'Operational' && android.assigned_operator == null
          );
        }
          return android;
      },
      async assingAndroid(androidId, operatorId){
        await axios.put(connection + `androids/${androidId}/${operatorId}`)
            .then((res) => {
                console.log("API Answer: " + res)
                this.msg = this.createMessage(
                    messageModal.data.httpMethod.UPDATE, 
                    messageModal.data.object.ANDROID, 
                    messageModal.data.status.SUCCESSFUL
                );
            })
            .catch((error) => this.msg = this.createMessage("", "", messageModal.data.status.ERROR)
            );
      }
    }
}
</script>