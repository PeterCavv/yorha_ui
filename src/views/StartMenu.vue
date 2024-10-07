<template>
  <br/><br/><br/>
  <hr/>
    <h1 style="text-align: left; padding-left: 2rem;">
        <span>
          {{ $t('start.title') }}
          <font size="4">
              {{ $t('start.subtitle') }}
          </font>
        </span>
    </h1>

    <h2>
        {{ $t('start.fabrication_title') }}
    </h2>
      
      <figure>
          <figcaption>
            {{ $t('start.fabrication_subtitle1') }}
          </figcaption>
          <p>
            {{ $t('start.fabrication_desc1') }}
            <mark>{{ $t('start.fabrication_desc1_2') }}</mark>
            {{ $t('start.fabrication_desc1_3') }}
          </p>
          <div style="text-align:center">
              <button class="full" @click="this.$router.push({name: 'fabrication'})">
                {{ $t('start.fabrication_button') }}
              </button>
          </div>
      </figure>

      <figure>
        <figcaption>
          {{ $t('start.fabrication_subtitle3')}}
        </figcaption>
        <p>
          {{ $t('start.info_database', { n: totalAndroids, m: operationalAndroids}) }}     
        </p>
      </figure>

      <figure>
          <figcaption>{{ $t('start.fabrication_subtitle2') }}</figcaption>
          <p>
            <b>{{ $t('start.fabrication_desc2_title1') }}</b>
          </p>
          <hr/>
          <ul>
              <li>{{ $t('start.fabrication_desc2_appearance1') }}</li>
              <li>{{ $t('start.fabrication_desc2_appearance2') }}</li>
              <li>{{ $t('start.fabrication_desc2_appearance3') }}</li>
          </ul>
          <br/>
          <p><b>{{ $t('start.fabrication_desc2_title2') }}</b></p>
          <hr/>
          <ul>
              <li>{{ $t('start.fabrication_desc2_info1') }}</li>
              <li>{{ $t('start.fabrication_desc2_info2') }}</li>
              <li>{{ $t('start.fabrication_desc2_info3') }}</li>
              <li>{{ $t('start.fabrication_desc2_info4') }}</li>
          </ul>
      </figure>

      <h3>Example</h3>
      <table style="margin: 0 auto;">
          <thead>
              <tr>
                  <th width="15%">Name</th>
                  <th width="15%">Appearance</th>
                  <th width="15%">Type</th>
                  <th>Biography</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td>Dévola</td>
                  <td>Female</td>
                  <td>Scanner</td>
                  <td>Androide de tipo escaner con un caracter muy fuerte que viaja por el mundo para recolectar información sobre la vida inteligente que reside en planeta que habita.</td>
              </tr>
          </tbody>
      </table>
      <hr/>
</template>

<script>

export default {
    name: "StartMenu",
    data() {
      return {
        operationalAndroids: 0,
        totalAndroids: 0
      }

    },
    props: {

      androids: {
        type: Object,
        req: true
		  },

    },
    methods: {
      getOperationalAndroids() {

        this.androids.forEach(android => {
          this.totalAndroids++;
          if( android.state.name === 'Operational' ){
            this.operationalAndroids++;
          }

        });

      }
    },
    mounted() {
      this.getOperationalAndroids();
    }
  }

</script>

<style>

.center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

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
