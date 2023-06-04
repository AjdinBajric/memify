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
        <span><img src="" alt="logo" /> Memify</span>
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
            <Button type="primary">Login</Button>
          </li>
          <li style="display: inline-block">
            <Button type="default">Sign up</Button>
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
</style>
