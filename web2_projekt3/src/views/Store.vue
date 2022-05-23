<template>
  <form @submit.prevent="setFooterMsg">
      <label for="msg" class="col-sm-4 col-form-label">Global footer message:</label>
      <div class="col-8">
          <input type="text" class="form-control" v-model="message" />
      </div>
      <div>
          <button class="btn btn-success" type="submit">
          Set new global footer message
        </button>
      </div>
  </form>
</template>

<script>
export default {
    data() {
        return {
            message: ""
        }
    },
    methods: {
        setFooterMsg() {
            this.$store.commit('setMsg', this.message);
        }
    }
}
</script>

<style>

</style>