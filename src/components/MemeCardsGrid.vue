<template>
  <Row type="flex" :gutter="[16, 16]">
    <Col
        v-for="meme in memes"
        :key="meme.id"
        :xs="{ span: 24 }"
        :sm="{ span: 24 }"
        :md="getColumnSpan(cardsPerRow, 'md')"
        :lg="getColumnSpan(cardsPerRow, 'lg')"
        :xl="getColumnSpan(cardsPerRow, 'xl')"
        :xxl="getColumnSpan(cardsPerRow, 'xxl')"
    >
      <TemplateCard
          v-if="meme.template_id"
          :id="meme.template_id"
          :title="meme.name"
          :date="meme.date_created"
          :isPublic="meme.is_public"
          :imageUrl="meme.image_url"
          @selectTemplate="showAnalytics"
      />
      <MemeCard
          v-else
          @showAnalytics="showAnalytics"
          :key="meme.meme_id"
          :id="meme.meme_id"
          :title="meme.name"
          :date="meme.date_created"
          :imageUrl="meme.image_url"
          :likesCount="meme.like_count"
          :viewsCount="meme.view_count"
          :shareCount="meme.share_count"
          :closeAnalyticsFunction="closeAnalyticsFunction"
      />
    </Col>
  </Row>
</template>

<script>
import {Row, Col} from "ant-design-vue";
import MemeCard from "./MemeCard.vue";
import TemplateCard from "@/components/TemplateCard.vue";

export default {
  name: "MemeCardsGrid",
  components: {
    TemplateCard,
    Row,
    Col,
    MemeCard,
  },
  props: {
    cardsPerRow: {
      type: Number,
      default: 3,
    },
    memes: {
      type: Array,
      default: () => [],
    },
    // showAnalytics: Function,
    closeAnalyticsFunction: Function,
  },
  data() {
    return {};
  },
  methods: {
    // generateCards() {
    //   const funnyTitles = [
    //     "The Hilarious Meme",
    //     "Laugh-out-Loud Moment",
    //     "Crazy Funny",
    //     "Meme Masterpiece",
    //     "Comic Relief",
    //     "Humor Delight",
    //     "Meme Magic",
    //     "Side-Splitting Fun",
    //     "Joke of the Day",
    //     "Hysterical Laughter",
    //     "Funny Frenzy",
    //     "Memetastic Voyage",
    //   ];
    //
    //   for (let i = 0; i < 12; i++) {
    //     this.cards.push({
    //       id: i,
    //       imgSrc: require(`@/assets/meme-img-${(i % 8) + 1}.png`), // Add the actual image source here
    //       title: funnyTitles[i % funnyTitles.length],
    //     });
    //   }
    // },
    showAnalytics(memeId) {
      this.$emit("showAnalytics", memeId);
    },
    getColumnSpan(cardsPerRow, breakpoint) {
      if (cardsPerRow === 4) {
        if (breakpoint === "md") {
          return {span: 8};
        } else if (breakpoint === "lg") {
          return {span: 6};
        } else {
          return {}; // For xl and xxl breakpoints, leave the span undefined
        }
      }
      if (cardsPerRow === 2) {
        if (breakpoint === "md") {
          return {span: 24};
        } else if (breakpoint === "lg") {
          return {span: 12};
        } else if (breakpoint === "xl") {
          return {span: 12};
        } else {
          return {}; // For xl and xxl breakpoints, leave the span undefined
        }
      } else {
        return {span: 8};
      }
    },
  },
};
</script>
