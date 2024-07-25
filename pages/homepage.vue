<template>
  <div>
    <v-container fluid fill-height>
      <v-row align="center">
        <v-col>
          <v-card-text>
            <div style="width:100%;display:flex;justify-content:start" class="pt-4">

              <div class="col-8">
                <div class="d-flex align-center" style="width:100%">


                  <div style="display: flex;">
                    <div style="width: 200px;margin-left: 5px;margin-right: 5px;">

                      <v-select v-model="province" :items="user_data_list" item-text="provinceLa" item-value="_id"
                        label="ເລືອກ ເເຂວງ" @change="onProvinceChange" outlined></v-select>
                    </div>

                    <div style="width: 200px;margin-left: 5px;margin-right: 5px;">
                      <v-select v-if="user_data_districts.length" v-model="district" :items="user_data_districts"
                        item-text="districtLa" item-value="_id" label="ເລືອກ ເມືອງ" @change="onDistrictChange"
                        outlined></v-select>
                    </div>

                    <div style="width: 200px;margin-left: 5px;margin-right: 5px;">
                      <v-select v-if="user_data_village.length" v-model="village" :items="user_data_village"
                        item-text="villageLa" item-value="_id" label="ເລືອກ ບ້ານ" @change="onVillageChange"
                        outlined></v-select>
                    </div>

                    <v-btn @click="handleFetchData" color="primary" outlined>
                      Fetch Data
                    </v-btn>
                  </div>
                </div>
              </div>

              <div style="display: flex;">
                <div style="width: 250px;" class="d-flex align-center">
                  <v-menu ref="start_menu" v-model="start_menu" :close-on-content-click="false"
                    :return-value.sync="start_date" transition="scale-transition" offset-y min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field dense outlined v-model="start_date" required label="ວັນທີເລີ່ມ"
                        append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="start_date" no-title scrollable @input="$refs.start_menu.save(start_date)">
                      <v-spacer></v-spacer>
                    </v-date-picker>
                  </v-menu>
                </div>
                <div style="width: 250px;" class="d-flex align-center">
                  <v-menu ref="end_menu" v-model="end_menu" :close-on-content-click="false"
                    :return-value.sync="end_date" transition="scale-transition" offset-y min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field dense outlined v-model="end_date" required label="ວັນທີສຸດທ້າຍ"
                        append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="end_date" no-title scrollable @input="$refs.end_menu.save(end_date)">
                      <v-spacer></v-spacer>
                    </v-date-picker>
                  </v-menu>
                </div>
              </div>
            </div>
          </v-card-text>

          <!-- Dropdown for provinceLaList -->
          <!-- Your dropdown element -->





          <!-- Dropdown for distructList -->



          <v-card class="card-shadow mb-6" rounded="lg" v-for="(item, index) in data" :key="item._id"
            :style="{ marginBottom: index !== data.length - 1 ? '20px' : '0' }">
            <v-card-title style="background-color:#F9944A">
              <div style="display:flex;justify-content:space-between;width:100%">
                <v-subheader>ວັນເວລາທີ ເລີມ ລາດຕະເວນ {{ item.startTime }}</v-subheader>
                <!-- Display the endTime here -->
                <v-subheader>ວັນເວລາທີ ຈົບ ລາດຕະເວນ {{ item.endTime }}</v-subheader> <!-- Display the endTime here -->
              </div>
            </v-card-title>
            <v-row>
              <v-col>


                <div class="location-details mr-10 ml-10 mt-10">
                  <v-card style="display: flex; align-items: start;background-color: #f5f5f5;">

                    <v-icon size="34" style="color: #ce2330">mdi-google-maps</v-icon>
                    <div class="mr-3 ml-3 mb-3 mt-3">
                      <v-card class="text-start"
                        style=" border: 1px solid #ccc; border-radius: 5px;width: 100%;margin-bottom: 5px;margin-top: 5px;font-size: 19px;">
                        <div class="text-start  mr-5 ml-5">Province: {{ item.createdByAddress.province }}</div>
                      </v-card>

                      <v-card class="text-start"
                        style=" border: 1px solid #ccc; border-radius: 5px;width: 100%;margin-bottom: 5px;margin-top: 5px;font-size: 17px;">
                        <div class="text-start  mr-5 ml-5">District: {{ item.createdByAddress.district }}</div>
                      </v-card>

                      <v-card class="text-start"
                        style=" border: 1px solid #ccc; border-radius: 5px;width: 100%;margin-bottom: 5px;margin-top: 5px;font-size: 16px;">
                        <div class="text-start  mr-5 ml-5">Village: {{ item.createdByAddress.village }}</div>
                      </v-card>

                      <v-card class="text-start"
                        style=" border: 1px solid #ccc; border-radius: 5px;width: 100%;margin-bottom: 5px;margin-top: 5px;">
                        <div class="text-start  mr-5 ml-5">Village Code: {{ item.createdByAddress.villageCode }}</div>
                      </v-card>
                    </div>

                    <div class="mr-3 ml-3 mb-3 mt-3">
                      <v-card
                        style=" border: 1px solid #ccc; border-radius: 5px;width: 250px;margin-bottom: 5px;margin-top: 5px;">
                        <v-icon size="34" style="color: #ce2330">mdi-road-variant</v-icon>
                        <div class=" mr-5 ml-5" style="font-size: 18px;">ຫົວໜ້າທີມ ລາດຕະເວນ {{
                          item.patrollingTeamLeader }}</div>
                      </v-card>
                      <!-- Display the endTime here -->
                      <v-card
                        style=" border: 1px solid #ccc; border-radius: 5px;width: 250px;margin-bottom: 5px;margin-top: 5px;">
                        <v-icon size="34" style="color: #ce2330">mdi-account</v-icon>
                        <div class=" mr-5 ml-5" style="font-size: 18px;">ຊື່ເສັ້ນທາງ: {{ item.trailName }}
                        </div>
                      </v-card>
                      <!-- Display the endTime here -->
                    </div>
                    <!-- Add other location details as needed -->
                  </v-card>
                </div>

                <div style="display: flex;" class="location-details mr-10 ml-10 mt-10">

                  <div>
                    <v-img :src="item.imageStart" alt="imageStart" class="resized-image"
                      @click="showFullImage(item.imageStart)"></v-img>
                    <v-list-item-title>
                      ຮູບພາມ ລວມທີມ
                    </v-list-item-title>
                  </div>

                  <div>
                    <v-img :src="item.screenShot" alt="screenShot" class="resized-image"
                      @click="showFullImage(item.screenShot)"></v-img>
                    <v-list-item-title>
                      ເສັນທ່າງທີໄດ້ ລາດຕະເວນ
                    </v-list-item-title>
                  </div>

                  <div>
                    <v-img :src="item.imageEnd" alt="ImageEnd" class="resized-image"
                      @click="showFullImage(item.imageEnd)"></v-img>
                    <v-list-item-title>
                      ຮູບພາມ ຈົບການ ລາດຕະເວນ
                    </v-list-item-title>
                    <div class=" mr-5 ml-5" style="font-size: 18px;"> {{ item.comment }}
                    </div>
                  </div>

                  <!-- Display threatened species information -->
                </div>

                <div>
                  <v-list>
                    <v-list-item-group>
                      <v-list-item v-for="(species, speciesIndex) in item.threatenedSpecies" :key="speciesIndex">
                        <v-list-item-content>
                          <v-list-item-title style="font-size: 18px; font-weight: bold; color: #09bcac;"
                            class="location-details mr-10 ml-10 mt-10">
                            Threatened Species: {{ species.category }}
                          </v-list-item-title>
                          <!-- Loop through each category and display corresponding images -->
                          <div
                            style="display: flex; flex-wrap: wrap; justify-content: space-evenly; text-align: center;">
                            <template v-for="(scategoryImages, categoryKey) in scategoryImages">
                              <div :key="categoryKey" v-if="species.category.includes(categoryKey)"
                                style="display: flex; justify-content: center;">

                                <img :src="scategoryImages" style="max-height: 70px; max-width: 70px;" />
                              </div>
                            </template>
                          </div>

                          <!-- Add more conditions for other categories if needed -->

                          <v-list-item-subtitle style="font-size: 18px;">Comment: {{ species.comment
                            }}</v-list-item-subtitle>
                          <v-list-item-subtitle style="font-size: 18px;">Name: {{ species.name
                            }}</v-list-item-subtitle>
                          <v-row>
                            <v-col v-for="(image, imageIndex) in species.images" :key="imageIndex">
                              <v-img :src="image" alt="Species Image" class="resized-image"
                                @click="showFullImage(image)"></v-img>
                            </v-col>
                          </v-row>

                          <div class="location-details">
                            <v-list-item-subtitle style="font-size: 18px;">Lat: {{ species.lat
                              }}</v-list-item-subtitle>
                            <v-list-item-subtitle style="font-size: 18px;">Long: {{ species.long
                              }}</v-list-item-subtitle>
                          </div>

                          <!-- Add other species details as needed -->
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>


                  <!-- Display hunting information -->
                  <v-list>
                    <v-list-item-group>
                      <v-list-item v-for="(hunt, huntIndex) in item.hunting" :key="huntIndex">
                        <v-list-item-content>
                          <!-- Display the hunting category -->
                          <v-list-item-title class="location-details mr-10 mt-10 ml-10"
                            style="color: #d98e25;font-size: 18px;font-weight: bold;">Hunting
                            Category: {{ hunt.category }}</v-list-item-title>

                          <!-- Loop through each category and display corresponding images -->
                          <div
                            style="display: flex; flex-wrap: wrap; justify-content: space-evenly; text-align: center;">
                            <template v-for="(hcategoryImages, categoryKey) in hcategoryImages">
                              <div :key="categoryKey" v-if="hunt.category.includes(categoryKey)"
                                style="display: flex; justify-content: center;">

                                <img :src="hcategoryImages" style="max-height: 70px; max-width: 70px;" />
                              </div>
                            </template>
                          </div>

                          <!-- Add more conditions for other categories if needed -->
                          <v-list-item-subtitle>Comment: {{ hunt.comment }}</v-list-item-subtitle>
                          <!-- Display the hunting images -->
                          <v-row>
                            <v-col v-for="(image, imageIndex) in hunt.images" :key="imageIndex">
                              <v-img :src="image" alt="Hunting Image" class="resized-image"
                                @click="showFullImage(image)"></v-img>
                            </v-col>
                          </v-row>

                          <!-- Display the comment -->

                          <div class="location-details">
                            <!-- Display the longitude -->
                            <v-list-item-subtitle style="font-size: 18px;">Longitude: {{ hunt.long
                              }}</v-list-item-subtitle>

                            <!-- Display the latitude -->
                            <v-list-item-subtitle style="font-size: 18px;">Latitude: {{ hunt.lat
                              }}</v-list-item-subtitle>
                          </div>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                  <v-list-item-group>
                    <v-list-item v-for="(disturbance, index) in item.otherDisturbances" :key="index">
                      <v-list-item-content>
                        <!-- Display the threatened disturbances category -->
                        <v-list-item-title class="location-details mr-10 mt-10 ml-10"
                          style="color: #8d1821;font-size: 18px;font-weight: bold;">Threatened
                          Disturbances: {{ disturbance.category }}</v-list-item-title>

                        <!-- Loop through each category and display corresponding images -->
                        <div style="display: flex; flex-wrap: wrap; justify-content: space-evenly; text-align: center;">
                          <template v-for="(dcategoryImages, categoryKey) in dcategoryImages">
                            <div :key="categoryKey" v-if="disturbance.category.includes(categoryKey)"
                              style="display: flex; justify-content: center;">

                              <img :src="dcategoryImages" style="max-height: 70px; max-width: 70px;" />
                            </div>
                          </template>
                        </div>

                        <!-- Add more conditions for other categories if needed -->
                        <v-list-item-subtitle>Comment: {{ disturbance.comment }}</v-list-item-subtitle>

                        <!-- Display the threatened disturbances images -->
                        <v-row>
                          <v-col v-for="(image, imageIndex) in disturbance.images" :key="imageIndex">
                            <v-img :src="image" alt="Disturbances Image" class="resized-image"
                              @click="showFullImage(image)"></v-img>
                          </v-col>
                        </v-row>

                        <!-- Display the comment -->
                        <div class="location-details">
                          <v-list-item-subtitle style="font-size: 18px;">Long: {{ disturbance.long
                            }}</v-list-item-subtitle>
                          <v-list-item-subtitle style="font-size: 18px;">Lat: {{ disturbance.lat
                            }}</v-list-item-subtitle>
                        </div>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </div>
              </v-col>

            </v-row>

          </v-card>
        </v-col>
      </v-row>
    </v-container>


    <!-- <v-dialog v-model="dialogVisible" max-width="30%" max-height="30%">
      <v-card>
        <v-img :src="fullImageUrl" alt="Full Image"><v-btn style="margin-top: 10px;margin-left: 10px;background-color: #09bcac;color: #f5f5f5;">
            Dowload
          </v-btn></v-img>

      </v-card>
    </v-dialog> -->
    <v-dialog v-model="dialogVisible" max-width="30%" max-height="30%">
            <v-card>
              <v-img :src="fullImageUrl" alt="Full Image">
                <v-btn @click="downloadImage" style="margin-top: 10px; margin-left: 10px; background-color: #09bcac; color: #f5f5f5;">
                  Download
                </v-btn>
              </v-img>
            </v-card>
          </v-dialog>

  </div>
</template>

<script>
import Swal from 'sweetalert2';
import axios from 'axios';

export default {
  data() {
    return {
      data: [],
      dialogVisible: false,
      fullImageUrl: '',
      start_menu: false,
      end_menu: false,
      loading_processing: false,
      villageLa: "",

      user_data_village: [],

      user_data_list: [],
      data: [],
      selectedProvince: null,
      village: "",
      district: "",
      province: "",
      provinceLa: "",
      districtLa: "",
      selectedDistrictId: null, // Initialize selectedDistrictId
      selectedProvinceLa: null,
      selectedVillageLa: null,
      end_date: '',
      districtLaList: [],
      villageLaList: [],
      villageCode: '',
      provinceLaList: [], // This will hold the list of provinces fetched from the API
      user_data_districts: [],
      start_date: '',
      province: null,
      selectedSpecies: null,
      selectedHunting: null,
      item: {}, // Define the 'item' object here
      hcategoryImages: {
        'ພົບສະຖານທີ່ກຽມລ່າ': require('../assets/images/h.png'),
        'ໝາ': require('../assets/images/h2.png'),

        'ປືນ': require('../assets/images/h3.png'),
        'ໜ້າໄມ້': require('../assets/images/h4.png'),
        'ເຫັນແສງໄຟ': require('../assets/images/h5.png'),

        'ພົບເຫັນຊາກທີ່ຖືກຍິງ': require('../assets/images/h6.png'),
        'ແຮ້ວກັບດັກ': require('../assets/images/h7.png'),
        'ເຫັນລູກປືນ': require('../assets/images/h8.png'),
      },
      scategoryImages: {
        'ຍັງມີຊີວິດ': require('../assets/images/s1.png'),
        'ສຽງສັດ': require('../assets/images/s2.png'),

        'ຕາຍແລ້ວ': require('../assets/images/s3.png'),
        'ໃຫ້ອາຫານ': require('../assets/images/s4.png'),
        'ຮັງ': require('../assets/images/s5.png'),

        'ຮອງຮອຍ': require('../assets/images/s6.png'),
        'ຮອຍຂີດຂູດ': require('../assets/images/s7.png'),
        'ຂື້ສັດ': require('../assets/images/s8.png'),
      },
      dcategoryImages: {
        'ຕັດໄມ້': require('../assets/images/d1.png'),
        'ຕັ້ງແຄມ': require('../assets/images/d2.png'),

        'ປຸກສະລຳ': require('../assets/images/d3.png'),
        'ຖາງປ່າ': require('../assets/images/d4.png'),
        'ລ້ຽງສັດ': require('../assets/images/d5.png'),

        'ເຮັດໄຮ່': require('../assets/images/d6.png'),
        'ໄຟປ່າ': require('../assets/images/d7.png'),
        'ຄົນເຂົ້າໄປບຸກລຸກ': require('../assets/images/d8.png'),
      },
    };
  },
  watch: {

  },
  computed: {
    formattedStartDate() {
      if (!this.start_date) return ''; // Return empty string if date is not set
      const dateObj = new Date(this.start_date);
      const day = dateObj.getDate();
      const month = dateObj.getMonth() + 1; // January is 0, so add 1 to get correct month
      const year = dateObj.getFullYear();
      return `${day}/${month}/${year}`;
    },
    formattedEndDate() {
      if (!this.end_date) return ''; // Return empty string if date is not set
      const dateObj = new Date(this.end_date);
      const day = dateObj.getDate();
      const month = dateObj.getMonth() + 1; // January is 0, so add 1 to get correct month
      const year = dateObj.getFullYear();
      return `${day}/${month}/${year}`;
    }
  },

  async mounted() {

    this.onGetprovin();

    // this.selectedDistrictId = ''; // Set to an empty string as an example
  },
  methods: {

    showFullImage(imageUrl, species, hunting) {
      this.fullImageUrl = imageUrl;
      this.selectedSpecies = species;
      this.selectedHunting = hunting;
      this.dialogVisible = true;
    },
    downloadImage() {
      const link = document.createElement('a');
      link.href = this.fullImageUrl;
      link.download = 'image'; // You can modify the name as needed
      link.click();
    },
    closeDialog() {
      this.dialogVisible = false;
    },
    performAction(id) {
      console.log('Performing action for ID:', id);
      // Add your action logic here
    },
    async onGetprovin() {
      try {
        this.loading_processing = true;
        const response = await this.$axios.$get('https://octopus-app-n476x.ondigitalocean.app/provinces');
        this.loading_processing = false;

        if (response?.status === true) {
          this.user_data_list = response.data;
        } else {
          Swal.fire({
            title: 'ແຈ້ງເຕືອນ',
            text: response?.message,
            icon: 'info',
            allowOutsideClick: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          });
        }
      } catch (error) {
        this.loading_processing = false;
        Swal.fire({
          title: 'ແຈ້ງເຕືອນ',
          text: error.message,
          icon: 'error',
          allowOutsideClick: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        });
      }
    },
    async onGetdistricts(provinceId) {
      try {
        this.loading_processing = true;
        const response = await this.$axios.$get(`https://octopus-app-n476x.ondigitalocean.app/districts?provinceId=${provinceId}`);
        this.loading_processing = false;

        if (response?.status === true) {
          this.user_data_districts = response.data;
        } else {
          Swal.fire({
            title: 'ແຈ້ງເຕືອນ',
            text: response?.message,
            icon: 'info',
            allowOutsideClick: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          });
        }
      } catch (error) {
        this.loading_processing = false;
        Swal.fire({
          title: 'ແຈ້ງເຕືອນ',
          text: error.message,
          icon: 'error',
          allowOutsideClick: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        });
      }
    },
    async onGetvillage(districtId) {
      try {
        this.loading_processing = true;
        const response = await this.$axios.$get(`https://octopus-app-n476x.ondigitalocean.app/villages?districtId=${districtId}`);
        this.loading_processing = false;

        if (response?.status === true) {
          this.user_data_village = response.data;
        } else {
          Swal.fire({
            title: 'ແຈ້ງເຕືອນ',
            text: response?.message,
            icon: 'info',
            allowOutsideClick: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          });
        }
      } catch (error) {
        this.loading_processing = false;
        Swal.fire({
          title: 'ແຈ້ງເຕືອນ',
          text: error.message,
          icon: 'error',
          allowOutsideClick: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        });
      }
    },
    async fetchDataFromApi(provinceLa, districtLa, villageLa) {
      try {
        const token = localStorage.getItem('TOKEN');
        if (!token) {
          console.error('Bearer token is missing.');
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Construct the API URL with the available parameters
        let apiUrl = `https://octopus-app-n476x.ondigitalocean.app/parollingReport/gets?startDate=${this.start_date}&endDate=${this.end_date}&villageCode=${this.villageCode}`;
        if (provinceLa) apiUrl += `&province=${provinceLa}`;
        if (districtLa) apiUrl += `&district=${districtLa}`;
        if (villageLa) apiUrl += `&village=${villageLa}`;

        const response = await axios.get(apiUrl, config);

        if (response.data.status === true) {
          console.log(response.data.data);
          this.data = response.data.data;
        } else {
          Swal.fire({
            icon: 'error',
            text: response.data.message,
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          text: error.message,
        });
        console.error(error);
      }
    },
    onProvinceChange() {
      this.district = "";
      this.village = "";
      this.user_data_districts = [];
      this.user_data_village = [];
      if (this.province) {
        this.onGetdistricts(this.province);
        this.provinceLa = this.user_data_list.find(item => item._id === this.province).provinceLa;
      }
    },
    onDistrictChange() {
      this.village = "";
      this.user_data_village = [];
      if (this.district) {
        this.onGetvillage(this.district);
        this.districtLa = this.user_data_districts.find(item => item._id === this.district).districtLa;
      }
    },
    onVillageChange() {
      if (this.village) {
        this.villageLa = this.user_data_village.find(item => item._id === this.village).villageLa;
      }
    },
    handleFetchData() {
      // Check for each combination of parameters and call fetchDataFromApi with the appropriate arguments
      if (this.provinceLa && this.districtLa && this.villageLa) {
        this.fetchDataFromApi(this.provinceLa, this.districtLa, this.villageLa);
      } else if (this.provinceLa && this.districtLa) {
        this.fetchDataFromApi(this.provinceLa, this.districtLa, null);
      } else if (this.provinceLa && this.villageLa) {
        this.fetchDataFromApi(this.provinceLa, null, this.villageLa);
      } else if (this.districtLa && this.villageLa) {
        this.fetchDataFromApi(null, this.districtLa, this.villageLa);
      } else if (this.provinceLa) {
        this.fetchDataFromApi(this.provinceLa, null, null);
      } else if (this.districtLa) {
        this.fetchDataFromApi(null, this.districtLa, null);
      } else if (this.villageLa) {
        this.fetchDataFromApi(null, null, this.villageLa);
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Please select at least one of province, district, or village before fetching data.',
        });
      }
    }
  },
};
</script>

<style scoped>
.location-details {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  /* Add this line for space-evenly */
  text-align: center;
}

.resized-image {
  max-width: 250px;
  /* Set the maximum width */
  max-height: 450px;
  /* Set the maximum height */
  width: auto;
  /* Allow the image to resize proportionally */
  height: auto;
  /* Allow the image to resize proportionally */
  border: 1px solid gray;
  border-radius: 8px;

}

.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 9999;
}
</style>
