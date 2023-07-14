<template>
  <div class="background">
    <SignedInHeader v-if="isUserLoggedIn"/>
    <LandingHeader v-else style="padding-top: 1.5rem"/>
    <Row style="height: 70vh; margin: 10ch" type="flex">
      <Col
          :xs="{ span: 22, offset: 1 }"
          :sm="{ span: 18, offset: 3 }"
          :md="{ span: 11, offset: 1 }"
          :lg="{ span: 11, offset: 1 }"
          :xl="{}"
          :xxl="{}"
          style="display: flex; flex-direction: column; justify-content: center; height: 100%"
      >
        <img src="../assets/firework.svg" alt="firework" style="position: absolute; width: 150px; left: -63px; top: 96px;"/>
        <h1 class="title">
          Welcome To Memify: <span class="subtitle"> Where Humor Takes Shape!</span>
        </h1>
        <p class="description">
          Unleash your imagination and create hilarious memes in seconds with
          our user-friendly and feature-packed meme generator app.
        </p>
        <div style="padding: 12px 50px;">
          <Button class="custom-button" type="primary" @click="redirectToLogin"
          >Get Started Now
          </Button
          >
        </div>
      </Col>
      <Col
          :xs="{ span: 1 }"
          :sm="{ span: 3 }"
          :md="{ span: 0 }"
          :lg="{ span: 0 }"
          :xl="{}"
          :xxl="{}"
      >
      </Col>
      <Col
          :xs="{ span: 0 }"
          :sm="{ span: 0 }"
          :md="{ span: 12 }"
          :lg="{ span: 12 }"
          :xl="{}"
          :xxl="{}"
          style="display: flex; justify-content: center; width: 100%; object-fit: cover; height: 85%; padding-top: 64px;"
      >
        <img
            src="../assets/landing_page_img.png"
            alt="photo1"
        />
      </Col>
      <Col
          :xs="{ span: 0 }"
          :sm="{ span: 0 }"
          :md="{ span: 0 }"
          :lg="{ span: 0 }"
          :xl="{}"
          :xxl="{}"
      >
      </Col>
    </Row>
  </div>
</template>

<script>
import LandingHeader from "@/components/LandingHeader.vue";
import {Row, Col, Button} from "ant-design-vue";
import {Auth} from "aws-amplify";
import SignedInHeader from "@/components/SignedInHeader.vue";

export default {
  name: "LandingPage",
  components: {
    SignedInHeader,
    LandingHeader,
    Row,
    Col,
    Button,
  },
  data() {
    return {
      isUserLoggedIn: false,
    };
  },
  mounted() {
    this.setIsUserLoggedIn();
  },
  methods: {
    redirectToLogin: () => {
      this.$router.push("/signup");
    },
    async setIsUserLoggedIn() {
      try {
        const session = await Auth.currentSession();
        const accessToken = session.getAccessToken();
        const jwt = accessToken.getJwtToken();
        this.isUserLoggedIn = !!jwt;
      } catch (e) {
        this.isUserLoggedIn = false;
      }
    }
  }
};
</script>

<style scoped>
.background {
  background: #d9a7c7; /* fallback for old browsers */
  background: -webkit-linear-gradient(
      to right,
      #fffcdc,
      #d9a7c7
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
      to right,
      #fffcdc,
      #d9a7c7
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  height: 100vh;
  overflow-y: hidden;
}

.title {
  font-family: "Poppins", sans-serif;
  color: #332c5c; /* Set text color to #332C5C */
  font-size: 44px;
  padding: 0 50px;
}

.subtitle {
  color: #8976fd; /* Set text color to #8976FD */
  text-align: center;
}

.description {
  font-family: "Poppins", sans-serif;
  line-height: 180%;
  font-size: 24px;
  padding: 0 50px;
  margin-top: 0;
}

.custom-button {
  /*margin: auto;*/
  color: white;
  font-family: "Poppins", sans-serif;
  font-size: 22px;
  height: 55px;
  border-radius: 12px;
  background-color: var(--primary-color-2);
  margin-top: 24px;
  padding: 10px 22px;
}

.custom-button:hover {
  background-color: var(--primary-color-2);
  color: white;
}
</style>
