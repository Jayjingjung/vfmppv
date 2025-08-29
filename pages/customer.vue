<template>
  <div class="user-management-container">
    <v-card class="user-list-card" rounded="lg">
      <v-card-title class="card-header">
        <span class="header-title">ລາຍລະອຽດຂໍ້້ມູນຜູ້ໃຊ້ລະບົບ</span>
        <!-- <v-row justify="center">
                        <v-btn color="#f593b3" class="white--text" @click="print">
                            <v-icon>mdi-printer</v-icon>ພິມລາຍງານທັງໝົດ
                        </v-btn>
                    </v-row> -->
        <v-spacer></v-spacer>
        <v-text-field v-model="search_user" append-icon="mdi-magnify" label="Search User" single-line hide-details dense
          class="search-input"></v-text-field>
      </v-card-title>

      <v-card-text>
        <v-data-table :headers="user_table_headers" :items="user_data_list" :search="search_user" item-key="_id"
          :loading="loading_processing" loading-text="Loading user data... Please wait"
          no-data-text="No user data available">
          <template v-slot:item="{ item }">
            <tr>
              <td>{{ item.userName }}</td>
              <td>{{ item.phoneNumber }}</td>
              <td>{{ item.role }}</td>
              <td>{{ item.address ? item.address.province : 'N/A' }}</td>
              <td>{{ item.address ? item.address.district : 'N/A' }}</td>
              <td>{{ item.address ? item.address.village : 'N/A' }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.address ? item.address.villageCode : 'N/A' }}</td>
              <td>
                <v-btn small color="red" dark @click="confirmDeleteUser(item._id)">
                  <v-icon left>mdi-delete</v-icon>
                  ລຶບ
                </v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <div style="display:none">
      <div id="modalInvoice">

        <div class="text-center"
          style="display:flex;justify-content:center;font-size:20px;font-weight:bold;margin-top: 10px;">
          ລາຍຊື່ ລະຫັດ</div>
        <div style="margin-top: 20px;">
          <table style="padding:2px;border: 0.5px solid #999;border-collapse: collapse;width:100%; font-size: 12px">
            <tr style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;border-radius:10px">
              <td
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px"
                class="font-weight-bold">ລຳດັບ</td>

            </tr>
            <tr style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;border-radius:10px"
              v-for="(item, i) in user_data_list" :key="i">
              <td
                style="padding:10px;border: 0.5px solid #999;border-collapse: collapse;color:#000;border-top-right-radius:3px;text-align: center;"
                class="font-weight-bold">{{ i + 1 }}</td>

            </tr>
          </table>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'; // Use Swal for consistency

export default {
  data() {
    return {
      // Data properties for new user creation are not directly used in this component's template,
      // but are kept for completeness if you decide to add a user creation form later.
      userName: '',
      phoneNumber: '',
      password: '',
      email: '',
      village: '',
      district: '',
      province: '',
      villageCode: '',
      role: '',

      loading_processing: false, // Controls loading state for data table
      user_data_list: [], // Holds the list of users
      search_user: '', // Search input for the data table

      // Headers for the Vuetify data table
      user_table_headers: [
        { text: 'ຊື່ຜູ້ໃຊ້ລະບົບ', value: 'userName', sortable: true },
        { text: 'ເບີໂທລະສັບ', value: 'phoneNumber', sortable: false },
        { text: 'ສິດເຂົ້າໃຊ້', value: 'role', sortable: true },
        { text: 'ແຂວງ', value: 'address.province', sortable: true },
        { text: 'ເມືອງ', value: 'address.district', sortable: true },
        { text: 'ບ້ານ', value: 'address.village', sortable: true },
        { text: 'Email', value: 'email', sortable: false },
        { text: 'ລະຫັດບ້ານ', value: 'address.villageCode', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    };
  },
  mounted() {
    this.fetchUserList(); // Call the method to get the user list when the component mounts
  },
  methods: {
    print() {
      const modal = document.getElementById("modalInvoice")
      const cloned = modal.cloneNode(true)
      let section = document.getElementById("print")
      if (!section) {
        section = document.createElement("div")
        section.id = "print"
        document.body.appendChild(section)
      }
      section.innerHTML = "";
      section.appendChild(cloned);
      window.print();
    },
    /**
     * Fetches the list of users from the API.
     * Handles loading states, API errors, and updates the user_data_list.
     */
    async fetchUserList() {
      this.loading_processing = true;
      try {
        const token = localStorage.getItem('TOKEN');
        if (!token) {
          Swal.fire('Authentication Error', 'Bearer token is missing. Please log in again.', 'error');
          // Consider redirecting to login page
          return;
        }

        const response = await this.$axios.$get('/user/gets', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response?.status === true) {
          this.user_data_list = response.data || [];
          console.log('User data fetched:', this.user_data_list);
        } else {
          Swal.fire('Info', response?.message || 'Failed to retrieve user list.', 'info');
          this.user_data_list = []; // Clear list on API failure
        }
      } catch (error) {
        console.error('Error fetching user list:', error);
        Swal.fire('Error', 'An error occurred while fetching user data: ' + (error.message || 'Unknown error'), 'error');
        this.user_data_list = []; // Clear list on error
      } finally {
        this.loading_processing = false;
      }
    },

    /**
     * Displays a confirmation dialog before deleting a user.
     * @param {string} userId - The ID of the user to be deleted.
     */
    confirmDeleteUser(userId) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this user!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteUser(userId);
        }
      });
    },

    /**
     * Deletes a user from the API.
     * @param {string} userId - The ID of the user to delete.
     */
    async deleteUser(userId) {
      this.loading_processing = true;
      try {
        const token = localStorage.getItem('TOKEN');
        if (!token) {
          Swal.fire('Authentication Error', 'Bearer token is missing. Please log in again.', 'error');
          return;
        }

        const response = await this.$axios.delete(`/user/delete/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response?.data?.status === true) {
          Swal.fire('Deleted!', 'User has been deleted successfully.', 'success');
          this.fetchUserList(); // Refresh the list after successful deletion
        } else {
          Swal.fire('Error', response?.data?.message || 'Failed to delete user.', 'error');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        Swal.fire('Error', 'An error occurred while deleting the user: ' + (error.message || 'Unknown error'), 'error');
      } finally {
        this.loading_processing = false;
      }
    },

    /**
     * This method is a placeholder. If you add a user creation form,
     * this is where you would handle the submission logic.
     */
    async submitForm() {
      // This method's logic should be placed in a separate component
      // or managed differently if you add a user creation form.
      console.warn("submitForm is not actively used in this component's template.");
      // Example of handling creation if uncommented later:
      /*
      try {
        const storedToken = localStorage.getItem('TOKEN');
        if (!storedToken) {
          Swal.fire('Authentication Error', 'Token not found for user creation.', 'error');
          return;
        }

        const headers = {
          Authorization: `Bearer ${storedToken}`,
          'Content-Type': 'application/json',
        };

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

        const response = await this.$axios.post('/user/create', userData, { headers });

        if (response.data?.status === true) {
          Swal.fire('Success', 'User created successfully!', 'success');
          this.fetchUserList(); // Refresh list
          // Clear form fields here
        } else {
          Swal.fire('Error', response.data?.message || 'Failed to create user.', 'error');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        Swal.fire('Error', 'An error occurred during user creation: ' + (error.message || 'Unknown error'), 'error');
      }
      */
    },
  },
};
</script>

<style scoped>
/*
---
## Component Container
*/
.user-management-container {
  display: flex;
  justify-content: center;
  /* Center the card horizontally */
  padding: 40px 20px;
  /* Add some padding around the container */
  width: 100%;
}

/*
---
## User List Card
*/
.user-list-card {
  width: 100%;
  max-width: 1400px;
  /* Limit max width for better readability on very wide screens */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  /* More subtle shadow */
}

.card-header {
  background-color: #F9944A;
  /* Orange header color */
  color: white;
  display: flex;
  align-items: center;
  padding: 15px 20px;
  /* Adjust padding */
}

.header-title {
  font-size: 24px;
  font-weight: 500;
}

.search-input {
  max-width: 300px;
  /* Limit search input width */
  margin-left: 20px;
  /* Space between title and search */
  color: white !important;
  /* Ensure text is white */
}

/* Override Vuetify's default input colors for better contrast */
.search-input>>>.v-input__control .v-input__slot fieldset,
.search-input>>>.v-input__control .v-input__slot .v-label,
.search-input>>>.v-input__control .v-input__slot input,
.search-input>>>.v-input__control .v-input__slot .v-icon {
  color: white !important;
  border-color: white !important;
}

/*
---
## Data Table Styling
*/
.v-data-table {
  font-size: 14px;
}

/* Style for table headers */
.v-data-table>>>th {
  font-weight: bold !important;
  color: #333 !important;
  background-color: #f5f5f5;
}

/* Style for table rows */
.v-data-table>>>td {
  padding: 12px 16px;
}

/* Styling for the delete button */
.v-btn.red {
  background-color: #e53935 !important;
  /* Material Design Red 600 */
}

.v-btn.red .v-icon {
  color: white !important;
}

.v-btn.red .v-btn__content span {
  color: white !important;
}


@media screen {
  #print {
    display: none;
  }
}

@media print {
  @page {
    size: A4;
    margin: 1in;
  }

  body * {
    visibility: hidden;
  }

  #print,
  #print * {
    visibility: visible;
  }

  #print {
    position: absolute;
    top: 0px;
    right: 0px;
    left: 0px;
  }
}
</style>