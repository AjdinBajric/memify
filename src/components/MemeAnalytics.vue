<template>
  <Card style=" box-shadow: 0 1px 12px rgba(0, 0, 0, 0.08);">
    <CloseOutlined style="float: right" @click="closeAnalytics"/>
    <!-- First Row -->
    <Row :gutter="16" type="flex" align="top" style="display: flex; justify-content: center">
      <!-- First Column -->
      <Col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="display: flex; justify-content: center">
        <img :src="meme.image_url" alt="Image" style="width: 100%; max-width: 400px"/>
      </Col>
      <!-- Second Column -->
      <Col :xs="24" :sm="24" :md="12" :lg="12" :xl="12"
           style="width: 100%; max-width: 400px; display: flex; flex-direction: column; justify-content: space-between">
        <Row>
          <Col style="margin-bottom: 1rem;">
            <h2 style="font-size: 2.5em; margin: 8px 0;">{{ meme.name }}</h2>
            <p style="font-size: 1.5em; color: #9183e8">{{ formattedDate }}</p>
          </Col>
        </Row>
        <Col>
          <Row justify="space-between">
            <div style="text-align: center" class="view-section">
              <img src="../assets/red_heart.svg" alt="like"/>
              <Statistic title="LIKES" :value="memeLikeCount"/>
            </div>
            <div style="text-align: center" class="view-section">
              <img src="../assets/green_eye.svg" alt="views"/>
              <Statistic title="VIEWS" :value="meme.view_count + 1"/>
            </div>
            <div style="text-align: center" class="view-section">
              <img src="../assets/download.svg" alt="downloads"/>
              <Statistic title="DOWNLOADS" :value="memeDownloadCount"/>
            </div>
          </Row>
          <Row style="margin-top: 16px;">
          <div style="text-align: center" class="view-section">
            <Button v-if="hasUserLiked" type="primary" shape="round" size="large" @click="unlikeMeme">
              <template #icon>
                <HeartTwoTone twoToneColor="#8796fd"/>
              </template>
            </Button>
            <Button v-else type="primary" shape="round" size="large" @click="likeMeme">
              <template #icon>
                <HeartOutlined/>
              </template>
            </Button>
          </div>
          <div style="text-align: center; margin-left: 12px;" class="view-section">
            <a :href="meme.image_url" download @click="downloadMeme">
              <Button type="primary" shape="round" size="large">
                <template #icon>
                  <DownloadOutlined/>
                </template>
                Download
              </Button>
            </a>
          </div>
        </Row>
        </Col>
      </Col>
    </Row>
  </Card>
</template>

<script>
import {Row, Col, Statistic, Card, Button} from "ant-design-vue";
import {CloseOutlined, DownloadOutlined, HeartOutlined, HeartTwoTone} from "@ant-design/icons-vue";
// import {API, Auth} from "aws-amplify";

export default {
  name: "MemeAnalytics",
  components: {
    Row,
    Col,
    Statistic,
    Card,
    CloseOutlined,
    DownloadOutlined,
    Button,
    HeartOutlined,
    HeartTwoTone,
  },
  props: {
    meme: Object,
    // closeAnalyticsFunction: {
    //   type: Function,
    //   required: true,
    // },
  },
  data() {
    return {
      refreshKey: 0,
      hasDownloaded: false,
    };
  },
  computed: {
    formattedDate() {
      const date = new Date(this.meme.date_created);

      const day = date.getDate();
      const month = date.toLocaleString("en-US", {month: "long"});

      return `Created on ${day}. ${month}`;
    },
    memeDownloadCount() {
      return this.meme.share_count + +(!!this.hasDownloaded);
    },
    memeLikeCount() {
      return this.meme.like_count + +(!!this.hasUserLiked);
    },
    hasUserLiked() {
      this.refreshKey; // This is to refresh the computed property when the user likes a meme
      const likedMemes = JSON.parse(localStorage.getItem("likedMemes")) || [];
      if (likedMemes) {
        return likedMemes.includes(this.meme.meme_id);
      }
      return false;
    }
  },
  mounted() {
    this.addViewCount();
  },
  methods: {
    closeAnalytics() {
      this.$emit("closeAnalytics");
      // this.closeAnalyticsFunction();
    },
    async addViewCount() {
      // const user = await Auth.currentAuthenticatedUser();
      // const token = user.signInUserSession.idToken.jwtToken;
      // const options = {
      //   headers: {
      //     Authorization: token,
      //   },
      //   body: {
      //     // name: this.memeName || "Untitled",
      //     // picture_url: this.uploadMemeUrl,
      //   },
      // };
      // API.post('api', `/memes/${this.meme.meme_id}`, options)
      //     .then(response => {
      //       console.log(response);
      //     })
      //     .catch(error => {
      //       console.log(error);
      //     });
    },
    async addDownloadCount() {
      // const user = await Auth.currentAuthenticatedUser();
      // const token = user.signInUserSession.idToken.jwtToken;
      // const options = {
      //   headers: {
      //     Authorization: token,
      //   },
      //   body: {
      //     // name: this.memeName || "Untitled",
      //     // picture_url: this.uploadMemeUrl,
      //   },
      // };
      // API.post('api', `/memes/${this.meme.meme_id}`, options)
      //     .then(response => {
      //       console.log(response);
      //     })
      //     .catch(error => {
      //       console.log(error);
      //     });
    },
    async addLikeCount() {
      // const user = await Auth.currentAuthenticatedUser();
      // const token = user.signInUserSession.idToken.jwtToken;
      // const options = {
      //   headers: {
      //     Authorization: token,
      //   },
      //   body: {
      //     // name: this.memeName || "Untitled",
      //     // picture_url: this.uploadMemeUrl,
      //   },
      // };
      // API.post('api', `/memes/${this.meme.meme_id}`, options)
      //     .then(response => {
      //       console.log(response);
      //     })
      //     .catch(error => {
      //       console.log(error);
      //     });
    },
    async removeLikeCount() {
      // const user = await Auth.currentAuthenticatedUser();
      // const token = user.signInUserSession.idToken.jwtToken;
      // const options = {
      //   headers: {
      //     Authorization: token,
      //   },
      //   body: {
      //     // name: this.memeName || "Untitled",
      //     // picture_url: this.uploadMemeUrl,
      //   },
      // };
      // API.post('api', `/memes/${this.meme.meme_id}`, options)
      //     .then(response => {
      //       console.log(response);
      //     })
      //     .catch(error => {
      //       console.log(error);
      //     });
    },
    downloadMeme() {
      this.hasDownloaded = true;
      this.addDownloadCount();
    },
    likeMeme() {
      this.addLikeCount();
      const likedMemes = JSON.parse(localStorage.getItem("likedMemes")) || [];
      likedMemes.push(this.meme.meme_id);
      this.refreshKey++;

      localStorage.setItem('likedMemes', JSON.stringify(likedMemes));
    },
    unlikeMeme() {
      this.removeLikeCount();
      const likedMemes = JSON.parse(localStorage.getItem("likedMemes")) || [];
      const index = likedMemes.indexOf(this.meme.meme_id);
      if (index > -1) {
        likedMemes.splice(index, 1);
      }
      this.refreshKey++;
      localStorage.setItem('likedMemes', JSON.stringify(likedMemes));
    }
  },
};
</script>

<style scoped>
.outlined-button {
  float: "left";
  color: var(--primary-color-2);
  border-color: var(--primary-color-2);
}

.outlined-button:hover {
  color: var(--primary-color-2);
  border-color: var(--primary-color-2);
}

@media screen and (max-width: 767px) {
  .view-section {
    margin: 2rem 0;
  }
}
</style>
