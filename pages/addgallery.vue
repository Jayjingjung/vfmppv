<template>
    <div>
      <div style="display: flex; margin-top: 50px;">
        <v-card style="width: 800px;">
          <v-file-input
            style="margin-top: 10px; margin-right: 10px;"
            v-model="image"
            label="Select an image"
            accept="image/*"
            outlined
            @change="uploadImage"
          ></v-file-input>
          <!-- <v-img v-if="imageUrl" :src="imageUrl" max-width="100%" style="margin-top: 10px;"></v-img> -->
        </v-card>
        <v-card style="width: 800px;">
          <div v-for="(item, index) in photo" :key="index" style="display: flex; margin-left: 20px; margin-right: 20px;">
            <v-text-field
              style="width: 200px;"
              v-model="item.image"
              label="image"
              dense
              outlined
              background-color="#f5f5f5"
            ></v-text-field>
            <v-btn icon @click="removePhoto(index)">
              <v-icon color="red">mdi-delete</v-icon>
            </v-btn>
          </div>
          <div style="margin-left: 20px; margin-right: 20px;">
            <v-btn style="width: 100px; background-color: green; color: white;" @click="addPhoto">Add</v-btn>
          </div>
          <div style="display: flex; justify-content: center; margin-top: 20px;">
            <v-btn
              style="width: 100px; background-color: green; color: white;"
              @click="savePhoto"
              :disabled="!photo.length"
            >
              Save
            </v-btn>
          </div>
        </v-card>
      </div>
      <div v-if="imageUrl" style="margin-top: 20px;">
        <h3>Image Preview:</h3>
        <v-img :src="imageUrl" max-width="800px"></v-img>
      </div>
    </div>
  </template>
  
  <script>
  import Swal from 'sweetalert2';
  import axios from 'axios';
  
  export default {
    data() {
      return {
        photo: [{ image: '' }],
        image: null,
        imageUrl: '',
        imageUploaded: false,
      };
    },
    methods: {
      addPhoto() {
        this.photo.push({ image: '' });
      },
      removePhoto(index) {
        this.photo.splice(index, 1);
      },
      async savePhoto() {
        try {
          const data = this.photo;
  
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
          const response = await axios.post('https://octopus-app-n476x.ondigitalocean.app/uploadFile', formData, {
            headers: {
              'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
            },
          });
  
          // Check if the response status is successful
          if (response.data.status && response.data.message === 'SUCCESS' && response.data.data) {
            // Save the uploaded image URL
            this.imageUrl = response.data.data;
            // Set imageUploaded to true
            this.imageUploaded = true;
          } else {
            console.error('Error uploading image:', response.data.message);
          }
        } catch (error) {
          // Handle errors
          console.error('Error uploading image:', error);
        }
      },
    },
  };
  </script>
  