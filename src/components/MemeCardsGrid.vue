<template>
  <Row type="flex" :gutter="[16, 16]">
    <Col
      v-for="card in cards"
      :key="card.id"
      :xs="{ span: 24 }"
      :sm="{ span: 24 }"
      :md="getColumnSpan(cardsPerRow, 'md')"
      :lg="getColumnSpan(cardsPerRow, 'lg')"
      :xl="getColumnSpan(cardsPerRow, 'xl')"
      :xxl="getColumnSpan(cardsPerRow, 'xxl')"
    >
      <MemeCard2
        :imageUrl="card.imgSrc"
        @click="showAnalytics"
        :key="card.id"
        :title="card.title"
        :likesCount="23.4"
        :viewsCount="92.3"
        :dailyUsesCount="12"
        :closeAnalyticsFunction="closeAnalyticsFunction"
      />
    </Col>
  </Row>
</template>

<script>
import { Row, Col } from "ant-design-vue";
import MemeCard2 from "./MemeCard2.vue";

export default {
  name: "MemeCardsGrid",
  components: {
    Row,
    Col,
    MemeCard2,
  },
  props: {
    cardsPerRow: {
      type: Number,
      default: 3,
    },
    showAnalytics: Function,
    closeAnalyticsFunction: Function,
  },
  data() {
    return {
      cards: [],
    };
  },
  created() {
    this.generateCards();
  },
  methods: {
    generateCards() {
      const funnyTitles = [
        "The Hilarious Meme",
        "Laugh-out-Loud Moment",
        "Crazy Funny",
        "Meme Masterpiece",
        "Comic Relief",
        "Humor Delight",
        "Meme Magic",
        "Side-Splitting Fun",
        "Joke of the Day",
        "Hysterical Laughter",
        "Funny Frenzy",
        "Memetastic Voyage",
      ];

      for (let i = 0; i < 12; i++) {
        this.cards.push({
          id: i,
          imgSrc: require(`@/assets/meme-img-${(i % 8) + 1}.png`), // Add the actual image source here
          title: funnyTitles[i % funnyTitles.length],
        });
      }
    },
    getColumnSpan(cardsPerRow, breakpoint) {
      if (cardsPerRow === 4) {
        if (breakpoint === "md") {
          return { span: 8 };
        } else if (breakpoint === "lg") {
          return { span: 6 };
        } else {
          return {}; // For xl and xxl breakpoints, leave the span undefined
        }
      }
      if (cardsPerRow === 2) {
        if (breakpoint === "md") {
          return { span: 24 };
        } else if (breakpoint === "lg") {
          return { span: 12 };
        } else if (breakpoint === "xl") {
          return { span: 12 };
        } else {
          return {}; // For xl and xxl breakpoints, leave the span undefined
        }
      } else {
        return { span: 8 };
      }
    },
  },
};
</script>
