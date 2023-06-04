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
        <span
          style="font-family: 'Righteous'; font-size: 40px; line-height: 130%"
          ><img src="../assets/logo.png" alt="logo" /> Memify</span
        >
      </Col>
      <Col
        :xs="{ span: 0 }"
        :sm="{ span: 0 }"
        :md="{ span: 0 }"
        :lg="{ span: 14 }"
        :xl="{}"
        :xxl="{}"
      >
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Generate meme</a></li>
          <li><a href="#">Contact us</a></li>
          <li style="display: inline-block">
            <Button type="primary" class="custom-button">Login</Button>
          </li>
          <li style="display: inline-block">
            <Button type="default" class="outlined-button">Sign up</Button>
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

export default {
  name: "LandingHeader",
  components: {
    Row,
    Col,
    Button,
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
  color: var(--primary-color-2);
  border-color: var(--primary-color-2);
}

.outlined-button:hover {
  color: var(--primary-color-2);
  border-color: var(--primary-color-2);
}
</style>
