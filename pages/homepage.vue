<template>
  <div>
    <v-container fluid fill-height>
      <v-row align="center">
        <v-col>
          <v-card-text>
            <v-row class="align-center  mb-4 mt-5">

              <v-row>
                <v-col cols="12" sm="4" md="auto" class="pa-1">
                  <v-autocomplete v-model="province" :items="provinceList" item-text="provinceLa" item-value="_id"
                    label="ເລືອກ ແຂວງ" @change="onProvinceChange" outlined dense hide-details></v-autocomplete>
                </v-col>

                <v-col cols="12" sm="4" md="auto" class="pa-1">
                  <v-autocomplete v-if="districtList.length" v-model="district" :items="districtList"
                    item-text="districtLa" item-value="_id" label="ເລືອກ ເມືອງ" @change="onDistrictChange" outlined
                    dense hide-details></v-autocomplete>
                </v-col>

                <v-col cols="12" sm="4" md="auto" class="pa-1">
                  <v-autocomplete v-if="villageList.length" v-model="village" :items="villageList" item-text="villageLa"
                    item-value="_id" label="ເລືອກ ບ້ານ" @change="onVillageChange" outlined dense
                    hide-details></v-autocomplete>
                </v-col>

                <v-col cols="12" sm="4" md="auto" class="pa-1">
                  <v-menu ref="start_menu" v-model="start_menu" :close-on-content-click="false"
                    :return-value.sync="start_date" transition="scale-transition" offset-y min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field dense outlined hide-details v-model="formattedStartDate" required
                        label="ວັນທີເລີ່ມຕົ້ນ" append-icon="mdi-calendar" readonly v-bind="attrs"
                        v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="start_date" no-title scrollable
                      @input="$refs.start_menu.save(start_date)"></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="4" md="auto" class="pa-1">
                  <v-menu ref="end_menu" v-model="end_menu" :close-on-content-click="false"
                    :return-value.sync="end_date" transition="scale-transition" offset-y min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field dense outlined hide-details v-model="formattedEndDate" required label="ວັນທີສຸດທ້າຍ"
                        append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="end_date" no-title scrollable
                      @input="$refs.end_menu.save(end_date)"></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="4" md="auto" class="pa-1">
                  <v-btn @click="handleFetchData" style="background: #F9944A; color: #f5f5f5; " size="x-large" block>
                    Fetch Data
                  </v-btn>
                </v-col>
              </v-row>
            </v-row>
          </v-card-text>
         
           
          

          <v-card  class="card-shadow mb-6" rounded="lg" v-for="(item, index) in patrolData" :key="item._id"
            :style="{ marginBottom: index !== patrolData.length - 1 ? '20px' : '0' }">
            
            <v-card-title style="background-color:#F9944A">
              <div class="d-flex justify-space-between fill-width">
            
                <v-subheader>ວັນເວລາທີ ເລີມ ລາດຕະເວນ {{ item.startTime }}</v-subheader>
                <v-subheader>ວັນເວລາທີ ຈົບ ລາດຕະເວນ {{ item.endTime }}</v-subheader>
            
              </div>
            </v-card-title>
            <v-row>
              <v-col>
                <div class="location-details mx-md-10 mx-2 mt-5">
                  <v-card outlined class="pa-3" style="background-color: #f5f5f5;">
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-card outlined class="my-1 pa-2 text-start" style="font-size: 19px;">
                          Province: {{ item.createdByAddress.province }}
                        </v-card>
                        <v-card outlined class="my-1 pa-2 text-start" style="font-size: 17px;">
                          District: {{ item.createdByAddress.district }}
                        </v-card>
                        <v-card outlined class="my-1 pa-2 text-start" style="font-size: 16px;">
                          Village: {{ item.createdByAddress.village }}
                        </v-card>
                        <v-card outlined class="my-1 pa-2 text-start">
                          Village Code: {{ item.createdByAddress.villageCode }}
                        </v-card>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-card outlined class="my-1 pa-2 d-flex align-center">
                          <v-icon size="34" color="#ce2330" class="mr-2">mdi-account</v-icon>
                          <div style="font-size: 18px;">ຫົວໜ້າທີມ ລາດຕະເວນ : {{ item.patrollingTeamLeader }}</div>
                        </v-card>
                        <v-card outlined class="my-1 pa-2 d-flex align-center">
                          <v-icon size="34" color="#ce2330" class="mr-2">mdi-road-variant</v-icon>
                          <div style="font-size: 18px;">ຊື່ເສັ້ນທາງ: {{ item.trailName }}</div>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-card>
                </div>

                <div class="d-flex flex-wrap justify-space-around mx-md-10 mx-2 mt-5 text-center">
                  <div class="ma-2">
                    <v-img :src="item.imageStart" alt="imageStart" class="resized-image"
                      @click="showFullImage(item.imageStart)"></v-img>
                    <v-list-item-title class="mt-1">ຮູບພາມ ລວມທີມ</v-list-item-title>
                  </div>
                  <div class="ma-2">
                    <v-img :src="item.screenShot" alt="screenShot" class="resized-image"
                      @click="showFullImage(item.screenShot)"></v-img>
                    <v-list-item-title class="mt-1">ເສັນທ່າງທີໄດ້ ລາດຕະເວນ</v-list-item-title>
                  </div>
                  <div class="ma-2">
                    <v-img :src="item.imageEnd" alt="ImageEnd" class="resized-image"
                      @click="showFullImage(item.imageEnd)"></v-img>
                    <v-list-item-title class="mt-1">ຮູບພາມ ຈົບການ ລາດຕະເວນ</v-list-item-title>
                    <div class="mt-1" style="font-size: 18px;">{{ item.comment }}</div>
                  </div>
                </div>

                <div class="mx-md-5">
                  <div class="mx-md-5">
                    <v-list v-if="item.threatenedSpecies && item.threatenedSpecies.length > 0">
                      <v-list-item-group>
                        <v-list-item v-for="(species, speciesIndex) in item.threatenedSpecies"
                          :key="`species-${speciesIndex}`">
                          <v-list-item-content class="pa-md-4 pa-2">
                            <v-list-item-title style="font-size: 18px; font-weight: bold; color: #09bcac;" class="mb-2">
                              Threatened Species: {{ species.category }}
                            </v-list-item-title>
                            <div class="d-flex flex-wrap justify-center my-2">
                              <template v-for="(categoryImageSrc, categoryKey) in scategoryImages">
                                <div :key="categoryKey"
                                  v-if="species.category && species.category.includes(categoryKey)" class="mx-1">
                                  <img :src="categoryImageSrc" :alt="categoryKey"
                                    style="max-height: 70px; max-width: 70px;" />
                                </div>
                              </template>
                            </div>
                            <v-list-item-subtitle class="my-1" style="font-size: 18px;">Comment: {{ species.comment
                              }}</v-list-item-subtitle>
                            <v-list-item-subtitle class="my-1" style="font-size: 18px;">Name: {{ species.name
                              }}</v-list-item-subtitle>
                            <v-row v-if="species.images && species.images.length > 0" class="my-2">
                              <v-col v-for="(image, imageIndex) in species.images" :key="`speciesimg-${imageIndex}`"
                                cols="6" sm="4" md="3">
                                <v-img :src="image" alt="Species Image" class="resized-image"
                                  @click="showFullImage(image)"></v-img>
                              </v-col>
                            </v-row>
                            <v-btn outlined color="primary" class="mt-2"
                              @click="openMapForCoordinates(species.lat, species.long)">
                              <v-icon left color="#ce2330">mdi-google-maps</v-icon>
                              Lat: {{ species.lat }}, Long: {{ species.long }}
                            </v-btn>
                            <utm />
                          </v-list-item-content>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>

                    <v-list v-if="item.hunting && item.hunting.length > 0">
                      <v-list-item-group>
                        <v-list-item v-for="(hunt, huntIndex) in item.hunting" :key="`hunt-${huntIndex}`">
                          <v-list-item-content class="pa-md-4 pa-2">
                            <v-list-item-title style="font-size: 18px; font-weight: bold; color: #d98e25;" class="mb-2">
                              Hunting Category: {{ hunt.category }}
                            </v-list-item-title>
                            <div class="d-flex flex-wrap justify-center my-2">
                              <template v-for="(categoryImageSrc, categoryKey) in hcategoryImages">
                                <div :key="categoryKey" v-if="hunt.category && hunt.category.includes(categoryKey)"
                                  class="mx-1">
                                  <img :src="categoryImageSrc" :alt="categoryKey"
                                    style="max-height: 70px; max-width: 70px;" />
                                </div>
                              </template>
                            </div>
                            <v-list-item-subtitle class="my-1">Comment: {{ hunt.comment }}</v-list-item-subtitle>
                            <v-row v-if="hunt.images && hunt.images.length > 0" class="my-2">
                              <v-col v-for="(image, imageIndex) in hunt.images" :key="`huntimg-${imageIndex}`" cols="6"
                                sm="4" md="3">
                                <v-img :src="image" alt="Hunting Image" class="resized-image"
                                  @click="showFullImage(image)"></v-img>
                              </v-col>
                            </v-row>
                            <v-btn outlined color="primary" class="mt-2"
                              @click="openMapForCoordinates(hunt.lat, hunt.long)">
                              <v-icon left color="#ce2330">mdi-google-maps</v-icon>
                              Lat: {{ hunt.lat }}, Long: {{ hunt.long }}
                            </v-btn>
                            <utm />
                          </v-list-item-content>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>

                  </div>


                  <v-list v-if="item.otherDisturbances && item.otherDisturbances.length > 0">
                    <v-list-item-group>
                      <v-list-item v-for="(disturbance, distIndex) in item.otherDisturbances"
                        :key="`dist-${distIndex}`">
                        <v-list-item-content class="pa-md-4 pa-2">
                          <v-list-item-title style="font-size: 18px; font-weight: bold; color: #8d1821;" class="mb-2">
                            Threatened Disturbances: {{ disturbance.category }}
                          </v-list-item-title>
                          <div class="d-flex flex-wrap justify-center my-2">
                            <template v-for="(categoryImageSrc, categoryKey) in dcategoryImages">
                              <div :key="categoryKey"
                                v-if="disturbance.category && disturbance.category.includes(categoryKey)" class="mx-1">
                                <img :src="categoryImageSrc" :alt="categoryKey"
                                  style="max-height: 70px; max-width: 70px;" />
                              </div>
                            </template>
                          </div>
                          <v-list-item-subtitle class="my-1">Comment: {{ disturbance.comment }}</v-list-item-subtitle>
                          <v-row v-if="disturbance.images && disturbance.images.length > 0" class="my-2">
                            <v-col v-for="(image, imageIndex) in disturbance.images" :key="`distimg-${imageIndex}`"
                              cols="6" sm="4" md="3">
                              <v-img :src="image" alt="Disturbances Image" class="resized-image"
                                @click="showFullImage(image)"></v-img>
                            </v-col>
                          </v-row>
                          <v-btn outlined color="primary" class="mt-2"
                            @click="openMapForCoordinates(disturbance.lat, disturbance.long)">
                            <v-icon left color="#ce2330">mdi-google-maps</v-icon>
                            Lat: {{ disturbance.lat }}, Long: {{ disturbance.long }}
                          </v-btn>
                          <utm />
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                  <!-- let -->
                </div>
              </v-col>
            </v-row>
          </v-card>
          <div v-if="isLoading && patrolData.length === 0" class="text-center my-5">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
            <p>Loading data...</p>
          </div>
          <div v-if="!isLoading && patrolData.length === 0 && attemptedFetch" class="text-center my-5">
            <p>No data found for the selected criteria.</p>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="dialogVisible" max-width="600px">
      <v-card>
        <v-img :src="fullImageUrl" alt="Full Image">
          <v-toolbar dense flat color="rgba(0,0,0,0.3)">
            <v-spacer></v-spacer>
            <v-btn icon @click="downloadImage" dark>
              <v-icon>mdi-download</v-icon>
            </v-btn>
            <v-btn icon @click="dialogVisible = false" dark>
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
        </v-img>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import axios from 'axios'; // Assuming axios is globally available or imported
import utm from 'utm';
// Configuration for API
const API_BASE_URL = 'https://api.vfmp.dof.maf.gov.la';

export default {
  data() {
    return {
      patrolData: [], // Renamed from 'data' to avoid conflict with data() function
      dialogVisible: false,
      fullImageUrl: '',

      isLoading: false, // Unified loading state
      attemptedFetch: false, // To show "no data" message only after a fetch attempt

      // Filter selections
      province: null, // Stores selected province ID
      district: null, // Stores selected district ID
      village: null,  // Stores selected village ID

      // Data for dropdowns
      provinceList: [],
      districtList: [],
      villageList: [],

      // Derived names and codes for API query (if needed by backend like this)
      // These are updated by change handlers
      selectedProvinceLa: null,
      selectedDistrictLa: null,
      selectedVillageLa: null,
      selectedVillageCode: '', // Assuming villageCode is part of village object

      start_menu: false, // For the start date picker menu
      end_menu: false,   // For the end date picker menu
      start_date: null,
      end_date: null,

      // Image maps for categories - kept as in original
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
  computed: {
    formattedStartDate() {
      return this.start_date ? this.formatDate(this.start_date) : '';
    },
    formattedEndDate() {
      return this.end_date ? this.formatDate(this.end_date) : '';
    },
  },
  created() {
    this.setDefaultDates();
  },
  async mounted() {
    await this.fetchProvinces();
  },
  methods: {
    openMapForCoordinates(lat, long) {
      if (lat && long) {
        // You can use different URL formats. This one usually centers and pins.
        const mapUrl = `https://www.google.com/maps?q=${lat},${long}`;

        // Open the URL in a new browser tab
        window.open(mapUrl, '_blank');
      } else {
        console.warn('Latitude or longitude is missing. Cannot open map.');
        // You can use your existing showAlert helper if you have one, e.g.:
        // this.showAlert('Map Error', 'Latitude or longitude data is missing for this item.', 'warning');
        alert('Latitude or longitude data is missing for this item.'); // Fallback alert
      }
    },
    // Helper for showing alerts
    showAlert(title, text, icon) {
      Swal.fire({
        title: title || 'ແຈ້ງເຕືອນ',
        text: text,
        icon: icon || 'info',
        allowOutsideClick: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      });
    },

    // Image dialog methods
    showFullImage(imageUrl) {
      this.fullImageUrl = imageUrl;
      this.dialogVisible = true;
    },
    downloadImage() {
      if (!this.fullImageUrl) return;
      const link = document.createElement('a');
      link.href = this.fullImageUrl;
      // Extract filename or use a generic one
      const filename = this.fullImageUrl.substring(this.fullImageUrl.lastIndexOf('/') + 1) || 'downloaded-image';
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

    // API fetching methods
    async fetchProvinces() {
      this.isLoading = true;
      try {
        // Using this.$axios.$get which is common in Nuxt. For standard Vue CLI, use axios.get().then(res => res.data)
        const response = await this.$axios.$get(`${API_BASE_URL}/provinces`);
        if (response?.status === true) {
          this.provinceList = response.data;
        } else {
          this.showAlert('Error Fetching Provinces', response?.message || 'Unknown error', 'error');
        }
      } catch (error) {
        this.showAlert('API Error', error.message, 'error');
        console.error('Error fetching provinces:', error);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchDistricts(provinceId) {
      if (!provinceId) return;
      this.isLoading = true;
      this.districtList = []; // Clear previous districts
      this.district = null;   // Reset district selection
      this.villageList = [];  // Clear villages as district changed
      this.village = null;    // Reset village selection
      this.selectedDistrictLa = null;
      this.selectedVillageLa = null;
      this.selectedVillageCode = '';

      try {
        const response = await this.$axios.$get(`${API_BASE_URL}/districts?provinceId=${provinceId}`);
        if (response?.status === true) {
          this.districtList = response.data;
        } else {
          this.showAlert('Error Fetching Districts', response?.message || 'Unknown error', 'error');
        }
      } catch (error) {
        this.showAlert('API Error', error.message, 'error');
        console.error('Error fetching districts:', error);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchVillages(districtId) {
      if (!districtId) return;
      this.isLoading = true;
      this.villageList = []; // Clear previous villages
      this.village = null;   // Reset village selection
      this.selectedVillageLa = null;
      this.selectedVillageCode = '';

      try {
        const response = await this.$axios.$get(`${API_BASE_URL}/villages?districtId=${districtId}`);
        if (response?.status === true) {
          this.villageList = response.data;
        } else {
          this.showAlert('Error Fetching Villages', response?.message || 'Unknown error', 'error');
        }
      } catch (error) {
        this.showAlert('API Error', error.message, 'error');
        console.error('Error fetching villages:', error);
      } finally {
        this.isLoading = false;
      }
    },

    // Main data fetching for patrol reports
    async fetchPatrolReportsApi(provinceLa, districtLa, villageLa) {
      this.isLoading = true;
      this.patrolData = []; // Clear previous data
      this.attemptedFetch = true;

      // Retrieve token from localStorage
      const token = localStorage.getItem('TOKEN');
      if (!token) {
        this.showAlert('Authentication Error', 'Bearer token is missing. Please log in.', 'error');
        this.isLoading = false;
        return;
      }
      const config = { headers: { Authorization: `Bearer ${token}` } };

      // Construct the API URL
      // The backend expects Lao names for province, district, village as query parameters.
      // villageCode is also sent.
      let apiUrl = `${API_BASE_URL}/parollingReport/gets?startDate=${this.start_date}&endDate=${this.end_date}&villageCode=${this.selectedVillageCode || ''}`;
      if (provinceLa) apiUrl += `&province=${encodeURIComponent(provinceLa)}`;
      if (districtLa) apiUrl += `&district=${encodeURIComponent(districtLa)}`;
      if (villageLa) apiUrl += `&village=${encodeURIComponent(villageLa)}`;

      try {
        // Using standard axios.get here as an example, adjust if $axios is Nuxt-specific and handles data differently
        const response = await axios.get(apiUrl, config);
        if (response.data?.status === true) {
          this.patrolData = response.data.data || [];
          if (this.patrolData.length === 0) {
            this.showAlert('No Data', 'No patrol reports found for the selected criteria.', 'info');
          }
        } else {
          this.showAlert('Error Fetching Reports', response.data?.message || 'Failed to fetch reports.', 'error');
        }
      } catch (error) {
        let errorMessage = error.message;
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        this.showAlert('API Request Error', errorMessage, 'error');
        console.error('Error fetching patrol reports:', error);
      } finally {
        this.isLoading = false;
      }
    },

    // Event handlers for dropdown changes
    onProvinceChange() {
      const selectedProv = this.provinceList.find(p => p._id === this.province);
      this.selectedProvinceLa = selectedProv ? selectedProv.provinceLa : null;

      // Reset dependent dropdowns and their values
      this.district = null;
      this.village = null;
      this.districtList = [];
      this.villageList = [];
      this.selectedDistrictLa = null;
      this.selectedVillageLa = null;
      this.selectedVillageCode = '';

      if (this.province) {
        this.fetchDistricts(this.province);
      }
    },
    onDistrictChange() {
      const selectedDist = this.districtList.find(d => d._id === this.district);
      this.selectedDistrictLa = selectedDist ? selectedDist.districtLa : null;

      // Reset village dropdown and its values
      this.village = null;
      this.villageList = [];
      this.selectedVillageLa = null;
      this.selectedVillageCode = '';

      if (this.district) {
        this.fetchVillages(this.district);
      }
    },
    onVillageChange() {
      const selectedVill = this.villageList.find(v => v._id === this.village);
      if (selectedVill) {
        this.selectedVillageLa = selectedVill.villageLa;
        // Assuming the village object from API contains 'villageCode'
        this.selectedVillageCode = selectedVill.villageCode || '';
      } else {
        this.selectedVillageLa = null;
        this.selectedVillageCode = '';
      }
    },

    // Handler for the "Fetch Data" button
    handleFetchData() {
      if (!this.start_date || !this.end_date) {
        this.showAlert('Missing Dates', 'ກະລຸນາເລືອກວັນທີເລີ່ມຕົ້ນ ແລະ ວັນທີสิ้นສຸດ.', 'warning');
        return;
      }

      // Check if at least one location filter is selected.
      // The API might require at least one location parameter or villageCode.
      // This logic ensures that we pass the currently selected Lao names.
      if (this.selectedProvinceLa || this.selectedDistrictLa || this.selectedVillageLa || this.selectedVillageCode) {
        this.fetchPatrolReportsApi(this.selectedProvinceLa, this.selectedDistrictLa, this.selectedVillageLa);
      } else {
        // If API can fetch by date range only (without location), this branch might change.
        // For now, require at least one location context.
        this.showAlert('Missing Location', 'ກະລຸນາເລືອກ ແຂວງ, ເມືອງ, ຫຼື ບ້ານ ກ່ອນດຶງຂໍ້ມູນ.', 'info');
      }
    },
    setDefaultDates() {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth(); // 0-indexed month

      // Set start_date to the first day of the current month
      const firstDay = new Date(year, month, 1);
      this.start_date = this.formatDate(firstDay);

      // Set end_date to the last day of the current month
      const lastDay = new Date(year, month + 1, 0); // Day 0 of next month is last day of current month
      this.end_date = this.formatDate(lastDay);
    },
    formatDate(date) {
      if (!date) return null;

      // If the date is already a string in 'YYYY-MM-DD' format, just return it
      if (typeof date === 'string' && date.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return date;
      }

      // Otherwise, assume it's a Date object and format it
      const d = new Date(date);
      let month = '' + (d.getMonth() + 1);
      let day = '' + d.getDate();
      const year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('-');
    },
  },
};
</script>

<style scoped>
.location-details {
  /* Styles for location details section, kept from original if specific layout needed */
  /* display: flex; flex-wrap: wrap; justify-content: space-evenly; text-align: center; */
}

.resized-image {
  max-width: 250px;
  max-height: 450px;
  width: 100%;
  /* Make image responsive within its container */
  height: auto;
  border: 1px solid #e0e0e0;
  /* Softer border */
  border-radius: 8px;
  object-fit: cover;
  /* Ensures image covers the area, might crop */
  cursor: pointer;
}

/* Additional global styles or utility classes can be defined here or in a global CSS file */
.fill-width {
  width: 100%;
}

/* Ensure v-selects and buttons in the filter row are nicely aligned */
.filter-row .v-input--dense {
  margin-bottom: 0;
}

.UTM{
    z-index: 1;
}
</style>
