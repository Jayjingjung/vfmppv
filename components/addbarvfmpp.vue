
<template>
  <v-app>

    <v-app-bar style="height: fit-content;" app color="green" elevate-on-scroll>
      <v-spacer />
      <v-row class="d-none d-md-flex">
        <v-btn color="white" text class="mx-2">Home</v-btn>


        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="white" text class="mx-2" v-bind="attrs" v-on="on">
              New & Events
              <v-icon right>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="goToPhoto">
              <v-list-item-title>PHOTO</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn color="white" text class="mx-2">New & Events</v-btn>
        <v-btn color="white" text class="mx-2">VFMP Models</v-btn>
        <v-btn color="white" text class="mx-2">Information</v-btn>
        <v-btn color="white" text class="mx-2">About VFMP</v-btn>
        <v-btn color="white" text class="mx-2">Link</v-btn>
        <v-btn color="white" text class="mx-2">Contact Us</v-btn>
      </v-row>



      <v-btn color="white" @click="goToLogin" dark icon>
        <v-icon>mdi-location-enter</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app expand-on-hover rail rail-width="256">
      <v-list dense>
        <v-list-group no-action v-for="item in menu" :key="item.title" prepend-icon="mdi-menu-down">
          <template v-slot:activator>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </template>
          <v-list-item v-for="sub in item.items" :key="sub.title" link>
            <v-list-item-title>{{ sub.title }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>

      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      USER_ROLE: '', // 👈 Add this


    }

  },
  created() {
    this.USER_ROLE = localStorage.getItem('USER_ROLE') || ''
  },
  methods: {
    goToLogin() {
      this.$router.push('/login');
    },
    goToPhoto() {
      this.$router.push('/photo') // 👈 Replace with your actual route
    }
  }

}
</script>

<style scoped>
.v-app-bar {
  border-bottom: 1px solid #eee;
}
</style>