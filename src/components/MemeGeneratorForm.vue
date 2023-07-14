<template>
  <div>
    <h1 style="font-family: 'Poppins'">Generate your meme</h1>
    <Form layout="vertical">
      <FormItem>
        <MemeEditor v-if="url" :url="url" :textFields='textFields' ref="memeEditorChild"/>
        <UploadDragger v-else name="file" :multiple="false" :before-upload="beforeUpload">
          <p class="ant-upload-drag-icon">
            <img src="../assets/uploadPhoto.png" alt="upload image icon"/>
          </p>
          <p class="ant-upload-text" style="display: inline">
            Drop your image here, or
          </p>
          <p style="color: #8976fd; display: inline" class="ant-upload-text">
            browse
          </p>
          <br/>
          <p style="display: inline">supports</p>
          <p style="color: #ffc1c1; display: inline" class="ant-upload-hint">
            JPEG,
          </p>
          <p style="color: #98c1ff; display: inline" class="ant-upload-hint">
            JPG,
          </p>
          <p style="color: #a1e283; display: inline" class="ant-upload-hint">
            PNG,
          </p>
        </UploadDragger>
        <Spin :spinning="loading" tip="Loading.."/>
      </FormItem>
      <FormItem style="margin-top: 50px;" v-if="url">
        <FormItem v-for="text in textFields" :key="text.id" :label="`Text ${text.id}`" style="margin: 8px 0;">
          <Row :gutter="16" type="flex" align="middle">
            <Col span="12">
              <Input v-model:value="text.value"/>
            </Col>
            <Col span="6">
              <AInputNumber style="width: 100%" addon-before="Box size" min="24" default-value="200"
                            v-model:value="text.maxWidth" step="20"/>
            </Col>
            <Row span="4" :gutter="8">
              <Col span="12">
                <Button @click="increaseTextSize(text.id)">+</Button>
              </Col>
              <Col span="12">
                <Button @click="decreaseTextSize(text.id)">-</Button>
              </Col>
            </Row>
            <Col span="2">
              <DeleteOutlined @click="deleteTextField(text.id)"
                              style="margin-left: 10px; color: red; font-size: 18px;"/>
            </Col>
          </Row>
        </FormItem>
        <Button @click="addTextField" style>Add text field</Button>
      </FormItem>
      <FormItem v-if="url">
        <Button @click="$refs.memeEditorChild.saveMeme()" class="custom-button" type="primary">Generate meme</Button>
        <Button class="outlined-button" @click="handleSave">Save as template</Button>
        <span style="float: right">
          <img
              src="../assets/twitter.png"
              alt="twittterimg"
              class="social-media-icons"
          />
          <img
              src="../assets/facebook.png"
              alt="facebookimg"
              class="social-media-icons"
          />
          <img
              src="../assets/instagram.png"
              alt="instaimg"
              class="social-media-icons"
          />
        </span>
      </FormItem>
    </Form>
    <Modal title="Save as Template" @ok="saveTemplate" v-model:visible="modalVisible">
      <Form layout="vertical">
        <FormItem label="Name">
          <Input v-model:value="templateName"/>
          <div style="display: flex">
            <p>Set to private:</p>
            <Checkbox v-model:checked="isPrivate" style="margin-left: 8px;"></Checkbox>
          </div>
        </FormItem>
        <Spin :spinning="isUploading" tip="Uploading.."/>
      </Form>
    </Modal>
  </div>
</template>

<script>
import {Form, Input, FormItem, Button, UploadDragger, Row, Spin, Col, Modal, Checkbox} from "ant-design-vue";
// import {API, Auth} from 'aws-amplify';
import MemeEditor from "@/components/MemeEditor.vue";
import {DeleteOutlined} from "@ant-design/icons-vue";
import AWS from 'aws-sdk';
import {API} from "aws-amplify";
import {Auth} from "@aws-amplify/auth";

export default {
  name: "MemeGeneratorForm",
  components: {
    Form,
    Input,
    FormItem,
    Button,
    UploadDragger,
    MemeEditor,
    DeleteOutlined,
    Row,
    Col,
    Modal,
    Checkbox,
    Spin,
  },
  props: {
    template_url: {
      type: String,
      default: null,
    },
  },
  data: function () {
    return {
      url: this.template_url,
      textFields: [],
      fileList: [],
      modalVisible: false,
      isPrivate: false,
      templateName: '',
      isUploading: false,
      loading: false,
    }
  },
  watch: {
    template_url: function (newVal) {
      this.url = newVal;
    }
  },
  methods: {
    increaseTextSize(id) {
      const textFieldIdx = this.findTextFieldIdx(id);
      const fontSize = +(this.textFields[textFieldIdx].fontSize || 34);
      this.textFields[textFieldIdx].fontSize = fontSize + 4;
    },
    decreaseTextSize(id) {
      const textFieldIdx = this.findTextFieldIdx(id);
      let newFontSize = +(this.textFields[textFieldIdx].fontSize || 34) - 4;
      newFontSize = newFontSize < 16 ? 16 : newFontSize;
      this.textFields[textFieldIdx].fontSize = newFontSize;
    },
    findTextFieldIdx(id) {
      return this.textFields.findIndex(textField => textField.id === id);
    },
    addTextField() {
      const textFieldId = Math.max(...this.textFields.map(t => t.id), 0) + 1;
      this.textFields.push({id: textFieldId, 'value': 'Text ' + textFieldId, 'fontSize': 34, 'maxWidth': 200});
    },
    deleteTextField(id) {
      this.textFields = this.textFields.filter(textField => textField.id !== id);
    },
    async beforeUpload(file) {
      this.fileList.push(file);
      this.loading = true;
      // Handle file upload
      this.url = await this.uploadFileToS3(file);
      this.loading = false;
      return false;
    },
    handleSave() {
      this.modalVisible = true;
    },
    async uploadFileToS3(file) {
      const s3 = new AWS.S3();

      const session = await Auth.currentSession();
      const idToken = session.getIdToken().decodePayload().sub;
      const fileName = `${idToken}-${Date.now()}.jpg`;

      const params = {
        Bucket: 'memify-pictures',
        Key: fileName,
        Body: file,
      };

      try {
        const data = await s3.upload(params).promise();
        console.log('File uploaded successfully:', data.Location);
        return data.Location;
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    },
    async saveTemplate() {
      this.isUploading = true;
      const user = await Auth.currentAuthenticatedUser();
      const token = user.signInUserSession.idToken.jwtToken;
      const myInit = {
        body: {
          name: this.templateName,
          picture_url: this.url,
          is_public: !this.isPrivate,
        },
        headers: {
          Authorization: token,
        },
      };
      API.post('api', '/templates', myInit)
          .then(response => {
            console.log(response);
            this.isUploading = false;
            this.modalVisible = false;
          })
          .catch(error => {
            console.log(error);
          });
    }
  },
};

</script>

<style scoped>
.custom-button {
  float: left;
  color: white;
  background-color: var(--primary-color-2);
}

.custom-button:hover {
  background-color: var(--primary-color-2);
  color: white;
}

.outlined-button {
  margin-left: 1rem;
  float: left;
  color: var(--primary-color-2);
  border-color: var(--primary-color-2);
}

.outlined-button:hover {
  color: var(--primary-color-2);
  border-color: var(--primary-color-2);
}

.social-media-icons {
  opacity: 40%;
  margin-left: 0.7rem;
}
</style>
