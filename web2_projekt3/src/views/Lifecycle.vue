<template>
  <div>
      Number of times you visited this page: {{visitNum}}
  </div>
</template>

<script>
export default {
    data() {
        return {
            visitNum: 0
        }
    },
    beforeMount() {
        let visits = sessionStorage.getItem('visitNum');
        if (visits != null) {
            this.visitNum = parseInt(visits);
        } else {
            sessionStorage.setItem('visitNum', 0);
        }
    },
    mounted() {
        this.visitNum = parseInt(sessionStorage.getItem('visitNum')) + 1;
        sessionStorage.setItem('visitNum', this.visitNum)
    }
}
</script>