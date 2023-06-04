<template>
  <div>
    <h1 style="font-family: 'Poppins'">Generate your meme</h1>
    <Form layout="vertical">
      <FormItem label="Top text" style="font-family: 'Poppins'">
        <Input placeholder="type something..." />
      </FormItem>
      <FormItem label="Bottom text" style="font-family: 'Poppins'">
        <Input placeholder="type something..." />
      </FormItem>
      <FormItem>
        <UploadDragger name="file" :multiple="false">
          <p class="ant-upload-drag-icon">
            <img src="../assets/uploadPhoto.png" alt="upload image icon" />
          </p>
          <p class="ant-upload-text" style="display: inline">
            Drop your image here, or
          </p>
          <p style="color: #8976fd; display: inline" class="ant-upload-text">
            browse
          </p>
          <br />
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
      <FormItem>
        <Button class="custom-button" type="primary" html-type="submit"
          >Generate</Button
        >
        <Button class="outlined-button" html-type="submit">Save</Button>
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
import { Form, Input, FormItem, Button, UploadDragger } from "ant-design-vue";

export default {
  name: "MemeGeneratorForm",
  components: {
    Form,
    Input,
    FormItem,
    Button,
    UploadDragger,
  },
};
</script>

<style scoped>
.custom-button {
  float: "left";
  color: white;
  background-color: var(--primary-color-2);
}
.custom-button:hover {
  background-color: var(--primary-color-2);
  color: white;
}

.outlined-button {
  margin-left: 1rem;
  float: "left";
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
