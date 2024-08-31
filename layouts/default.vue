<template>
  <v-app dark>
    <!-- menu ຄ້າງຊ້າຍ -->
    <v-navigation-drawer app v-model="drawerOpen" :permanent="drawerPermanent" :width="drawerWidth"
      v-if="USER_ROLE || USER_ROLE === 'ADMIN'">
      <!-- Content for the navigation drawer -->
      <div class="d-flex justify-center mt-5 mb-10" style="height: 15%;">
        <v-btn class="mx-2 mt-10" fab dark small color="primary" @click="onGoTo">
          <img src="../assets/images/VFMPP.png" width="150" />
        </v-btn>
      </div>

      <!-- Menu items -->
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
      <!-- <v-list dense style="height: 10%;">
        <v-card class="mt-5 mb-3 mr-3 ml-3">
          <v-list-item to="lome" color="#F9944A">
            <v-list-item-icon>
              <v-icon size="34" style="color: #06418e">mdi-database-marker</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <span class="large-font"> lome</span>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-list> -->
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

      <!-- <v-list dense style="height: 10%;">
        <v-card class="mt-5 mb-3 mr-3 ml-3">
          <v-list-item to="addgallery" color="#F9944A">
            <v-list-item-icon>
              <v-icon size="34" style="color: #06418e">mdi-folder-image</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <span class="large-font"> Image</span>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-list> -->

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

        <!-- <v-card class="mt-3 mb-3 mr-3 ml-3">
          <v-list-item to="customer" color="#F9944A">
            <v-list-item-icon>
              <v-icon size="34" style="color: #009f62">mdi-folder-download</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <span class="large-font">Backup</span>
            </v-list-item-content>
          </v-list-item>
        </v-card> -->

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
        <!-- Add more menu items here as needed -->

      </v-list>

      <v-list dense v-if="USER_ROLE && USER_ROLE === 'ADMIN'">
        <v-card class="mt-3 mb-3 mr-3 ml-3">
          <!-- <v-list-item to="customer" color="#F9944A"> -->
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

        <!-- Add more menu items here as needed -->
      </v-list>

      <v-divider></v-divider>
      <v-btn style="width: 200px;margin-left: 2px;height: 200px;" @click="goToLink">
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

    <!-- menu ຄ້າງຊ້າຍ -->
    <!-- menu ພື້ນຖານລັງ -->
    <v-app-bar fixed app color="#008000" height="90">
      <v-dialog v-model="loading_processing" persistent width="55">
        <v-card width="55" height="105" class="pt-3 pl-3">
          <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
        </v-card>
      </v-dialog>

      <div style="margin-right: 40px;" v-if="USER_ROLE || USER_ROLE === 'ADMIN'">
        <v-btn style="background-color: #c6243d;" fab dark small color="#00bfff" @click="toggleDrawer">
          <v-icon color="white">{{ drawerOpen ? 'mdi-chevron-left' : 'mdi-chevron-right' }}</v-icon>
        </v-btn>
      </div>


      <v-list-item to="home" color="#ffffff">
        <v-list-item-icon>
          <v-icon size="34" style="color: #ffffff">mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-content v-if="currentLanguage === 'en'">
          <span style="color: #ffffff" class="large-font">Home</span>
        </v-list-item-content>
        <v-list-item-content v-else>
          <span style="color: #ffffff" class="large-font">ໜ້າຫຼັກ</span>
        </v-list-item-content>
      </v-list-item>



      <!-- <v-list-item to="province" color="#ffffff">
        <v-list-item-icon>
          <v-icon size="34" style="color: #ffffff">mdi-newspaper</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <span style="color: #ffffff" class="large-font">News & Events</span>
        </v-list-item-content>
      </v-list-item> -->

      <v-menu style="width: 190px;" v-if="USER_ROLE !== 'FINANCE' && currentLanguage === 'en'" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="#ffffff" v-bind="attrs" v-on="on" text class="ml-2" elevation="0">
            <v-list-item-icon>
              <v-icon size="34" style="color: #ffffff">mdi-newspaper</v-icon>
            </v-list-item-icon>
            <!-- <v-icon color="#ffffff" size="18">mdi-hammer-wrench</v-icon> -->
            News & Events
            <v-icon color="#ffffff">mdi-chevron-down-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-btn color="white" to="new" elevation="0" block><span class="black--text">News &
              Events</span><v-spacer></v-spacer></v-btn>

          <v-btn color="white" to="gallery" elevation="0" block><span class="black--text">
              Gallery photo </span><v-spacer></v-spacer>
            <v-icon color="#38761d">mdi-folder-image</v-icon></v-btn>
          <!-- Gas -->
        </v-list>
      </v-menu>

      <v-menu style="width: 190px;" v-if="USER_ROLE !== 'FINANCE' && currentLanguage === 'la'" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="#ffffff" v-bind="attrs" v-on="on" text class="ml-2" elevation="0">
            <v-list-item-icon>
              <v-icon size="34" style="color: #ffffff">mdi-newspaper</v-icon>
            </v-list-item-icon>
            <!-- <v-icon color="#ffffff" size="18">mdi-hammer-wrench</v-icon> -->
            ຂ່າວ & ເຫດການ
            <v-icon color="#ffffff">mdi-chevron-down-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-btn color="white" to="new" elevation="0" block><span class="black--text">ຂ່າວ &
              ເຫດການ</span><v-spacer></v-spacer></v-btn>

          <v-btn color="white" to="gallery" elevation="0" block><span class="black--text">
              ຄັງຮູບ </span><v-spacer></v-spacer>
            <v-icon color="#38761d">mdi-folder-image</v-icon></v-btn>
          <!-- Gas -->
        </v-list>
      </v-menu>
      <!-- <v-menu style="width: 190px;" v-if="USER_ROLE !== 'FINANCE'" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="#ffffff" v-bind="attrs" v-on="on" text class="ml-2" elevation="0">
    
            VFM Models
            <v-icon color="#ffffff">mdi-chevron-down-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-btn color="white" to="vfmpmodels_get" elevation="0" block><span class="black--text">Models
            vfmpmodels</span><v-spacer></v-spacer></v-btn>
        </v-list>
      </v-menu> -->

      <v-list-item v-if="currentLanguage === 'en'" to="vfmpmodels_get" color="#ffffff">
        <v-list-item-icon>
          <v-icon size="34" style="color: #ffffff">mdi-file-document</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <span style="color: #ffffff" class="large-font">VFMP Models</span>
        </v-list-item-content>
      </v-list-item>

      <v-list-item v-else to="vfmpmodels_get" color="#ffffff">
        <v-list-item-icon>
          <v-icon size="34" style="color: #ffffff">mdi-file-document</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <span style="color: #ffffff" class="large-font">ຮູບເເບບປ່າໄມ້ບ້ານ</span>
        </v-list-item-content>
      </v-list-item>


      <v-menu style="width: 190px;" v-if="USER_ROLE !== 'FINANCE' && currentLanguage === 'en'" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="#ffffff" v-bind="attrs" v-on="on" text class="ml-2" elevation="0">
            <v-icon color="#ffffff" size="18">mdi-database</v-icon>
            Information
            <v-icon color="#ffffff">mdi-chevron-down-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-btn color="white" to="LPB" elevation="0" block><span class="black--text">Luangprabang
              Province</span><v-spacer></v-spacer></v-btn>

          <v-btn color="white" to="XBL" elevation="0" block><span
              class="black--text">Xaignabouli</span><v-spacer></v-spacer></v-btn>

          <!-- Gas -->
        </v-list>
      </v-menu>

      <v-menu style="width: 190px;" v-if="USER_ROLE !== 'FINANCE' && currentLanguage === 'la'" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="#ffffff" v-bind="attrs" v-on="on" text class="ml-2" elevation="0">
            <v-icon color="#ffffff" size="18">mdi-database</v-icon>
            ຄັງຂໍ້ມູນ
            <v-icon color="#ffffff">mdi-chevron-down-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-btn color="white" to="LPB" elevation="0" block><span class="black--text">
              ຄັງຂໍ້ມູນ ຫຼວງພະບາງ</span><v-spacer></v-spacer></v-btn>

          <v-btn color="white" to="XBL" elevation="0" block><span class="black--text">ຄັງຂໍ້ມູນ
              ໄຊຍະບູລີ</span><v-spacer></v-spacer></v-btn>

          <!-- Gas -->
        </v-list>
      </v-menu>

      <v-menu style="width: 190px;" v-if="USER_ROLE !== 'FINANCE' && currentLanguage === 'en'" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="#ffffff" v-bind="attrs" v-on="on" text class="ml-2" elevation="0">
            <v-list-item-icon>
              <v-icon size="34" style="color: #ffffff">mdi-hammer-wrench</v-icon>
            </v-list-item-icon>
            About VFMP
            <v-icon color="#ffffff">mdi-chevron-down-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-btn color="white" to="forest" elevation="0" block><span class="black--text">Forest and Land
              Use</span></v-btn>
          <v-btn color="white" to="XBL" elevation="0" block><span class="black--text">Area XBL</span></v-btn>
          <v-btn color="white" to="LPB" elevation="0" block><span class="black--text">Area LPB</span></v-btn>
        </v-list>
      </v-menu>

      <v-menu style="width: 190px;" v-if="USER_ROLE !== 'FINANCE' && currentLanguage === 'la'" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="#ffffff" v-bind="attrs" v-on="on" text class="ml-2" elevation="0">
            <v-list-item-icon>
              <v-icon size="34" style="color: #ffffff">mdi-hammer-wrench</v-icon>
            </v-list-item-icon>
            ກ່ຽວກັບໂຄງການ
            <v-icon color="#ffffff">mdi-chevron-down-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-btn color="white" to="forest" elevation="0" block><span
              class="black--text">ການ​ນໍາ​ໃຊ້​ທີ່​ດິນ​ແລະ​ປ່າ​ໄມ້​</span></v-btn>
          <v-btn color="white" to="XBL" elevation="0" block><span class="black--text"> ໄຊຍະບູລີ</span></v-btn>
          <v-btn color="white" to="LPB" elevation="0" block><span class="black--text">ຫຼວງພະບາງ</span></v-btn>
        </v-list>
      </v-menu>


      <v-list-item to="Links" color="#F9944A">
        <v-list-item-icon>
          <v-icon size="34" style="color: #ffffff">mdi mdi-link-box</v-icon>
        </v-list-item-icon>
        <v-list-item-content v-if="currentLanguage === 'en'">
          <span style="color: #ffffff" class="large-font">Links</span>
        </v-list-item-content>

        <v-list-item-content v-else>
          <span style="color: #ffffff" class="large-font">ລິ້ງເຊື່ອມຕໍ່</span>
        </v-list-item-content>
      </v-list-item>
      <v-list-item to="contact" color="#ffffff">
        <v-list-item-icon>
          <v-icon size="34" style="color: #ffffff">mdi-card-account-mail</v-icon>
        </v-list-item-icon>
        <v-list-item-content v-if="currentLanguage === 'en'">
          <span style="color: #ffffff" class="large-font">Contact Us</span>
        </v-list-item-content>
        <v-list-item-content v-else>
          <span style="color: #ffffff" class="large-font">ຕີດຕໍ່ເຮົາ</span>
        </v-list-item-content>
      </v-list-item>



      <v-btn style="width: 20px;margin-right: 2px;" @click="changeToLao">
        <img src="../assets/images/Laos.png" width="50px" />
      </v-btn>

      <v-btn style="width: 20px;margin-left: 2px;" @click="changeToEnglish">
        <img src="../assets/images/English.png" width="50px" />
      </v-btn>

      <v-card v-if="!hasUserRole" style="margin-left: 5px;">
        <v-list-item @click="onLogOut" color="#F9944A">
          <v-list-item-content @click="onLogOut" color="#F9944A">
            <v-icon size="24">mdi-logout</v-icon>
            <span class="large-font">Logout</span>
          </v-list-item-content>
        </v-list-item>
      </v-card>

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
      drawerWidth: 200, // Width of the drawer
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

<style lang="
