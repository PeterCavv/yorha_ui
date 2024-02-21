<template>
	<br/><br/><br/>
	<hr/>
	<h1 style="text-align:left; padding-left:2rem;">
		<span>{{ $t('data_base.title') }}
		<font size="4">{{ $t('data_base.subtitle') }}</font></span>
	</h1>
	<hr/> 

		<nav>
			<ul>
				<li>
					<button @click="show('android');" class="button button-menu" 
					id="menu">{{ $t('data_base.androids' )}}</button>
				</li>
				<li>&nbsp;&nbsp;&nbsp;</li>
				<li>
					<button @click="show('report');" class="button button-menu" 
					id="menu">{{ $t('data_base.reports' )}}</button>
				</li>
				<li>&nbsp;&nbsp;&nbsp;</li>
			</ul>
		</nav>
		<br/><br/><br/>
		
		<AndroidPage :androids="androids" v-if="dataAndroids"/>
		<ReportPage :reports="reports" v-if="dataReports"/>

</template>

<script>
import { connection } from '@/services/ApiConnection'
import ReportPage from '../components/ReportPage.vue'
import AndroidPage from '../components/AndroidPage.vue'

export default {
	el: "DataBase",
	components: {
		AndroidPage,
		ReportPage,
	},
	data() {
		return {
			dataAndroids: false,
			dataReports: false,
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
					this.dataReports = false;
					this.dataAndroids = true;
					break;
				case "report":
					this.dataAndroids = false;
					this.dataReports = true;
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