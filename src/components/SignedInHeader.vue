<template>
  <div>
    <Row type="flex" style="padding-top: 1.5rem">
      <Col
        :xs="12"
        :sm="12"
        :md="0"
        :lg="{ span: 4, offset: 3 }"
        :xl="{}"
        :xxl="{}"
      >
        <span
          style="font-family: 'Righteous'; font-size: 40px; line-height: 130%"
          ><img src="../assets/logo.png" alt="logo" /> Memify</span
        >
      </Col>
      <Col :xs="0" :sm="0" :md="24" :lg="14" :xl="{}" :xxl="{}">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Generate meme</a></li>
          <li><a href="#">Contact us</a></li>
          <li style="display: inline-block">
            <Avatar alt="profile picture" style="background-color: purple">
              <template #icon>
                <UserOutlined />
              </template>
            </Avatar>
          </li>
        </ul>
      </Col>
      <Col
        :xs="{ span: 12 }"
        :sm="{ span: 12 }"
        :md="{ span: 0 }"
        :lg="{ span: 0 }"
        :xl="{}"
        :xxl="{}"
      >
        <img
          src="../assets/hamburger.png"
          alt="menu"
          @click="showDrawer"
          class="hamburger-menu"
        />
      </Col>
      <Col
        :xs="{ span: 1 }"
        :sm="{ span: 1 }"
        :md="{ span: 2 }"
        :lg="{ span: 3 }"
        :xl="{}"
        :xxl="{}"
      >
      </Col>
    </Row>
  </div>
</template>

<script>
import { Row, Col, Avatar } from "ant-design-vue";
import { UserOutlined } from "@ant-design/icons-vue";
import { ref, inject } from "vue";

export default {
  name: "SignedInHeader",
  components: {
    Row,
    Col,
    Avatar,
    UserOutlined,
  },
  setup() {
    const isMobileOrTablet = ref(false);

    const showDrawer = inject("showDrawer");

    const handleResize = () => {
      isMobileOrTablet.value = window.innerWidth <= 768; // Adjust the breakpoint as needed
      console.log(isMobileOrTablet.value);
    };

    window.addEventListener("resize", handleResize);

    return {
      isMobileOrTablet,
      showDrawer,
    };
  },
  mounted() {
    this.isMobileOrTablet = window.innerWidth <= 768; // Adjust the breakpoint as needed
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
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
.hamburger-menu {
  float: right;
}
</style>
