<template>
  <div>
    <v-container fluid fill-height>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="16" md="16">
          <v-card v-for="(item, index) in data" :key="item._id"
            :style="{ marginBottom: index !== data.length - 1 ? '20px' : '0' }">
            <v-row>
              <v-col>
                <!-- Display location details -->
                <v-subheader>Location Details:</v-subheader>
                <div class="location-details mr-10 ml-10">
                  <div>Province: {{ item.createdByAddress.province }}</div>
                  <div>District: {{ item.createdByAddress.district }}</div>
                  <div>Village: {{ item.createdByAddress.village }}</div>
                  <div>Village Code: {{ item.createdByAddress.villageCode }}</div>
                  <div>End Time: {{ item.endTime }}</div> <!-- Display the endTime here -->
                  <!-- Add other location details as needed -->
                </div>

                <!-- Display threatened species information -->

                <v-list>
                  <v-list-item-group>
                    <v-list-item v-for="(species, speciesIndex) in item.threatenedSpecies" :key="speciesIndex">

                      <v-list-item-content>
                        <v-list-item-title>threatened Species:{{ species.category }}</v-list-item-title>
                        <v-list-item-subtitle>Comment: {{ species.comment }}</v-list-item-subtitle>
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
                        <v-list-item-title>Hunting Category: {{ hunt.category }}</v-list-item-title>
                        <v-list-item-subtitle>Comment: {{ hunt.comment }}</v-list-item-subtitle>
       
                          <!-- <v-list-item-subtitle>
                            Image End: <v-img :width="300" aspect-ratio="16/9" cover :src="data[0].imageEnd"
                              alt="Image End"></v-img>
                          </v-list-item-subtitle> -->

                          <!-- <v-img :width="300" aspect-ratio="16/9" cover
                            src="http://res.cloudinary.com/dbnjr4jnn/image/upload/v1713896788/01cacf95-da16-4dcc-9ec9-e5ee217639067261390044134703163-1713896787145.jpg"></v-img> -->
              
                        <!-- Add other hunting details as needed -->
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>

                <v-list-item v-for="(Disturbances, Disturbancesindex) in item.otherDisturbances"
                  :key="Disturbancesindex">
                  <v-list-item-content>
                    <v-list-item-title>threatened Disturbances:{{ Disturbances.category }}</v-list-item-title>
                    <v-list-item-subtitle>Comment: {{ Disturbances.comment }}</v-list-item-subtitle>
                    <!-- Add other species details as needed -->
                  </v-list-item-content>
                </v-list-item>


                <v-subheader style="font-weight: bold; color: red;">Map Data Details:</v-subheader>
                <v-list>
                  <v-list-item v-for="(mapData, mapDataindex) in item.mapData" :key="mapDataindex">
                    <v-list-item-content>
                      <v-list-item-title>Title: {{ mapData.title }}</v-list-item-title>
                      <v-list-item-subtitle>Image: {{ mapData.image }}</v-list-item-subtitle>
                      
                      <v-list-item-subtitle>Latitude: {{ mapData.lat }}</v-list-item-subtitle>
                      <v-list-item-subtitle>Longitude: {{ mapData.long }}</v-list-item-subtitle>
                      <!-- Add other mapData details as needed -->
                    </v-list-item-content>
                  </v-list-item>
                </v-list>


                <!-- Button to perform an action -->

              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import Swal from 'sweetalert2';
import axios from 'axios';

export default {
  data() {
    return {
      data: [],
      img: '',
    };
  },
  async mounted() {
    await this.fetchDataFromApi();
  },
  methods: {
    performAction(itemId) {
      // Add your logic here
      console.log("Performing action for item ID:", itemId);
    },
    async fetchDataFromApi() {
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

        const apiUrl = 'https://trackingapp-qupd.onrender.com/parollingReport/gets';
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
    // onGetrepImage(file) {
    //   if (file) {
    //     this.url = URL.createObjectURL(this.img)
    //     console.log(this.url)
    //   } else {
    //     this.url = null
    //   }
    // }, 
    performAction(id) {
      console.log('Performing action for ID:', id);
      // Add your action logic here
    },
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
</style>