<template>
  <div>
    <h1 style="font-family: 'Poppins'">Generate your meme</h1>
    <Form layout="vertical">
      <FormItem>
        <MemeEditor v-if="url || loading" :url="url" :text='textFields' ref="memeEditorChild"/>
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
      </FormItem>
      <Spin :spinning="loading" style="margin-top: 50px;" tip="Loading..">
        <FormItem style="margin-top: 50px;" v-if="url || loading">
          <FormItem v-for="text in textFields" :key="text.id" :label="`Text ${text.id}`" style="margin: 8px 0;">
            <Row type="flex" align="middle">
              <Col span="20">
                <Input v-model:value="text.value"/>
              </Col>
              <Col span="4">
                <DeleteOutlined @click="deleteTextField(text.id)"
                                style="margin-left: 10px; color: red; font-size: 14px;"/>
              </Col>
            </Row>
          </FormItem>
          <Button @click="addTextField" style>Add text field</Button>
        </FormItem>
        <FormItem v-if="loading || url">
          <Button @click="$refs.memeEditorChild.downloadMeme()" class="custom-button" type="primary"
          >Generate meme
          </Button
          >
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
      </Spin>
    </Form>
    <Modal title="Save as Template" @ok="saveTemplate" v-model:visible="modalVisible">
      <Form layout="vertical">
        <FormItem label="Name">
          <Input v-model:value="templateName"/>
        </FormItem>
        <FormItem label="Is Public">
          <Checkbox v-model="isPublic"></Checkbox>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import {Form, Input, FormItem, Button, UploadDragger, Row, Col, Spin, Modal, Checkbox} from "ant-design-vue";
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
    Spin,
    Modal,
    Checkbox,
  },
  data: function () {
    return {
      url: null,
      textFields: [],
      fileList: [],
      loading: false,
      modalVisible: false,
      isPublic: true,
      templateName: '',
    }
  },
  methods: {
    addTextField() {
      const textFieldId = Math.max(...this.textFields.map(t => t.id), 0) + 1;
      this.textFields.push({id: textFieldId, 'value': 'Text ' + textFieldId});
    },
    deleteTextField(id) {
      this.textFields = this.textFields.filter(textField => textField.id !== id);
    },
    handleSubmitTemplate() {
      console.log(this.templateName, this.isPublic);
    },
    async beforeUpload(file) {
      this.fileList.push(file);
      console.log(this.fileList);
      this.loading = true;
      // Handle file upload
      this.url = await this.uploadFileToS3(file);
      this.loading = false;
      return false;
    },
    async uploadFileToS3(file) {
      const s3 = new AWS.S3();

      const params = {
        Bucket: 'memify-pictures',
        Key: file.name,
        Body: file,
      };

      try {
        const data = await s3.upload(params).promise();
        console.log('File uploaded successfully:', data.Location);
        return data.Location;
        // Perform any further actions after successful upload
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    },
    handleSave() {
      this.modalVisible = true;
    },
    async saveTemplate() {
      this.modalVisible = false;
      const user = await Auth.currentAuthenticatedUser();
      const token = user.signInUserSession.idToken.jwtToken;
      const apiName = 'api';
      const path = '/templates';
      const myInit = {
        body: {
          name: this.templateName,
          picture_url: this.url,
          is_public: this.isPublic,
        },
        headers: {
          Authorization: token,
        },
      };
      API.post(apiName, path, myInit)
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error.response);
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
