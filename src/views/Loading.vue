<template>
  <v-progress-linear v-if="!loaded" :indeterminate="true"></v-progress-linear>
</template>
<script>

export default {
  name: "Loading",
  computed: {
    loaded(){
      return this.$store.state.loaded;
    }
  }
};
</script>
