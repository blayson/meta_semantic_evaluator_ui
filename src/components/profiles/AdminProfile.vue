<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <v-sheet class="mx-auto" max-width="300" tile>
          <v-list color="transparent">
            <v-subheader>MENU</v-subheader>
            <v-list-item-group v-model="selectedMenuItem" color="primary">
              <v-list-item v-for="(item, i) in menuItems" :key="i" link>
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.name"> </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-sheet>
      </v-col>

      <v-col>
        <v-sheet min-height="70vh" rounded="lg">
          <v-container v-if="selectedMenuItem === 0">
            <h3>Name</h3>
            {{ currentUser.user.name }}
            <h3>Email</h3>
            {{ currentUser.user.email }}
            <h3>User id</h3>
            {{ currentUser.user.users_id }}
            <h3>Role</h3>
            {{ userRolesMap[currentUser.user.user_roles_id] }}
          </v-container>
          <v-container v-else-if="selectedMenuItem === 1">
            <div>
              <v-data-table
                :headers="headers"
                :items="allUsers"
                :options.sync="options"
                :loading="loading"
                :search="search"
                class="elevation-1"
              >
                <template v-slot:top>
                  <v-toolbar flat>
                    <v-toolbar-title>Users list</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-text-field
                      v-model="search"
                      append-icon="mdi-magnify"
                      label="Search"
                      single-line
                      hide-details
                    ></v-text-field>
                    <v-dialog v-model="dialog" max-width="500px">

                      <v-card>
                        <v-card-title>
                          <span class="text-h5"> Edit User </span>
                        </v-card-title>

                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="8" md="6">
                                <v-text-field
                                  v-model="editedUser.name"
                                  label="Dessert name"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  v-model="editedUser.user_roles_id"
                                  label="role id"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="10" md="8">
                                <v-text-field
                                  v-model="editedUser.email"
                                  label="Email"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="close">
                            Cancel
                          </v-btn>
                          <v-btn color="blue darken-1" text @click="save">
                            Save
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="500px">
                      <v-card>
                        <v-card-title class="text-h5"
                          >Are you sure you want to delete this
                          user?
                          </v-card-title>
                        <v-card-text>This will delete all user suggestions, but will not affect updated reviews</v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="closeDelete"
                            >Cancel</v-btn
                          >
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="deleteUserConfirm"
                            >OK</v-btn
                          >
                          <v-spacer></v-spacer>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>

                  </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-row>
                    <v-col>
                      <v-icon small class="mr-2" @click="editUser(item)">
                        mdi-pencil
                      </v-icon>
                    </v-col>
                    <v-col>
                      <v-icon small @click="deleteUser(item)">
                        mdi-delete
                      </v-icon>
                    </v-col>
                  </v-row>
                </template>
                <template v-slot:no-data>
                  <v-btn color="primary" @click="getDataFromApi"> Reset </v-btn>
                </template>
              </v-data-table>
            </div>
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
    allUsers() {
      return this.$store.state.status.users.allUsers;
    },
  },
  watch: {
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    },
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  data() {
    return {
      userRolesMap: USER_ROLES_MAP,
      totalUsers: 0,
      users: [],
      loading: true,
      options: {},
      // dialogs
      dialog: false,
      dialogDelete: false,
      dialogChangeRole: false,
      // edited
      editedUser: {
        users_id: 0,
        name: "",
        email: 0,
        user_roles_id: 0,
      },
      defaultUser: {
        users_id: 0,
        name: "",
        email: 0,
        user_roles_id: 0,
      },
      // menu
      selectedMenuItem: 1,
      menuItems: [
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
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: true,
          value: "users_id",
        },
        { text: "Name", value: "name" },
        { text: "Email", value: "email" },
        { text: "Role", value: "user_roles_id" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      search: "",
    };
  },
  methods: {
    async getDataFromApi() {
      this.loading = true;
      await this.$store.dispatch("getAllUsers");
      this.totalUsers = this.allUsers.length;
      this.loading = false;
    },

    editUser(item) {
      this.editedUser = Object.assign({}, item);
      this.dialog = true;
    },

    deleteUser(item) {
      this.editedUser = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteUserConfirm() {
      await this.$store.dispatch("deleteUser", this.editedUser.users_id)
      this.closeDelete();
      await this.getDataFromApi()
      this.$forceUpdate()
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedUser = Object.assign({}, this.defaultUser);
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedUser = Object.assign({}, this.defaultUser);
      });
    },

    async save() {
      await this.$store.dispatch("updateUser", this.editedUser)
      this.close();
      await this.getDataFromApi()
      this.$forceUpdate()
    },
  },
};
</script>

<style scoped></style>
