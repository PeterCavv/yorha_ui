<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/UserStore'
import { computed } from 'vue'

const authStore = useAuthStore();
const userRole = computed(() => authStore.user.role)
const addWindow = ref(false);
</script>

<template>
    <h2>{{ $t('data_base.android_data') }}</h2>
    <input v-model="searchValue" type="text" v-bind:placeholder="$t('data_search.android_search')"
    class="searcherInput" name="filter">

    <div class="flex-container">
        <blockquote class="searcherWindow">
            <figure class="data-figure" style="height: 100%;">
                <hr/>
                <div v-if="androidList.length" class="dataScroll">
                    <div v-for="( android, index ) in androidList" :key="index">
                        <button @click="() => {showTypeInfo( android ); addWindow = true;}" 
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

        <InfoWindow class="infoWindow" :addWindow="addWindow" style="margin-top: -35px;">
            <template #title>
                {{ $t('data_base.android_info', { n: selectedAndroid.name}) }}
            </template>

            <template #body>
                <div class="inOneLine">
                    <div style="width: 5rem;">
                        <label><cite>{{ $t('android.state') }}</cite></label>
                        <p>{{ selectedAndroid.model.name }}</p>
                    </div>
                    <div style="width: 5rem;">
                        <label><cite>{{ $t('android.type') }}</cite></label>
                        <p v-if="selectedAndroid.type !== null && selectedAndroid.type.name !== 'NoType'">{{ selectedAndroid.type.name }}</p>
                        <p v-else>{{ $t('information.data_empty') }}</p>
                    </div>
                    <div style="width: 5rem;">
                        <label><cite>{{ $t('android.type_number') }}</cite></label>
                        <p v-if="selectedAndroid.type_number != '' && selectedAndroid.type_number != 0">{{ selectedAndroid.type_number}}</p>
                        <p v-else>{{ $t('information.data_empty') }}</p>
                    </div>
                    <div style="width: 7rem;">
                        <label><cite>{{ $t('android.appearance') }}</cite></label>
                        <p>{{ selectedAndroid.appearance.name }}</p>
                    </div>
                    <div>
                        <label><cite>{{ $t('android.short_name') }}</cite></label>
                        <p v-if="selectedAndroid.short_name != null">{{ selectedAndroid.short_name}}</p>
                        <p v-else>{{ $t('information.data_empty') }}</p>
                    </div>
                    
                </div>
                <div class="inOneLine">
                    <div style="width: 7rem;">
                        <label><cite>{{ $t('android.state') }}</cite></label>
                        <div v-if="selectedAndroid.state.name === 'Operational'">
                            <p style="color: #22c05f">{{ selectedAndroid.state.name }}</p>
                        </div>
                        <div v-else>
                            <p style="color: #c02222">{{ selectedAndroid.state.name }}</p>
                        </div>
                    </div>
                    <div style="margin-left: auto;" v-if="selectedAndroid.type.name != 'Operator' && selectedAndroid.model.name != 'Special'">
                            <label><cite>{{ $t('android.assigned_operator') }}</cite></label>
                            <p v-if="selectedAndroid.assigned_operator">{{ selectedAndroid.assigned_operator.name.name }}</p>
                            <p v-else>{{ $t('information.data_empty') }}</p>
                    </div>
                </div>
                
                <br/>
                <label><cite>{{ $t('android.biography') }}</cite></label>
                <div style="margin-bottom: 5px;">
                    <p v-if="selectedAndroid.desc.length != 0">{{ selectedAndroid.desc }}</p>
                    <p v-else style="text-transform: uppercase;">{{ $t('information.null_desc') }}</p>
                </div>

                <div v-if="userRole === 'admin'" style="margin-bottom: 0.2px; margin-top: 0.2px; margin-left: auto;">
                    <button class="button button-menu">Edit credentials</button>
                </div>
            </template>
        </InfoWindow>
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

    },
    mixins: [searcher],
    methods: {
        showTypeInfo(android) {
                this.selectedAndroid = android;
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