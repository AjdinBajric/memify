<template>
  <Row class="background" type="flex" justify="center" align="middle">
    <Col
      :xs="{ span: 22, offset: 1 }"
      :sm="{ span: 9, offset: 2 }"
      :md="{ span: 8, offset: 3 }"
      :lg="{ span: 7, offset: 4 }"
      :xl="{ span: 7, offset: 4 }"
      :xxl="{}"
    >
      <div class="logo-container">
        <img src="../assets/logo.svg" alt="logo" class="logo" />
      </div>
      <h1 class="title">
        Welcome To Memify<br />
        <span class="subtitle"
          >Where Humor Takes <br />
          Shape!</span
        >
      </h1>
      <p class="description">
        Unleash your imagination and create hilarious memes in seconds with our
        user-friendly and feature-packed meme generator app.
      </p>
    </Col>
    <Col
      :xs="{ span: 1 }"
      :sm="{ span: 0 }"
      :md="{ span: 0 }"
      :lg="{ span: 0 }"
      :xl="{ span: 0 }"
      :xxl="{}"
    >
    </Col>
    <Col
      :xs="{ span: 22, offset: 1 }"
      :sm="{ span: 9, offset: 1 }"
      :md="{ span: 8, offset: 2 }"
      :lg="{ span: 7, offset: 2 }"
      :xl="{ span: 7, offset: 2 }"
      :xxl="{}"
    >
      <h1>Log into your account.</h1>
      <Form layout="vertical">
        <FormItem label="Email address">
          <Input placeholder="yourname@email.com" />
        </FormItem>
        <FormItem label="Password">
          <InputPassword />
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            html-type="submit"
            style="width: 100%"
            class="custom-button"
            @click="redirectToMemeGenerator"
          >
            Log in</Button
          >
        </FormItem>
      </Form>
      <p style="text-align: center">
        <a
          href="#"
          style="
            color: var(--primary-color);
            text-decoration: underline !important;
          "
          >Forgot password?</a
        >
      </p>
    </Col>
    <Col
      :xs="{ span: 1 }"
      :sm="{ span: 2 }"
      :md="{ span: 3 }"
      :lg="{ span: 4 }"
      :xl="{ span: 4 }"
      :xxl="{}"
    >
      <!-- Placeholder -->
    </Col>
  </Row>
</template>

<script>
import {
  Row,
  Col,
  Form,
  FormItem,
  Input,
  InputPassword,
  Button,
} from "ant-design-vue";
import { useRouter } from "vue-router";

export default {
  name: "SignupPage",
  components: {
    Row,
    Col,
    Form,
    FormItem,
    Input,
    InputPassword,
    Button,
  },
  setup() {
    const router = useRouter();

    const redirectToMemeGenerator = () => {
      router.push("/memegenerator");
    };

    return {
      redirectToMemeGenerator,
    };
  },
};
</script>

<style scoped>
.background {
  background-image: url("../assets/Login.png");
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
}
.title {
  font-family: "Poppins", sans-serif;
  color: #332c5c; /* Set text color to #332C5C */
  text-align: center;
}

.subtitle {
  color: #8976fd; /* Set text color to #8976FD */
}

.description {
  font-family: "Nunito Sans", sans-serif;
  line-height: 180%;
  font-size: 16px;
  text-align: left;
}
.logo-container {
  display: flex;
  justify-content: center; /* Horizontally center the logo */
  align-items: center; /* Vertically center the logo */
}

.logo {
  width: 5rem;
  height: 5rem;
}

.custom-button {
  float: "left";
  color: white;
  background-color: var(--primary-color-2);
}
.custom-button:hover {
  background-color: var(--primary-color-2);
  color: white;
}
</style>
