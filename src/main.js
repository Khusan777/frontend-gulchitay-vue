import { createApp } from 'vue';
import App from '~/App';
import router from '~/router';
import AlifUI from '~/plugins/aliftech-ui';
import VueCookie from 'vue-cookie';
import AtToast from '~/plugins/aliftech-ui/toast';
import store from '~/store';

export const app = createApp(App);
app.use(router);
app.use(AlifUI);
app.use(store);
app.use(AtToast);

import '~/assets/scss/mainColor.scss';

app.config.globalProperties.$cookie = VueCookie;
app.config.globalProperties.$toast = AtToast;
export const $toast = AtToast;

app.mount('#app');
