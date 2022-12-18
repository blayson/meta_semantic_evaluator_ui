<template>
  <v-container>
    <h3>Name</h3>
    {{ currentUser.user.name }}
    <h3>Email</h3>
    {{ currentUser.user.email }}
    <h3>User id</h3>
    {{ currentUser.user.users_id }}
  </v-container>
</template>

<script>
export default {
  name: "UserProfile",
  computed: {
    currentUser() {
      return this.$store.state.status.auth.user;
    },
  },
};
</script>

<style scoped></style>
