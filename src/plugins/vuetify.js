// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

// Vuetify
import { createVuetify } from 'vuetify';

import { VCalendar } from 'vuetify/labs/VCalendar';
export default createVuetify({
	components: {
		VCalendar,
	},
	display: {
		mobileBreakpoint: 'md',
		thresholds: {
			xs: 0,
			sm: 340,
			md: 540,
			lg: 800,
			xl: 1280,
		},
	},
});
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
