<template>
  <v-app>
    <v-app-bar app>
      <v-container>
        <v-row>
          <v-toolbar-title style="margin: 0 30px 0 10px"
            >Semantic Results Evaluator
          </v-toolbar-title>

          <div v-if="isLoggedIn">
            Hello <b>{{ user.sub }}</b
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
              v-if="isLoggedIn"
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
        <router-view @userLogged="onUserLog" :user="user"></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <div>Footer</div>
    </v-footer>
  </v-app>
</template>

<script>
import { tokenManager } from "@/main";
// import Title from "@/components/Title";

export default {
  name: "App",

  components: {
    // Title,
  },

  data: () => ({
    user: null,
  }),

  computed: {
    isLoggedIn() {
      return this.user != null;
    },
  },

  methods: {
    doLogout() {
      this.user = null;
      tokenManager.logout();
      this.$router.push({ name: "Login" });
    },

    onUserLog(data) {
      this.user = data;
    },
  },
  mounted() {
    const parsed_token = tokenManager.getPayload();
    if (parsed_token !== null) {
      this.user = { sub: parsed_token.sub };
    }
  },
};
</script>
