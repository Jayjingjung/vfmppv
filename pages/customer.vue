<template>
  <v-container>
    <v-form @submit.prevent="submitForm">
      <!-- Your form fields here -->
      <v-text-field v-model="userName" label="Username"></v-text-field>
      <v-text-field v-model="phoneNumber" label="Phone Number"></v-text-field>
      <v-text-field v-model="password" label="Password" type="password"></v-text-field>
      <v-text-field v-model="email" label="Email"></v-text-field>
      <v-text-field v-model="village" label="Village"></v-text-field>
      <v-text-field v-model="district" label="District"></v-text-field>
      <v-text-field v-model="province" label="Province"></v-text-field>
      <v-text-field v-model="villageCode" label="Village Code"></v-text-field>
      <v-select
        v-model="role"
        :items="['STAFF', 'ADMIN', 'TRETTER']"
        label="Role"
      ></v-select>

      <v-btn type="submit" color="primary">Submit</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      userName: "",
      phoneNumber: "",
      password: "",
      email: "",
      village: "",
      district: "",
      province: "",
      villageCode: "",
      role: "",
      TOKEN: "YOUR_ACTUAL_TOKEN_VALUE",
    };
  },
  methods: {
    async submitForm() {
      // Replace 'https://trackingapp-qupd.onrender.com/user/create' with your actual API endpoint
      const apiEndpoint = 'https://trackingapp-qupd.onrender.com/user/create';

      try {
        // Retrieve the token from local storage
        const storedToken = localStorage.getItem('TOKEN');

        if (!storedToken) {
          console.error('Token not found in local storage');
          return;
        }

        // Replace 'YOUR_BEARER_TOKEN' with your actual Bearer TOKEN
        const headers = {
          Authorization: `Bearer ${storedToken}`, // Use the retrieved token with the "Bearer " prefix
          'Content-Type': 'application/json',
        };

        console.log('Token:', storedToken); // Log the retrieved token

        const userData = {
          userName: this.userName,
          phoneNumber: this.phoneNumber,
          password: this.password,
          email: this.email,
          village: this.village,
          district: this.district,
          province: this.province,
          villageCode: this.villageCode,
          role: this.role,
        };

        console.log('Request Payload:', userData); // Log the request payload

        // Use this.$axios.post instead of this.$axios.$post
        const response = await this.$axios.post(apiEndpoint, userData, { headers });

        // Handle success
        console.log('Response:', response.data);
        // Optionally, you can navigate to another page or display a success message here.

      } catch (error) {
        // Handle errors
        console.error('Error submitting form:', error);
        // Optionally, you can display an error message or perform other actions based on the error.
      }
    }
  }
};
</script>
