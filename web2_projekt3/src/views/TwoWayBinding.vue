<template>
  <div>
      <h1>Volume calculator</h1>
      <form>
            <div class="form-group row">
                <label for="floz" class="col-sm-4 col-form-label">Fluid ounces</label>
                <div class="col-4">
                    <input type="text" class="form-control" placeholder="fl oz"  
                        v-model.number="fluidOz" @keyup="f2m">
                </div>
            </div>
            <div class="form-group row">
                <label for="ml" class="col-4 col-form-label" >Mililitres</label>
                <div class="col-4">
                    <input type="text" class="form-control" placeholder="mL" 
                        v-model.number="miliL" @keyup="m2f">
                </div>
            </div>
        </form>
        <p v-if="isAlot">Now that's a lot of fluid!</p>

  </div>
</template>

<script>
export default {
    data() {
        return {
            fluidOz: 0,
            miliL: 0
        };
    },
    methods: {
        f2m() {
            this.miliL = (this.fluidOz * 29.57353193).toFixed(2);
        },
        m2f() {
            this.fluidOz = (this.miliL / 29.57353193).toFixed(2);
        }
    },
    computed: {
        isAlot: function() {
            return this.fluidOz >= 100;
        }
    }
}
</script>