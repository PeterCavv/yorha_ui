<template>

    <br/><br/><br/>
    <hr/>
    <h1 style="text-align:left; padding-left:2rem;">
        <span>
            {{ $t('data_base.reports') }}
            <font size="4">
                {{ $t('report.subtitle') }}
            </font>
        </span>
    </h1>	

    <h2>
        {{ $t('report.create') }}
    </h2>

    <figure>
        <figcaption style="font-weight:bold;">{{ $t('fabrication.caution') }}</figcaption>
        <p>{{ $t('fabrication.caution_message') }}</p>
        <ul>
            <li>{{ $t('report.caution_message_1') }}</li>
            <li>{{ $t('report.caution_message_2') }}</li>
            <li>
                {{ $t('report.caution_message_3') }}
                <mark>
                    {{ $t('report.caution_message_3_1') }}
                </mark>
            </li>
        </ul>
    </figure>

    <ReportForm :report="report"/>

    <cite v-if="succesfullMessage">TEEEEEST MEssage</cite>
    <hr/>

</template>

<script>
import ReportForm from '../components/ReportForm.vue';

  export default {
    el: 'FabricationPage',
    components: {
        ReportForm
    },
    data(){
        const report = sessionStorage.getItem('report');
        return {
            report: report ? JSON.parse(report) : {} // Devuelve un objeto vacío si no existe
        };
    },
    beforeRouteLeave(to, from, next) {
        sessionStorage.removeItem('report');
        next();
    }
  }
</script>

<style>

    .full { 
      width: 100% 
    }

    #menu{
      text-transform: uppercase;
    }

    .button-menu{
      text-align: left;
      padding-right: 10rem; 
      width: 10rem;
      text-align: center;
    }

    .button-list{
      text-align: left;
      padding-right: 10rem; 
      width: 15rem;
    }

    .data-figure{
      background-color: #dcd8c06b;
      
    }

    .android-attribute{
        margin-right: 18px;
    }

    @media only screen and (max-width: 602px){
        .android-attribute {
            width: 100%;
        }
    }

    @media only screen and (min-width: 602px){
        .android-attribute {
            width: 10em;
        }
    }

    @media only screen and (min-width: 700px){
        .android-attribute {
            width: 12em;
        }
    }

    @media only screen and (min-width: 992px) {
        .android-attribute {
            width: 20%;
        }
    } 

    .button-submit{
      text-align: center;
      padding-right: 10rem; 
      width: 6rem;
    }

    .info{
        font-weight: bold;
    } 

    .centrado{
      text-align: center;
    }

    .fuente{
      overflow: hidden;
      white-space: nowrap;
      margin: 0 auto;
      border-right: 0.1rem solid #454138;
      animation: typing 1.5s steps(39) 5s 1 normal both, blink 1s steps(1) infinite;
    }

    .mayus{
      font-weight: normal;
      text-transform: uppercase;

    }

    
</style>
