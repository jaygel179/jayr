<template>
  <v-container>
    <v-slide-y-transition mode="out-in">
      <v-layout>
        <v-flex xs12 sm8 md6 offset-sm2 offset-md3>
          <v-card>
            <v-card-title primary-title>
              <div class="center block">
                <h1>Sign Up</h1>
                <v-icon size="150px">how_to_reg</v-icon>
              </div>
              <div class="center block">
                <v-form v-model="valid">
                  <v-text-field
                    v-model="username"
                    :rules="[val => val.length > 5 || 'Min 6 characters']"
                    label="Username"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                    :rules="[rules.min, rules.upper, rules.lower, rules.digit]"
                    :type="showPassword ? 'text' : 'password'"
                    label="Password"
                    hint="At least 8 characters"
                    counter
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
                @click="signup"
              >
                Sign Up
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
  name: 'signup',
  data: () => ({
    username: '',
    password: '',
    showPassword: false,
    valid: false,
    rules: {
      min: password => password.length >= 8 || 'Min 8 characters',
      upper: password => (password.match(/[A-Z]+/g) && true) || 'At least 1 upper case',
      lower: password => (password.match(/[a-z]+/g) && true) || 'At least 1 lower case',
      digit: password => (password.match(/[0-9]+/g) && true) || 'At least 1 digit',
    },
  }),
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
      loading: 'auth/loading',
    }),
  },
  methods: {
    signup() {
      this.$store.dispatch('auth/signup', {
        username: this.username,
        password: this.password,
      })
    },
  },
}
</script>
