<template>
    <form>
        <fieldset>
            <legend>{{ $t('report.create_legend') }}</legend>

            <label>{{ $t('report.create_title') }}</label>

            &nbsp;

            <input type="text" class="android-attribute" style="padding-right: 0px;"
            placeholder="Report Title"/>

            <label>{{ $t('report.create_date') }}</label>

            &nbsp;

            <input type="date" class="android-attribute" style="padding-right: 0px;">
        
            <br/>

            <p>
                <br/>
                <label for="textarea">{{ $t('report.create_content') }}</label>
                <textarea  class="full" id="textarea" rows="8" 
                placeholder="This report is about..." :maxlength="350" style="padding-right: 0px;"></textarea>
            </p>

            <button type="button" @click="" class="button-menu">{{ $t('form.submit') }}</button>
        </fieldset>
    </form>
</template>
