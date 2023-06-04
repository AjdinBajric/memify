<template>
  <div>
    <LandingHeader></LandingHeader>
    <Row>
      <Col
        :xs="{ span: 22, offset: 1 }"
        :sm="{ span: 18, offset: 3 }"
        :md="{ span: 10, offset: 2 }"
        :lg="{ span: 10, offset: 2 }"
        :xl="{}"
        :xxl="{}"
      >
        info
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
        <img src="" alt="photo1" />
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
    <Row type="flex" justify="space-around" align="middle">
      <Col
        :xs="{ span: 15 }"
        :sm="{ span: 3 }"
        :md="{ span: 4 }"
        :lg="{ span: 4 }"
        :xl="{}"
        :xxl="{}"
      >
        <Card style="width: 150px">
          <img src="" alt="img1" />
        </Card>
      </Col>
      <Col
        :xs="{ span: 15 }"
        :sm="{ span: 3 }"
        :md="{ span: 4 }"
        :lg="{ span: 4 }"
        :xl="{}"
        :xxl="{}"
      >
        <Card style="width: 150px">
          <img src="" alt="img2" />
        </Card>
      </Col>
      <Col
        :xs="{ span: 15 }"
        :sm="{ span: 3 }"
        :md="{ span: 4 }"
        :lg="{ span: 4 }"
        :xl="{}"
        :xxl="{}"
      >
        <Card style="width: 150px"> <img src="" alt="img3" /> </Card>
      </Col>
    </Row>
    <LandingFooter></LandingFooter>
  </div>
</template>

<script>
import LandingFooter from "@/components/LandingFooter.vue";
import LandingHeader from "@/components/LandingHeader.vue";
import { Row, Col, Card } from "ant-design-vue";

export default {
  name: "LandingPage",
  components: {
    LandingFooter,
    LandingHeader,
    Card,
    Row,
    Col,
  },
};
</script>

<style></style>
