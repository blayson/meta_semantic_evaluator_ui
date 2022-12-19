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

                <v-card-text
                  ><b>Email:</b> {{ currentUser.user.email }}</v-card-text
                >
                <v-card-text
                  ><b>User ID:</b> {{ currentUser.user.users_id }}</v-card-text
                >
              </v-col>
            </v-card>
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
                    <v-spacer></v-spacer>
                    <v-text-field
                      v-model="search"
                      append-icon="mdi-magnify"
                      label="Search"
                      single-line
                      hide-details
                    ></v-text-field>
                    <v-spacer></v-spacer>

                    <v-dialog v-model="dialog" max-width="500px">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="primary"
                          dark
                          class="mb-2"
                          v-bind="attrs"
                          v-on="on"
                        >
                          New User
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="text-h5"> {{ formTitle }} </span>
                        </v-card-title>

                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="8" md="6">
                                <v-text-field
                                  v-model="editedUser.name"
                                  label="Name"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-select
                                  v-model="editedUser.user_role"
                                  label="Role"
                                  :items="selectRoleItems"
                                >
                                </v-select>
                              </v-col>
                              <v-col cols="12" sm="10" md="8">
                                <v-text-field
                                  v-model="editedUser.email"
                                  label="Email"
                                ></v-text-field>
                              </v-col>
                              <v-col
                                cols="12"
                                sm="10"
                                md="8"
                                v-if="editedIndex === -1"
                              >
                                <v-text-field
                                  v-model="editedUser.password1"
                                  label="Password"
                                  type="password"
                                  :error-messages="errors"
                                ></v-text-field>
                              </v-col>
                              <v-col
                                cols="12"
                                sm="10"
                                md="8"
                                v-if="editedIndex === -1"
                              >
                                <v-text-field
                                  v-model="editedUser.password2"
                                  label="Password Again"
                                  type="password"
                                  :error-messages="errors"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                            <v-row>
                              <p v-if="usualErrors" style="color: red">
                                {{ usualErrors }}
                              </p>
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
                    <v-dialog v-model="dialogChangePassword" max-width="500px">
                      <v-card>
                        <v-card-title>
                          <span class="text-h5"> Change User Password </span>
                        </v-card-title>

                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="10" md="8">
                                <v-text-field
                                  v-model="editedUserPassword.password1"
                                  label="Password"
                                  type="password"
                                  :error-messages="errors"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="10" md="8">
                                <v-text-field
                                  v-model="editedUserPassword.password2"
                                  label="Password Again"
                                  type="password"
                                  :error-messages="errors"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                            <v-row>
                              <p v-if="usualErrors" style="color: red">
                                {{ usualErrors }}
                              </p>
                            </v-row>
                          </v-container>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="close">
                            Cancel
                          </v-btn>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="saveChangePassword"
                          >
                            Save
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="500px">
                      <v-card>
                        <v-card-title class="text-h5"
                          >Are you sure you want to delete this user?
                        </v-card-title>
                        <v-card-text
                          >This will not delete all user
                          suggestions</v-card-text
                        >
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
                      <v-icon small class="mr-2" @click="changePassword(item)">
                        mdi-form-textbox-password
                      </v-icon>
                    </v-col>
                    <v-col>
                      <v-icon small class="mr-2" @click="deleteUser(item)">
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
import { ID_TO_ROLES_MAP, USER_ROLES } from "@/helpers/constants";

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
    formTitle() {
      return this.editedIndex === -1 ? "New User" : "Edit User";
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
      errors: null,
      usualErrors: null,
      userRolesMap: ID_TO_ROLES_MAP,
      totalUsers: 0,
      users: [],
      loading: true,
      editedIndex: -1,
      options: {},
      selectRoleItems: USER_ROLES,
      // dialogs
      dialog: false,
      dialogDelete: false,
      dialogChangePassword: false,
      // edited
      editedUser: {
        users_id: 0,
        name: "",
        password1: "",
        password2: "",
        email: "",
        user_role: "user",
      },
      defaultUser: {
        users_id: 0,
        name: "",
        email: "",
        password1: "",
        password2: "",
        user_role: "user",
      },
      editedUserPassword: {
        password1: "",
        password2: "",
      },
      defaultPasswords: {
        password1: "",
        password2: "",
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
        { text: "Role", value: "user_role" },
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
      this.editedIndex = this.allUsers.indexOf(item);
      this.editedUser = Object.assign({}, item);
      this.dialog = true;
    },

    deleteUser(item) {
      this.editedIndex = this.allUsers.indexOf(item);
      this.editedUser = Object.assign({}, item);
      this.dialogDelete = true;
    },

    changePassword(item) {
      this.editedUser = Object.assign({}, item);
      this.dialogChangePassword = true;
    },

    async deleteUserConfirm() {
      await this.$store.dispatch("deleteUser", this.editedUser.users_id);
      this.closeDelete();
      await this.getDataFromApi();
      this.$forceUpdate();
    },

    close() {
      this.dialog = false;
      this.dialogChangePassword = false;
      this.errors = null;
      this.usualErrors = null;
      this.$nextTick(() => {
        this.editedUser = Object.assign({}, this.defaultUser);
        this.editedUserPassword = Object.assign({}, this.defaultPasswords);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedUser = Object.assign({}, this.defaultUser);
        this.editedIndex = -1;
      });
    },

    async saveChangePassword() {
      const { users_id } = this.editedUser;
      const { password1, password2 } = this.editedUserPassword;
      let payload;
      if (password1 === password2 && password1.length > 5) {
        payload = {
          users_id,
          password1: undefined,
          password2: undefined,
          password: this.editedUserPassword.password1,
        };
        await this.$store.dispatch("changePassword", payload);
        this.close();
        await this.getDataFromApi();
        this.$forceUpdate();
      } else if (password1.length >= 0 && password1.length <= 5) {
        this.errors = "Passwords should be more then 5 symbols";
        payload = null;
      } else {
        this.errors = "Passwords should be the same";
        payload = null;
      }
    },

    async save() {
      if (this.editedIndex > -1) {
        await this.$store.dispatch("updateUser", this.editedUser);
      } else {
        const { password1, password2 } = this.editedUser;
        let payload;
        if (password1 === password2 && password1.length > 5) {
          payload = {
            ...this.editedUser,
            password1: undefined,
            password2: undefined,
            password: this.editedUser.password1,
          };
        } else if (
          password1 === password2 &&
          password1.length > 0 &&
          password1.length <= 5
        ) {
          this.errors = "Passwords should be more then 5 symbols";
          payload = null;
        } else {
          payload = this.editedUser;
        }
        if (payload != null) {
          delete payload.users_id;
          if (payload.user_role.length === 0) {
            delete payload.user_role;
          }
          await this.$store.dispatch("register", payload);
        }
      }

      if (
        this.$store.state.status.auth.responseStatus === 201 ||
        this.$store.state.status.auth.responseStatus === 200
      ) {
        this.close();
        await this.getDataFromApi();
        this.$forceUpdate();
      } else if (this.$store.state.status.auth.responseStatus === 409) {
        this.usualErrors = "User already exist";
      } else if (this.$store.state.status.auth.responseStatus === 422) {
        this.usualErrors = "Incorrect data";
      }
    },
  },
};
</script>

<style scoped></style>
