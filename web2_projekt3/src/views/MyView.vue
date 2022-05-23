<template>
  <div>
      <p>Parent component</p>
      <p v-if="moreThan3"> Button in child component has been clicked more than 3 times!</p>
      <my-component @more-than="alert3"></my-component>
  </div>
</template>

<script>
export default {
    data() {
        return {
            moreThan3: false
        }
    },
    methods: {
        alert3() {
            this.moreThan3 = true;
        }
    },
    mounted() {
        this.moreThan3 = false;
    }
}
</script>