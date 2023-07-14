<template>
  <div>
    <Row type="flex">
      <Col
        :xs="{ span: 0 }"
        :sm="{ span: 0 }"
        :md="{ span: 0 }"
        :lg="{ span: 4, offset: 3 }"
        :xl="{}"
        :xxl="{}"
      >
        <div style="display: flex; align-items: center; cursor: pointer;" @click="redirectToHome">
          <img src="../assets/logo.png" alt="logo" style="width: 1.8rem"/>
          <span style="font-family: 'Righteous'; font-size: 2rem; line-height: 130%; margin-left: 12px;">Memify</span>
        </div>
      </Col>
      <Col
        :xs="{ span: 0 }"
        :sm="{ span: 0 }"
        :md="{ span: 0 }"
        :lg="{ span: 14 }"
        :xl="{}"
        :xxl="{}"
      >
        <ul style="margin-top: 0">
          <li><a href="#" @click="redirectToMemes">Browse</a></li>
          <li>
            <a href="#" @click="redirectToMemeGenerator">Generate meme</a>
          </li>
<!--          <li><a href="#">Contact us</a></li>-->
          <li style="display: inline-block">
            <Button
              type="primary"
              class="custom-button"
              @click="redirectToLogin"
              >Login</Button
            >
          </li>
          <li style="display: inline-block; padding-left: 1rem;">
            <Button
              type="default"
              class="outlined-button"
              @click="redirectToSignUp"
              >Sign up</Button
            >
          </li>
        </ul>
      </Col>
      <Col
        :xs="{ span: 0 }"
        :sm="{ span: 0 }"
        :md="{ span: 0 }"
        :lg="{ span: 3 }"
        :xl="{}"
        :xxl="{}"
      >
        <!-- placeholder -->
      </Col>
    </Row>
  </div>
</template>

<script>
import { Row, Col, Button } from "ant-design-vue";
import { useRouter } from "vue-router";

export default {
  name: "LandingHeader",
  components: {
    Row,
    Col,
    Button,
  },

  setup() {
    const router = useRouter();

    const redirectToSignUp = () => {
      router.push("/signup");
    };
    const redirectToLogin = () => {
      router.push("/login");
    };
    const redirectToMemes = () => {
      router.push("/memes");
    };
    const redirectToHome = () => {
      router.push("/");
    };
    const redirectToMemeGenerator = () => {
      router.push("/memegenerator");
    };
    return {
      redirectToLogin,
      redirectToSignUp,
      redirectToHome,
      redirectToMemes,
      redirectToMemeGenerator,
    };
  },
};
</script>

<style scoped>
li {
  list-style-type: none;
  margin-bottom: 10px;
  font-family: "Nunito Sans", sans-serif;
  color: #332c5c;
  line-height: 180%;
  font-size: 15px;
  display: inline-block;
  padding-left: 2rem;
}

a {
  text-decoration: none;
  color: #332c5c;
}

ul {
  padding: 0;
  text-align: right;
}

.stats-card {
  width: 150px;
  display: inline-block;
  margin-right: 3rem;
}

.custom-button {
  color: white;
  background-color: var(--primary-color-2);
  border-radius: 5px;
}

.custom-button:hover {
  background-color: var(--primary-color-2);
  color: white;
}

.outlined-button {
  margin-left: 1rem;
  color: var(--primary-color-2);
  border-color: var(--primary-color-2);
}

.outlined-button:hover {
  color: var(--primary-color-2);
  border-color: var(--primary-color-2);
}
</style>
