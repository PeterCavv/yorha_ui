<template>
    <div class="navegator">
        <router-link class="button button-nav " id="menu" 
        to="/startmenu" >
            <img src="../assets/StartMenu_Icon.png" 
            class="img-nav" style="vertical-align: middle;"/>
            <span style=" vertical-align: middle;">
                &nbsp;{{ $t('start.title') }}&nbsp;
            </span>
        </router-link>

        <router-link class="button button-nav" id="menu" 
        to="/database" >
            <img src="../assets/DataBase_icon.png" 
            class="img-nav" style="vertical-align: middle;"/>
            <span style=" vertical-align: middle;">
                &nbsp;{{ $t('data_base.title') }}&nbsp;
            </span>
        </router-link>

        <router-link class="button button-nav" id="menu" 
        to="/system" >
            <img src="../assets/System_Icon.png" 
            class="img-nav" style="vertical-align: middle;"/>
            <span style=" vertical-align: middle;">
                &nbsp;{{ $t('system.title') }}&nbsp;
            </span>
        </router-link>

        <router-link class="button button-nav" id="menu" 
        to="/system" >
            <img src="../assets/Info_Icon.png" 
            class="img-nav" style="vertical-align: middle;"/>
            <span style=" vertical-align: middle;">
                &nbsp;About&nbsp;
            </span>
        </router-link>
    </div>
</template>

<style>
    #menu{
      text-transform: uppercase;
    }

    .img-nav{
        width: 20px;
        height: 20px;
    }

    .button-nav{
      margin-top: 10px;
      text-decoration: none;
    }

    @media only screen and (max-width: 602px){
        .button-nav{
            display:block;
            margin-bottom: 10px;
            width: 100%;
        }

        .navegator{
            margin-right: 15px;
            margin-bottom: -4em;
        }
    }

    @media only screen and (min-width: 602px){
        .button-nav{
            margin-left: 40px;
            margin-right: -20px;
            width: 9rem;
            display:inline-block;
        }

        .navegator{
            margin-bottom: -3.5em;
        }
    }

</style>