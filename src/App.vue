<template>
  <div>
    <router-view></router-view>
    <Drawer
      placement="left"
      :closable="true"
      :visible="visible"
      @close="onClose"
    >
      <Divider type="horizontal" class="divider" />
      <a href="#" class="hamburger-link">Home</a>
      <Divider type="horizontal" class="divider" />
      <a href="#" class="hamburger-link">Generate meme</a>
      <Divider type="horizontal" class="divider" />

      <a href="#" class="hamburger-link">Contact us</a>
      <Divider type="horizontal" class="divider" />

      <a href="#"
        >My profile
        <Avatar
          alt="profile picture"
          style="background-color: purple; float: right"
        >
          <template #icon>
            <UserOutlined />
          </template>
        </Avatar>
      </a>
      <Divider type="horizontal" class="divider" />
    </Drawer>
  </div>
</template>

<script>
import { Drawer, Divider, Avatar } from "ant-design-vue";
import { ref, provide } from "vue";
import { UserOutlined } from "@ant-design/icons-vue";

export default {
  name: "App",
  components: { Drawer, UserOutlined, Divider, Avatar },
  setup() {
    const visible = ref(false);
    const showDrawer = () => {
      visible.value = true;
    };
    provide("showDrawer", showDrawer);
    const onClose = () => {
      visible.value = false;
    };
    return {
      visible,
      showDrawer,
      onClose,
    };
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Righteous&display=swap");

:root {
  --primary-color: #8976fd;
  --primary-color-2: #7562e0;
  --light-primary--color: #bfb4ff;
  --dark-color: #332c5c;
  --gray-color: #978fc9;
}

body {
  margin: 0;
}

.hamburger-link {
  color: var(--primary-color);
  text-decoration: underline !important;
  font-family: "Poppins";
  display: block;
  margin: 0rem 0;
}

.divider {
  height: 1px;
  background-color: var(--gray-color);
}
</style>
