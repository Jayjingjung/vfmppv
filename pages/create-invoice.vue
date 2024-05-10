<template>
  <div>

    <v-container fluid fill-height>
      <v-row align="center">
        <v-col>
          <v-card-text>
            <div style="width:100%;display:flex;justify-content:start" class="pt-4">


              <div class="col-8">
                <div class="d-flex align-center" style="width:100%">
                  <div class="d-flex align-center">
                    <v-menu ref="start_menu" v-model="start_menu" :close-on-content-click="false"
                      :return-value.sync="start_date" transition="scale-transition" offset-y min-width="auto">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field dense outlined v-model="start_date" required label="ວັນທີເລີ່ມ"
                          append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                      </template>
                      <v-date-picker v-model="start_date" no-title scrollable
                        @input="$refs.start_menu.save(start_date)">
                        <v-spacer></v-spacer>
                      </v-date-picker>
                    </v-menu>
                  </div>
                  <div class="d-flex align-center pl-2">
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
                  <div>
                    <v-text-field label="ລະຫັດບ້ານ" dense outlined background-color="#f5f5f5"
                      v-model="villageCode"></v-text-field>
                  </div>
                  <div style="margin-top:-25px" class="ml-2">
                    <v-btn color="#90A4AE" class="white--text" elevation="0"
                      @click="() => { fetchDataFromApi(); }"><v-icon>mdi-magnify</v-icon>ຄົ້ນຫາ</v-btn>
                  </div>
                </div>
              </div>
            </div>
          </v-card-text>

          <!-- Dropdown for provinceLaList -->
          <!-- Your dropdown element -->
          <v-select v-model="selectedProvinceLa" :items="provinceLaList" label="ເລືອກແຂວງ" outlined></v-select>


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


    <v-dialog v-model="dialogVisible" max-width="800" max-height="1200">
      <v-card>
        <v-img :src="fullImageUrl" alt="Full Image" width="400" height="600"></v-img>

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
      provinces: [],
      selectedProvince: null,
      provinceLaList: [],
      selectedDistrictId: null, // Initialize selectedDistrictId
      selectedProvinceLa: null,
      end_date: '',
      villageCode: '',
      start_date: '',
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
    selectedProvinceLa(newValue, oldValue) {
      // Check if the new value is different from the old value to avoid unnecessary calls
      if (newValue !== oldValue) {
        this.fetchDataFromApi(newValue);
      }
    }
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
    await this.fetchDataFromApi();
    await this.onGetprovin();
    // this.selectedDistrictId = ''; // Set to an empty string as an example
  },
  methods: {
    async fetchDataFromApi(provinceLa) {
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

        // Construct the URL with query parameters, including the selected provinceLa
        const apiUrl = 
        `https://octopus-app-n476x.ondigitalocean.app/parollingReport/gets?startDate=
        ${this.start_date}&endDate=${this.end_date}
        &villageCode=${this.villageCode}&province=${provinceLa}`;

        // Make the GET request with axios
        const response = await axios.get(apiUrl, config);

        if (response.data.status === true) {
          console.log(response.data.data);
        } else {
          Swal.fire({
            icon: 'error',
            text: response.data.message,
          });
        }

        this.data = response.data.data;
      } catch (error) {
        Swal.fire({
          icon: 'error',
          text: error.message,
        });
        console.error(error);
      }
    },



    showFullImage(imageUrl, species, hunting) {
      this.fullImageUrl = imageUrl;
      this.selectedSpecies = species;
      this.selectedHunting = hunting;
      this.dialogVisible = true;
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

        if (response?.status === true) {
          this.loading_processing = false;
          console.log('user:', response.data);

          // Extract provinceLa values from the response data and store in an array
          this.provinceLaList = response.data.map(province => province.provinceLa);
        } else {
          this.loading_processing = false;
          swal.fire({
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
        swal.fire({
          title: 'ແຈ້ງເຕືອນ',
          text: error,
          icon: 'error',
          allowOutsideClick: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        });
      }
    },

    // async onGetdistricts(_id) {
    //   try {
    //     this.loading_processing = true;

    //     const response = await this.$axios.$get(`https://octopus-app-n476x.ondigitalocean.app/districts?provinceId=${_id}`);

    //     if (response?.status === true) {
    //       this.loading_processing = false;
    //       console.log('user:', response.data);
    //       this.distructList = response.data;

    //       // Optionally, set the first district as the default selected value
    //       if (this.distructList.length > 0) {
    //         this.selectedDistrictId = this.distructList[0]._id;
    //       }
    //     } else {
    //       this.loading_processing = false;
    //       swal.fire({
    //         title: 'ແຈ້ງເຕືອນ',
    //         text: response?.message,
    //         icon: 'info',
    //         allowOutsideClick: false,
    //         confirmButtonColor: '#3085d6',
    //         confirmButtonText: 'OK',
    //       });
    //     }
    //   } catch (error) {
    //     this.loading_processing = false;
    //     swal.fire({
    //       title: 'ແຈ້ງເຕືອນ',
    //       text: error,
    //       icon: 'error',
    //       allowOutsideClick: false,
    //       confirmButtonColor: '#3085d6',
    //       confirmButtonText: 'OK',
    //     });
    //   }
    // },



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

/* .image-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.category-image {
  max-height: 80px;
  max-width: 80px;
  cursor: pointer;
} */
</style>
