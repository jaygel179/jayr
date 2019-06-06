<template>
  <v-container>
    <v-slide-y-transition mode="out-in">
      <v-layout>
        <v-flex xs12 sm8 md6 offset-sm2 offset-md3>
          <v-card>
            <v-card-title primary-title>
              <div class="center block">
                <h1>Home page</h1>
              </div>
              <div class="center block">
                <v-form>
                  <v-text-field
                    v-model="string"
                    :rules="[val => val.length > 0 || 'Required']"
                    label="String"
                    required
                  ></v-text-field>
                </v-form>
              </div>
              <div class="center block">
                <h2>Number of holes: {{ count }}</h2>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                :loading="loading"
                color="primary"
                class="white--text"
                @click.native="loader = 'loading'"
                @click="calculate"
              >
                Calculate
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
import request, { headers } from '@/utils/request'

export default {
  data: () => ({
    string: '',
    count: 0,
    loading: false,
  }),
  methods: {
    calculate() {
      this.loading = true
      request.get(`/api/v1/holes?string=${this.string}`, headers())
          .then((response) => {
            this.count = response.count
            this.loading = false
          })
          .catch(() => {
            this.loading = false
          })
    },
  },
}
</script>
