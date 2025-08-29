<template>
  <v-app>

    <v-dialog v-model="drawer" transition="slide-y-transition" persistent fullscreen>
      <v-card>
        <v-toolbar dark color="green">
          <v-toolbar-title>{{ menuLabel }}</v-toolbar-title>
          <v-spacer></v-spacer>

          <!-- Language Switch -->
          <v-btn style="font-size: 30px;" color="white" text class="mx-1" @click="changeLanguage('la')">🇱🇦</v-btn>
          <v-btn style="font-size: 30px;" color="white" text class="mx-1" @click="changeLanguage('en')">🇺🇸</v-btn>

          <v-spacer></v-spacer>
          <v-btn icon @click="drawer = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <!-- Menu Content -->
        <v-list>
          <v-list-item v-for="(item, index) in menuItems" :key="index" @click="navigateTo(item)">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>

    <!-- Top App Bar -->
    <v-app-bar style="height: fit-content;" app color="green" elevate-on-scroll>
      <v-app-bar-nav-icon class="d-md-none" color="white" @click="drawer = !drawer" />



      <v-spacer />

      <!-- Navigation Menu (Desktop) -->
      <v-row class="d-none d-md-flex align-center">
        <v-btn @click="$router.push('/home')" color="white" text class="mx-2">
          {{ homeLabel }}
        </v-btn>

        <!-- News & Events Menu -->
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="white" text class="mx-2" v-bind="attrs" v-on="on">
              {{ newsEventsLabel }}
              <v-icon right>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="$router.push('/new')">
              <v-list-item-title>{{ newsLabel }}</v-list-item-title>
            </v-list-item>
          </v-list>
          <v-list>
            <v-list-item @click="$router.push('/gallery')">
              <v-list-item-title>{{ photoLabel }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn @click="$router.push('/vfmpmodels_get')" color="white" text class="mx-2">
          {{ vfmpModelsLabel }}
        </v-btn>

        <!-- Information Menu -->
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="white" text class="mx-2" v-bind="attrs" v-on="on">
              {{ infoLabel }}
              <v-icon right>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="$router.push('/LPB')">
              <v-list-item-title>{{ lpbLabel }}</v-list-item-title>
            </v-list-item>
          </v-list>
          <v-list>
            <v-list-item @click="$router.push('/XBL')">
              <v-list-item-title>{{ xblLabel }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <!-- About VFMP -->
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="white" text class="mx-2" v-bind="attrs" v-on="on">
              {{ aboutLabel }}
              <v-icon right>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="$router.push('/forest')">
              <v-list-item-title>{{ forestLabel }}</v-list-item-title>
            </v-list-item>
          </v-list>
          <v-list>
            <v-list-item @click="$router.push('/LPB')">
              <v-list-item-title>{{ lpbLabel }}</v-list-item-title>
            </v-list-item>
          </v-list>
          <v-list>
            <v-list-item @click="$router.push('/XBL')">
              <v-list-item-title>{{ xblLabel }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn @click="$router.push('/Links')" color="white" text class="mx-2">
          {{ linkLabel }}
        </v-btn>

        <v-btn @click="$router.push('/contact')" color="white" text class="mx-2">
          {{ contactLabel }}
        </v-btn>

        <!-- Language Switch -->
        <v-btn style="font-size: 30px;" color="white" text class="mx-1" @click="changeLanguage('la')">🇱🇦</v-btn>
        <v-btn style="font-size: 30px;" color="white" text class="mx-1" @click="changeLanguage('en')">🇺🇸</v-btn>
      </v-row>


      <!-- Login Button -->
      <v-btn color="white" @click="goToLogin" dark icon>
        <v-icon>mdi-location-enter</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <nuxt />
    </v-main>

    <!-- เมนูด้านล่าง -->
    <v-bottom-navigation color="green" v-if="USER_ROLE === 'ADMIN' || USER_ROLE === 'STAFF'" fixed app>



      <v-btn v-if="USER_ROLE === 'ADMIN'" @click="$router.push('/add_customer')" icon>
        <v-icon>mdi-account-multiple-plus</v-icon>
      </v-btn>
      <v-btn v-if="USER_ROLE === 'ADMIN'" @click="$router.push('/information_village')" icon>
        <v-icon>mdi-book-plus</v-icon>
      </v-btn>

      <v-btn v-if="USER_ROLE === 'ADMIN'" @click="$router.push('/province')" icon>

        <v-icon>mdi-home-group-plus</v-icon>
      </v-btn>

      <v-btn v-if="USER_ROLE === 'ADMIN'" @click="$router.push('/input_news')" icon>

        <v-icon>mdi-newspaper-plus</v-icon>
      </v-btn>
 
      <v-spacer />

      <v-btn @click="$router.push('/homepage')" icon>
        <v-icon>mdi-database-marker</v-icon>
      </v-btn>


      <v-btn v-if="USER_ROLE === 'ADMIN'" @click="$router.push('/customer')" icon>
        <v-icon>mdi-home-city</v-icon>
      </v-btn>
      <v-spacer />
      <v-btn v-if="USER_ROLE === 'ADMIN'" @click="$router.push('/delete')" icon>
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      USER_ROLE: '',
      drawer: false,
      language: 'en',


    }
  },
  computed: {
    menuItems() {
      return [
        { title: this.language === 'la' ? 'ບ້ານ' : 'Home', path: '/home' },
        // { title: this.language === 'la' ? 'ຂ່າວ & ເຫດການ' : 'News & Events',  },
        { title: this.language === 'la' ? 'ຂ່າວ' : 'News', path: '/new' },
        { title: this.language === 'la' ? 'ຮູບພາບ' : 'Photo', path: '/gallery' },
        { title: this.language === 'la' ? 'ແບບຢ່າງ VFMP' : 'VFMP Models', path: '/vfmpmodels_get' },
        // { title: this.language === 'la' ? 'ຂໍ້ມູນ' : 'Information',   },
        { title: this.language === 'la' ? 'ຫຼວງພຣະບາງ' : 'LPB', path: '/LPB' },
        { title: this.language === 'la' ? 'ໄຊຍະບູລີ' : 'XBL', path: '/XBL' },
        // { title: this.language === 'la' ? 'ກ່ຽວກັບ VFMP' : 'About VFMP',  },
        { title: this.language === 'la' ? 'ປ່າໄມ້' : 'Forest', path: '/forest' },
        { title: this.language === 'la' ? 'ລິ້ງ' : 'Link', path: '/Links' },
        { title: this.language === 'la' ? 'ຕິດຕໍ່ພວກເຮົາ' : 'Contact Us', path: '/contact' },



        { title: this.language === 'la' ? 'ອອກ' : 'Exit', icon: 'mdi-logout', path: '/goToLogin' },

      ];
    },
    homeLabel() {
      return this.language === 'la' ? 'ບ້ານ' : 'Home';
    },
    newsEventsLabel() {
      return this.language === 'la' ? 'ຂ່າວ & ເຫດການ' : 'News & Events';
    },
    newsLabel() {
      return this.language === 'la' ? 'ຂ່າວ' : 'News';
    },
    photoLabel() {
      return this.language === 'la' ? 'ຮູບພາບ' : 'Photo';
    },
    vfmpModelsLabel() {
      return this.language === 'la' ? 'ແບບຢ່າງ VFMP' : 'VFMP Models';
    },
    infoLabel() {
      return this.language === 'la' ? 'ຂໍ້ມູນ' : 'Information';
    },
    lpbLabel() {
      return this.language === 'la' ? 'ຫຼວງພຣະບາງ' : 'LPB';
    },
    xblLabel() {
      return this.language === 'la' ? 'ໄຊຍະບູລີ' : 'XBL';
    },
    aboutLabel() {
      return this.language === 'la' ? 'ກ່ຽວກັບ VFMP' : 'About VFMP';
    },
    forestLabel() {
      return this.language === 'la' ? 'ປ່າໄມ້' : 'Forest';
    },
    linkLabel() {
      return this.language === 'la' ? 'ລິ້ງ' : 'Link';
    },
    contactLabel() {
      return this.language === 'la' ? 'ຕິດຕໍ່ພວກເຮົາ' : 'Contact Us';
    },

    menuLabel() {
      return this.language === 'la' ? 'ເມນູ' : 'Menu';
    },

  }
  ,
  mounted() {
    this.USER_ROLE = localStorage.getItem('USER_ROLE');


  },
  methods: {
    navigateTo(item) {
      this.$router.push(item.path);
      this.drawer = false;
    },
    goToLogin() {
      this.$router.push('/login');
    },
    changeLanguage(lang) {
      this.language = lang;
    },

  }
}
</script>

<style scoped>
.v-app-bar {
  border-bottom: 1px solid #eee;
}
</style>
