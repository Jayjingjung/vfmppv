<template>
  <div>
    <!-- <h2>Images:</h2> -->

    <v-card  style="width: 1500px;margin-top: 50px;border-bottom:1px solid slategray;border-top:1px solid slategray;border-right:1px solid slategray;border-left:1px solid slategray">
      <div class="gallery">
        <div v-for="(image, index) in imagesData" :key="index" class="gallery-item" @click="openPopup(index)">
          <img :src="image.image" alt="Village Image" class="gallery-image">
          <!-- <span class="image-text">Image {{ index + 1 }}</span> -->
        </div>
      </div>

      <!-- Popup/Modal -->
      <div v-if="showPopup" class="popup">
        <span style="height: 40px;width: 40px;" class="close-btn" @click="closePopup">&times;</span>
        <img :src="currentPhoto" :alt="'Photo ' + (currentIndex + 1)" class="popup-image" />
        <div class="navigation">
          <button @click="prevPhoto" :disabled="currentIndex === 0" class="nav-btn prev-btn">Previous</button>
          <button @click="nextPhoto" :disabled="currentIndex === imagesData.length - 1"
            class="nav-btn next-btn">Next</button>
        </div>
      </div>
    </v-card>
    
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      imagesData: [],
      showPopup: false,
      currentIndex: 0,
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('https://octopus-app-n476x.ondigitalocean.app/images');
        this.imagesData = response.data.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    openPopup(index) {
      this.showPopup = true;
      this.currentIndex = index;
    },
    closePopup() {
      this.showPopup = false;
    },
    nextPhoto() {
      if (this.currentIndex < this.imagesData.length - 1) {
        this.currentIndex++;
      }
    },
    prevPhoto() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
  },
  computed: {
    currentPhoto() {
      return this.imagesData[this.currentIndex]?.image || '';
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  /* Adjust the minmax values as needed */
  gap: 16px;
  max-width: 1300px;
  margin: 0 auto;
}


.gallery-item {
  flex: 1 1 calc(33.333% - 16px);
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  /* Crop overflow for consistent aspect ratio */
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}


.gallery-image {
  height: 300px;
  width: 300px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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

.popup-image {
  width: 100%;
  height: 800px;
  border-radius: 8px;
}

.close-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  padding-bottom: 10px;
  /* Adjust padding to include the border */
  font-size: 44px;
  /* Increase font size for the close button */
  background-color: #d6d6d6;
  line-height: 1;
  /* Ensure proper line height */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: #333;
  /* Font color for the close button */
  text-align: center;
  /* Center the text horizontally */
}

.close-btn:hover {
  border-color: #ec0505;
  /* Change border color on hover */
  background-color: #ec0505;
  color: #d6d6d6;
  /* Font color on hover */
}

.navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.nav-btn {
  padding: 8px 16px;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: transparent;
  color: #333;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}

.nav-btn:hover {
  background-color: #f0f0f0;
  color: #555;
  border-color: #999;
}

.prev-btn {
  margin-right: 10px;
}
</style>
