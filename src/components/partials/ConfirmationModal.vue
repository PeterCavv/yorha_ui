<template>
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal-content" @click.stop>
        <hr class="modal-hr"/>
        <figure class="warning">
            <figcaption style="text-align: center; letter-spacing: 12px; text-transform: uppercase; font-size: 30px; color: #8B0000;
            margin-top: 0px;">
                - {{ $t('start.warning_message') }} -
                <hr style="border-color: #454138"/>
            </figcaption>
            <div class="modal-text">
                <slot name="text"></slot>
                <div class="inOneLine" style="margin-top: 10px;">
                    <button class="button-menu" @click="closeModal">{{ $t('report.back_btn') }}</button>
                    <slot name="button"></slot>
                </div>
                
            </div>
        </figure>
        <hr class="modal-hr"/>
      </div>
    </div>
</template>
  
<script>
import messageModal from '../../utils/MessageModal.mjs';

export default {
    props: {
        isVisible: {
            type: Boolean,
            required: true
        }
    },
    mixins: [messageModal],
    methods: {
        closeModal(){
            this.$emit('update:isVisible', false); 
        }
    }
}

</script>
  
<style scoped>

    .modal-hr {
        border: none;
        height: 6px; 
        background-color: #dcd8c0;
    }

    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }

    .modal-content {
        padding: 20px;
        border-radius: 5px;
        width: 100%;
        padding: 0px;
    }

    .warning, .warning figcaption{
        background-color: #dcd8c0;
        color: #454138;
    }

</style>