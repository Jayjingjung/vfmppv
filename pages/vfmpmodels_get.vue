<template>
  <div>
    <v-card class="card-shadow mb-6 mt-1" rounded="lg" style="height: 100%;">
      <!-- v-select for models -->
      <div style="display: flex; margin-top: 50px;">
        <div>
          <v-select style="width: 200px;" v-model="selectedModel" :items="models" item-text="name" item-value="_id"
            label="Select a model" outlined></v-select>
        </div>

        <!-- Button to fetch details -->
        <div style="margin-left: 20px; margin-top: 10px;">
          <v-btn @click="fetchModelDetails" color="primary">Model Details</v-btn>
        </div>
      </div>

      <!-- Show loading spinner or error message -->
      <v-progress-linear v-if="loading_processing" indeterminate color="primary"></v-progress-linear>
      <div v-else-if="errorMessage" class="error-message">{{ errorMessage }}</div>

      <!-- Display details of selected model -->
      <v-card v-if="showModalDetails" class="model-details card-center"
        style="font-size: 20px; text-align: start; width: 100%; margin-top: 50px; margin-left: 7px; margin-bottom: 35px; margin-right: 7px; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <v-card-title
          style="display: flex; justify-content: space-between;background-color:#009f62;width:1660px;color: aliceblue;height: 100px;">
          <div>
            <span>{{ showModalDetails.name }}</span>
          </div>
        </v-card-title>
        <v-list style="display: flex;" v-model="selectedCard">
          <v-btn ref="btn1" class="hovered" value="1" @click="selectedCard = '1'"
            @mouseover="changeColor('red', $refs.btn1)" @mouseleave="changeColor('green', $refs.btn1)"
            style="min-width: 300px; margin-left: 2px; margin-right: 2px; background-color: green; color: aliceblue; font-family: 'Times New Roman', Times, serif;">
            about
          </v-btn>
          <v-btn ref="btn2" value="2" @click="selectedCard = '2'" @mouseover="changeColor('red', $refs.btn2)"
            @mouseleave="changeColor('green', $refs.btn2)"
            style="min-width: 300px; margin-left: 2px; margin-right: 2px; background-color: green; color: aliceblue; font-family: 'Times New Roman', Times, serif;">
            new
          </v-btn>
          <v-btn ref="btn3" value="3" @click="selectedCard = '3'" @mouseover="changeColor('red', $refs.btn3)"
            @mouseleave="changeColor('green', $refs.btn3)"
            style="min-width: 300px; margin-left: 2px; margin-right: 2px; background-color: green; color: aliceblue; font-family: 'Times New Roman', Times, serif;">
            other
          </v-btn>
        </v-list>

        <div v-if="selectedCard === '2'" style="margin-top: 20px;">
          <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
            <v-card-title>
              <span style="font-family: 'Times New Roman', Times, serif;">News</span>
            </v-card-title>
            <v-card-text>
              <iframe
                :src="`https://docs.google.com/gview?embedded=true&url=${showModalDetails.news.file}`"
                style="width: 1400px; height: 800px;" frameborder="0">
              </iframe>
              <v-card-title>{{ showModalDetails.news.description }}</v-card-title>
            </v-card-text>
          </v-card>
        </div>

        <div v-if="selectedCard === '1'" style="margin-top: 20px;">
          <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
            <v-card-title>
              <span style="font-family: 'Times New Roman', Times, serif;">About</span>
            </v-card-title>
            <v-card-text>
              <iframe
                :src="`https://docs.google.com/gview?embedded=true&url=${showModalDetails.about.file}`"
                style="width: 1400px; height: 800px;" frameborder="0">
              </iframe>
              <v-card-title>{{ showModalDetails.about.description }}</v-card-title>
            </v-card-text>
          </v-card>
        </div>

        <div v-if="selectedCard === '3'" style="margin-top: 20px;">
          <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
            <v-card-title>
              <span style="font-family: 'Times New Roman', Times, serif;">Other</span>
            </v-card-title>
            <v-card-text>
              <iframe
                :src="`https://docs.google.com/gview?embedded=true&url=${showModalDetails.file}`"
                style="width: 1400px; height: 800px;" frameborder="0">
              </iframe>
              <v-card-title>{{ showModalDetails.description }}</v-card-title>
            </v-card-text>
          </v-card>
        </div>
      </v-card>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      models: [], // Array to hold API response data
      selectedModel: null, // To store selected model ID
      loading_processing: false,
      errorMessage: '',
      showModalDetails: null, // To store detailed model information
      selectedCard: '1',
    };
  },
  methods: {
    changeColor(color, ref) {
      ref.$el.style.backgroundColor = color;
    },
    async onGetmodeID() {
      try {
        this.loading_processing = true;
        const response = await axios.get('https://octopus-app-n476x.ondigitalocean.app/vfmModels');

        if (response.data && response.data.status === true) {
          this.loading_processing = false;
          this.models = response.data.data; // Assign API data to models array
        } else {
          this.loading_processing = false;
          this.errorMessage = response.data.message || 'Unknown error occurred';
        }
      } catch (error) {
        this.loading_processing = false;
        this.errorMessage = error.message || 'An error occurred';
      }
    },
    async fetchModelDetails() {
      try {
        if (!this.selectedModel) {
          this.errorMessage = 'Please select a model';
          return;
        }

        this.loading_processing = true;
        // Make a GET request to fetch details of the specific model
        const response = await axios.get(`https://octopus-app-n476x.ondigitalocean.app/vfmModel/${this.selectedModel}`);

        if (response.data && response.data.status === true) {
          this.loading_processing = false;
          this.showModalDetails = response.data.data; // Set showModalDetails for display
        } else {
          this.loading_processing = false;
          this.errorMessage = response.data.message || 'Unknown error occurred';
        }
      } catch (error) {
        this.loading_processing = false;
        this.errorMessage = error.message || 'An error occurred';
      }
    },
  },
  mounted() {
    // Call your API function when the component is mounted
    this.onGetmodeID();
  },
};
</script>

<style scoped>
.error-message {
  color: red;
  margin-top: 10px;
}

.model-details {
  margin-top: 20px;
}

.card-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.pdf-border {
  border: 2px solid #000;
  /* Change the color and width as needed */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* Optional: add a shadow */
}
</style>
