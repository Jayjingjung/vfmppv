<template>
    <div class="location-management-container">
        <v-dialog v-model="loading_processing" persistent width="55">
            <v-card width="55" height="55" class="d-flex align-center justify-center">
                <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
            </v-card>
        </v-dialog>

        <div class="content-wrapper">




            <v-card class="data-card" rounded="lg">
                <v-card-title class="card-header">
                    <span class="white--text">ລາຍລະອຽດແຂວງ</span>
                </v-card-title>
                <v-card-text>
                    <v-data-table :headers="province_table_headers" :items="province_list" :search="search_query"
                        item-key="_id" no-data-text="No provinces found.">
                        <template v-slot:item="{ item }">
                            <tr>
                                <td>{{ item.provinceLa }}</td>
                                <td>{{ item.provinceEn }}</td>
                                <td>
                                    <v-btn small class="green" dark @click="openAddDistrictDialog(item._id)">
                                        <v-icon left>mdi-plus</v-icon>
                                        ເພີ່ມເມືອງ
                                    </v-btn>
                                </td>
                                <td>
                                    <v-btn small class="blue" dark @click="fetchDistricts(item._id)">
                                        <v-icon left>mdi-eye</v-icon>
                                        ໂສເມືອງ
                                    </v-btn>
                                </td>
                            </tr>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>

            <v-card class="data-card" rounded="lg">
                <v-card-title class="card-header">
                    <span class="white--text">ລາຍລະອຽດເມືອງ</span>
                </v-card-title>
                <v-card-text>
                    <v-data-table :headers="district_table_headers" :items="district_list" :search="search_query"
                        item-key="_id" no-data-text="Select a province to view districts.">
                        <template v-slot:item="{ item }">
                            <tr>
                                <td>{{ item.districtLa }}</td>
                                <td>{{ item.districtEn }}</td>
                                <td>
                                    <v-btn small class="green" dark
                                        @click="openAddVillageDialog(item.provinceId, item._id)">
                                        <v-icon left>mdi-plus</v-icon>
                                        ເພີ່ມບ້ານ
                                    </v-btn>
                                </td>
                                <td>
                                    <v-btn small class="blue" dark @click="fetchVillages(item._id)">
                                        <v-icon left>mdi-eye</v-icon>
                                        ໂສບ້ານ
                                    </v-btn>
                                </td>
                            </tr>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>


        </div>

        <v-dialog v-model="showAddDistrictDialog" max-width="500px">
            <v-card>
                <v-card-title class="headline">ເພີ່ມເມືອງໃໝ່</v-card-title>
                <v-card-text>
                    <v-text-field v-model="newDistrict.districtLa" label="ຊື່ເມືອງ (ລາວ)" required></v-text-field>
                    <v-text-field v-model="newDistrict.districtEn" label="District Name (English)"
                        required></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text @click="closeAddDistrictDialog">ຍົກເລີກ</v-btn>
                    <v-btn color="green darken-1" text @click="saveDistrict"
                        :disabled="loading_processing">ບັນທຶກ</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="showAddVillageDialog" max-width="500px">
            <v-card>
                <v-card-title class="headline">ເພີ່ມບ້ານໃໝ່</v-card-title>
                <v-card-text>
                    <v-text-field v-model="newVillage.villageLa" label="ຊື່ບ້ານ (ລາວ)" required></v-text-field>
                    <v-text-field v-model="newVillage.villageEn" label="Village Name (English)" required></v-text-field>
                    <v-text-field v-model="newVillage.villageCode" label="ລະຫັດບ້ານ" required></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text @click="closeAddVillageDialog">ຍົກເລີກ</v-btn>
                    <v-btn color="green darken-1" text @click="saveVillage"
                        :disabled="loading_processing">ບັນທຶກ</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <div class="content-wrapper">
        <v-card class="data-card mt-10" rounded="lg">
            <v-card-title class="card-header">
                <span class="white--text">ລາຍລະອຽດບ້ານ</span>
            </v-card-title>
            <v-card-text>
                <v-data-table :headers="village_table_headers" :items="village_list" :search="search_query"
                    item-key="_id" no-data-text="Select a district to view villages.">
                    <template v-slot:item="{ item }">
                        <tr>
                            <td>{{ item.villageCode }}</td>
                            <td>{{ item.villageLa }}</td>
                            <td>{{ item.villageEn }}</td>
                        </tr>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>

        <v-card class="form-card" rounded="lg">
            <v-card-title class="card-header">
                <span class="white--text">ເພີ່ມແຂວງໃໝ່</span>
            </v-card-title>
            <v-card-text>
                <v-form @submit.prevent="submitProvinceForm">
                    <v-text-field v-model="newProvince.provinceLa" label="ຊື່ແຂວງ (ລາວ)" required></v-text-field>
                    <v-text-field v-model="newProvince.provinceEn" label="Province Name (English)"
                        required></v-text-field>
                    <v-btn type="submit" color="primary" :disabled="loading_processing">
                        <v-icon left>mdi-content-save</v-icon>
                        ບັນທຶກແຂວງ
                    </v-btn>
                </v-form>
            </v-card-text>
        </v-card>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            loading_processing: false, // Global loading indicator for API calls

            // Data lists for tables
            province_list: [],
            district_list: [],
            village_list: [],

            // Form data for adding new entries
            newProvince: {
                provinceLa: '',
                provinceEn: '',
            },
            newDistrict: {
                provinceId: '', // Will be set when "Add District" is clicked
                districtLa: '',
                districtEn: '',
            },
            newVillage: {
                provinceId: '', // Will be set when "Add Village" is clicked
                districtId: '', // Will be set when "Add Village" is clicked
                villageLa: '',
                villageEn: '',
                villageCode: '',
            },

            // Dialog visibility controls
            showAddDistrictDialog: false,
            showAddVillageDialog: false,

            search_query: '', // General search input for all tables

            // Table headers
            province_table_headers: [
                { text: 'ຊື່ແຂວງ (ລາວ)', value: 'provinceLa' },
                { text: 'Province Name (English)', value: 'provinceEn' },
                { text: 'ເພີ່ມເມືອງ', value: 'add_district', sortable: false },
                { text: 'ສະແດງເມືອງ', value: 'show_districts', sortable: false },
            ],
            district_table_headers: [
                { text: 'ຊື່ເມືອງ (ລາວ)', value: 'districtLa' },
                { text: 'District Name (English)', value: 'districtEn' },
                { text: 'ເພີ່ມບ້ານ', value: 'add_village', sortable: false },
                { text: 'ສະແດງບ້ານ', value: 'show_villages', sortable: false },
            ],
            village_table_headers: [
                { text: 'ລະຫັດບ້ານ', value: 'villageCode' },
                { text: 'ຊື່ບ້ານ (ລາວ)', value: 'villageLa' },
                { text: 'Village Name (English)', value: 'villageEn' },
            ],
        };
    },
    mounted() {
        this.fetchProvinces(); // Load provinces on component mount
    },
    methods: {
        /**
         * Shows a SweetAlert2 notification.
         * @param {string} icon - 'success', 'error', 'info', 'warning', 'question'
         * @param {string} title - The title of the notification.
         * @param {string} text - The main message of the notification.
         */
        showSwal(icon, title, text) {
            Swal.fire({
                icon: icon,
                title: title,
                text: text,
                allowOutsideClick: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
            });
        },

        /**
         * Fetches the list of provinces from the API.
         */
        async fetchProvinces() {
            this.loading_processing = true;
            try {
                const response = await this.$axios.$get('/provinces');
                if (response?.status === true && response?.data) {
                    this.province_list = response.data;
                } else {
                    this.showSwal('info', 'ແຈ້ງເຕືອນ', response?.message || 'ບໍ່ມີຂໍ້ມູນແຂວງ.');
                    this.province_list = [];
                }
            } catch (error) {
                console.error('Error fetching provinces:', error);
                this.showSwal('error', 'ເກີດຂໍ້ຜິດພາດ', 'ເກີດຂໍ້ຜິດພາດໃນການໂຫຼດຂໍ້ມູນແຂວງ: ' + (error.message || error));
                this.province_list = [];
            } finally {
                this.loading_processing = false;
            }
        },

        /**
         * Fetches districts for a given province ID.
         * @param {string} provinceId - The ID of the province.
         */
        async fetchDistricts(provinceId) {
            this.loading_processing = true;
            // Clear previous district and village lists when fetching new districts
            this.district_list = [];
            this.village_list = [];
            try {
                const response = await this.$axios.$get(`/districts?provinceId=${provinceId}`);
                if (response?.status === true && response?.data) {
                    this.district_list = response.data;
                } else {
                    this.showSwal('info', 'ແຈ້ງເຕືອນ', response?.message || 'ບໍ່ມີຂໍ້ມູນເມືອງສຳລັບແຂວງນີ້.');
                    this.district_list = [];
                }
            } catch (error) {
                console.error('Error fetching districts:', error);
                this.showSwal('error', 'ເກີດຂໍ້ຜິດພາດ', 'ເກີດຂໍ້ຜິດພາດໃນການໂຫຼດຂໍ້ມູນເມືອງ: ' + (error.message || error));
                this.district_list = [];
            } finally {
                this.loading_processing = false;
            }
        },

        /**
         * Fetches villages for a given district ID.
         * @param {string} districtId - The ID of the district.
         */
        async fetchVillages(districtId) {
            this.loading_processing = true;
            // Clear previous village list when fetching new villages
            this.village_list = [];
            try {
                const response = await this.$axios.$get(`/villages?districtId=${districtId}`);
                if (response?.status === true && response?.data) {
                    this.village_list = response.data;
                } else {
                    this.showSwal('info', 'ແຈ້ງເຕືອນ', response?.message || 'ບໍ່ມີຂໍ້ມູນບ້ານສຳລັບເມືອງນີ້.');
                    this.village_list = [];
                }
            } catch (error) {
                console.error('Error fetching villages:', error);
                this.showSwal('error', 'ເກີດຂໍ້ຜິດພາດ', 'ເກີດຂໍ້ຜິດພາດໃນການໂຫຼດຂໍ້ມູນບ້ານ: ' + (error.message || error));
                this.village_list = [];
            } finally {
                this.loading_processing = false;
            }
        },

        /**
         * Handles the submission of the new province form.
         */
        async submitProvinceForm() {
            if (!this.newProvince.provinceLa || !this.newProvince.provinceEn) {
                this.showSwal('warning', 'ຄຳເຕືອນ', 'ກະລຸນາປ້ອນຂໍ້ມູນແຂວງໃຫ້ຄົບຖ້ວນ.');
                return;
            }
            this.loading_processing = true;
            try {
                const response = await this.$axios.post('/province', this.newProvince);
                if (response.data?.status === true) {
                    this.showSwal('success', 'ສຳເລັດ', 'ບັນທຶກແຂວງສຳເລັດແລ້ວ.');
                    this.newProvince = { provinceLa: '', provinceEn: '' }; // Reset form
                    this.fetchProvinces(); // Refresh province list
                } else {
                    this.showSwal('error', 'ເກີດຂໍ້ຜິດພາດ', response.data?.message || 'ບໍ່ສາມາດບັນທຶກແຂວງໄດ້.');
                }
            } catch (error) {
                console.error('Error submitting province form:', error);
                this.showSwal('error', 'ເກີດຂໍ້ຜິດພາດ', 'ເກີດຂໍ້ຜິດພາດໃນການເພີ່ມແຂວງ: ' + (error.message || error));
            } finally {
                this.loading_processing = false;
            }
        },

        /**
         * Opens the dialog for adding a new district.
         * Sets the provinceId for the new district.
         * @param {string} provinceId - The ID of the parent province.
         */
        openAddDistrictDialog(provinceId) {
            this.newDistrict.provinceId = provinceId;
            this.newDistrict.districtLa = ''; // Clear previous data
            this.newDistrict.districtEn = ''; // Clear previous data
            this.showAddDistrictDialog = true;
        },

        /**
         * Closes the add district dialog.
         */
        closeAddDistrictDialog() {
            this.showAddDistrictDialog = false;
            this.newDistrict = { provinceId: '', districtLa: '', districtEn: '' }; // Reset form
        },

        /**
         * Saves a new district to the API.
         */
        async saveDistrict() {
            if (!this.newDistrict.districtLa || !this.newDistrict.districtEn) {
                this.showSwal('warning', 'ຄຳເຕືອນ', 'ກະລຸນາປ້ອນຂໍ້ມູນເມືອງໃຫ້ຄົບຖ້ວນ.');
                return;
            }
            this.loading_processing = true;
            try {
                const response = await this.$axios.post('/district', this.newDistrict);
                if (response.data?.status === true) {
                    this.showSwal('success', 'ສຳເລັດ', 'ບັນທຶກເມືອງສຳເລັດແລ້ວ.');
                    this.closeAddDistrictDialog(); // Close dialog and reset form
                    this.fetchDistricts(this.newDistrict.provinceId); // Refresh district list for the current province
                } else {
                    this.showSwal('error', 'ເກີດຂໍ້ຜິດພາດ', response.data?.message || 'ບໍ່ສາມາດບັນທຶກເມືອງໄດ້.');
                }
            } catch (error) {
                console.error('Error saving district:', error);
                this.showSwal('error', 'ເກີດຂໍ້ຜິດພາດ', 'ເກີດຂໍ້ຜິດພາດໃນການເພີ່ມເມືອງ: ' + (error.message || error));
            } finally {
                this.loading_processing = false;
            }
        },

        /**
         * Opens the dialog for adding a new village.
         * Sets the provinceId and districtId for the new village.
         * @param {string} provinceId - The ID of the parent province.
         * @param {string} districtId - The ID of the parent district.
         */
        openAddVillageDialog(provinceId, districtId) {
            this.newVillage.provinceId = provinceId;
            this.newVillage.districtId = districtId;
            this.newVillage.villageLa = ''; // Clear previous data
            this.newVillage.villageEn = ''; // Clear previous data
            this.newVillage.villageCode = ''; // Clear previous data
            this.showAddVillageDialog = true;
        },

        /**
         * Closes the add village dialog.
         */
        closeAddVillageDialog() {
            this.showAddVillageDialog = false;
            this.newVillage = { provinceId: '', districtId: '', villageLa: '', villageEn: '', villageCode: '' }; // Reset form
        },

        /**
         * Saves a new village to the API.
         */
        async saveVillage() {
            if (!this.newVillage.villageLa || !this.newVillage.villageEn || !this.newVillage.villageCode) {
                this.showSwal('warning', 'ຄຳເຕືອນ', 'ກະລຸນາປ້ອນຂໍ້ມູນບ້ານໃຫ້ຄົບຖ້ວນ.');
                return;
            }
            this.loading_processing = true;
            try {
                const response = await this.$axios.post('/village', this.newVillage);
                if (response.data?.status === true) {
                    this.showSwal('success', 'ສຳເລັດ', 'ບັນທຶກບ້ານສຳເລັດແລ້ວ.');
                    this.closeAddVillageDialog(); // Close dialog and reset form
                    this.fetchVillages(this.newVillage.districtId); // Refresh village list for the current district
                } else {
                    this.showSwal('error', 'ເກີດຂໍ້ຜິດພາດ', response.data?.message || 'ບໍ່ສາມາດບັນທຶກບ້ານໄດ້.');
                }
            } catch (error) {
                console.error('Error saving village:', error);
                this.showSwal('error', 'ເກີດຂໍ້ຜິດພາດ', 'ເກີດຂໍ້ຜິດພາດໃນການເພີ່ມບ້ານ: ' + (error.message || error));
            } finally {
                this.loading_processing = false;
            }
        },
    },
};
</script>

<style scoped>
/*
  ---
  ## General Container & Layout
  */
.location-management-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f0f2f5;
    /* Light background for the page */
    min-height: 100vh;
}

.content-wrapper {
    display: flex;
    flex-wrap: wrap;
    /* Allow cards to wrap on smaller screens */
    justify-content: center;
    gap: 20px;
    /* Space between cards */
    width: 100%;
    max-width: 1600px;
    /* Max width for the main content area */
    margin-top: 20px;
}

/*
  ---
  ## Card Styling (Common)
  */
.data-card,
.form-card {
    /* height: 100%; */
    flex: 1 1 500px;
    /* Flex-grow, flex-shrink, and base width for responsiveness */
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    overflow: hidden;
    /* Ensures content stays within rounded corners */
}

.card-header {
    background-color: #F9944A;
    /* Consistent header color */
    color: white;
    padding: 15px 20px;
    font-size: 20px;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.v-card-text {
    padding: 20px;
}

/*
  ---
  ## Data Table Specifics
  */
.v-data-table>>>th {
    font-weight: bold !important;
    color: #555 !important;
    background-color: #f8f8f8;
}

.v-data-table>>>td {
    padding: 12px 16px;
    font-size: 15px;
}

/* Buttons within tables */
.v-btn.green {
    background-color: #4CAF50 !important;
    /* Green for add/create actions */
}

.v-btn.blue {
    background-color: #2196F3 !important;
    /* Blue for show/view actions */
}

.v-btn.green,
.v-btn.blue {
    color: white !important;
    text-transform: none;
    /* Keep normal casing for button text */
}

/*
  ---
  ## Form Styling (for new province)
  */
.form-card .v-text-field {
    margin-bottom: 15px;
}

.form-card .v-btn {
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
}

/*
  ---
  ## Dialog Styling
  */
.v-dialog .v-card-title {
    background-color: #F9944A;
    /* Consistent header color for dialogs */
    color: white;
}

.v-dialog .v-card-actions {
    padding: 15px;
}

.v-dialog .v-card-text {
    padding: 20px;
}
</style>