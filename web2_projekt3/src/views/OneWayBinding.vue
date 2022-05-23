<template>
  <div>
      <p>Example of interpolation: {{value1}}</p>
      <form>
          <div class="form-group row">
              <label for="value2" class="col-sm-2 col-form-label">Example of one-way binding: </label>
              <input type="text" class="form-control" v-bind:value="value2" readonly>
          </div>
      </form>
  </div>
</template>

<script>
export default {
    data() {
        return {
            value1: "hello",
            value2: "world"
        }
    }
}
</script>

<style>

</style>