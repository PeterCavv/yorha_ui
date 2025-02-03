<script setup>
import { useReportData } from '../stores/ReportStore';
import { useOperatorData } from '../stores/OperatorStore';

const reportStore = useReportData();
const operatorStore = useOperatorData();
</script>

<template>
    <div v-if="addWindow == 0 || addWindow === null">
        <figure class="innerbox">
            <figcaption>{{ $t('information.title') }}</figcaption>
            <p>{{ $t('information.desc') }}</p>
        </figure>
    </div>

    <div class="infoModal" v-else-if="addWindow == 1" >

        <!--REPORT INFO -->
        <div v-if="dataType=='report'">
            <figure class="innerbox">
                <figcaption>
                    <img src="../assets/Info_Icon.png" width="22" height="21" 
                    style="vertical-align: middle;"/>
                    {{ dataUse.name }}
                </figcaption>
                <p><cite>{{ $t('information.content') }}</cite></p>
                <p>{{ dataUse.content }}</p>

                <p style="margin-top: 10px;">- {{ dataUse.android.name }} {{ dataUse.publish_date }} </p>

                <button v-if="compareDates(dataUse.publish_date)" class="button" id="menu"
                style="margin-bottom: 6px; text-align: center; margin-left: auto; text-transform: none; width: 30%"
                @click="editReport => {reportStore.editReport(dataUse); $router.push({name: 'create-report'})}">
                    {{ $t('report.edit_report') }}
                </button>
            </figure>
        </div>
        <!-- END REPORT INFO -->

        <!-- ANDROID INFO -->
        <div v-else-if="dataType=='android'">
            <figure class="innerbox">
                <figcaption style="text-transform: uppercase;">
                    <img src="../assets/Info_Icon.png" width="22" height="21" 
                    style="vertical-align: middle;"/>
                    {{ $t('data_base.android_info', { n: dataUse.name}) }}
                </figcaption>
                <div class="inOneLine">
                    <div style="width: 5rem;">
                        <label><cite>{{ $t('android.state') }}</cite></label>
                        <p>{{ dataUse.model.name }}</p>
                    </div>
                    <div style="width: 5rem;">
                        <label><cite>{{ $t('android.type') }}</cite></label>
                        <p v-if="dataUse.type !== null && dataUse.type.name !== 'NoType'">{{ dataUse.type.name }}</p>
                        <p v-else>{{ $t('information.data_empty') }}</p>
                    </div>
                    <div style="width: 5rem;">
                        <label><cite>{{ $t('android.type_number') }}</cite></label>
                        <p v-if="dataUse.type_number != '' && dataUse.type_number != 0">{{ dataUse.type_number}}</p>
                        <p v-else>{{ $t('information.data_empty') }}</p>
                    </div>
                    <div style="width: 7rem;">
                        <label><cite>{{ $t('android.appearance') }}</cite></label>
                        <p>{{ dataUse.appearance.name }}</p>
                    </div>
                    <div>
                        <label><cite>{{ $t('android.short_name') }}</cite></label>
                        <p v-if="dataUse.short_name != null">{{ dataUse.short_name}}</p>
                        <p v-else>{{ $t('information.data_empty') }}</p>
                    </div>
                    
                </div>
                <div class="inOneLine">
                    <div style="width: 7rem;">
                        <label><cite>{{ $t('android.state') }}</cite></label>
                        <div v-if="dataUse.state.name === 'Operational'">
                            <p style="color: #22c05f">{{ dataUse.state.name }}</p>
                        </div>
                        <div v-else>
                            <p style="color: #c02222">{{ dataUse.state.name }}</p>
                        </div>
                    </div>
                    <div style="margin-left: auto;" v-if="dataUse.type.name != 'Operator' && dataUse.model.name != 'Special'">
                            <label><cite>{{ $t('android.assigned_operator') }}</cite></label>
                            <p v-if="dataUse.assigned_operator">{{ dataUse.assigned_operator.name.name }}</p>
                            <p v-else>{{ $t('information.data_empty') }}</p>
                    </div>

                </div>
                
                <br/>
                <label><cite>{{ $t('android.biography') }}</cite></label>
                <p v-if="dataUse.desc.length != 0">{{ dataUse.desc }}</p>
                <p v-else style="text-transform: uppercase;">{{ $t('information.null_desc') }}</p>
                <p></p>
                
            </figure>
        </div>
        <!-- END ANDROID INFO-->

        <!-- OPERATOR INFO -->
        <div v-else-if="dataType=='operator'">
            <figure class="innerbox2">
                <figcaption style="text-transform: uppercase;">
                    <img src="../assets/Info_Icon.png" width="22" height="19" 
                    style="vertical-align: middle;"/>
                    {{ $t('data_base.android_info', { n: dataUse.name.name}) }}
                </figcaption>
                <p for="androidList"><cite>{{ $t('data_base.androids') }}</cite></p>
                <ul id="androidList">
                    <div v-if="dataUse.androids.length">
                        <li>
                            {{ $t("operator.androids_assigned", { n: dataUse.androids.length }) }}
                        </li>
                    </div>
                    <div v-else>
                        <li style="text-transform: uppercase;">
                            {{ $t('information.null_desc') }}
                        </li>
                    </div>
                </ul>
                <br/>
                <div>
                    <button class="button" id="menu" @click="editOperator => { 
                        operatorStore.editOperator(dataUse);
                        $router.push({name: 'assing-android'})
                        }"
                        style="margin-bottom: 6px; text-align: center; float: right; text-transform: none; width: 45%">
                        {{ $t('data_base.btn_assing_android') }}
                    </button>
                </div>
            </figure>
        </div>
        <!-- END OPERATOR INFO -->

        <!-- TYPES INFO -->
        <div v-else-if="dataType=='type'">
            <figure class="innerbox">
                <figcaption style ="text-transform: uppercase;">
                    <img src="../assets/Info_Icon.png" width="22" height="19" 
                    style="vertical-align: middle;"/>
                    {{ $t('data_base.types', { n: dataUse.name, m: dataUse.resume }) }}
                </figcaption>
                <p><cite>{{ $t('data_base.type_desc') }}</cite></p>
                <p>{{ dataUse.desc }}</p>
                <br/>
                <button class="button" id="menu"
                style="margin-bottom: 6px; text-align: center; float: right; text-transform: none; width: 30%"
                @click="changeEditBox()">
                    {{ $t('data_base.edit_type') }}
                </button>
            </figure>
        </div>
        <!-- END TYPE INFO -->

        <!-- WEAPONS INFO -->
        <div v-else-if="dataType == 'weapon'">
            <figure class="innerbox">
                <figcaption style="text-transform: uppercase;">
                    <img src="../assets/Info_Icon.png" width="22" height="19"
                    style="vertical-align: middle;"/>
                    {{ $t("weapon.info") }}
                </figcaption>
                <div v-if="dataUse.weapon_type.name !='COMBAT_BRACERS'" class="imageBox">
                    <div v-if="dataUse.weapon_type.name == 'SMALL_SWORDS'">
                        <img v-if="dataUse.name == 'YoRHa-issue Blade'" class="weaponimg" src="../assets/yorha-issue_blade_img.png">
                        <img v-else-if="dataUse.name == 'Cruel Oath'" class="weaponimg" src="../assets/cruel_oath_img.png">
                        <img v-else class="weaponimg" src="../assets/virtuous_contract_img.png">
                    </div>
                    <div v-else-if="dataUse.weapon_type.name == 'LARGE_SWORDS'">
                        <img v-if="dataUse.name == 'Virtuous Treaty'" class="weaponimg" src="../assets/virtuous_treaty_img.png">
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
                    <cite>{{ dataUse.name }}</cite>
                    <cite style="margin-left: auto;">{{ changeString(dataUse.weapon_type.name) }}</cite>
                </div>
                <hr/>
                <p v-if="dataUse.desc.length != 0">{{ dataUse.desc }}</p>
                <p v-else style="text-transform: uppercase;">{{ $t('information.null_desc') }}</p>
                <p></p>

            </figure>
        </div>

    </div>
</template>


<script>
export default {
    name: "InfoWindow",
    props: {
        dataUse: {
            type: Object,
            required: false
        },
        dataType: {
            type: String,
            required: true
        },
        addWindow: {
            type: Number,
            required: false
        }
    },
    data: function() {
        return{
            editVal: "",   
        }
    }, 
    methods: {
        changeString(data){
            return data.split('_').map(word =>
                word.charAt(0).toUpperCase() + 
                word.slice(1).toLowerCase()
            ).join(' ');
        },
        compareDates(date){
            if(date === null){
                return false;
            }

            const formatDateToYYYYMMDD = () => {
                const [day, month, year] = this.dataUse.publish_date.split('/');
                return `${year}-${month}-${day}`;
            }

            date = formatDateToYYYYMMDD();

            const inputDate = new Date(date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            inputDate.setHours(0, 0, 0, 0);

            return inputDate.getTime() > today.getTime();
        },
    }
}
</script>

<style>
@media only screen and (max-width: 602px){
  .innerBox{
    display: flex;
    width: 100%;
    z-index: 9888;
  }

}
</style>