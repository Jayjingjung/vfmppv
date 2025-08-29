<template>
  <v-container>


   
      <!-- Section 1 -->
      <h2 class="pa-4 text-h6 mb-4">
        ບຸກປ່າ ເພື່ອປູກປ່າໄມ້ບ້ານຫ້ວຍທ້ອມ
      </h2>
      <v-sheet class="mx-auto" elevation="8" >
        <v-slide-group show-arrows>
          <v-slide-group-item v-for="(img, index) in section1" :key="index">
            <v-card class="ma-2" height="auto" width="auto" @click="openImagePopup(index)">
              <v-img :src="img" width="290" height="240" cover />
            </v-card>
          </v-slide-group-item>
        </v-slide-group>

      </v-sheet>
    

    <!-- Popup overlay -->
    <div v-if="isPopupOpen" class="image-popup-overlay" @click.self="closeImagePopup">

      <div class="image-popup-content">
        <span class="close-btn" @click="closeImagePopup">&times;</span>

        <img :src="currentImageInPopup" :alt="'Photo ' + (currentImageIndex + 1)" class="popup-image" width="690"
          height="610" />
        <div class="navigation-controls">
          <button @click="navigateImage(-1)" :disabled="currentImageIndex === 0" class="nav-btn prev-btn">
            Previous
          </button>
          <button @click="navigateImage(1)" :disabled="currentImageIndex === section1.length - 1"
            class="nav-btn next-btn">
            Next
          </button>
        </div>
      </div>

    </div>
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue";

const section1 = ref([
  "http://res.cloudinary.com/dbnjr4jnn/image/upload/v1754988245/vfmp_phonsai-1754988243085.jpg",
  "http://res.cloudinary.com/dbnjr4jnn/image/upload/v1754988245/vfmp_phonsai-1754988243085.jpg",
  "http://res.cloudinary.com/dbnjr4jnn/image/upload/v1754988245/vfmp_phonsai-1754988243085.jpg",
  "http://res.cloudinary.com/dbnjr4jnn/image/upload/v1754988245/vfmp_phonsai-1754988243085.jpg",
  "http://res.cloudinary.com/dbnjr4jnn/image/upload/v1754988245/vfmp_phonsai-1754988243085.jpg",
  "http://res.cloudinary.com/dbnjr4jnn/image/upload/v1754988245/vfmp_phonsai-1754988243085.jpg",
  "http://res.cloudinary.com/dbnjr4jnn/image/upload/v1754988245/vfmp_phonsai-1754988243085.jpg",
  "http://res.cloudinary.com/dbnjr4jnn/image/upload/v1754988245/vfmp_phonsai-1754988243085.jpg",
]);

const isPopupOpen = ref(false);
const currentImageIndex = ref(0);

const currentImageInPopup = computed(() => section1.value[currentImageIndex.value]);

function openImagePopup(index) {
  currentImageIndex.value = index;
  isPopupOpen.value = true;
}

function closeImagePopup() {
  isPopupOpen.value = false;
}

function navigateImage(step) {
  const newIndex = currentImageIndex.value + step;
  if (newIndex >= 0 && newIndex < section1.value.length) {
    currentImageIndex.value = newIndex;
  }
}
</script>

<style scoped>
.image-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  z-index: 999;
}

.image-popup-content {
  position: relative;
  text-align: center;
  max-width: 100%;
  max-height: 100%;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 28px;
  color: #fff;
  cursor: pointer;
}

/* responsive image */
.popup-image {
  width: auto;
  height: auto;
  max-width: 90vw;
  /* 90% ของ viewport width */
  max-height: 80vh;
  /* 80% ของ viewport height */
  border-radius: 8px;
  object-fit: contain;
}

.navigation-controls {
  margin-top: 12px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.nav-btn {
  margin: 6px 8px;
  padding: 8px 16px;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.nav-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* 📱 Mobile screen adjustments */
@media (max-width: 600px) {
  .popup-image {
    max-width: 100vw;
    max-height: 70vh;
  }

  .close-btn {
    font-size: 22px;
    top: 6px;
    right: 12px;
  }

  .nav-btn {
    font-size: 12px;
    padding: 6px 12px;
  }
}

/* 💻 Tablet screen */
@media (min-width: 601px) and (max-width: 960px) {
  .popup-image {
    max-width: 95vw;
    max-height: 75vh;
  }
}
</style>
