<template>
  <div class="container">
    <div v-if="USER_ROLE && USER_ROLE === 'ADMIN'" class="fixed-panel">
      <v-card dense style="width: 550px;">
        <v-file-input style="margin-right: 10px;" v-model="image" label="Select an image" accept="image/*" outlined
          @change="uploadImage"></v-file-input>
        <v-btn style="width: 100px; background-color: green; color: white;" @click="savePhoto"
          :disabled="!photo.length">Save</v-btn>
      </v-card>
      
      <div v-if="imageUrl">
        <h3>Image Preview:</h3>
        <v-img :src="imageUrl" max-width="300px"></v-img>
      </div>
    </div>

    <v-card class="gallery-card">
      <v-card-title style="background-color:#009f62;margin-bottom: 10px;">
      <p style="font-size: 25px;margin-left: 20px;margin-top: 10px;font-weight: 500;color: aliceblue;">ຮູບພາບ ລວມ</p>
      
      </v-card-title>
      <div class="gallery">
        <div v-for="(image, index) in imagesData" :key="index" class="gallery-item" @click="openPopup(index)">
          <img :src="image.image" alt="Village Image" class="gallery-image" />
        </div>
      </div>
      <!-- Popup/Modal -->
      <div v-if="showPopup" class="popup">
        <span class="close-btn" @click="closePopup">&times;</span>

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
import Swal from 'sweetalert2';
import axios from 'axios';

export default {
  data() {
    return {
      imagesData: [],
      USER_ROLE: '',
      showPopup: false,
      currentIndex: 0,
      image: null,
      imageUrl: '',
      imageUploaded: false,
      photo: '', // Assuming photo will hold the image URL or other related data
    };
  },
  mounted() {
    this.USER_ID = localStorage.getItem('USER_ID');
    this.USER_NAME = localStorage.getItem('USER_NAME');
    this.USER_ROLE = localStorage.getItem('USER_ROLE');

    if (!this.USER_ROLE) {
      // Perform any necessary actions, such as redirecting to the login page
    }

    this.fetchData();
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
    async uploadImage() {
      try {
        if (!this.image) {
          return; // No file selected, exit the method
        }

        // Create a FormData object
        const formData = new FormData();
        // Append the image file to the FormData object
        formData.append('image', this.image);

        // Send a POST request to the 'uploadFile' endpoint
        const response = await axios.post(
          'https://octopus-app-n476x.ondigitalocean.app/uploadFile',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
            },
          }
        );

        // Check if the response status is successful
        if (response.data.status && response.data.message === 'SUCCESS' && response.data.data) {
          // Save the uploaded image URL
          this.imageUrl = response.data.data;
          // Set imageUploaded to true
          this.imageUploaded = true;
          // Assign the uploaded image URL to photo
          this.photo = this.imageUrl;
        } else {
          console.error('Error uploading image:', response.data.message);
        }
      } catch (error) {
        // Handle errors
        console.error('Error uploading image:', error);
      }
    },
    async savePhoto() {
      try {
        const data = {
          image: this.photo,
        };

        const response = await axios.post(
          'https://octopus-app-n476x.ondigitalocean.app/image',
          data,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        console.log('Response:', response.data);
        Swal.fire({
          title: 'Success',
          text: 'Village details saved successfully',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } catch (error) {
        console.error('Error:', error);
        let errorMessage = 'An error occurred while saving the village details';
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        Swal.fire({
          title: 'Error',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
      window.location.reload();
    },
  },
  computed: {
    currentPhoto() {
      return this.imagesData[this.currentIndex]?.image || '';
    },
  },
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.fixed-panel {
  position: fixed;
  top: 90px;
  /* Adjust as needed */
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  background-color: white;
  /* Optional: if you want a background */
  padding: 10px;
  /* Optional: for spacing around the content */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  /* Optional: for a shadow effect */
}

.gallery-card {
  width: 1500px;
  margin-top: 150px;
  /* Adjust as needed */
  border: 1px solid rgb(2, 4, 5);

}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  font-size: 44px;
  background-color: #d6d6d6;
  line-height: 1;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: #333;
  text-align: center;
}

.close-btn:hover {
  border-color: #ec0505;
  background-color: #ec0505;
  color: #d6d6d6;
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

.center-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
}
</style>
