<template>
    <h2>{{ $t('data_base.android_data') }}</h2>
    <input v-model="searchValue" type="text" v-bind:placeholder="$t('data_search.android_search')"
    style="width:20rem; margin-left: 3rem;">

    <div class="flex-container">
        <blockquote style="width: 25rem; margin-right: 8rem;">
            <figure class="data-figure" style="height: 100%;">
                <hr/>
                <div v-if="androidList.length" class="dataScroll">
                    <div v-for="( android, index ) in androidList" :key="index">
                        <button @click="showTypeInfo( android )" 
                        class="button button-list" id="menu" style="width: 100%">
                            <img v-if="android.model.name == 'YoRHa'" src="../assets/android_icon.png" 
                            class="img-android"/>
                            <img v-else src="../assets/special_icon.png" 
                            class="img-nav"/>

                            {{ android.name }}

                            <img v-if="android.state.name === 'Operational'" 
                            src="../assets/Operative_Icon.png" width="12" height="10" 
                            style="vertical-align: middle; float:right"/>
                            <img v-else src="../assets/No_Operative_Icon.png" width="10" height="8" 
                            style="vertical-align: middle; float:right"/>
                        </button>
                    </div>
                </div>
                <div v-else class="dataScroll" style="text-align: left;">{{ $t('data_search.android_message')}}</div>
                <hr/>
            </figure>
        </blockquote>

        <InfoWindow :dataUse="selectedAndroid" :dataType="'android'" :addWindow="addWindow" style="margin-top: -35px;"/>
    </div>
    <hr/>
</template>

<script>
import searcher from '../utils/Searcher'
import InfoWindow from './InfoWindow.vue'

export default {
    name: "AndroidPage",
    components: {
        InfoWindow,
    },
    props: {
        androids: {
            type: Object,
            required: true
        }
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

<style>
.img-android{
    width: 20px;
    height: 23px;
    vertical-align: middle;
}
</style>