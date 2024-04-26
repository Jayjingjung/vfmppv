<template>
  <div>

    <v-card>
      <v-card-title style="border-bottom:0.5px solid #e0e0e0;background-color:#fd9220;color:white">
        ຂໍ້ມູນການລາດຕະເວດ
        <div style="width:300px; border-radius: 25px; height: 40px;" class="d-flex align-center pl-2 pt-2 ml-10">
          <v-text-field placeholder="ຄົ້ນຫາ..." v-model="search" rounded background-color="#ffffff"
            prepend-inner-icon="mdi-magnify"></v-text-field>
        </div>
      </v-card-title>

      <v-card-text>
        <div style="width: 100%; display:flex;justify-content:start">
          <v-row class="mt-1">
            <v-col clos="1" md="10" sm="10">
              <v-autocomplete outlined dense label="ເລືອກເເຂວງ"  item-text="batNo"
                item-value="keyId" background-color="#f5f5f5" 
                ></v-autocomplete>
            </v-col>
          </v-row>

          <v-row class="mt-1">
            <v-col clos="1" md="10" sm="10">
              <v-autocomplete outlined dense label="ເລືອກເມື່ອງ"  item-text="batNo"
                item-value="keyId" background-color="#f5f5f5" 
                ></v-autocomplete>
            </v-col>
          </v-row>

          <v-row class="mt-1">
            <v-col clos="1" md="10" sm="10">
              <v-autocomplete outlined dense label="ເລືອກບ້ານ"  item-text="batNo"
                item-value="keyId" background-color="#f5f5f5" 
                ></v-autocomplete>
            </v-col>
          </v-row>
          <div class="d-flex align-center mt-4">
            <v-menu ref="start_menu" v-model="start_menu" :close-on-content-click="false"
              :return-value.sync="start_date" transition="scale-transition" offset-y min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field dense outlined v-model="start_date" required label="ວັນທີເລີ່ມຕົ້ນ"
                  append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="start_date" no-title scrollable @input="$refs.start_menu.save(start_date)">
                <v-spacer></v-spacer>
              </v-date-picker>
            </v-menu>
          </div>
          <div class="d-flex align-center pl-2 mt-4">
            <v-menu ref="end_menu" v-model="end_menu" :close-on-content-click="false" :return-value.sync="end_date"
              transition="scale-transition" offset-y min-width="auto">

              <template v-slot:activator="{ on, attrs }">
                <v-text-field dense outlined v-model="end_date" required label="ວັນທີສຸດທ້າຍ" append-icon="mdi-calendar"
                  readonly v-bind="attrs" v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="end_date" no-title scrollable @input="$refs.end_menu.save(end_date)">
                <v-spacer></v-spacer>
              </v-date-picker>
            </v-menu>
          </div>
          <div class="ml-3 pt-1 mr-5 mt-4">
            <v-btn color="#90A4AE" class="white--text" elevation="0" @click="() => { onSearchLeaveCarReport(); }">
              <v-icon>mdi-magnify</v-icon> ຄົ້ນຫາ
            </v-btn>
          </div>
        </div>

        <!-- Radio button -->

      </v-card-text>

      <v-card-actions>
        <!-- Example: Display a table with the fetched data -->
        <v-data-table :headers="report_leave_car_header" :items="report_leave_car_list" :search="search"></v-data-table>
      </v-card-actions>
    </v-card>

  </div>
</template>

<script>
import swal from 'sweetalert2'
import axios from 'axios'
import moment from 'moment'
export default {
  data() {
    return {
      moment: moment,
      ex7: 'red',
      sumFooter: null,
      // carPayTotal: null,
      // totalRow: null,
      active: '',
      showAlert: false,
      loading_processing: false,
      end_menu: false,
      end_date: null,
      start_menu: false,
      start_date: null,
      status: 'A',

      // totalPriceNm:priceNamMun*sainummun,
      report_leave_car_header: [
        { text: 'ເລກບິນ', value: 'lahud_POYLOD' },
        { text: 'ທະບຽນຫົວ', value: 'h_VICIVLE_NUMBER' },
        { text: 'ທະບຽນຫາງ', value: 'f_CARD_NO' },
      ],
      report_leave_car_list: [],
      selected: '',
      search: '',
      successList: 0,
      waitingList: 0,
      sumTotalPrice: '',

    }
  },
  mounted() {
    this.onSearchLeaveCarReport()
  },
  methods: {

    onCheckAlert() {
      this.report_leave_car_list.map((list) => {
        if (list?.totalDay >= '7' && list?.status === 'N') {
          this.showAlert = true
          return
        } else {
          this.showAlert = false
          return
        }
      })
    },

    async fetchDataFromApi() {
      try {
        this.loading_processing = true;

        // Get the Bearer token from local storage
        const token = localStorage.getItem('TOKEN');

        // Check if the token exists
        if (!token) {
          // Handle the case where the token is not available (e.g., redirect to login)
          console.error('Bearer token is missing.');
          return;
        }

        const response = await this.$axios.$get('/parollingReport/gets', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: data, // Include your data as params
                });

        if (response.data.status === '00') {
          // Assuming the response data contains a property named 'data'
          this.report_leave_car_list = response.data.data;
        } else {
          swal.fire({
            icon: 'error',
            text: response.data.message,
          });
        }
      } catch (error) {
        swal.fire({
          icon: 'error',
          text: error.message,
        });
        console.error(error);
      } finally {
        this.loading_processing = false;
      }
    },


    onSearcReport() {

      this.loading_processing = true;
      try {
        let data = {
          startDate: this.start_date,
          endDate: this.end_date,
          status: 0
        }
        // this.$axios.$post('/ReportStaff.service', data).then((data) => {
        this.$axios.$post('/ReportGiveCarAll', data).then((data) => {
          console.log("staft:", data)
          if (data?.status === '00') {
            this.staft_data_list = data?.data;

            this.sumFooters = data?.sumFooter
            console.log("new data footer:", this.sumFooters)

            this.loading_processing = false
          } else {
            this.loading_processing = false
            swal.fire({
              icon: 'error',
              text: data?.message
            })
          }
        })
      } catch (error) {
        this.loading_processing = false
        swal.fire({
          icon: 'error',
          text: error
        })
        console.log(error)
      }
    },
    onSearchLeaveCarReport() {
      try {
        this.loading_processing = true;
        this.successList = 0
        this.waitingList = 0
        let data = {
          startDate: this.start_date,
          endDate: this.end_date,
          status: this.status
        }

      } catch (error) {
        this.loading_processing = false
        swal.fire({
          icon: 'error',
          text: error
        })
        console.log(error)
      }
    },
    mounted() {
      this.onSearchLeaveCarReport();
      this.fetchDataFromApi();
    },
  }

}
</script>

<style>
#rcorners2 {
  border-radius: 25px;
  border: 2px solid #73AD21;
  padding: 20px;
  width: 200px;
  height: 150px;
}
</style>