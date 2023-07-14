<template>
  <div class="meme-card" @click="selectTemplate">
    <div class="image-container">
      <img class="meme-image" :src="imageUrl" alt="Template"/>
    </div>
    <div class="content-container">
      <div class="header-container">
        <h2 class="title">{{ title }}</h2>
        <div class="date">
          <img class="icon" src="../assets/calendar.png" alt="Date"/>
          <span class="date-text">{{ formattedDate }}</span>
        </div>
      </div>
      <div class="details" v-if="isSavedTemplatesPage">
        <div class="views">
          <img class="icon" src="../assets/eye.svg" alt="Views"/>
          <span class="views-text">{{ isPublic ? 'Public' : 'Private' }}</span>
        </div>
        <div class="views" @click.stop="selectSettings">
          <img class="icon" src="../assets/settings.svg" alt="Settings" style="width: 20px; height: auto"/>
        </div>
      </div>
    </div>
    <Modal title="Upload meme" @ok="saveSettings" v-model:visible="modalVisible">
      <Form layout="vertical">
        <FormItem label="Name">
          <Input v-model:value="templateName" style="padding: 4px 11px"/>
          <div style="display: flex">
            <p>Set to private:</p>
            <Checkbox v-model:checked="isPrivate" style="margin-left: 8px;"></Checkbox>
          </div>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import {Form, Input, FormItem, Modal, Checkbox} from "ant-design-vue";
import {Auth} from "@aws-amplify/auth";
import {API} from "aws-amplify";
import { notification } from 'ant-design-vue';

export default {
  name: "TemplateCard",
  components: {
    Form,
    Input,
    FormItem,
    Modal,
    Checkbox,
  },
  props: {
    imageUrl: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: false,
    },
    isPublic: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      modalVisible: false,
      templateName: this.title,
      isPrivate: !this.isPublic,
    }
  },
  computed: {
    isSavedTemplatesPage() {
      console.log(this.$route.name)
      return this.$route.name === 'Saved Templates';
    },
    formattedDate() {
      const date = new Date(this.date);

      const day = date.getDate();
      const month = date.toLocaleString("en-US", {month: "long"});

      return `Created on ${day}. ${month}`;
    },
  },
  methods: {
    async saveSettings() {
      const user = await Auth.currentAuthenticatedUser();
      const token = user.signInUserSession.idToken.jwtToken;
      const options = {
        body: {
          name: this.templateName,
          is_public: !this.isPrivate,
        },
        headers: {
          Authorization: token,
        },
      };
      API.patch('api', `/templates/${this.id}`, options)
          .then(response => {
            console.log(response);
            notification.success({
              message: "Saved settings",
              description: "Changes have been saved.",
            });

            this.isUploading = false;
            this.modalVisible = false;

          })
          .catch(error => {
            console.log(error);
            notification.success({
              message: "Something went wrong",
              description: "Please try again later.",
            })
          });
      this.modalVisible = false;
    },
    selectTemplate() {
      this.$emit("selectTemplate", this.id);
    },
    selectSettings() {
      // this.templateName = this.title;
      // this.isPrivate = !this.isPublic;
      this.modalVisible = true;
    }
  }
};
</script>

<style scoped>
* {
  font-family: "Poppins", sans-serif;
}

.meme-card {
  /*max-width: 350px;*/
  display: flex;
  padding: 1rem;
  border-radius: 8px;
  background-color: #ffffff;
  height: 200px;
  width: 350px;
}

.image-container {
  width: 50%;
  border-radius: 8px;
  overflow: hidden;
}

.meme-image {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover;
}

.content-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;
  padding-left: 1rem;
}

.header-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.title {
  font-size: 18px;
  color: #332c5c;
  font-weight: 500;
  margin: 0;
}

.details {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
}

.date,
.likes,
.views,
.daily-uses {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  color: #9183e8;
  font-size: 11px;
}

.icon {
  width: 16px;
  height: 16px;
  margin-right: 0.5rem;
}

.date {
  display: flex;
  align-items: center;
  margin: 4px 0;
}

.date-text {
  color: #bab5d6;
  font-size: 12px;
  display: inline-block;
  margin-top: 2px;
}

.likes-text,
.views-text,
.shares-text {
  color: #9183e8;
}
</style>
