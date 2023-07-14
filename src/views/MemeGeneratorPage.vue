<template>
  <div class="background">
    <SignedInHeader/>
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
                        src="../assets/picture-color.svg"
                        alt="img1"
                        style="width:24px; height:auto;"

                    />
                    <p>Generator</p>
                  </div>
                </MenuItem>
                <MenuItem class="menu-item" style="display: flex;" @click="redirectToSavedTemplates">
                  <div style="display: flex; align-items: center; margin-bottom: 4px;">
                    <img
                        src="../assets/save-black.svg"
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
            <MemeGeneratorForm :template_url="selectedTemplateUrl"/>
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
        <MemeCardsGrid :memes="templates" @showAnalytics="selectTemplate" CardsPerRow="2"/>
        <Pagination
            v-model:current="currentPage"
            :total="total"
            @change="onChangePage"
            show-less-items
            style="text-align: center; margin-top: 1.5em"
        />
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
import MemeGeneratorForm from "@/components/MemeGeneratorForm.vue";
import {useRouter} from "vue-router";
import {
  Row,
  Col,
  Layout,
  Menu,
  MenuItem,
  LayoutSider,
  LayoutContent,
  Pagination
} from "ant-design-vue";
import {API} from "aws-amplify";

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
    Pagination
  },
  data() {
    return {
      currentPage: 1,
      total: 0,
      pageSize: 6,
      templates: [],
      showSider: true,
      isMobile: false,
      selectedTemplateUrl: null,
    };
  },
  computed: {
    isMobileOrTablet() {
      return window.innerWidth <= 768; // Adjust the breakpoint as needed
    },
  },
  methods: {
    onChangePage(currentPage) {
      this.currentPage = currentPage;
      this.fetch_templates();
    },
    async fetch_templates() {
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

      const data = await API.get('api', '/templates', options)
      this.templates = data.templates;
      this.total = data.total;
    },

    selectTemplate(templateId) {
      const selectedTemplate = this.templates.find(meme => meme.template_id === templateId);
      if (selectedTemplate) this.selectedTemplateUrl = selectedTemplate.image_url;
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
    this.selectedTemplateUrl = this.$route.query.templateUrl || null;

    await this.fetch_templates();
    this.isMobile = this.isMobileOrTablet;
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
  setup() {
    const router = useRouter();

    const redirectToMemeGenerator = () => {
      router.push("/memegenerator");
    };
    const redirectToSavedTemplates = () => {
      router.push("/savedtemplates");
    };
    const redirectToHome = () => {
      router.push("/");
    };

    return {
      redirectToMemeGenerator,
      redirectToSavedTemplates,
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
