<template>
    <h2>{{ $t('data_base.armory_data') }}</h2>
    <input v-model="searchValue" type="text" v-bind:placeholder="$t('data_search.weapons_search')"
    style="width:20rem; margin-left: 3rem;">

    <div class="flex-container">
        <blockquote style="width: 25rem; margin-right: 8rem;">
            <figure class="data-figure" style="height: 100%;">
                <hr/>
                <div v-if="weaponList.length" class="dataScroll">
                    <div v-for="( weapon, index ) in weaponList" :key="index">
                        <button @click="showTypeInfo( weapon )" 
                        class="button button-list" id="menu" style="width: 100%">

                            {{ weapon.name }}

                        </button>
                    </div>
                </div>
                <div v-else class="dataScroll" style="text-align: left;">{{ $t('data_search.android_message')}}</div>
                <hr/>
            </figure>
        </blockquote>

        <InfoWindow :dataUse="selectedWeapon" :dataType="'weapon'" :addWindow="addWindow" style="margin-top: -35px;"/>
    </div>
    <hr/>
</template>

<script>
import searcher from '../utils/Searcher';
import InfoWindow from './InfoWindow.vue';


    export default {
        name: 'ArmoryPage',
        components: {
            InfoWindow
        },
        props: {
            weapons: {
                type: Object,
                required: true
            }
        },
        data: {
            selectedWeapon: '',
            addWindow: 0
        },
        mixins: [searcher],
        methods: {
            showTypeInfo(weapon){
                this.selectedWeapon = weapon;
                this.addWindow = 1;
            }
        }
}

</script>