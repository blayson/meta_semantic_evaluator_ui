<template>
  <div>
    <h2>Register</h2>
    <validation-observer ref="observer" v-slot="{ invalid }">
      <v-form @submit.prevent="doRegister" class="form">
        <v-row>
          <v-col class="form-item" cols="12" md="4">
            <validation-provider
              v-slot="{ errors }"
              name="email"
              rules="required|email"
            >
              <v-text-field
                type="text"
                :error-messages="errors"
                label="E-mail"
                v-model="userData.email"
                required
              ></v-text-field>
            </validation-provider>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="form-item" cols="12" md="4">
            <validation-provider
              v-slot="{ errors }"
              name="name"
              rules="required"
            >
              <v-text-field
                type="text"
                :error-messages="errors"
                label="Name"
                v-model="userData.name"
                required
              ></v-text-field>
            </validation-provider>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="form-item" cols="12" md="4">
            <validation-provider
              v-slot="{ errors }"
              name="password"
              rules="required|min:5"
            >
              <v-text-field
                type="password"
                :error-messages="errors"
                label="Password"
                v-model="userData.password1"
                required
              ></v-text-field>
            </validation-provider>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="form-item" cols="12" md="4">
            <validation-provider
              v-slot="{ errors }"
              name="password"
              rules="required|min:5"
            >
              <v-text-field
                type="password"
                :error-messages="errors"
                label="Password again"
                v-model="userData.password2"
                required
              ></v-text-field>
            </validation-provider>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="form-item" cols="12" md="4">
            <v-btn
              color="success"
              type="submit"
              class="form-submit"
              :disabled="invalid"
            >
              Register
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <div v-if="error != null" class="form-error" style="color: red">
            {{ error }}
          </div>
        </v-row>
      </v-form>
    </validation-observer>
  </div>
</template>

<script>
import { required, email, min } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  setInteractionMode,
  ValidationProvider,
} from "vee-validate";

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
  name: "Register",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      userData: {
        name: "",
        email: "",
        password1: "",
        password2: "",
      },
      error: null,
    };
  },

  computed: {
    loggedIn() {
      return this.$store.state.status.auth.loggedIn;
    },
  },

  mounted() {
    if (this.loggedIn) {
      this.$router.push({ name: "Reviews" });
    }
  },
  methods: {
    async doRegister() {
      this.$refs.observer.validate();
      const { password1, password2 } = this.userData;
      if (password1 === password2) {
        const payload = {
          ...this.userData,
          password1: undefined,
          password2: undefined,
          password: this.userData.password1,
        };
        try {
          await this.$store.dispatch("register", payload);
          await this.$router.push({ name: "Login" });
        } catch (e) {
          if (e.response.status === 409) {
            this.error = "User with this email already exists";
          } else {
            await this.$router.push({ name: "PageNotFound" });
          }
        }
      } else {
        this.error = "Passwords are not matches";
      }
    },
  },
};
</script>

<style scoped></style>
