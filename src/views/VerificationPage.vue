<template>
  <Row class="background" type="flex" justify="center" align="middle">
    <Col :xs="{ span: 22, offset: 1 }" :sm="{ span: 9, offset: 2 }" :md="{ span: 8, offset: 3 }"
         :lg="{ span: 7, offset: 4 }" :xl="{ span: 7, offset: 4 }" :xxl="{}">
      <div class="logo-container">
        <img src="../assets/logo.svg" alt="logo" class="logo"/>
      </div>
      <h1 class="title">
        Welcome To Memify<br/>
        <span class="subtitle">Where Humor Takes<br/>Shape!</span>
      </h1>
      <p class="description">
        Unleash your imagination and create hilarious memes in seconds with our user-friendly and feature-packed meme
        generator app.
      </p>
    </Col>
    <Col :xs="{ span: 1 }" :sm="{ span: 0 }" :md="{ span: 0 }" :lg="{ span: 0 }" :xl="{ span: 0 }" :xxl="{}"></Col>
    <Col :xs="{ span: 22, offset: 1 }" :sm="{ span: 9, offset: 1 }" :md="{ span: 8, offset: 2 }"
         :lg="{ span: 7, offset: 2 }" :xl="{ span: 7, offset: 2 }" :xxl="{}">
      <h1>Verify your account.</h1>
      <Form layout="vertical" @submit="verifyAccount">
        <FormItem label="Verification code">
          <Input v-model:value="verification_code"/>
        </FormItem>
        <FormItem>
          <Button type="primary" html-type="submit" style="width: 100%" class="custom-button">Verify</Button>
        </FormItem>
      </Form>
    </Col>
    <Col :xs="{ span: 1 }" :sm="{ span: 2 }" :md="{ span: 3 }" :lg="{ span: 4 }" :xl="{ span: 4 }" :xxl="{}">
      <!-- Placeholder -->
    </Col>
  </Row>
</template>

<script>
import {Auth} from 'aws-amplify';
import {Row, Col, Form, FormItem, Input, Button} from 'ant-design-vue';
import {notification} from 'ant-design-vue';

export default {
  name: 'VerificationPage',
  components: {
    Row,
    Col,
    Form,
    FormItem,
    Input,
    Button,
  },
  data() {
    return {
      verification_code: '',
      email: localStorage.getItem('email'),
    };
  },
  methods: {
    async verifyAccount() {

      try {
        await Auth.confirmSignUp(this.email, this.verification_code);

        notification.success({
          message: 'Account Verified',
          description: 'Your account has been successfully verified.',
        });
        localStorage.removeItem('email')

        this.$router.push('/login');
      } catch (error) {
        notification.error({
          message: 'Verification Error',
          description: 'Please check the verification code and try again.',
        });
        console.log('Verification error:', error);
      }
    },
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
  color: #332c5c;
  /* Set text color to #332C5C */
  text-align: center;
}

.subtitle {
  color: #8976fd;
  /* Set text color to #8976FD */
}

.description {
  font-family: "Nunito Sans", sans-serif;
  line-height: 180%;
  font-size: 16px;
  text-align: left;
}

.logo-container {
  display: flex;
  justify-content: center;
  /* Horizontally center the logo */
  align-items: center;
  /* Vertically center the logo */
}

.logo {
  width: 5rem;
  height: 5rem;
}

.custom-button {
  color: white;
  background-color: var(--primary-color-2);
}

.custom-button:hover {
  background-color: var(--primary-color-2);
  color: white;
}
</style>
