<template>
  <div id="box">
    <img class="meme-image" :src="url">
    <p v-for="textField in textFields" :key="textField.id" class="meme-text"
       :style="getStyles(textField.id)"> {{ textField.value }} </p>
  </div>

  <Modal title="Upload meme" @ok="uploadMeme" v-model:visible="modalVisible">
    <Form layout="vertical">
      <FormItem label="Name">
        <Input v-model:value="memeName" style="padding: 4px 11px"/>
        <Spin :spinning="isUploading" tip="Uploading.."/>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import html2canvas from "html2canvas";
import AWS from "aws-sdk";
import {API, Auth} from "aws-amplify";
import {Spin, Form, Modal, FormItem, Input} from "ant-design-vue";

export default {
  name: "MemeEditor",
  props: {url: String, textFields: Array, styles: Object},
  components: {Spin, Modal, Form, FormItem, Input},
  data() {
    return {
      dragObj: {},
      draggables: [],
      loading: false,
      uploadMemeUrl: "",
      modalVisible: false,
      memeName: "",
      isUploading: false,
    }
  },
  methods: {
    getStyles(id) {
      const textField = this.textFields.find(text => text.id === id);
      return {
        'max-width': textField.maxWidth + "px",
        'font-size': textField.fontSize + "px",
      }
    },
    down(event) {
      if (~event.target.className.search(/meme-text/)) {
        this.dragObj = this.makeObj(event);
        this.dragObj.element.style.zIndex = "100";
        document.addEventListener("mousemove", this.freeMovement, false);
      }
    },
    freeMovement(event) {
      //Prevents redundantly adding the same event handler repeatedly
      if (typeof (this.dragObj.element.mouseup) == "undefined")
        document.addEventListener("mouseup", this.drop, false);

      this.dragObj.element.style.left = Math.max(this.dragObj.minBoundX, Math.min(event.clientX - this.dragObj.posX, this.dragObj.maxBoundX)) + "px";
      this.dragObj.element.style.top = Math.max(this.dragObj.minBoundY, Math.min(event.clientY - this.dragObj.posY, this.dragObj.maxBoundY)) + "px";
    },

    drop() {
      this.dragObj.element.style.zIndex = "1";

      document.removeEventListener("mousemove", this.freeMovement, false);
      document.removeEventListener("mouseup", this.drop, false);
    },

    makeObj(event) {
      const obj = {},
          e = event.target;
      obj.element = e;

      // parentNode is our bounding box
      // the minimum boundary is based on the top left corner of our container
      obj.minBoundX = e.parentNode.offsetLeft;
      obj.minBoundY = e.parentNode.offsetTop;

      // the maximum is the bottom right corner of the container
      // or.. the top left (x,y) + the height and width (h,y) - the size of the square
      obj.maxBoundX = obj.minBoundX + e.parentNode.offsetWidth - e.offsetWidth;
      obj.maxBoundY = obj.minBoundY + e.parentNode.offsetHeight - e.offsetHeight;

      obj.posX = event.clientX - e.offsetLeft;
      obj.posY = event.clientY - e.offsetTop;

      return obj;
    },
    saveMeme() {
      this.modalVisible = true;
    },
    uploadMeme() {
      this.isUploading = true;
      html2canvas(document.getElementById("box"), {
        useCORS: true
      }).then((canvas) => {
        // const anchorTag = document.createElement("a");
        // document.body.appendChild(anchorTag);
        // anchorTag.download = "meme.jpg";
        // anchorTag.href = canvas.toDataURL();
        // anchorTag.target = '_blank';
        // anchorTag.click();
        canvas.toBlob(async (blob) => {
          // Create a File object from the Blob
          const session = await Auth.currentSession();
          const idToken = session.getIdToken().decodePayload().sub;
          const file = new File([blob], `${idToken}-${Date.now()}.jpg`);
          this.uploadMemeUrl = await this.uploadFileToS3(file);

          const user = await Auth.currentAuthenticatedUser();
          const token = user.signInUserSession.idToken.jwtToken;
          const options = {
            headers: {
              Authorization: token,
            },
            body: {
              name: this.memeName || "Untitled",
              picture_url: this.uploadMemeUrl,
            },
          };
          API.post('api', '/memes', options)
              .then(response => {
                console.log(response);
                this.isUploading = false;
                this.modalVisible = false;
              })
              .catch(error => {
                console.log(error);
              });
          // send request to memes endpoint to save meme

          this.loading = false;
        }, "image/jpeg");
      });
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
    updateDraggableElements() {
      const draggables = document.getElementsByClassName("meme-text");
      for (let i = 0; i < draggables.length; i++) {
        draggables[i].addEventListener("mousedown", this.down, false);
      }
    },
  },
  updated() {
    this.updateDraggableElements();
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}

#box {
  width: max-content;
}

.meme-image {
  max-width: 640px;
}

.meme-text {
  font-family: "Impact", serif;
  font-size: 34px;
  color: white;
  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000;
  position: absolute;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  cursor: move;
}
</style>
