<template>
  <v-app>
    <v-app-bar app dark>
      <v-container fluid>
        <v-row>
          <v-toolbar-title style="margin: 0 30px 0 10px" class="toolbar-title"
            >Semantic Results Evaluator
          </v-toolbar-title>
          <v-toolbar-items>
            <v-item></v-item>
          </v-toolbar-items>
          <div v-if="currentUser">
            <router-link
              :to="{ name: 'Reviews' }"
              tag="button"
              exact
              style="margin-right: 10px"
            >
              <v-btn text>
                <v-icon small>mdi-message-outline</v-icon>
                <div style="margin-left: 5px">Reviews</div>
              </v-btn>
            </router-link>
            <router-link
              :to="{ name: 'Profile' }"
              tag="button"
              v-slot="{ navigate, isExactActive }"
              exact
            >
              <button
                @click="navigate"
                role="link"
                :class="[isExactActive && 'router-link-exact-active']"
              >
                <v-btn text>
                  <v-icon small>mdi-account-circle</v-icon>
                  <div style="margin-left: 5px">Profile</div>
                </v-btn>
              </button>
            </router-link>
            <v-btn
              text
              href=""
              @click.prevent="doLogout"
              v-if="currentUser"
              outlined
              style="margin-left: 10px"
              >Logout</v-btn
            >
          </div>
          <div v-else class="actions">
            <router-link
              :to="{ name: 'Login' }"
              tag="button"
              exact
              style="margin-right: 10px"
            >
              <v-btn text><div>login</div></v-btn>
            </router-link>
            <router-link :to="{ name: 'Register' }" tag="button" exact>
              <v-btn text><div>Register</div></v-btn>
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

    <v-footer>
      <v-container fluid>
        <v-row justify="center">
          <div>
            <p style="font-size: 14px">
              <b>Developed by: </b>
              <i>Andrii But, Mendel University in Brno </i>
            </p>
          </div>
        </v-row>
      </v-container>
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
  },
  async beforeMount() {
    await this.$store.dispatch("loadFeatureNames");
  },

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
  color: #f14c4c;
}
.router-link-exact-active {
  background-color: #3f3f3f;
}
</style>
