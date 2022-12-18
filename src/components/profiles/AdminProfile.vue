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
                    <v-spacer></v-spacer>
                    <v-text-field
                      v-model="search"
                      append-icon="mdi-magnify"
                      label="Search"
                      single-line
                      hide-details
                    ></v-text-field>
                    <v-dialog v-model="dialog" max-width="500px">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="primary"
                          dark
                          class="mb-2"
                          v-bind="attrs"
                          v-on="on"
                        >
                          New Item
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
                              <v-col cols="12" sm="10" md="8" v-if="editedIndex === -1">
                                <v-text-field
                                  v-model="editedUser.password"
                                  label="Password"
                                  type="password"
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
                          >Are you sure you want to delete this user?
                        </v-card-title>
                        <v-card-text
                          >This will not delete all user suggestions</v-card-text
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
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
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
      dialogChangeRole: false,
      // edited
      editedUser: {
        users_id: 0,
        name: "",
        email: "",
        user_role: "user",
      },
      defaultUser: {
        users_id: 0,
        name: "",
        email: "",
        user_role: "user",
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
      console.log(item)
      console.log(this.allUsers)
      this.editedIndex = this.allUsers.indexOf(item)
      this.editedUser = Object.assign({}, item);
      this.dialog = true;
    },

    deleteUser(item) {
      this.editedIndex = this.allUsers.indexOf(item)
      this.editedUser = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteUserConfirm() {
      await this.$store.dispatch("deleteUser", this.editedUser.users_id);
      this.closeDelete();
      await this.getDataFromApi();
      this.$forceUpdate();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedUser = Object.assign({}, this.defaultUser);
        this.editedIndex = -1
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedUser = Object.assign({}, this.defaultUser);
        this.editedIndex = -1
      });
    },

    async save() {
      // let userToUpdate = {
      //   users_id: this.editedUser.users_id,
      //   name: this.editedUser.name,
      //   email: this.editedUser.email,
      //   user_roles_id: ROLE_TO_ID_MAP[this.editedUser.user_role],
      // };
      if (this.editedIndex > -1) {
        await this.$store.dispatch("updateUser", this.editedUser);
      } else {
        delete this.editedUser.users_id
        if (this.editedUser.user_role.length === 0) {
          delete this.editedUser.user_role
        }
        await this.$store.dispatch("register", this.editedUser);

      }
      this.close();
      await this.getDataFromApi();
      this.$forceUpdate();
    },
  },
};
</script>

<style scoped></style>
