<template>
  <div>
    <Row type="flex" style="padding-top: 1.5rem">
      <Col
        :xs="{ span: 12, offset: 2 }"
        :sm="{ span: 12, offset: 2 }"
        :md="{ span: 8, offset: 2 }"
        :lg="{ span: 4, offset: 3 }"
        :xl="{}"
        :xxl="{}"
      >
        <span
          style="font-family: 'Righteous'; font-size: 2rem; line-height: 130%"
          ><img src="../assets/logo.png" alt="logo" style="width: 1.8rem" />
          Memify</span
        >
      </Col>
      <Col :xs="0" :sm="0" :md="12" :lg="14" :xl="{}" :xxl="{}">
        <ul>
          <li><a href="#" @click="redirectToHome">Home</a></li>
          <li>
            <a href="#" @click="redirectToMemeGenerator">Generate meme</a>
          </li>
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
        :xs="{ span: 8 }"
        :sm="{ span: 8 }"
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
        :xs="{ span: 3 }"
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
import { useRouter } from "vue-router";

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
    };

    window.addEventListener("resize", handleResize);

    const router = useRouter();

    const redirectToMemeGenerator = () => {
      router.push("/memegenerator");
    };
    const redirectToHome = () => {
      router.push("/");
    };

    return {
      isMobileOrTablet,
      showDrawer,
      redirectToMemeGenerator,
      redirectToHome,
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
  margin-top: 0;
}

.stats-card {
  width: 150px;
  display: inline-block;
  margin-right: 3rem;
}
.hamburger-menu {
  float: right;
  width: 2.2rem;
}
</style>
