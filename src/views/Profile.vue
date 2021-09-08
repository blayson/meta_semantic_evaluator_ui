<template>
  <v-container>
    <h1>Profile</h1>
    <hr />
  </v-container>
</template>

<script>
export default {
  name: "Profile",
  components: {},
  currentUser() {
    return this.$store.state.status.auth.user;
  },
  mounted() {},
};
</script>
