<template>
  <div id="box">
    <img class="meme-image" :src="url">
    <p v-for="text in text" :key="text.id" class="meme-text"> {{ text.value }} </p>
  </div>
</template>

<script>
import html2canvas from "html2canvas";

export default {
  name: "MemeEditor",
  props: {url: String, text: Array},
  components: {},
  data() {
    return {
      dragObj: {},
      draggables: [],
    }
  },
  methods: {
    down(event) {
      if (~event.target.className.search(/meme-text/)) {
        this.dragObj = this.makeObj(event);
        this.dragObj.element.style.zIndex = "100";
        document.addEventListener("mousemove", this.freeMovement, false);
      }
    },

    freeMovement(event) {
      //Prevents redundantly adding the same event handler repeatedly
      if (typeof (this.dragObj.element.mouseup) == "undefined")
        document.addEventListener("mouseup", this.drop, false);

      this.dragObj.element.style.left = Math.max(this.dragObj.minBoundX, Math.min(event.clientX - this.dragObj.posX, this.dragObj.maxBoundX)) + "px";
      this.dragObj.element.style.top = Math.max(this.dragObj.minBoundY, Math.min(event.clientY - this.dragObj.posY, this.dragObj.maxBoundY)) + "px";
    },

    drop() {
      this.dragObj.element.style.zIndex = "1";

      document.removeEventListener("mousemove", this.freeMovement, false);
      document.removeEventListener("mouseup", this.drop, false);
    },

    makeObj(event) {
      const obj = {},
          e = event.target;
      obj.element = e;

      // parentNode is our bounding box
      // the minimum boundary is based on the top left corner of our container
      obj.minBoundX = e.parentNode.offsetLeft;
      obj.minBoundY = e.parentNode.offsetTop;

      // the maximum is the bottom right corner of the container
      // or.. the top left (x,y) + the height and width (h,y) - the size of the square
      obj.maxBoundX = obj.minBoundX + e.parentNode.offsetWidth - e.offsetWidth;
      obj.maxBoundY = obj.minBoundY + e.parentNode.offsetHeight - e.offsetHeight;

      obj.posX = event.clientX - e.offsetLeft;
      obj.posY = event.clientY - e.offsetTop;

      return obj;
    },
    downloadMeme() {
      html2canvas(document.getElementById("box"), {
        useCORS: true
      }).then(function (canvas) {
        const anchorTag = document.createElement("a");
        document.body.appendChild(anchorTag);
        anchorTag.download = "meme.jpg";
        anchorTag.href = canvas.toDataURL();
        anchorTag.target = '_blank';
        anchorTag.click();
      });
    },
    updateDraggableElements() {
      const draggables = document.getElementsByClassName("meme-text");
      for (let i = 0; i < draggables.length; i++) {
        draggables[i].addEventListener("mousedown", this.down, false);
      }
    },
  },
  updated() {
    this.updateDraggableElements();
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}

#box {
  width: max-content;
}

.meme-image {
  max-width: 640px;
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
</style>
