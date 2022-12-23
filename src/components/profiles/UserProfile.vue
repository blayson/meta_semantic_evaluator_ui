<template>
  <v-container>
    <v-card class="mx-0" max-width="400" tile>
      <v-col>
        <v-row align="center">
          <v-col md="2" lg="2" sm="4">
            <v-avatar color="primary" size="64">
              <span class="white--text text-h5">{{
                currentUser.user.name.slice(0, 1).toUpperCase()
              }}</span>
            </v-avatar>
          </v-col>
          <v-col>
            <v-card-title>{{ currentUser.user.name }}</v-card-title>
            <v-card-subtitle>{{
              userRolesMap[currentUser.user.user_roles_id]
            }}</v-card-subtitle>
          </v-col>
        </v-row>
        <v-divider></v-divider>

        <v-card-text><b>Email:</b> {{ currentUser.user.email }}</v-card-text>
        <v-card-text
          ><b>User ID:</b> {{ currentUser.user.users_id }}</v-card-text
        >
      </v-col>
    </v-card>
  </v-container>
</template>

<script>
import { ID_TO_ROLES_MAP } from "@/helpers/constants";

export default {
  name: "UserProfile",
  computed: {
    currentUser() {
      return this.$store.state.status.auth.user;
    },
  },
  data() {
    return {
      userRolesMap: ID_TO_ROLES_MAP,
    };
  },
};
</script>

<style scoped></style>
