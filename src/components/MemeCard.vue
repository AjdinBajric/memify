<template>
  <Card hoverable style="width: 300px; padding: 10px; border-radius: 8px">
    <span>
      <img src="" alt="meme img" />

      <span>
        <h3>Kids pastor be like camel</h3>
        <div><img src="" alt="calendar img" /> Created on 5. May</div>
        <div>
          <img src="" alt="heart icon" />
          23.1 k likes
        </div>
        <div>
          <img src="" alt="eye icon" />
          92.3 k views
        </div>
        <div>
          <img src="" alt="people icon" />
          235 daily uses
        </div>
      </span>
    </span>
  </Card>
</template>

<script>
import { Card } from "ant-design-vue";
export default {
  name: "MemeCard",
  components: {
    Card,
  },
};
</script>

<style scoped></style>
