<template>
    <div v-if="!addWindow || addWindow === null">
        <figure class="innerbox">
            <figcaption>{{ $t('information.title') }}</figcaption>
            <p>{{ $t('information.desc') }}</p>
        </figure>
    </div>

    <div class="infoModal" v-else-if="addWindow" >
        <figure class="innerbox">
            <figcaption>
                <img src="../assets/Info_Icon.png" width="22" height="21" 
                style="vertical-align: middle; margin-right: 5px;"/>
                    <slot name="title"></slot>
            </figcaption>
            <slot name="body"></slot>
        </figure>

        <!--REPORT INFO -->

        <!-- END REPORT INFO -->

        <!-- OPERATOR INFO -->

        <!-- END OPERATOR INFO -->

        <!-- TYPES INFO -->

        <!-- END TYPE INFO -->

        <!-- WEAPONS INFO -->
        <div v-if="dataType == 'weapon'">
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
            type: Boolean,
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