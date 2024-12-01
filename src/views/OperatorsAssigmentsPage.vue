<template>
<br/><br/><br/>
  <hr/>
    <h1 class="title">
        <span>
          Operator Assignments
          <font size="4">
             オペレーター割り当て
          </font>
        </span>
    </h1>

    <h2>
        Non Operator Androids
    </h2>

    <figure>
      <figcaption>
        Operator X Assignments
      </figcaption>
      <p>Add or remove androids to this Operator.</p>
      <cite style="font-size: small">An Operator must have at least one android assigned!</cite>
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
            <th width="40%">Name</th>
            <th width="20%">Model</th>
            <th width="20%">Available</th>
            <th>Operator</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="androidList.length">
          <template v-for="( android, index ) in filteredAndroidList()" :key="index">
              <tr class="interactive">
                <td>{{android.name}}</td>
                <td>{{android.model.name}}</td>
                <td v-if="android.state.name == 'Operational' && android.type.name != 'Operator'" style="color: #22c05f;">Yes</td>
                <td v-else style="color: #c02222">No</td>
                <td v-if="android.assigned_operator != null">{{android.assigned_operator.name}}</td>
                <td v-else-if="android.type.name == 'Operator'">Cannot be assigned</td>
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
    flex-direction: column; /* Mantiene el resto en columna */
    justify-content: center;
    align-items: center;
    margin-left: 10%;
    margin-right: 10%;
  }

  .input-group {
    display: flex;
    gap: 10px;             /* Espacio entre los inputs */    
    align-self: flex-start; /* Sobrescribe el alineamiento vertical al centro */
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
        },
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
        if (this.showAvailable) {
          var android = this.androidList.filter(android => android.state.name === 'Operational');
          return android.filter(android => android.type.name != 'Operator');
        }
          return this.androidList;
      }
    }
}
</script>