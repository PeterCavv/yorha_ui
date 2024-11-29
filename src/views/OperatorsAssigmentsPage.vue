<template>
<br/><br/><br/>
  <hr/>
    <h1 class="title">
        <span>
          Operator Assigments
          <font size="4">
              {{ $t('start.subtitle') }}
          </font>
        </span>
    </h1>

    <h2>
        Non Operator Androids
    </h2>

    <figure>
      <figcaption>
        Operator X Assigments
      </figcaption>
      <p>Add or remove androids to this Operator.</p>
      <cite style="font-size: small">An Operator must have at least one android assigned!</cite>
    </figure>

    <input v-model="searchValue" type="text" v-bind:placeholder="$t('data_search.android_search')"
    style="width:20rem; margin-left: 3rem;">

    <table style="width: 80%; margin: 0 auto;" class="listingTable">
      <thead>
        <tr>
            <th width="40%">Name</th>
            <th width="40%">Model</th>
            <th>Available</th>
        </tr>
      </thead>
      <tbody>
          <tr class="interactive" v-for="( android, index ) in androidList" :key="index">
            <td>{{android.name}}</td>
            <td>{{android.model.name}}</td>
            <td v-if="android.state.name == 'Operational'">Yes</td>
            <td v-else>No</td>
          </tr>
    </tbody>
    </table>
</template>

<style>
  .interactive:hover,
  .interactive:focus{
    background-color: #747266;
    color: #cac6b3;
  }

  .hidden {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
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
        addWindow: 0

    },
    mixins: [searcher],
    methods: {
        showTypeInfo(android) {
                this.selectedAndroid = android;
                this.addWindow= 1;
		}
    }
}
</script>