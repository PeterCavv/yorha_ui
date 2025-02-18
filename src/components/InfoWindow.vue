<template>
    <div v-if="!addWindow || addWindow === null">
        <figure class="innerbox">
            <figcaption>{{ $t('information.title') }}</figcaption>
            <p>{{ $t('information.desc') }}</p>
        </figure>
    </div>

    <div v-else-if="addWindow" >
        <figure class="innerbox">
            <figcaption>
                <img src="../assets/Info_Icon.png" width="22" height="21" 
                style="vertical-align: middle; margin-right: 5px;"/>
                    <slot name="title"></slot>
            </figcaption>
            <slot name="body"></slot>
        </figure>
    </div>
</template>


<script>
export default {
    name: "InfoWindow",
    props: {
        addWindow: {
            type: Boolean,
            required: false
        }
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