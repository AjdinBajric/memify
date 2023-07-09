<template>
  <div class="background">
    <SignedInHeader />
    <Row type="flex" justify="space-around" align="middle">
      <Col
        :xs="{ span: 18 }"
        :sm="{ span: 18 }"
        :md="{ span: 18 }"
        :lg="{ span: 18 }"
        :xl="{}"
        :xxl="{}"
      >
        <Layout
          style="
            padding: 12px 0px 0px 0px;
            background: white;
            min-height: 80vh;
            margin-top: 2rem;
            border-radius: 16px;
          "
        >
          <LayoutSider
            width="200"
            style="
              background: #fff;
              border-radius: 16;
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
                <MenuItem class="menu-item" @click="redirectToMemeGenerator"
                  ><img
                    src="../assets/nature.png"
                    alt="img1"
                  />Generator</MenuItem
                >
                <MenuItem class="menu-item" @click="redirectToSavedMemes"
                  ><img
                    src="../assets/bookmark.png"
                    alt="img2"
                  />Saved</MenuItem
                >
                <MenuItem class="menu-item"
                  ><img
                    src="../assets/settings.png"
                    alt="img3"
                  />Settings</MenuItem
                >
                <MenuItem class="menu-item" @click="redirectToHome"
                  ><img src="../assets/logout.png" alt="img4" />Home</MenuItem
                >
              </Menu>
            </div>
          </LayoutSider>
          <LayoutContent :style="{ padding: '0 24px' }">
            <MemeGeneratorForm />
          </LayoutContent>
        </Layout>
      </Col>
    </Row>
    <Row
      type="flex"
      justify="space-around"
      align="middle"
      style="margin: 4rem 0 2rem"
    >
      <Col
        :xs="{ span: 18 }"
        :sm="{ span: 18 }"
        :md="{ span: 18 }"
        :lg="{ span: 18 }"
        :xl="{}"
        :xxl="{}"
      >
        <h1
          style="
            display: inline;
            margin-right: 1rem;
            font-family: 'Poppins';
            font-weight: 600;
            font-size: 20px;
            line-height: 20px;
            color: #332c5c;
          "
        >
          Search templates
        </h1>
        <a
          href="#"
          style="
            color: var(--primary-color);
            text-decoration: underline !important;
            font-family: 'Poppins';
          "
        >
          See more
        </a>
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
        <MemeCardsGrid CardsPerRow="4" />
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
        <LandingFooter />
      </Col>
    </Row>
  </div>
</template>

<script>
import SignedInHeader from "@/components/SignedInHeader.vue";
import MemeCardsGrid from "@/components/MemeCardsGrid.vue";
import LandingFooter from "@/components/LandingFooter.vue";
import MemeGeneratorForm from "@/components/MemeGeneratorForm.vue";
import { useRouter } from "vue-router";

import {
  Row,
  Col,
  Layout,
  Menu,
  MenuItem,
  LayoutSider,
  LayoutContent,
} from "ant-design-vue";
export default {
  name: "MemeGeneratorPage",
  components: {
    SignedInHeader,
    Row,
    Col,
    Layout,
    Menu,
    MenuItem,
    LayoutSider,
    LayoutContent,
    MemeGeneratorForm,
    MemeCardsGrid,
    LandingFooter,
  },
  data() {
    return {
      showSider: true,
      isMobile: false,
    };
  },
  computed: {
    isMobileOrTablet() {
      return window.innerWidth <= 768; // Adjust the breakpoint as needed
    },
  },
  mounted() {
    this.isMobile = this.isMobileOrTablet;
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      const isMobile = this.isMobileOrTablet;
      if (isMobile !== this.isMobile) {
        this.isMobile = isMobile;
        this.showSider = !isMobile;
      }
    },
  },
  setup() {
    const router = useRouter();

    const redirectToMemeGenerator = () => {
      router.push("/memegenerator");
    };
    const redirectToSavedMemes = () => {
      router.push("/savedmemes");
    };
    const redirectToHome = () => {
      router.push("/");
    };

    return {
      redirectToMemeGenerator,
      redirectToSavedMemes,
      redirectToHome,
    };
  },
};
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
  font-family: "Poppins";
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
