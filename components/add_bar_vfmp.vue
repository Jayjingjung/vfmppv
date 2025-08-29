



<template>
    <v-app dark>
      <!-- menu ຄ້າງຊ້າຍ -->
      <v-navigation-drawer app v-model="drawerOpen" :permanent="drawerPermanent" :width="drawerWidth"
        v-if="USER_ROLE || USER_ROLE === 'ADMIN'">
        <div class="d-flex justify-center mt-5 mb-10" style="height: 15%;">
          <v-btn class="mx-2 mt-10" fab dark small color="primary" @click="onGoTo">
            <img src="../assets/images/VFMPP.png" width="150" />
          </v-btn>
        </div>
  
        <v-list dense style="height: 5%;">
          <v-card class="mt-5 mb-3 mr-3 ml-3">
            <v-list-item to="homepage" color="#F9944A">
              <v-list-item-icon>
                <v-icon size="34" style="color: #06418e">mdi-database-marker</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <span class="large-font"> Date</span>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-list>
      
        <v-list dense style="height: 10%;">
          <v-list dense v-if="USER_ROLE && USER_ROLE === 'ADMIN'">
  
            <v-card class="mt-5 mb-3 mr-3 ml-3">
              <v-list-item to="information_village" color="#F9944A">
                <v-list-item-icon>
                  <v-icon size="34" style="color: #06418e">mdi-folder-information</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <span class="large-font"> Information_village</span>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-list>
        </v-list>
  
      
  
        <v-list dense v-if="USER_ROLE && USER_ROLE === 'ADMIN'">
          <v-divider></v-divider>
  
          <v-card class="mt-3 mb-3 mr-3 ml-3">
            <v-list-item to="delete" color="#F9944A">
              <v-list-item-icon>
                <v-icon size="34" style="color: #c6243d">mdi-database-minus</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <span class="large-font">Delete</span>
              </v-list-item-content>
            </v-list-item>
          </v-card>
  
     
          <v-card class="mt-3 mb-3 mr-3 ml-3">
            <v-list-item to="customer" color="#F9944A">
              <v-list-item-icon>
                <v-icon size="34" style="color: #009f62">mdi-account-settings</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <span class="large-font">User</span>
              </v-list-item-content>
            </v-list-item>
          </v-card>
  
        </v-list>
  
        <v-list dense v-if="USER_ROLE && USER_ROLE === 'ADMIN'">
          <v-card class="mt-3 mb-3 mr-3 ml-3">
            <v-list-item to="add_customer" color="#F9944A">
  
              <v-list-item-icon>
                <v-icon size="34" style="color: #009f62">mdi-account-plus</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <span class="large-font"> Employee</span>
              </v-list-item-content>
            </v-list-item>
          </v-card>
  
          <v-card class="mt-3 mb-3 mr-3 ml-3">
            <v-list-item to="province" color="#F9944A">
              <v-list-item-icon>
                <v-icon size="34" style="color: #009f62">mdi-folder-account</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <span class="large-font">P_D_V</span>
              </v-list-item-content>
            </v-list-item>
          </v-card>
  
        </v-list>
  
        <v-divider></v-divider>
        <v-btn style="width: 210px;margin-left: 2px;height: 210px;" @click="goToLink">
          <img src="../assets/images/VFMPPLAOAPP.png" width="200px" />
        </v-btn>
        <v-divider></v-divider>
        <v-card class="mt-10 mb-3 mr-3 ml-3">
          <v-list-item @click="onLogOut" color="#F9944A">
            <v-list-item-icon>
              <v-icon size="34">mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <span class="large-font">Logout</span>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-navigation-drawer>
      <add_bar_vfmpp />
      <div class="content  ml-10">
        <v-main class="bg ml-10 pl-10  ml-1 d-flex justify-center align-vertical">
          <div class="content ml-10">
            <div class="ml-10">
              <Nuxt />
            </div>
          </div>
        </v-main>
      </div>
    </v-app>
  </template>
  
  <script>
  
  export default {
    data() {
      return {
        USER_ID: '',
        USER_NAME: '',
        USER_ROLE: '',
        TOTAL: '',
        TOTAL_INVOICE: '',
        TOTAL_FORMANCE: '',
        TOTAL_payStatus: '',
        TOTAL_totalOwe: '',
        TOTAL_notiDetails: '',
        drawerOpen: false, // Initially set drawer to open
        drawerPermanent: false, // Set to false to make drawer collapsible
        drawerWidth: 220, // Width of the drawer
        loading_processing: false,
        currentLanguage: 'en', // Add this line
      }
    },
    computed: {
      hasUserRole() {
        const userRole = localStorage.getItem('USER_ROLE');
        return userRole !== null && userRole !== undefined && userRole !== '';
      },
    },
    mounted() {
      this.USER_ID = localStorage.getItem('USER_ID')
      this.USER_NAME = localStorage.getItem('USER_NAME')
      this.USER_ROLE = localStorage.getItem('USER_ROLE')
  
      if (!this.USER_ROLE) {
        // Perform any necessary actions, such as redirecting to the login page
      }
    },
    methods: {
      goToLink() {
        window.location.href = 'https://play.google.com/store/apps/details?id=com.vfmpp_tracking.app';
      },
      onPrint() {
        window.print()
      },
      onGoTo() {
        this.$router.push('/homepage')
      },
      onLogOut() {
        localStorage.clear()
        this.$router.push('/login')
      },
      toggleDrawer() {
        this.drawerOpen = !this.drawerOpen;
      },
      togglePermanent() {
        this.drawerPermanent = !this.drawerPermanent;
      },
      changeToLao() {
        this.currentLanguage = 'la';
      },
      changeToEnglish() {
        this.currentLanguage = 'en';
      },
    },
  }
  </script>
  
  <style></style>