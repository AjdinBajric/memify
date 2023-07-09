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
        <Layout
          style="
            padding: 24px 0;
            background: #fff;
            min-height: 80vh;
            border-radius: 16px;
          "
        >
          <LayoutContent :style="{ padding: '0 24px' }">
    <h1 class="header-text">Browse popular memes</h1>
            <MemeAnalytics
              v-show="isAnalyticsVisible"
              style="margin-bottom: 2rem"
              :closeAnalyticsFunction="closeAnalytics"
              id="analytics"
            />
            <MemeCardsGrid :cardsPerRow="3" :showAnalytics="showAnalytics" />
            <Pagination
              current="1"
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
        <LandingFooter />
      </Col>
    </Row>
  </div>
</template>

<script>
import SignedInHeader from "@/components/SignedInHeader.vue";
import {Col, Layout, LayoutContent, Row, Pagination} from "ant-design-vue";
import MemeCardsGrid from "@/components/MemeCardsGrid.vue";
import LandingFooter from "@/components/LandingFooter.vue";
import MemeAnalytics from "@/components/MemeAnalytics.vue";

export default {
  name: "MemesView",
   components: {
    SignedInHeader,
    Row,
    Col,
    Layout,
    // Menu,
    // MenuItem,
    // LayoutSider,
    LayoutContent,
    MemeCardsGrid,
    LandingFooter,
    MemeAnalytics,
    Pagination,
  },
  data() {
    return {
      memes: [],
      isAnalyticsVisible: false,
    }
  },
  methods: {
    async fetch_memes() {
      const response = await fetch("https://api.imgflip.com/get_memes");
      const data = await response.json();
      this.memes = data.data.memes;
      console.log(this.memes);
    },
    closeAnalytics() {
      this.isAnalyticsVisible.value = false;
    },
    showAnalytics() {
      this.isAnalyticsVisible.value = true;
    },
  },
  async mounted () {
    await this.fetch_memes();
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  font-family: "Poppins", sans-serif;
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

.meme-text {
  font-family: "Impact", serif;
  font-size: 34px;
  color: white;
  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000;
  position: absolute;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  cursor: move;
}

.header-text {
  font-size: 32px;
  margin-left: 16px;
  margin-bottom: 16px;
  font-weight: 500;
}
</style>
