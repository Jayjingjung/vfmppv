<template>
  <v-app dark>
    <!-- menu ຄ້າງຊ້າຍ -->
    <v-navigation-drawer app permanent width="200">
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
              <v-icon size="34">mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <span class="large-font"> Home</span>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-list>
        
        <v-card style="margin-top: -90px;margin-bottom: 20px;" class=" mr-3 ml-3">
          <v-list-item to="create-invoice" color="#F9944A">
            <v-list-item-icon>
              <v-icon size="34" style="color: #06418e">mdi-database-marker</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <span class="large-font">Date</span>
            </v-list-item-content>
          </v-list-item>
        </v-card>

      <v-list dense style="height: 20%;" v-if="USER_ROLE && USER_ROLE === 'ADMIN'">

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
          <v-list-item to="create" color="#F9944A">
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
    <v-app-bar fixed app color="#F9944A" height="100">
      <v-dialog v-model="loading_processing" persistent width="55">
        <v-card width="55" height="105" class="pt-3 pl-3">
          <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
        </v-card>
      </v-dialog>
      <v-spacer />
      <v-btn rounded @click="onLogOut" text elevation="0">
        <v-icon color="white">mdi-logout</v-icon>
      </v-btn>
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


  },
}
</script>
<style lang="scss">
.cont {
  // padding-left: 70px;
  // padding-right: 85px;
  padding-top: 0px
}

.large-font {
  font-size: 15px;
  font-weight: bold;
}
</style>
