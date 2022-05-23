<template>
  <div>
      <p>{{this.quote}}</p>
      <p>- Kanye West</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            quote: null,
        }
    },
    async created() {
        const response = await axios.get("https://api.kanye.rest");
        this.quote = response.data.quote;
    }
}
</script>