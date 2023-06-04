<template>
  <div class="background">
    <SignedInHeader />
    <Row type="flex" justify="space-around" align="middle">
      <Col
        :xs="{ span: 20 }"
        :sm="{ span: 20 }"
        :md="{ span: 20 }"
        :lg="{ span: 18 }"
        :xl="{}"
        :xxl="{}"
      >
        <Layout style="padding: 24px 0; background: #fff; min-height: 80vh">
          <LayoutSider
            width="200"
            style="background: #fff"
            :style="{
              background: '#fff',
              display: isMobile ? 'none' : 'block',
            }"
            :collapsed-width="isMobileOrTablet ? 0 : 80"
            v-if="showSider"
          >
            <div class="sidebar">
              <h1 style="margin-left: 10%">Dashboard</h1>
              <Menu mode="inline" style="height: 100%; border-radius: 16px">
                <MenuItem class="menu-item"
                  ><img
                    src="../assets/nature.png"
                    alt="img1"
                  />Generator</MenuItem
                >
                <MenuItem class="menu-item"
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
                <MenuItem class="menu-item"
                  ><img src="../assets/logout.png" alt="img4" />Home</MenuItem
                >
              </Menu>
            </div>
          </LayoutSider>
          <LayoutContent :style="{ padding: '0 24px' }">
            <MemeAnalytics
              v-show="showAnalyticsComponent"
              style="margin-bottom: 2rem"
            />
            <MemeCardsGrid :cardsPerRow="3" :showAnalytics="showAnalytics" />
            <Pagination
              v-model:current="current"
              :total="50"
              show-less-items
              style="text-align: center; margin-top: 1.5em"
            />
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
        <LandingFooter style="margin-top: 7rem" />
      </Col>
    </Row>
  </div>
</template>

<script>
import SignedInHeader from "@/components/SignedInHeader.vue";
import MemeCardsGrid from "@/components/MemeCardsGrid.vue";
import LandingFooter from "@/components/LandingFooter.vue";
import MemeAnalytics from "@/components/MemeAnalytics.vue";
import { defineComponent, ref } from "vue";

import {
  Row,
  Col,
  Layout,
  Menu,
  MenuItem,
  LayoutSider,
  LayoutContent,
  Pagination,
} from "ant-design-vue";

export default defineComponent({
  name: "SavedMemesPage",
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
    MemeAnalytics,
    Pagination,
  },
  setup() {
    const showAnalyticsComponent = ref(false);
    const current = ref(2);

    const showAnalytics = () => {
      showAnalyticsComponent.value = true;
    };

    return {
      showAnalyticsComponent,
      current,
      showAnalytics,
    };
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
        if (isMobile) {
          this.showSider = false;
        } else {
          this.showSider = true;
        }
      }
    },
  },
});
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
