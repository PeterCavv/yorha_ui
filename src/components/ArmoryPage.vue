<script setup>
import { ref } from 'vue';

const addWindow = ref(false);
</script>

<template>
    <h2>{{ $t('data_base.armory_data') }}</h2>
    <input v-model="searchValue" type="text" v-bind:placeholder="$t('data_search.weapons_search')"
    class="searcherInput" name="filter">

    <div class="flex-container">
        <blockquote class="searcherWindow">
            <figure class="data-figure" style="height: 100%;">
                <hr/>
                <div v-if="weaponList.length" class="dataScroll">
                    <div v-for="( weapon, index ) in weaponList" :key="index">
                        <button @click="() => {showTypeInfo( weapon ); addWindow = true}" 
                        class="button button-list" id="menu" style="width: 100%">

                            {{ weapon.name }}

                        </button>
                    </div>
                </div>
                <div v-else class="dataScroll" style="text-align: left;">{{ $t('data_search.android_message')}}</div>
                <hr/>
            </figure>
        </blockquote>

        <InfoWindow class="infoWindow" :addWindow="addWindow" style="margin-top: -35px;">
            <template #title>
                {{ $t("weapon.info") }}
            </template>
            <template #body>
                <div v-if="selectedWeapon.weapon_type.name !='COMBAT_BRACERS'" class="imageBox">
                    <div v-if="selectedWeapon.weapon_type.name == 'SMALL_SWORDS'">
                        <img v-if="selectedWeapon.name == 'YoRHa-issue Blade'" class="weaponimg" src="../assets/yorha-issue_blade_img.png">
                        <img v-else-if="selectedWeapon.name == 'Cruel Oath'" class="weaponimg" src="../assets/cruel_oath_img.png">
                        <img v-else class="weaponimg" src="../assets/virtuous_contract_img.png">
                    </div>
                    <div v-else-if="selectedWeapon.weapon_type.name == 'LARGE_SWORDS'">
                        <img v-if="selectedWeapon.name == 'Virtuous Treaty'" class="weaponimg" src="../assets/virtuous_treaty_img.png">
                        <img v-else class="weaponimg" src="../assets/beastlord_img.png">
                    </div>
                    <div v-else>
                        <img class="weaponimg" src="../assets/virtuous_dignity_img.png">
                    </div>
                </div>
                <div v-else class="imageBoxBracers">
                    <img class="weaponbarefistimg" src="../assets/barefist_img.png">
                </div>
                <div class="inOneLine">
                    <cite>{{ selectedWeapon.name }}</cite>
                    <cite style="margin-left: auto;">{{ changeString(selectedWeapon.weapon_type.name) }}</cite>
                </div>
                <hr/>
                <p v-if="selectedWeapon.desc.length != 0">{{ selectedWeapon.desc }}</p>
                <p v-else style="text-transform: uppercase;">{{ $t('information.null_desc') }}</p>
                <p></p>
            </template>
        </InfoWindow>
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
        },
        mixins: [searcher],
        methods: {
            showTypeInfo(weapon){
                this.selectedWeapon = weapon;
            },
            changeString(data){
            return data.split('_').map(word =>
                word.charAt(0).toUpperCase() + 
                word.slice(1).toLowerCase()
            ).join(' ');
        }
        }
}

</script>