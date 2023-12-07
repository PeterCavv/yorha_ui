<template>
   <nav>
        <ul>  
            <li>
                <router-link class="button button-nav " id="menu" 
                to="/startmenu" >
                    <img src="../assets/StartMenu_Icon.png" 
                    width="20" height="20" style="vertical-align: middle;"/>
                    <span style=" vertical-align: middle;">
                        &nbsp;{{ $t('start.title') }}&nbsp;
                    </span>
                </router-link>
            </li>
            <li>&nbsp;&nbsp;&nbsp;</li>
            <li>
                <router-link class="button button-nav" id="menu" 
                to="/database" >
                    <img src="../assets/DataBase_icon.png" 
                    width="20" height="20" style="vertical-align: middle;"/>
                    <span style=" vertical-align: middle;">
                        &nbsp;{{ $t('data_base.title') }}&nbsp;
                    </span>
                </router-link>
            </li>
            <li>&nbsp;&nbsp;&nbsp;</li>
            <li>
                <router-link class="button button-nav" id="menu" 
                to="/system" >
                    <img src="../assets/System_Icon.png" 
                    width="20" height="20" style="vertical-align: middle;"/>
                    <span style=" vertical-align: middle;">
                        &nbsp;{{ $t('system.title') }}&nbsp;
                    </span>
                </router-link>
            </li>
            <li>&nbsp;&nbsp;&nbsp;</li>
            <li>
                <router-link class="button button-nav" id="menu" 
                to="/system" >
                    <img src="../assets/Info_Icon.png" 
                    width="20" height="20" style="vertical-align: middle;"/>
                    <span style=" vertical-align: middle;">
                        &nbsp;About&nbsp;
                    </span>
                </router-link>
            </li>
            <!--<li><button @click="showTemplate('DataBase')" class="button button-nav" id="menu"><img src="./assets/DataBase_icon.png" width="20" height="20" style="vertical-align: middle;"/><span style=" vertical-align: middle;">&nbsp;Data Base</span></button></li>
            <li>&nbsp;&nbsp;&nbsp;</li>
            <li><button @click="showTemplate('System')" class="button button-nav" id="menu"><img src="./assets/System_Icon.png" width="20" height="20" style="vertical-align: middle;"/><span style=" vertical-align: middle;">&nbsp;System</span></button></li>
            <li>&nbsp;&nbsp;&nbsp;</li>
            <li><button href="#" class="button-disabled button-nav" id="menu" disabled>blocked</button></li>
            <li>&nbsp;&nbsp;&nbsp;</li>
            <li><button href="#" class="button-disabled button-nav" id="menu" disabled>blocked</button></li>
            <li>&nbsp;&nbsp;&nbsp;</li>-->
        </ul>
    </nav>
</template>
<script>
import AuthPage from '../views/AuthPage.vue';
</script>

<style>
    #menu{
      text-transform: uppercase;
    }

    .button-nav{
      text-align: left;
      padding-right: 3rem; 
      margin-top: 2rem;
      text-decoration: none;
      width: 10rem;
    }


</style>