<template>
  <v-container>
    <h1>Profile</h1>
    <hr />
    <admin-profile v-if="currentUser.user.user_roles_id === 2"></admin-profile>
    <user-profile v-else></user-profile>
  </v-container>
</template>

<script>
import AdminProfile from "@/views/profiles/AdminProfile.vue";
import UserProfile from "@/views/profiles/UserProfile.vue";

export default {
  name: "Profile",
  components: { UserProfile, AdminProfile },
  computed: {
    currentUser() {
      return this.$store.state.status.auth.user;
    },
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {
    // console.log(this.currentUser);
  },
};
</script>
