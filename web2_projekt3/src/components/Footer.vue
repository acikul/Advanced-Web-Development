<template>
    <div class="footer" v-if="this.$store.getters.isMsgSet">
        {{this.$store.getters.msg}}
    </div>
</template>