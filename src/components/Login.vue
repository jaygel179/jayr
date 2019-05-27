<template>
  <v-container>
    <v-slide-y-transition mode="out-in">
      <v-layout>
        <v-flex xs12 sm8 md6 offset-sm2 offset-md3>
          <v-card>
            <v-card-title primary-title>
              <div class="center block">
                <h1>Login</h1>
                <v-icon size="150px">person</v-icon>
              </div>
              <div class="center block">
                <v-form v-model="valid">
                  <v-text-field
                    v-model="username"
                    :rules="[val => val.length > 0 || 'Required']"
                    label="Username"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    :rules="[val => val.length > 0 || 'Required']"
                    :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                    :type="showPassword ? 'text' : 'password'"
                    label="Password"
                    @click:append="showPassword = !showPassword"
                    required
                  ></v-text-field>
                </v-form>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                :loading="loading"
                :disabled="loading || !valid"
                color="primary"
                class="white--text"
                @click.native="loader = 'loading'"
                @click="login"
              >
                Login
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<style scoped>
  .center {
    margin: auto;
    text-align: center;
  }
  .block {
    display: block;
    width: 100%;
  }
</style>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'login',
  data: () => ({
    username: '',
    password: '',
    showPassword: false,
    valid: false,
  }),
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
      loading: 'auth/loading',
    }),
  },
  methods: {
    login() {
      this.$store.dispatch('auth/login', {
        username: this.username,
        password: this.password,
      })
    },
  },
}
</script>
