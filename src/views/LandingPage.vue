<template>
  <div class="background">
    <LandingHeader style="padding-top: 1.5rem" />
    <Row
      style="height: 100vh; margin-top: 20vh"
      type="flex"
      justify="center"
      align="top"
    >
      <Col
        :xs="{ span: 22, offset: 1 }"
        :sm="{ span: 18, offset: 3 }"
        :md="{ span: 10, offset: 2 }"
        :lg="{ span: 10, offset: 2 }"
        :xl="{}"
        :xxl="{}"
      >
        <h1 class="title">
          Welcome To Memify<br />
          <span class="subtitle"
            >Where Humor Takes <br />
            Shape!</span
          >
        </h1>
        <p class="description">
          Unleash your imagination and create hilarious memes in seconds with
          our user-friendly and feature-packed meme generator app.
        </p>
        <div style="text-align: center">
          <Button class="custom-button" type="primary">Get Started Now</Button>
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
      >
        <img
          src="../assets/landing_page_img.png"
          alt="photo1"
          style="width: 80%"
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
import { Row, Col, Button } from "ant-design-vue";

export default {
  name: "LandingPage",
  components: {
    LandingHeader,
    Row,
    Col,
    Button,
  },
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
}

.title {
  font-family: "Poppins", sans-serif;
  color: #332c5c; /* Set text color to #332C5C */
  text-align: center;
}

.subtitle {
  color: #8976fd; /* Set text color to #8976FD */
  text-align: center;
}

.description {
  font-family: "Nunito Sans", sans-serif;
  line-height: 180%;
  font-size: 16px;
  text-align: center;
}

.custom-button {
  margin: auto;
  color: white;
  background-color: var(--primary-color-2);
}
.custom-button:hover {
  background-color: var(--primary-color-2);
  color: white;
}
</style>
