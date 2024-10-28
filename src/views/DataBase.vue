<template>
	<br/><br/><br/>
	<hr/>
	<h1 style="text-align:left; padding-left:2rem;">
		<span>{{ $t('data_base.title') }}
		<font size="4">{{ $t('data_base.subtitle') }}</font></span>
	</h1>

	<hr/> 

	<button @click="show('android');" class="button button-select"
	id="menu">{{ $t('data_base.androids') }}</button>

	<button @click="show('report');" class="button button-select" 
	id="menu">{{ $t('data_base.reports') }}</button>

	<button @click="show('weapon');" class="button button-select" 
	id="menu">{{ $t('data_base.armory') }}</button>
	<br/>
	
	<AndroidPage :androids="androids" v-if="dataAndroids"/>
	<ReportPage :reports="reports" v-if="dataReports"/>
	<ArmoryPage :weapons="weapons" v-if="dataWeapons"/>

</template>

<script>
import ReportPage from '../components/ReportPage.vue'
import AndroidPage from '../components/AndroidPage.vue'
import ArmoryPage from '../components/ArmoryPage.vue';

export default {
	el: "DataBase",
	components: {
		AndroidPage,
		ReportPage,
		ArmoryPage
	},
	data() {
		return {
			dataAndroids: false,
			dataReports: false,
			dataWeapons: false
		};
	},
	props: {
		androids: {
			type: Object,
			req: true
		},
		reports: {
			type: Object,
			req: true
		},
		weapons: {
			type: Object,
			required: true
		}
	},
	computed: {
		reportList() {
			if (this.searchValue.trim().length > 0) {
				return this.reports.filter((report) => report.name.toLowerCase().includes(this.searchValue.trim().toLowerCase()));
			}
			return this.reports;
		}
	},
	methods: {
		show(typeData) {
			switch (typeData) {
				case "android":
					this.dataAndroids = true;
					this.dataReports = false;
					this.dataWeapons = false;
					break;
				case "report":
					this.dataAndroids = false;
					this.dataReports = true;
					this.dataWeapons = false;
					break;
				case "weapon":
					this.dataAndroids = false;
					this.dataReports = false;
					this.dataWeapons = true;
					break;
				default:
					break;
			}
		}
	}
}
</script>

<style>
.innerbox{
	min-width: 35rem;
    max-width: 35rem;
}

</style>