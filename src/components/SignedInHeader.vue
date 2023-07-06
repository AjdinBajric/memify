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
        ><img src="../assets/logo.png" alt="logo" style="width: 1.8rem"/>
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
            <a class="avatar-dropdown" @click="toggleDropdown">
              <Avatar alt="profile picture" style="background-color: purple">
                <template #icon>
                  <UserOutlined/>
                </template>
              </Avatar>
            </a>
            <div v-show="isDropdownOpen" class="dropdown-menu">
              <a href="#" @click="handleLogout" style="display: inline; float: left">
                <LogoutOutlined style="padding-right: 1em"/>
                Logout
              </a>
            </div>
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
import {Row, Col, Avatar, notification} from "ant-design-vue";
import {UserOutlined, LogoutOutlined} from "@ant-design/icons-vue";
import {ref, inject} from "vue";
import {Auth} from "aws-amplify";

export default {
  name: "SignedInHeader",
  components: {
    Row,
    Col,
    Avatar,
    UserOutlined,
    LogoutOutlined
  },
  data() {
    return {
      isDropdownOpen: false
    };
  },
  methods: {
    redirectToMemeGenerator() {
      this.$router.push("/memegenerator");
    },
    redirectToHome() {
      this.$router.push("/");
    },
    async handleLogout() {
      try {
        // Call the logout method, e.g., AWS Amplify Auth.signOut()
        await Auth.signOut();

        // Notify user of successful logout
        notification.success({
          message: "Logged Out",
          description: "You have been successfully logged out.",
        });

        // Redirect to login page after logout
        this.$router.push("/login");
      } catch (error) {
        // Notify user of error
        notification.error({
          message: "Logout Error",
          description: "An error occurred while logging out.",
        });
        console.log("Logout error:", error);
      } finally {
        this.isDropdownOpen = false; // Close the dropdown menu
      }
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    }
  },

  setup() {
    const isMobileOrTablet = ref(false);

    const showDrawer = inject("showDrawer");

    const handleResize = () => {
      isMobileOrTablet.value = window.innerWidth <= 768; // Adjust the breakpoint as needed
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

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 8px;
  min-width: 120px;
  z-index: 1;
}

.dropdown-menu a {
  display: block;
  padding: 6px 12px;
  color: #333333;
  text-decoration: none;
}

.dropdown-menu a:hover {
  background-color: #f5f5f5;
}
</style>
