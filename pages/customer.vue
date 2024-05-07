<template>
  <div style="display: flex;">
    <div class="centered-container">
      <v-card>
        <v-list class="mr-10 ml-10" @submit.prevent="submitForm">
          <!-- Your form fields here -->
          <v-text-field v-model="userName" label="Username"></v-text-field>
          <v-text-field v-model="phoneNumber" label="Phone Number"></v-text-field>
          <v-text-field v-model="password" label="Password" type="password"></v-text-field>
          <v-text-field v-model="email" label="Email"></v-text-field>
          <v-text-field v-model="village" label="Village"></v-text-field>
          <v-text-field v-model="district" label="District"></v-text-field>
          <v-text-field v-model="province" label="Province"></v-text-field>
          <v-text-field v-model="villageCode" label="Village Code"></v-text-field>
          <v-select v-model="role" :items="['STAFF', 'ADMIN', 'TRETTER']" label="Role"></v-select>

          <v-btn @click="submitForm" type="submit" color="primary">Submit</v-btn>
        </v-list>
      </v-card>
    </div>
    <div style="margin-left: 10px;">
      <v-dialog v-model="loading_processing" persistent width="55">
        <v-card width="55" height="55" class="pt-3 pl-3">
          <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
        </v-card>
      </v-dialog>

      <v-card class="card-shadow mb-6" rounded="lg">
        <v-card-title style="background-color:#F9944A">
          <div style="display:flex;justify-content:space-between;width:100%">
            <span class="white--text">ລາຍລະອຽດຂໍ້້ມູນຜູ້ໃຊ້ລະບົບ</span>
            <v-btn color="#fff" @click="showModalAddUser = true" elevation="0" rounded>
              <v-icon color="#E57373">mdi-plus</v-icon>
              <span style="color: #F9944A;">ເພີ່ມຂໍ້ມູນ</span>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text>
          <v-data-table :headers="user_table_headers" :items="user_data_list" :search="search_user" item-key="userId">
            <template v-slot:item="{ item }">
              <tr>
                <td>{{ item.userName }}</td>
                <td>{{ item.phoneNumber }}</td>
                <td>{{ item.role }}</td>
                <td>{{ item.address.province }}</td>
                <td>{{ item.address.district }}</td>
                <td>{{ item.address.village }}</td>
                <td>{{ item.email }}</td>
                <td>
                  <v-btn class="red" small @click="delete_user(item._id)">
                    <v-icon color="white">mdi-delete</v-icon>
                    <span class="white--text">ລຶບ</span>
                  </v-btn>
                </td>


              </tr>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert2'; // Import SweetAlert
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
      email: "",
      TOKEN: "YOUR_ACTUAL_TOKEN_VALUE",
      loading_processing: false,

      user_data_list: [],
      user_table_headers: [
        { text: 'ຊື່ຜູ້ໃຊ້ລະບົບ', value: 'name' },
        { text: 'ເບີ', value: '' },
        { text: 'ສິດເຂົ້າໃຊ້ ', value: 'role' },
        { text: 'ເເຂວງ', value: 'userid' },
        { text: 'ເມື່ອງ', value: 'district' },
        { text: 'ບ້ານ', value: '' },
        { text: 'email', value: 'email' },
        { text: '', value: '' },
      ],
      selectedUser: {
        village: '',
        district: '',
        province: '',
        userName: '',
        role: '',
      },
      search_user: '', // Define and initialize the search_user property

    };
  },
  mounted() {
    this.onGetUserList()
  },
  methods: {
    async onGetUserList() {
      try {
        this.loading_processing = true;

        // Get the Bearer token from local storage
        const token = localStorage.getItem('TOKEN');

        // Check if the token exists
        if (!token) {
          // Handle the case where the token is not available (e.g., redirect to login)
          console.error('Bearer token is missing.');
          return;
        }

        let data = { "getsUser": "" };

        // Make API request with Authorization header
        const response = await this.$axios.$get('/user/gets', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: data, // Include your data as params
        });

        if (response?.status === true) {
          this.loading_processing = false;
          console.log('user:', response.data);
          this.user_data_list = response.data;
        } else {
          this.loading_processing = false;
          swal.fire({
            title: 'ແຈ້ງເຕືອນ',
            text: response?.message,
            icon: 'info',
            allowOutsideClick: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          });
        }
      } catch (error) {
        this.loading_processing = false;
        swal.fire({
          title: 'ແຈ້ງເຕືອນ',
          text: error,
          icon: 'error',
          allowOutsideClick: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        });
      }
    },
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
        this.onGetUserList();
      } catch (error) {
        // Handle errors
        console.error('Error submitting form:', error);
        // Optionally, you can display an error message or perform other actions based on the error.
      }
    },
    async delete_user(_id) {
      try {
        this.loading_processing = true;

        // Get the Bearer token from local storage
        const token = localStorage.getItem('TOKEN');

        // Check if the token exists
        if (!token) {
          console.error('Bearer token is missing.');
          return;
        }

        // Make DELETE request to your API endpoint
        const response = await this.$axios.delete(`/user/delete/${_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response?.status === true) {
          this.loading_processing = false;
          console.log('User deleted:', _id);
          // Optionally, you can refresh the user list after deletion
          window.location.reload();
       
        } else {
          this.loading_processing = false;
          swal.fire({
            title: 'ແຈ້ງເຕືອນ',
            text: response?.message,
            icon: 'info',
            allowOutsideClick: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          });
        }
      } catch (error) {
        this.loading_processing = false;
        swal.fire({
          title: 'ແຈ້ງເຕືອນ',
          text: error,
          icon: 'error',
          allowOutsideClick: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        });
      }
    },
  }
};
</script>
<style>
.centered-container {
  display: flex;
  justify-content: flex-start;
  /* align-items: flex-start; */
  height: 80vh;
  /* Ensures the container takes up the full viewport height */
}

.tops {
  margin-top: -25px;
  font-size: 12px;
}
</style>