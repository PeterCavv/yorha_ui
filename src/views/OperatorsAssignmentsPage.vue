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
        <label>Show Only Available</label>
        <input type="checkbox" checked @change="changeShow()">
      </div>
    </div>

    <table style="width: 100%; margin: 0 auto">
      <thead>
        <tr>
            <th width="40%">{{ $t("start.fabrication_desc2_info1") }}</th>
            <th width="20%">{{  $t("android.model") }}</th>
            <th width="20%">{{  $t("android.available") }}</th>
            <th>{{  $t("operator.name_type") }}</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="androidList.length">
          <template v-for="( android, index ) in filteredAndroidList()" :key="index">
              <tr class="interactive">
                <td>{{android.name}}</td>
                <td>{{android.model.name}}</td>
                <td v-if="android.state.name == 'Operational' && android.assigned_operator == null" 
                style="color: #22c05f;">{{ $t('simple_response.affirmative') }}</td>
                <td v-else style="color: #c02222">{{ $t('simple_response.negative') }}</td>
                <td v-if="android.assigned_operator != null">{{android.assigned_operator.name.name}}</td>
                <td v-else>-</td>
              </tr>
            </template>
          </template> 
        <template v-else class="dataScroll">{{ $t('data_search.android_message')}}</template>
    </tbody>
    </table>
  </div>
</template>

<style>
  .interactive:hover,
  .interactive:focus{
    background-color: #747266;
    color: #cac6b3;
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
  }
</style>

<script>
import searcher from '../utils/Searcher'

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
        showAvailable: true

    },
    mixins: [searcher],
    methods: {
      changeShow() {
        this.showAvailable = this.showAvailable ? false : true;
		  },

      filteredAndroidList() {
        const android = this.androidList.filter(
          android => android.type.name != 'Operator' && android.name != 'Commander White'
        );

        if (this.showAvailable) {
          return android.filter(
            android => android.state.name === 'Operational' && android.assigned_operator == null
          );
        }
          return android;
      }
    }
}
</script>