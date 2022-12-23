<template>
  <v-container fluid>
    <v-row justify="center">
      <h2>Login</h2>
    </v-row>
    <v-row justify="center">
      <v-col cols="4">
        <validation-observer ref="observer" v-slot="{ invalid }">
          <v-form @submit.prevent="doLogin" ref="form">
            <v-row>
              <v-col>
                <validation-provider
                  v-slot="{ errors }"
                  name="email"
                  rules="required|email"
                >
                  <v-text-field
                    v-model="user.email"
                    :error-messages="errors"
                    @focus="validate()"
                    @input="validate()"
                    label="E-mail"
                    required
                  ></v-text-field>
                </validation-provider>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <validation-provider
                  v-slot="{ errors }"
                  name="Password"
                  rules="required|min:5"
                >
                  <v-text-field
                    v-model="user.password"
                    :error-messages="errors"
                    @focus="validate()"
                    @input="validate()"
                    label="Password"
                    type="Password"
                    required
                  ></v-text-field>
                </validation-provider>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn
                  color="success"
                  type="submit"
                  class="form-submit"
                  :disabled="invalid"
                >
                  Login
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-alert
                v-if="error != null"
                class="form-error"
                style="color: red"
              >
                {{ error }}
              </v-alert>
            </v-row>
          </v-form>
        </validation-observer>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { required, email, min } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  setInteractionMode,
  ValidationProvider,
} from "vee-validate";
import User from "@/models/user";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});
extend("min", {
  ...min,
  message: "{_field_} should be greater than {length} characters",
});
extend("email", {
  ...email,
  message: "Email must be valid",
});

export default {
  name: "Login",
  components: {
    ValidationProvider,
    ValidationObserver,
  },

  data() {
    return {
      user: new User(""),
      error: null,
    };
  },

  computed: {
    loggedIn() {
      return this.$store.state.status.auth.loggedIn;
    },
  },

  created() {
    if (this.loggedIn) {
      this.$router.push({ name: "Reviews" });
    }
  },

  methods: {
    validate() {
      // this.$nextTick(() => this.$refs.observer.validate());
      this.$refs.observer.validate();
    },
    async doLogin() {
      await this.$refs.observer.validate();
      try {
        if (this.user.email && this.user.password) {
          let formData = new FormData();
          formData.append("username", this.user.email);
          formData.append("password", this.user.password);
          await this.$store.dispatch("login", formData);
          await this.$router.push({ name: "Reviews" });
        }
      } catch (e) {
        if (e.response.status === 400 || e.response.status === 403 || e.response.status === 404) {
          this.error = "User does not exist with this password and email";
        } else if (e.response.status === 401 || e.response.status === 422) {
          this.error = e.response.data.detail || "Incorrect email or password";
        }
      }
    },
  },
};
</script>

<style scoped></style>
