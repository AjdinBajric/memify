<template>
  <Card>
    <CloseOutlined style="float: right" @click="closeAnalytics" />
    <!-- First Row -->
    <Row :gutter="16" type="flex" justify="space-between" align="top">
      <!-- First Column -->
      <Col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
        <img src="../assets/meme1.png" alt="Image" style="width: 90%" />
      </Col>
      <!-- Second Column -->
      <Col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" style="height: 100%">
        <div style="margin-bottom: 1rem">
          <h2>Peter Griffin you must be funny</h2>
          <p>Created on 5. May</p>
          <Button class="outlined-button">Edit</Button>
        </div>
      </Col>
      <!-- Third Column -->
      <Col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
        <div style="text-align: center">
          <!-- Align images in the center -->
          <img src="../assets/red_heart.svg" alt="like" />
          <Statistic title="TOTAL LIKES" :value="123568" />
          <div style="margin-top: 1rem">
            <div style="display: inline-block; opacity: 70%; margin-right: 5%">
              <img src="../assets/facebook.png" alt="facebook" />
              <p style="margin: 0">32.5k</p>
            </div>
            <div style="display: inline-block; opacity: 70%; margin-right: 5%">
              <img src="../assets/instagram.png" alt="insta" />
              <p style="margin: 0">82.5k</p>
            </div>
            <div style="display: inline-block; opacity: 70%; margin-right: 5%">
              <img src="../assets/twitter.png" alt="twitter" />
              <p style="margin: 0">2.5k</p>
            </div>
          </div>
        </div>
      </Col>
      <!-- Fourth Column -->
      <Col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
        <div style="text-align: center" class="view-section">
          <!-- Align images in the center -->
          <img src="../assets/green_eye.svg" alt="views" />
          <Statistic title="TOTAL VIEWS" :value="123568" />
          <div style="margin-top: 1rem">
            <div style="display: inline-block; opacity: 70%; margin-right: 5%">
              <img src="../assets/facebook.png" alt="facebook" />
              <p style="margin: 0">32.5k</p>
            </div>
            <div style="display: inline-block; opacity: 70%; margin-right: 5%">
              <img src="../assets/instagram.png" alt="insta" />
              <p style="margin: 0">82.5k</p>
            </div>
            <div style="display: inline-block; opacity: 70%; margin-right: 5%">
              <img src="../assets/twitter.png" alt="twitter" />
              <p style="margin: 0">2.5k</p>
            </div>
          </div>
        </div>
      </Col>
    </Row>

    <!-- Second Row -->
    <Row :gutter="16">
      <Col :span="24">
        <img src="../assets/T1.png" alt="Image" style="width: 100%" />
      </Col>
    </Row>
  </Card>
</template>

<script>
import { Row, Col, Button, Statistic, Card } from "ant-design-vue";
import { CloseOutlined } from "@ant-design/icons-vue";

export default {
  name: "MemeAnalytics",
  components: {
    Row,
    Col,
    Button,
    Statistic,
    Card,
    CloseOutlined,
  },
  props: {
    // closeAnalyticsFunction: {
    //   type: Function,
    //   required: true,
    // },
  },
  methods: {
    closeAnalytics() {
      this.$emit("closeAnalytics");
      // this.closeAnalyticsFunction();
    },
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
