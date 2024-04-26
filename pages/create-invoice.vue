<template>
    <v-card>
      <template v-for="item in data">
        <v-row :key="item._id">
          <v-col>
            <v-subheader>Location Details:</v-subheader>
            <v-list>
              <v-list-item-group>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Province: {{ item.createdByAddress.province }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>District: {{ item.createdByAddress.district }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Village: {{ item.createdByAddress.village }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Village Code: {{ item.createdByAddress.villageCode }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
  
            <!-- Display threatened species information -->
            <v-subheader>Threatened Species:</v-subheader>
            <v-list>
              <v-list-item-group>
                <v-list-item v-for="species in item.threatenedSpecies" :key="species._id">
                  <v-list-item-content>
                    <v-list-item-title>Name: {{ species.name }}</v-list-item-title>
                    <v-list-item-subtitle>Comment: {{ species.comment }}</v-list-item-subtitle>
                    <!-- Add other information as needed -->
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-col>
        </v-row>
      </template>
    </v-card>
  </template>
  
  <script>
  import Swal from 'sweetalert2';
  import axios from 'axios';
  
  export default {
    data() {
      return {
        data: [],
      };
    },
    async mounted() {
      // Call the fetchDataFromApi method on component mount
      await this.fetchDataFromApi();
    },
    methods: {
      async fetchDataFromApi() {
        try {
          // Get the Bearer token from local storage
          const token = localStorage.getItem('TOKEN');
  
          // Check if the token exists
          if (!token) {
            // Handle the case where the token is not available (e.g., redirect to login)
            console.error('Bearer token is missing.');
            return;
          }
  
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
  
          // Replace the API endpoint with your actual API endpoint
          const apiUrl = 'https://trackingapp-qupd.onrender.com/parollingReport/gets';
          const response = await axios.get(apiUrl, config);
  
          if (response.data.status === '00') {
            // Process the data as needed
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
    },
  };
  </script>
  