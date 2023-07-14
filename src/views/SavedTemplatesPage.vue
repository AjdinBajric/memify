<template>
  <div class="background">
    <SignedInHeader/>
    <Row type="flex" justify="space-around" align="middle">
      <Col
          :xs="{ span: 20 }"
          :sm="{ span: 20 }"
          :md="{ span: 20 }"
          :lg="{ span: 18 }"
          :xl="{}"
          :xxl="{}"
      >
        <Layout
            style="
            padding: 12px 0px 0px 0px;
            min-height: 80vh;
            margin-top: 2rem;
            border-radius: 16px;
          "
        >
          <LayoutSider
              width="200"
              style="
              background: #fff;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              border-radius: 16px;
            "
              :style="{
              background: '#fff',
              display: isMobile ? 'none' : 'block',
            }"
              :collapsed-width="isMobileOrTablet ? 0 : 80"
              v-if="showSider"
          >
            <div class="sidebar">
              <h1 style="margin-left: 10%; font-family: 'Poppins'">
                Dashboard
              </h1>
              <Menu mode="inline" style="height: 100%">
                <MenuItem class="menu-item" style="display: flex;" @click="redirectToMemeGenerator"
                >
                  <div style="display: flex; align-items: center; margin-bottom: 4px;">
                    <img
                        src="../assets/picture-black.svg"
                        alt="img1"
                        style="width:24px; height:auto;"
                    />
                    <p>Generator</p>
                  </div>
                </MenuItem>
                <MenuItem class="menu-item" style="display: flex;" @click="redirectToSavedTemplates">
                  <div style="display: flex; align-items: center; margin-bottom: 4px;">
                    <img
                        src="../assets/save-color.svg"
                        alt="img2"
                        style="width:28px; height:auto; margin-left: -4px;"
                    />
                    <p>Saved</p>
                  </div>
                </MenuItem>
              </Menu>
            </div>
          </LayoutSider>
          <LayoutContent :style="{ padding: '0 24px' }">
            <h1 style="font-family: 'Poppins'">Saved Templates</h1>
            <MemeCardsGrid :memes="templates" :cardsPerRow="3" @showAnalytics="openTemplate"/>
          </LayoutContent>
        </Layout>
      </Col>
    </Row>
    <Row type="flex" justify="space-around" align="middle">
      <Col
          :xs="{ span: 18 }"
          :sm="{ span: 18 }"
          :md="{ span: 18 }"
          :lg="{ span: 18 }"
          :xl="{}"
          :xxl="{}"
      >
        <LandingFooter/>
      </Col>
    </Row>
  </div>
</template>

<script>
import SignedInHeader from "@/components/SignedInHeader.vue";
import MemeCardsGrid from "@/components/MemeCardsGrid.vue";
import LandingFooter from "@/components/LandingFooter.vue";
// import MemeAnalytics from "@/components/MemeAnalytics.vue";

import {
  Row,
  Col,
  Layout,
  Menu,
  MenuItem,
  LayoutSider,
  LayoutContent,
  // Pagination,
} from "ant-design-vue";
import {API} from "aws-amplify";
import {Auth} from "@aws-amplify/auth";


export default {
  name: "SavedTemplatesPage",
  components: {
    SignedInHeader,
    Row,
    Col,
    Layout,
    Menu,
    MenuItem,
    LayoutSider,
    LayoutContent,
    MemeCardsGrid,
    LandingFooter,
    // MemeAnalytics,
    // Pagination,
  },
  data() {
    return {
      current: 1,
      showSider: true,
      showAnalyticsComponent: false,
      isMobile: false,
      templates: [],
    };
  },
  computed: {
    isMobileOrTablet() {
      return window.innerWidth <= 768; // Adjust the breakpoint as needed
    },
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    async fetch_templates() {
      const user = await Auth.currentAuthenticatedUser();
      const token = user.signInUserSession.idToken.jwtToken;

      const options = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token,
        },
        queryStringParameters: {
          per_page: 10,
          page: 1,
        },
      };

      const data = await API.get('api', '/templates/get-my', options)
      this.templates = data.templates;
    },
    openTemplate(templateId) {
      const selectedTemplate = this.templates.find(
          (template) => template.template_id === templateId
      );
      this.$router.push({
        name: "MemeGenerator",
        query: {templateUrl: selectedTemplate.image_url},
      });
    },
    redirectToMemeGenerator() {
      this.$router.push("/memegenerator");
    },
    redirectToSavedTemplates() {
      this.$router.push("/savedtemplates")
    },
    redirectToHome() {
      this.$router.push("/")
    },
    handleResize() {
      const isMobile = this.isMobileOrTablet;
      if (isMobile !== this.isMobile) {
        this.isMobile = isMobile;
        this.showSider = !isMobile;
      }
    },
  },
  async mounted() {
    await this.fetch_templates();
    this.isMobile = this.isMobileOrTablet;
    window.addEventListener("resize", this.handleResize);
  },
}

</script>

<style scoped>
@media screen and (max-width: 768px) {
  .ant-layout-sider-collapsed {
    width: 0 !important;
  }
}

.sidebar .menu-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  cursor: pointer;
}

.sidebar .menu-item img {
  margin-right: 8px;
  width: 20px;
  height: 20px;
}

.sidebar .menu-item span {
  font-size: 20px;
  font-weight: bold;
}

.background {
  background: #d9a7c7; /* fallback for old browsers */
  background: -webkit-linear-gradient(
      to bottom,
      #fffeee,
      #c0b6fc
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
      to bottom,
      #fffeee,
      #c0b6fc
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
