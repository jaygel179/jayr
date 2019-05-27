<template>
  <v-container>
    <v-slide-y-transition mode="out-in">
      <v-layout>
        <v-flex xs12 sm6 offset-sm3>
          <v-card>
            <v-card-title primary-title>
              <div class="center block">
                <h1>Page Not Found!</h1>
              </div>
              <div class="center block">
                <v-icon size="150px">error</v-icon>
              </div>
            </v-card-title>
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
