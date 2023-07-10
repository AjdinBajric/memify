// main.js
import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import Antd from 'ant-design-vue';
import {Amplify} from 'aws-amplify';
import awsExports from '../aws-exports';
import AWS from "aws-sdk";

Amplify.configure(awsExports);
AWS.config.update({
    accessKeyId: process.env["VUE_APP_AWS_ACCESS_KEY_ID"],
    secretAccessKey: process.env["VUE_APP_AWS_SECRET_ACCESS_KEY"],
});

const app = createApp(App);

app.use(router);
app.use(Antd);

app.mount('#app');
