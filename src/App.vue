<template>
  <v-app dark>
    <div class="alert">
      <v-alert
        v-for="(notification, index) in notifications"
        :key="index"
        class="alert-content"
        :value="true"
        :type="notification.type"
        transition="scale-transition"
      >
        {{ notification.message }}
        <v-icon class="cancel" @click="deleteNotification(index)">cancel</v-icon>
      </v-alert>
    </div>
    <v-navigation-drawer
      v-model="leftDrawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile v-if="!isAuthenticated" to="/login">
          <v-list-tile-action>
            <v-icon>person</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Login</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="!isAuthenticated" to="/signup">
          <v-list-tile-action>
            <v-icon>how_to_reg</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Sign Up</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="isAuthenticated" to="/">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="isAuthenticated" to="/about">
          <v-list-tile-action>
            <v-icon>info</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>About</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="isAuthenticated" @click="logout">
          <v-list-tile-action>
            <v-icon>person_outline</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon class="hidden-md-and-up" @click="leftDrawer = !leftDrawer">
      </v-toolbar-side-icon>
      <v-toolbar-title class="title">
        <span class="brand"><router-link class="router-link" to='/'>{{ title }}</router-link></span>
      </v-toolbar-title>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-if="isAuthenticated" flat to="/">Home</v-btn>
        <v-btn v-if="isAuthenticated" flat to="/about">About</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-if="!isAuthenticated" flat to="/login">Login</v-btn>
        <v-btn v-if="!isAuthenticated" flat to="/signup">Sign Up</v-btn>
        <v-btn v-if="isAuthenticated" @click="logout" flat>Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<style scoped>
  .title {
    padding-right: 10px;
  }
  .brand {
    cursor: pointer;
  }
  .brand:hover {
    display: inline-block;
    transform: scale(0.9);
  }
  .router-link {
    text-decoration: none;
    color: inherit;
  }
  .alert {
    position: absolute;
    padding-top: 30px;
    margin: auto;
    left: 0;
    right: 0;
  }
  .alert-content {
    z-index: 999;
    width: fit-content;
  }
  .cancel {
    color: rgba(0,0,0,0.3);
    padding-left: 15px;
    cursor: pointer;
  }
</style>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'App',
    data() {
      return {
        title: 'JAYGEL',
        clipped: true,
        leftDrawer: false,
      }
    },
    computed: {
      ...mapGetters({
        isAuthenticated: 'auth/isAuthenticated',
        notifications: 'notification/getNotifications',
      }),
    },
    methods: {
      logout() {
        this.$store.dispatch('auth/logout')
      },
      deleteNotification(index) {
        this.$store.dispatch('notification/delete', index)
      },
    },
  }
</script>
