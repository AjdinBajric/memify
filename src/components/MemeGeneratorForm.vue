<template>
  <div>
    <h1 style="font-family: 'Poppins'">Generate your meme</h1>
    <Form layout="vertical">
      <FormItem>
        <MemeEditor v-if="url" :url="url" :text='textFields' ref="memeEditorChild"/>
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
      <FormItem style="margin-top: 50px;" v-if="url">
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
      <FormItem  v-if="url">
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
    </Form>
  </div>
</template>

<script>
import {Form, Input, FormItem, Button, UploadDragger, Row, Col} from "ant-design-vue";
import {API, Auth} from 'aws-amplify';
import MemeEditor from "@/components/MemeEditor.vue";
import {DeleteOutlined} from "@ant-design/icons-vue";

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
  },
  data: function () {
    return {
      url: null,
      textFields: [],
      fileList: [],
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
    beforeUpload(file) {
      this.fileList.push(file);
      console.log(this.fileList);
      // Handle file upload
      // this.url = await this.uploadFileToS3(file);
      // this.url = 'http://www.gravatar.com/avatar/0c7c99dec43bb0062494520e57f0b9ae?s=256&d=identicon&r=PG';
      this.url = 'https://imgflip.com/s/meme/Left-Exit-12-Off-Ramp.jpg';
      return false;
    },
    //   async uploadFileToS3(file) {
    //   // Initialize AWS with the configuration
    //   AWS.config.update(this.awsConfig);
    //
    //   // Create an S3 instance
    //   const s3 = new AWS.S3();
    //
    //   // Set the upload parameters
    //   const params = {
    //     Bucket: this.bucketName,
    //     Key: this.bucketKey,
    //     Body: file,
    //   };
    //
    //   // Upload the file to S3
    //   s3.upload(params, (err, data) => {
    //     if (err) {
    //       console.error('Error uploading file:', err);
    //     } else {
    //       console.log('File uploaded successfully:', data.Location);
    //       // Perform any further actions after successful upload
    //     }
    //   });
    // },
    async handleSubmit(e) {
      e.preventDefault();
      // Handle form submission (generate meme)
    },
    async handleSave() {
      try {
        const session = await Auth.currentSession();
        const idToken = session.getIdToken().jwtToken;

        const options = {
          headers: {
            Authorization: `Bearer ${idToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        };

        API.get('Memify API', '/example-endpoint', options)
            .then(response => {
              // Handle the API response
              console.log('API response:', response);
            })
            .catch(error => {
              // Handle errors
              console.error('API error:', error);
            });
      } catch (error) {
        console.error('Error getting user session:', error);
      }
    },
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
