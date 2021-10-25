<template>
  <v-app>
    <v-app-bar app>
      <v-container>
        <v-row>
          <v-toolbar-title style="margin: 0 30px 0 10px" class="toolbar-title"
            >Semantic Results Evaluator
          </v-toolbar-title>

          <div v-if="currentUser">
            Hello <b>{{ currentUser.sub }}</b
            >!
            <router-link :to="{ name: 'Reviews' }" tag="button">
              <v-btn text>
                <v-icon small>mdi-message-outline</v-icon>
                <div style="margin-left: 5px">Reviews</div>
              </v-btn>
            </router-link>
            <router-link
              :to="{ name: 'Profile' }"
              tag="button"
              custom
              v-slot="{ navigate }"
            >
              <button @click="navigate" role="link">
                <v-btn text>
                  <v-icon small>mdi-account-circle</v-icon>
                  <div style="margin-left: 5px">Profile</div>
                </v-btn>
              </button>
            </router-link>
            <a
              href=""
              @click.prevent="doLogout"
              v-if="currentUser"
              style="color: cornflowerblue; margin-left: 5px"
              >Logout</a
            >
          </div>
          <div v-else class="actions">
            <router-link :to="{ name: 'Login' }" tag="button" exact>
              <v-btn outlined> login </v-btn>
            </router-link>
            <router-link :to="{ name: 'Register' }" tag="button" exact>
              <v-btn outlined> Register </v-btn>
            </router-link>
          </div>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <div>Footer</div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},
  computed: {
    currentUser() {
      return this.$store.state.status.auth.user;
    },
    // showAdminBoard() {
    //   if (this.currentUser && this.currentUser.roles) {
    //     return this.currentUser.roles.includes('ROLE_ADMIN');
    //   }
    //
    //   return false;
    // },
    // showModeratorBoard() {
    //   if (this.currentUser && this.currentUser.roles) {
    //     return this.currentUser.roles.includes('ROLE_MODERATOR');
    //   }
    //
    //   return false;
    // }
  },
  // beforeMount() {
  //   this.$store.dispatch("verifyToken");
  // },

  methods: {
    doLogout() {
      this.$store.dispatch("logout");
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.toolbar-title {
  color: #310080;
}
</style>
