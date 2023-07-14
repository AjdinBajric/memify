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
            padding: 24px 0;
            background: #fff;
            min-height: 80vh;
            border-radius: 16px;
          "
        >
          <LayoutContent :style="{ padding: '0 24px' }">
            <h2 class="header-text">Browse popular memes</h2>
            <MemeAnalytics
                v-if="memeToShow"
                :meme="memeToShow"
                style="margin-bottom: 2rem"
                @closeAnalytics="closeAnalytics"
                id="analytics"
            />
            <MemeCardsGrid :memes="memes" :cardsPerRow="3" @showAnalytics="showAnalytics"/>
            <Pagination
                v-model:pageSize="pageSize"
                v-model:current="currentPage"
                :total="total"
                @change="onChangePage"
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
        <LandingFooter/>
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
import {API} from "aws-amplify";

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
      memeToShow: null,
      total: 0,
      currentPage: 1,
      pageSize: 9,
    }
  },
  methods: {
    onChangePage(currentPage) {
      this.currentPage = currentPage;
      this.fetch_memes();
    },
    async fetch_memes() {
      const options = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        queryStringParameters: {
          per_page: this.pageSize,
          page: this.currentPage,
        },
      };

      const data = await API.get('api', '/memes', options)
      this.memes = data.memes;
      this.total = data.total;
    },
    closeAnalytics() {
      this.memeToShow = null;
    },
    showAnalytics(memeId) {
      this.memeToShow = this.memes.find(meme => meme.meme_id === memeId);
    },
  },
  async mounted() {
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
  font-size: 28px;
  margin-left: 16px;
  margin-bottom: 16px;
  font-weight: 500;
}
</style>
