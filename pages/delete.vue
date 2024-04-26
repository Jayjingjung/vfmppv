<template>
    <div>
      <v-btn @click="confirmDeleteAllUsers" color="error">Delete All Users</v-btn>
    </div>
  </template>
  
  <script>
  import swal from 'sweetalert2';
  
  export default {
    methods: {
      async confirmDeleteAllUsers() {
        const userConfirmed = await this.showConfirmationDialog();
  
        if (userConfirmed) {
          await this.deleteAllUsers();
        } else {
          console.log('Deletion canceled by the user.');
        }
      },
      async showConfirmationDialog() {
        return swal.fire({
          title: 'Are you sure?',
          text: 'Do you want to delete all Data?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete them!',
          cancelButtonText: 'Cancel',
        }).then((result) => {
          return result.isConfirmed;
        });
      },
      async deleteAllUsers() {
        try {
          // Replace 'https://trackingapp-qupd.onrender.com/user/deleteAll' with your actual API endpoint
          const apiEndpoint = 'https://trackingapp-qupd.onrender.com/user/deleteAll';
  
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
  
          // Use this.$axios.post instead of this.$axios.$post
          const response = await this.$axios.post(apiEndpoint, null, { headers });
  
          // Handle success
          console.log('Response:', response.data);
          // Optionally, you can perform other actions based on the success.
  
        } catch (error) {
          // Handle errors
          console.error('Error deleting all users:', error);
          // Optionally, you can display an error message or perform other actions based on the error.
        }
      }
    }
  };
  </script>
  