<template>
  <v-app dark>
    <!-- menu ຄ້າງຊ້າຍ -->
    <v-navigation-drawer app v-model="drawerOpen" :permanent="drawerPermanent" :width="drawerWidth">
      <!-- Content for the navigation drawer -->
      <div class="d-flex justify-center mt-5 mb-10" style="height: 15%;">
        <v-btn class="mx-2 mt-10" fab dark small color="primary" @click="onGoTo">
          <img src="../assets/images/VFMPP.png" width="150" />
        </v-btn>
      </div>

      <!-- Menu items -->
      <v-list dense style="height: 20%;">
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

      <v-list dense style="height: 20%;">
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
          <v-list-item to="XBLmap" color="#F9944A">
            <v-list-item-icon>
              <v-icon size="34" style="color: #009f62">mdi-folder-download</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <span class="large-font">Backup</span>
            </v-list-item-content>
          </v-list-item>
        </v-card>

        <!-- Add more menu items here as needed -->

      </v-list>

      <v-list dense v-if="USER_ROLE && USER_ROLE === 'ADMIN'">
        <v-card class="mt-3 mb-3 mr-3 ml-3">
          <v-list-item to="customer" color="#F9944A">
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
              <span class="large-font">account</span>
            </v-list-item-content>
          </v-list-item>
        </v-card>

        <!-- Add more menu items here as needed -->
      </v-list>

      <v-divider></v-divider>

      <v-card class="mt-5 mb-3 mr-3 ml-3">
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

    <!-- menu ຄ້າງຊ້າຍ -->
    <!-- menu ພື້ນຖານລັງ -->
    <v-app-bar fixed app color="#008000" height="90">
      <v-dialog v-model="loading_processing" persistent width="55">
        <v-card width="55" height="105" class="pt-3 pl-3">
          <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
        </v-card>
      </v-dialog>

      <div style="margin-right: 40px;">
        <v-btn fab dark small color="#00bfff" @click="toggleDrawer">
          <v-icon color="white">{{ drawerOpen ? 'mdi-chevron-left' : 'mdi-chevron-right' }}</v-icon>
        </v-btn>
      </div>


      <v-list-item to="home" color="#ffffff">
        <v-list-item-icon>
          <v-icon size="34" style="color: #ffffff">mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <span style="color: #ffffff" class="large-font">Home</span>
        </v-list-item-content>
      </v-list-item>



      <v-list-item to="province" color="#ffffff">
        <v-list-item-icon>
          <v-icon size="34" style="color: #ffffff">mdi-newspaper</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <span style="color: #ffffff" class="large-font">News & Events</span>
        </v-list-item-content>
      </v-list-item>


      <v-menu style="width: 190px;" v-if="USER_ROLE !== 'FINANCE'" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="#ffffff" v-bind="attrs" v-on="on" text class="ml-2" elevation="0">
            <!-- <v-icon color="#ffffff" size="18">mdi-hammer-wrench</v-icon> -->
            VFM Models
            <v-icon color="#ffffff">mdi-chevron-down-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-btn color="white" to="vfmmodels" elevation="0" block><span class="black--text">Models
              1</span><v-spacer></v-spacer></v-btn>

          <v-btn color="white" to="insert _gas" elevation="0" block><span class="black--text">Models
              2</span><v-spacer></v-spacer></v-btn>

          <v-btn color="white" to="insert _gas" elevation="0" block><span class="black--text">Models
              3</span><v-spacer></v-spacer></v-btn>
          <v-btn color="white" to="insert _gas" elevation="0" block><span class="black--text">Models
              4</span><v-spacer></v-spacer></v-btn>
          <v-btn color="white" to="insert _gas" elevation="0" block><span class="black--text">Models
              5</span><v-spacer></v-spacer></v-btn>
          <v-btn color="white" to="insert _gas" elevation="0" block><span class="black--text">Models
              6</span><v-spacer></v-spacer></v-btn>
          <v-btn color="white" to="insert _gas" elevation="0" block><span class="black--text">Models
              7</span><v-spacer></v-spacer></v-btn>
          <!-- Gas -->
        </v-list>
      </v-menu>


      <v-menu style="width: 190px;" v-if="USER_ROLE !== 'FINANCE'" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="#ffffff" v-bind="attrs" v-on="on" text class="ml-2" elevation="0">
            <v-icon color="#ffffff" size="18">mdi-database</v-icon>
            Information
            <v-icon color="#ffffff">mdi-chevron-down-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-btn color="white" to="Lpb" elevation="0" block><span
              class="black--text">Luangprabang Province</span><v-spacer></v-spacer></v-btn>

          <v-btn color="white" to="insert _gas" elevation="0" block><span
              class="black--text">Xaignabouli</span><v-spacer></v-spacer></v-btn>

          <!-- Gas -->
        </v-list>
      </v-menu>

      <v-menu style="width: 190px;" v-if="USER_ROLE !== 'FINANCE'" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="#ffffff" v-bind="attrs" v-on="on" text class="ml-2" elevation="0">
            <!-- <v-icon color="#ffffff" size="18">mdi-hammer-wrench</v-icon> -->
            About VFMP
            <v-icon color="#ffffff">mdi-chevron-down-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-btn color="white" to="customer" elevation="0" block><span
              class="black--text">Forest and Land Use</span><v-spacer></v-spacer>
            </v-btn>

          <v-btn color="white" to="insert _gas" elevation="0" block><span
              class="black--text">Area XBL</span><v-spacer></v-spacer></v-btn>
              <v-btn color="white" to="insert _gas" elevation="0" block><span
              class="black--text">Area LPB</span><v-spacer></v-spacer></v-btn>

          <!-- Gas -->
        </v-list>
      </v-menu>


      <v-list-item to="Links" color="#F9944A">
        <v-list-item-icon>
          <v-icon size="34" style="color: #ffffff">mdi mdi-link-box</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <span style="color: #ffffff" class="large-font">Links</span>
        </v-list-item-content>
      </v-list-item>



      <v-list-item to="loctin" color="#F9944A">
        <v-list-item-icon>
          <v-icon size="34" style="color: #ffffff">mdi mdi-card-account-mail</v-icon>
        </v-list-item-icon>

        <v-list-item-content  >
          <span style="color: #ffffff" class="large-font">Contact Us</span>
        </v-list-item-content>
      </v-list-item>


      <v-list-item to="province" color="#BA3742">
        <v-list-item-icon>
          <v-icon size="34" style="color: #BA3742">mdi-folder-account</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <span class="large-font">LAOS</span>
        </v-list-item-content>
      </v-list-item>

      <v-list-item to="province" color="#3742BA">
        <v-list-item-icon>
          <v-icon size="34" style="color: #3742BA">mdi-folder-account</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <span class="large-font">ENGLISH</span>
        </v-list-item-content>
      </v-list-item>
      <!-- <v-menu style="width: 190px;" v-if="USER_ROLE !== 'FINANCE'" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="#ffffff" v-bind="attrs" v-on="on" text class="ml-2" elevation="0">
            <v-icon color="#ffffff" size="18">mdi-hammer-wrench</v-icon>
            Login
            <v-icon color="#ffffff">mdi-chevron-down-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-btn color="white" to="customer" elevation="0" block><span
              class="black--text">ເພີ່ມລູກຄ້າ</span><v-spacer></v-spacer></v-btn>

          <v-btn color="white" to="insert _gas" elevation="0" block><span
              class="black--text">ເພີ່ມສະຖານີປໍານໍ້າມັນ</span><v-spacer></v-spacer></v-btn>
        </v-list>
      </v-menu> -->


      <!-- Second button on the right corner -->
      <!-- <v-btn rounded @click="onLogOut" text elevation="0" class="mr-2">
        <v-icon color="white">mdi-logout</v-icon>
      </v-btn> -->
    </v-app-bar>


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
import swal from 'sweetalert2'

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
      drawerOpen: true, // Initially set drawer to open
      drawerPermanent: false, // Set to false to make drawer collapsible
      drawerWidth: 200, // Width of the drawer
      loading_processing: false,
    }
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
    onPrint() {
      window.print()
    },
    onGoTo() {
      this.$router.push('/homepage')
    },
    onLogOut() {
      localStorage.clear()
      this.$router.push('/')
    },
    toggleDrawer() {
      this.drawerOpen = !this.drawerOpen;
    },
    togglePermanent() {
      this.drawerPermanent = !this.drawerPermanent;
    },
  },
}
</script>

<style lang="
