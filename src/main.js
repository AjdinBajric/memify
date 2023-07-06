// main.js
import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import Antd from 'ant-design-vue';
import {Amplify} from 'aws-amplify';
import awsExports from '../aws-exports';

Amplify.configure(awsExports);

const app = createApp(App);

app.use(router);
app.use(Antd);

app.mount('#app');
