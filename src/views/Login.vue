<template>
  <div>
    <h2>Login</h2>
    <validation-observer ref="observer" v-slot="{ invalid }">
      <v-form @submit.prevent="doLogin" ref="form">
        <v-row>
          <v-col cols="12" md="4">
            <validation-provider
              v-slot="{ errors }"
              name="email"
              rules="required|email"
            >
              <v-text-field
                v-model="email"
                :error-messages="errors"
                label="E-mail"
                required
              ></v-text-field>
            </validation-provider>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <validation-provider
              v-slot="{ errors }"
              name="Password"
              rules="required|min:5"
            >
              <v-text-field
                v-model="password"
                :error-messages="errors"
                label="Password"
                type="Password"
                required
              ></v-text-field>
            </validation-provider>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
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
          <v-alert v-if="error != null" class="form-error" style="color: red">
            {{ error }}
          </v-alert>
        </v-row>
      </v-form>
    </validation-observer>
  </div>
</template>

<script>
import { tokenManager } from "@/main";
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
  name: "Login",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async doLogin() {
      this.$refs.observer.validate();
      try {
        let formData = new FormData();
        formData.append("username", this.email);
        formData.append("password", this.password);
        const response = await this.$http.post("/auth/login", formData, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });
        const { token } = response.data;
        tokenManager.setToken(token);
        const { sub } = tokenManager.getPayload();
        this.$emit("userLogged", { sub });
        await this.$router.push("Home");
      } catch (e) {
        if (e.response.status === 400 || e.response.status === 404) {
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
