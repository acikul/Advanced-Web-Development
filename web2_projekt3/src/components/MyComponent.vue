<template>
  <div>
      <p>Child component</p>
      <button @click="btnClicked">Click me more than 3 times</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clickCnt: 0
    }
  },
  emits: ["moreThan"],
  methods: {
    btnClicked() {
      this.clickCnt += 1;
      if (this.clickCnt > 3) {
        this.$emit('moreThan', {});
      }
    }
  }
}
</script>