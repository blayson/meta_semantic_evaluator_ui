<template>
  <v-container>
    <v-row>
      <v-col cols="2">
        <v-card class="mx-auto" max-width="300" tile>
          <v-list color="transparent">
            <v-subheader>MENU</v-subheader>
            <v-list-item-group v-model="selectedItem" color="primary">
              <v-list-item v-for="(item, i) in items" :key="i" link>
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.name"> </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>

      <v-col>
        <v-sheet min-height="70vh" rounded="lg">
          <v-container v-if="selectedItem === 0">
            <h3>Name</h3>
            {{ currentUser.user.name }}
            <h3>Email</h3>
            {{ currentUser.user.email }}
            <h3>User id</h3>
            {{ currentUser.user.users_id }}
            <h3>Role</h3>
            {{ userRolesMap[currentUser.user.user_roles_id] }}
          </v-container>
          <v-container v-else-if="selectedItem === 1">
            <v-data-table></v-data-table>
          </v-container>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { USER_ROLES_MAP } from "@/helpers/constants";

export default {
  name: "AdminProfile",
  components: {},
  computed: {
    currentUser() {
      return this.$store.state.status.auth.user;
    },
  },
  data() {
    return {
      userRolesMap: USER_ROLES_MAP,
      selectedItem: 0,
      items: [
        {
          name: "Personal info",
          icon: "mdi-account",
          // active: false,
        },
        {
          name: "Users management",
          icon: "mdi-account",
        },
      ],
    };
  },
  methods: {
    // activateMenuItem(index) {
    //   this.$store.dispatch("setActiveMenuItem", index);
    // this.links[n.index - 1]["active"] = true;
    // for (let link of this.links) {
    // if (link.index !== n.index) {
    //   link["active"] = false;
    // }
    // }
    // },
  },
  beforeMount() {},
};
</script>

<style scoped></style>
