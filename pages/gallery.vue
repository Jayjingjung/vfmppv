<template>
  <div class="image-gallery-container">
    <div v-if="showUploadPanel && USER_ROLE === 'ADMIN'" class="fixed-upload-panel">
      <v-card class="upload-card">
        <v-file-input v-model="selectedImageFile" label="Select an image" accept="image/*" outlined dense
          @change="handleImageFileChange" class="file-input"></v-file-input>

        <v-btn :loading="isUploading" :disabled="!selectedImageFile" color="green" dark class="upload-button"
          @click="saveUploadedImage">
          {{ isUploading ? 'Uploading...' : 'Save Photo' }}
        </v-btn>
      </v-card>

      <div v-if="uploadedImageUrl" class="image-preview-container">
        <h3>Image Preview:</h3>
        <v-img :src="uploadedImageUrl" max-width="300px"></v-img>
      </div>
    </div>
    <gallery />

    <v-card class="gallery-main-card">
      <v-card-title class="gallery-header">
        <p class="gallery-title">ຮູບພາບ ລວມ</p>
        <v-spacer></v-spacer>
        <v-btn v-if="USER_ROLE === 'ADMIN'" color="green" dark class="upload-toggle-button" @click="toggleUploadPanel">
          Upload
        </v-btn>
      </v-card-title>

      <div v-if="isLoading" class="loading-indicator">Loading images...</div>
      <div v-else-if="images.length === 0" class="no-images-message">No images to display.</div>
      <div v-else class="gallery-grid">
        <div v-for="(image, index) in images" :key="image.id || index" class="gallery-item"
          @click="openImagePopup(index)">
          <img :src="image.image" :alt="'Gallery Image ' + (index + 1)" class="gallery-image" />
        </div>
      </div>

      <div v-if="isPopupOpen" class="image-popup-overlay" @click.self="closeImagePopup">
        <div class="image-popup-content">
          <span class="close-btn" @click="closeImagePopup">&times;</span>
          <img :src="currentImageInPopup" :alt="'Photo ' + (currentImageIndex + 1)" class="popup-image" />
          <div class="navigation-controls">
            <button @click="navigateImage(-1)" :disabled="currentImageIndex === 0"
              class="nav-btn prev-btn">Previous</button>
            <button @click="navigateImage(1)" :disabled="currentImageIndex === images.length - 1"
              class="nav-btn next-btn">Next</button>
          </div>
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
      images: [],
      USER_ROLE: '', // Will store the user's role
      isLoading: false, // Indicates if images are being fetched
      isUploading: false, // Indicates if an image is being uploaded
      showUploadPanel: false, // Controls visibility of the upload panel
      isPopupOpen: false, // Controls visibility of the image popup
      currentImageIndex: 0, // Index of the image currently shown in the popup
      selectedImageFile: null, // Holds the File object selected by the user
      uploadedImageUrl: '', // Stores the URL returned from the image upload API
    };
  },
  mounted() {
    this.USER_ROLE = localStorage.getItem('USER_ROLE');
    // Consider adding a check if USER_ROLE is not set, maybe redirect to login

    this.fetchImages();
  },
  methods: {
    /**
     * Toggles the visibility of the image upload panel.
     */
    toggleUploadPanel() {
      this.showUploadPanel = !this.showUploadPanel;
      // Reset upload state when panel is closed or opened
      if (!this.showUploadPanel) {
        this.selectedImageFile = null;
        this.uploadedImageUrl = '';
      }
    },

    /**
     * Fetches image data from the API.
     */
    async fetchImages() {
      this.isLoading = true;
      try {
        const response = await axios.get('https://api.vfmp.dof.maf.gov.la/images');
        if (response.data && response.data.data) {
          this.images = response.data.data;
        } else {
          console.warn('API response did not contain expected data:', response.data);
          this.images = []; // Ensure images is an array even if data is missing
        }
      } catch (error) {
        console.error('Error fetching images:', error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to load images. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
        this.images = []; // Clear images on error
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * Handles the change event for the file input.
     * Sets the selected file and generates a preview URL.
     */
    handleImageFileChange(event) {
      const file = event.target.files ? event.target.files[0] : null;
      if (file) {
        this.selectedImageFile = file;
        this.uploadedImageUrl = URL.createObjectURL(file); // Create a local URL for preview
      } else {
        this.selectedImageFile = null;
        this.uploadedImageUrl = '';
      }
    },

    /**
     * Uploads the selected image to the server and saves its reference.
     */
    async saveUploadedImage() {
      if (!this.selectedImageFile) {
        Swal.fire('Warning', 'Please select an image to upload.', 'warning');
        return;
      }

      this.isUploading = true;
      try {
        const formData = new FormData();
        formData.append('image', this.selectedImageFile);

        // Upload the image file
        const uploadResponse = await axios.post('/uploadFile', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        if (uploadResponse.data.status && uploadResponse.data.message === 'SUCCESS' && uploadResponse.data.data) {
          const imageUrlOnServer = uploadResponse.data.data;

          // Now save the image URL to your gallery database
          const saveResponse = await axios.post('/image', { image: imageUrlOnServer }, {
            headers: { 'Content-Type': 'application/json' },
          });

          if (saveResponse.data) {
            Swal.fire('Success', 'Image uploaded and saved successfully!', 'success');
            this.selectedImageFile = null;
            this.uploadedImageUrl = '';
            this.showUploadPanel = false; // Close panel after successful upload
            this.fetchImages(); // Refresh gallery
          } else {
            throw new Error('Failed to save image reference in database.');
          }
        } else {
          throw new Error(uploadResponse.data.message || 'Image upload failed.');
        }
      } catch (error) {
        console.error('Error during image upload or save:', error);
        let errorMessage = 'An error occurred during upload. Please try again.';
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        Swal.fire('Error', errorMessage, 'error');
      } finally {
        this.isUploading = false;
      }
    },

    /**
     * Opens the image popup with the selected image.
     * @param {number} index - The index of the image to display.
     */
    openImagePopup(index) {
      this.currentImageIndex = index;
      this.isPopupOpen = true;
    },

    /**
     * Closes the image popup.
     */
    closeImagePopup() {
      this.isPopupOpen = false;
    },

    /**
     * Navigates to the next or previous image in the popup.
     * @param {number} direction - -1 for previous, 1 for next.
     */
    navigateImage(direction) {
      const newIndex = this.currentImageIndex + direction;
      if (newIndex >= 0 && newIndex < this.images.length) {
        this.currentImageIndex = newIndex;
      }
    },
  },
  computed: {
    /**
     * Returns the URL of the image currently displayed in the popup.
     */
    currentImageInPopup() {
      return this.images[this.currentImageIndex]?.image || '';
    },
  },
};
</script>

<style scoped>
/* Scoped styles ensure these styles only apply to this component */
.image-gallery-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.fixed-upload-panel {
  position: fixed;
  top: 90px;
  /* Adjust as needed to avoid header */
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  width: 90%;
  /* Responsive width */
  max-width: 500px;
  /* Max width for larger screens */
}

.upload-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 10px;
}

.file-input {
  margin-bottom: 0px !important;
  /* Adjust default vuetify margin */
}

.upload-button {
  width: 100%;
  text-transform: uppercase;
}

.image-preview-container {
  text-align: center;
  width: 100%;
}

.image-preview-container h3 {
  margin-bottom: 10px;
  color: #333;
}

.gallery-main-card {
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  /* Ensure content stays within card */
  margin-top: 98px;
  /* Space for the fixed panel */
}

.gallery-header {
  background-color: #009f62;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.gallery-title {
  font-size: 28px;
  font-weight: 500;
  color: aliceblue;
  margin: 0;
}

.upload-toggle-button {
  min-width: 120px;
  text-transform: uppercase;
}

.loading-indicator,
.no-images-message {
  text-align: center;
  padding: 40px 20px;
  font-size: 1.2em;
  color: #666;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  /* Adjusted minmax for better flexibility */
  gap: 18px;
  max-width: 1300px;
  margin: 20px auto;
  padding: 0 15px;
  /* Add some padding on smaller screens */
}

.gallery-item {
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.gallery-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.gallery-image {
  width: 100%;
  height: 200px;
  /* Fixed height for consistent grid */
  object-fit: cover;
  border-radius: 8px;
  display: block;
  /* Remove extra space below image */
}

/* Image Popup Styles */
.image-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.image-popup-content {
  background-color: white;
  padding: 5px;
  border-radius: 10px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  position: relative;
  max-width: 90vw;
  /* Max width relative to viewport */
  max-height: 90vh;

  /* Max height relative to viewport */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.popup-image {
  max-width: 100%;
  max-height: 70vh;
  /* Make image responsive within popup */
  object-fit: contain;
  /* Ensure entire image is visible */
  border-radius: 5px;
  margin-bottom: 20px;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer;
  font-size: 36px;
  color: #fff;
  /* White color for contrast on dark overlay */
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  transition: background-color 0.3s ease;
}

.close-btn:hover {
  background-color: #ec0505;
}

.navigation-controls {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.nav-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #009f62;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  min-width: 100px;
}

.nav-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.nav-btn:hover:not(:disabled) {
  background-color: #007b50;
}

.prev-btn {
  margin-right: 15px;
}
</style>