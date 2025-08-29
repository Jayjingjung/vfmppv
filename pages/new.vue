<template>
    <v-container class="py-10">
      <!-- Header -->
      <div class="mx-auto max-w">
        <h1 class="display-1 font-weight-bold mb-2">
          News
        </h1>
      </div>
  
      <!-- Grid of cards -->
      <v-row class="mt-8" dense>
        <v-col v-for="(item, i) in news" :key="i" cols="10" md="4">
          <v-card class="hover-card" outlined>
            <!-- Image click opens dialog -->
            <v-img
              :src="item.image"
              style="height: 250px; cursor: pointer;"
              @click="openImage(item.image)"
            />
            <v-card-text class="py-4">
              <h3 class="font-weight-bold mb-2">{{ item.title }}</h3>
              <div class="caption grey--text">{{ item.date }}</div>
            </v-card-text>
  
            <v-expand-transition>
              <div v-if="revealId === item.id" class="position-absolute w-100" height="100%" style="bottom: 0;">
                <v-card-text class="pb-0">
                  <p class="text-medium-emphasis">{{ item.description }}</p>
                </v-card-text>
              </div>
            </v-expand-transition>
            <v-card-actions>
              <v-btn color="teal-accent-4" variant="text" @click="toggleReveal(item.id)">
                Learn More
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
  
      <!-- Fullscreen image dialog -->
      <v-dialog v-model="dialog" max-width="800px">
        <v-card>
          <v-img :src="dialogImage" style="max-height:80vh; object-fit: contain;" />
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  
  <script>
  export default {
    name: "NewsHome",
    data() {
      return {
        news: [
          {
            id: 1,
            title: "ຈັດຝືກອົບຮົມການນຳໃຊ້ເຄື່ອງມີກວດກາລາດຕະເວນປ່າໄມ້",
            Enddate: "2025-08-08",
            Startdate: "2025-08-08",
            image:
              "http://res.cloudinary.com/dbnjr4jnn/image/upload/v1754988245/vfmp_phonsai-1754988243085.jpg",
            description:
              "ຈັດຝືກອົບຮົມການນຳໃຊ້ເຄື່ອງມີກວດກາລາດຕະເວນປ່າໄມ້ ໃຫ້ປະຊາຊົນເຂດບ້ານເປົ້າຫມາຍຂອງໂຄງການຄຸ້ມຄອງປ່າໄມ້ບ້ານ ເມືອງໂພນໄຊ",
          },
        ],
        revealId: null, // track which news card is expanded
        dialog: false, // controls image dialog
        dialogImage: null, // current image to show in dialog
      };
    },
    methods: {
      toggleReveal(id) {
        this.revealId = this.revealId === id ? null : id;
      },
      openImage(imgUrl) {
        this.dialogImage = imgUrl;
        this.dialog = true;
      },
    },
  };
  </script>
  
  