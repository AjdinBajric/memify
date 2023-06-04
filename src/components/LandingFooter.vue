<template>
  <div>
    <Row type="flex">
      <Col
        :xs="{ span: 21 }"
        :sm="{ span: 12 }"
        :md="{ span: 6 }"
        :lg="{ span: 6 }"
        :xl="{}"
        :xxl="{}"
      >
        <span
          style="font-family: 'Righteous'; font-size: 40px; line-height: 130%"
          ><img src="../assets/logo.png" alt="logo" /> Memify</span
        >
        <p
          style="
            font-family: 'Nunito Sans';
            font-weight: 400;
            font-size: 1rem;
            line-height: 180%;
            padding-right: 2rem;
          "
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard.
        </p>
        <span>
          <img
            src="../assets/Spotify.png"
            alt="spotify"
            style="width: 2rem; margin-right: 1rem"
          />
          <img
            src="../assets/Spotify.png"
            alt="insta"
            style="width: 2rem; opacity: 40%; margin-right: 1rem"
          />
          <img
            src="../assets/Spotify.png"
            alt="youtube"
            style="width: 2rem; opacity: 40%; margin-right: 1rem"
          />
        </span>
      </Col>
      <Col
        :xs="{ span: 24 }"
        :sm="{ span: 12 }"
        :md="{ span: 6 }"
        :lg="{ span: 6 }"
        :xl="{}"
        :xxl="{}"
      >
        <h2 style="font-family: 'Poppins'">Our links</h2>
        <ul>
          <li>
            <a href="#" style="font-family: 'Nunito Sans', sans-serif">Home</a>
          </li>
          <li>
            <a href="#" style="font-family: 'Nunito Sans', sans-serif"
              >About us</a
            >
          </li>
          <li>
            <a href="#" style="font-family: 'Nunito Sans', sans-serif"
              >Services</a
            >
          </li>
          <li>
            <a href="#" style="font-family: 'Nunito Sans', sans-serif">Team</a>
          </li>
          <li>
            <a href="#" style="font-family: 'Nunito Sans', sans-serif">Blog</a>
          </li>
        </ul>
      </Col>
      <Col
        :xs="{ span: 24 }"
        :sm="{ span: 12 }"
        :md="{ span: 6 }"
        :lg="{ span: 6 }"
        :xl="{}"
        :xxl="{}"
      >
        <h2 style="font-family: 'Poppins'">Our services</h2>
        <ul>
          <li>
            <a href="#" style="font-family: 'Nunito Sans', sans-serif"
              >Strategy & Research</a
            >
          </li>
          <li>
            <a href="#" style="font-family: 'Nunito Sans', sans-serif"
              >Web Development</a
            >
          </li>
          <li>
            <a href="#" style="font-family: 'Nunito Sans', sans-serif"
              >Web Solution</a
            >
          </li>
          <li>
            <a href="#" style="font-family: 'Nunito Sans', sans-serif"
              >Digital Marketing</a
            >
          </li>
          <li>
            <a href="#" style="font-family: 'Nunito Sans', sans-serif"
              >App Design</a
            >
          </li>
        </ul>
      </Col>
      <Col
        :xs="{ span: 24 }"
        :sm="{ span: 12 }"
        :md="{ span: 6 }"
        :lg="{ span: 6 }"
        :xl="{}"
        :xxl="{}"
      >
        <h2 style="font-family: 'Poppins'">Other links</h2>
        <ul>
          <li>
            <a href="#" style="font-family: 'Nunito Sans', sans-serif">FAQ</a>
          </li>
          <li>
            <a href="#" style="font-family: 'Nunito Sans', sans-serif"
              >Portfolio</a
            >
          </li>
          <li>
            <a href="#" style="font-family: 'Nunito Sans', sans-serif"
              >Privacy Policy</a
            >
          </li>
          <li>
            <a href="#" style="font-family: 'Nunito Sans', sans-serif"
              >Terms & Condition</a
            >
          </li>
          <li>
            <a href="#" style="font-family: 'Nunito Sans', sans-serif"
              >Support</a
            >
          </li>
        </ul>
      </Col>
    </Row>
    <Row type="flex" :gutter="[0, 56]">
      <Col
        :xs="{ span: 24 }"
        :sm="{ span: 12 }"
        :md="{ span: 6 }"
        :lg="{ span: 6 }"
        :xl="{}"
        :xxl="{}"
        class="gutter-row"
      >
        <p style="font-family: 'Nunito Sans', sans-serif">Terms & condition</p>
      </Col>
      <Col
        :xs="{ span: 24 }"
        :sm="{ span: 12 }"
        :md="{ span: 6 }"
        :lg="{ span: 6 }"
        :xl="{}"
        :xxl="{}"
      ></Col>
      <Col
        :xs="{ span: 24 }"
        :sm="{ span: 12 }"
        :md="{ span: 6 }"
        :lg="{ span: 6 }"
        :xl="{}"
        :xxl="{}"
      ></Col>
      <Col
        :xs="{ span: 24 }"
        :sm="{ span: 12 }"
        :md="{ span: 6 }"
        :lg="{ span: 6 }"
        :xl="{}"
        :xxl="{}"
      >
        <p style="font-family: 'Nunito Sans', sans-serif">
          All Right Reserved @ memify.com
        </p></Col
      >
    </Row>
  </div>
</template>

<script>
import { Row, Col } from "ant-design-vue";

export default {
  name: "LandingFooter",
  components: {
    Row,
    Col,
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
}

a {
  text-decoration: none;
  color: #332c5c;
}

ul {
  padding: 0;
}
</style>
