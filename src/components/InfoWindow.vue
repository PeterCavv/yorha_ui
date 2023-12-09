<template>
        <td v-if="addWindow == 0 || addWindow === null">
            <figure class="innerbox">
                <figcaption>{{ $t('information.title') }}</figcaption>
                <p>{{ $t('information.desc') }}</p>
            </figure>
        </td>

        <td v-else-if="addWindow == 1" >
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
                    <br/>
                    <p>- {{ dataUse.android.name }}</p>
                    <p>{{ dataUse.date }}</p>
                </figure>
            </div>

            <!-- ANDROID INFO -->
            <div v-else-if="dataType=='android'">
                <figure class="innerbox">
                    <figcaption style="text-transform: uppercase;">
                        <img src="../assets/Info_Icon.png" width="22" height="21" 
                        style="vertical-align: middle;"/>
                        {{ $t('data_base.android_info', { n: dataUse.name}) }}
                    </figcaption>
                    <table>
                        <tr>
                            <td style="padding-right: 10px;">
                                <label><cite>{{ $t('start.fabrication_desc2_info2') }}</cite></label>
                                <p>{{ dataUse.model.name }}</p>
                            </td>
                            <td style="width: 5rem;">
                                <label><cite>{{ $t('start.fabrication_desc2_info3') }}</cite></label>
                                <p v-if="dataUse.type !== null">{{ dataUse.type.name }}</p>
                                <p v-else>{{ $t('information.data_empty') }}</p>
                            </td>
                            <td>
                                <label><cite>{{ $t('data_base.android_type_number') }}</cite></label>
                                <p v-if="dataUse.type_number != ''">{{ dataUse.type_number}}</p>
                                <p v-else>{{ $t('information.data_empty') }}</p>
                            </td>
                            <td>
                                <label><cite>{{ $t('start.fabrication_desc2_title1') }}</cite></label>
                                <p>{{ dataUse.appearance.name }}</p>
                            </td>
                            <td>
                                <label><cite>{{ $t('data_base.short_name') }}</cite></label>
                                <p v-if="dataUse.short_name != null">{{ dataUse.short_name}}</p>
                                <p v-else>{{ $t('information.data_empty') }}</p>
                            </td>
                        </tr>
                    </table>
                    <label><cite>{{ $t('data_base.android_state') }}</cite></label>
                    <div v-if="dataUse.state.name === 'Operational'">
                        <p style="color: #22c05f">{{ dataUse.state.name }}</p>
                    </div>
                    <div v-else>
                        <p style="color: #c02222">{{ dataUse.state.name }}</p>
                    </div>
                    <br/>
                    <label><cite>{{ $t('start.fabrication_desc2_info4') }}</cite></label>
                    <p v-if="dataUse.desc.length != 0">{{ dataUse.desc }}</p>
                    <p v-else style="text-transform: uppercase;">{{ $t('information.null_desc') }}</p>
                    <p></p>
                    
                </figure>
            </div>
            <!-- OPERATOR INFO -->
            <div v-else-if="dataType=='operator'">
                <figure class="innerbox2">
                    <figcaption style="text-transform: uppercase;">
                        <img src="../assets/Info_Icon.png" width="22" height="19" 
                        style="vertical-align: middle;"/>
                        {{ $t('data_base.android_info', { n: dataUse.name.name}) }}
                    </figcaption>
                    <label><cite>{{ $t('data_base.androids') }}</cite></label>
                    <ul>
                        <div v-if="!dataUse.androids.length == 0">
                            <div v-for="(android, index) in dataUse.androids" :key="index">
                                <li>
                                <button class="button button-list" style="margin-bottom: 10px;">
                                        {{ android.name }}
                                </button>
                                </li>
                            </div>
                        </div>
                        <div v-else>
                            <li style="text-transform: uppercase;">
                                {{ $t('information.null_desc') }}
                            </li>
                        </div>
                    </ul>
                    <br/>
                    <div>
                        <button class="button" id="menu" 
                        style="margin-bottom: 6px; text-align: center; float: right; text-transform: none;">
                            Asignar Androide
                        </button>
                    </div>
                </figure>
            </div>

            <!-- TYPES INFO -->
            <div v-else-if="dataType=='type'">
                <figure class="innerbox">
                    <figcaption style ="text-transform: uppercase;">
                        <img src="../assets/Info_Icon.png" width="22" height="19" 
                        style="vertical-align: middle;"/>
                        {{ $t('data_base.types', { n: dataUse.name, m: dataUse.resume }) }}
                    </figcaption>
                    <label><cite>{{ $t('data_base.type_desc') }}</cite></label>
                    <p>{{ dataUse.desc }}</p>
                    <br/>
                    <div>
                        <button class="button" id="menu"
                        style="margin-bottom: 6px; text-align: center; float: right; text-transform: none;">
                            Editar Androide
                        </button>
                    </div>
                </figure>
            </div>

        </td>
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
    } 
}
</script>