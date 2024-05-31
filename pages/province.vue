<template>
    <div>

        <div style="display: flex;" class="mt-10 ml-10">
            
            <div style="margin-left: 10px;" class="ml-10 mr-10" >
                <v-dialog v-model="loading_processing" persistent width="55">
                    <v-card width="55" height="55" class="pt-3 pl-3">
                        <v-progress-circular :width="3" color="primary" indeterminate></v-progress-circular>
                    </v-card>
                </v-dialog>

                <v-card class="card-shadow mb-6" rounded="lg">
                    <v-card-title style="background-color:#F9944A">
                        <div style="display:flex;justify-content:space-between;width:100%">
                            <span class="white--text">ລາຍລະອຽດເເຂວງ</span>

                        </div>
                    </v-card-title>
                    <v-card-text style="width: auto;">
                        <v-data-table :headers="user_table_headers" :items="user_data_list" :search="search_user"
                            item-key="userId">
                            <template v-slot:item="{ item }">
                                <tr>
                                    <td>{{ item.provinceLa }}</td>
                                    <td>{{ item.provinceEn }}</td>
                                
                                    <td>
                                        <v-btn class="red" small @click="add_districtLa(item._id)">
                                            <v-icon color="white">mdi-plus</v-icon>
                                            <span class="white--text">ເພີ່ມເມືອງ</span>
                                        </v-btn>
                                    </td>
                                    <td>
                                        <v-btn class="red" small @click="onGetdistricts(item._id)">
                                            <v-icon color="white">mdi-plus</v-icon>
                                            <span class="white--text">ໂສເມືອງ</span>
                                        </v-btn>
                                    </td>

                                    <!-- Rest of your template -->
                                </tr>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </div>
            <div class="ml-10 mr-10" >
                <v-card class="card-shadow mb-6" rounded="lg">
                    <v-card-title style="background-color:#F9944A">
                        <div style="display:flex;justify-content:space-between;width:100%">
                            <span class="white--text">ລາຍລະອຽດເມືອງ</span>

                        </div>
                    </v-card-title>
                    <v-card-text style="width: auto;">
                        <v-data-table :headers="user_table_headers_districtLa" :items="user_data_districts"
                            :search="search_user" item-key="userId">
                            <template v-slot:item="{ item }">
                                <tr>
                                    <td>{{ item.districtLa }}</td>
                                    <td>{{ item.districtEn }}</td>
                          
                 
                                    <td>
                                        <v-btn class="red" small @click="add_village(item.provinceId, item._id)">
                                            <v-icon color="white">mdi-plus</v-icon>
                                            <span class="white--text">ເພີ່ມບ້ານ</span>
                                        </v-btn>

                                    </td>
                                    <td>
                                        <v-btn class="red" small @click="onGetvillage(item._id)">
                                            <v-icon color="white">mdi-plus</v-icon>
                                            <span class="white--text">ໂສບ້ານ</span>
                                        </v-btn>
                                    </td>

                                    <!-- Rest of your template -->
                                </tr>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </div>
            <div class="ml-10 mr-10" style="height: auto;">
                <v-card>
                    <v-list class="mr-10 ml-10" @submit.prevent="submitForm">

                        <v-text-field v-model="provinceLa" label="provinceLa"></v-text-field>
                        <v-text-field v-model="provinceEn" label="provinceEn"></v-text-field>

                        <v-btn @click="submitForm" type="submit" color="primary">Submit</v-btn>
                    </v-list>
                </v-card>
            </div>
            <v-dialog v-model="dialogVisible" max-width="800px" style="max-height: 800px;">
                <v-card>
                    <v-card-actions>
                        <!-- <v-text-field v-model="provinceId" label="provinceId"></v-text-field> -->
                        <v-text-field v-model="districtLa" label="districtLa"></v-text-field>
                        <v-text-field v-model="districtEn" label="districtEn"></v-text-field>
                        <v-card-actions>
                            <v-btn style="font-size: 20px;" color="primary" @click="save_district">
                                <v-icon>mdi-printer</v-icon>ບັນຖືກ
                            </v-btn>
                        </v-card-actions>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="dialogVisible_1" max-width="800px" style="max-height: 800px;">
                <v-card>
                    <v-card-actions>
                        <!-- <v-text-field v-model="provinceId" label="provinceId"></v-text-field> -->
                        <v-text-field v-model="villageLa" label="districtLa"></v-text-field>
                        <v-text-field v-model="villageEn" label="villageEn"></v-text-field>
                        <v-text-field v-model="villageCode" label="villageCode"></v-text-field>
                        <v-card-actions>
                            <v-btn style="font-size: 20px;" color="primary" @click="save_village">
                                <v-icon>mdi-printer</v-icon>ບັນຖືກ
                            </v-btn>
                        </v-card-actions>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
        <div style="display: flex;"  class="mt-10 ml-10">
          
        </div>
        <div class="mt-10 ml-10">
            <v-card class="card-shadow mb-6" rounded="lg">
                <v-card-title style="background-color:#F9944A">
                    <div style="display:flex;justify-content:space-between;width:100%">
                        <span class="white--text">ລາຍລະອຽດບ້ານ</span>

                    </div>
                </v-card-title>
                <v-card-text style="width: auto;">
                    <v-data-table :headers="user_table_headers_village" :items="user_data_village"
                        :search="search_user" item-key="userId">
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
        </div>
    </div>

</template>

<script>
import swal from 'sweetalert2'; // Import SweetAlert
export default {
    data() {
        return {
            village: "",
            district: "",
            provinceLa: "",
            provinceEn: "",
            loading_processing: false,
            user_data_list: [],
            user_data_districts: [],
            user_data_village: [],
            user_table_headers: [
                { text: 'ເເຂວງ', value: 'provinceLa' },
                { text: 'ເມື່ອງ', value: 'provinceEn' },
                { text: 'ບ້ານ', value: '' },
            ],
            user_table_headers_districtLa: [
                { text: 'districtLa', value: 'districtLa' },
                { text: 'districtEn', value: 'districtEn' },
                { text: 'provinceId', value: 'provinceId' },
                { text: '_Id', value: '_Id' },
            ],
            user_table_headers_village: [
                { text: 'villageCode', value: 'villageCode' },
                { text: 'villageLa', value: 'villageLa' },
                { text: 'villageEn', value: 'villageEn' },

            ],
            selectedUser: {
                village: '',
                district: '',
                province: '',
            },
            search_user: '',
            dialogVisible: false,
            dialogVisible_1: false,
            provinceId: "",
            districtEn: "",
        };
    },
    mounted() {
        this.onGetprovin();

    },
    methods: {
        async add_districtLa(provinceId) {
            this.provinceId = provinceId;
            this.dialogVisible = true;
        },
        async add_village(provinceId, districtId) {
            this.provinceId = provinceId;
            this.districtId = districtId;
            this.dialogVisible_1 = true;
        },

        async save_district() {
            try {
                this.loading_processing = true;
                const apiEndpoint = 'https://octopus-app-n476x.ondigitalocean.app/district';
                const districtData = {
                    provinceId: this.provinceId,
                    districtEn: this.districtEn,
                    districtLa: this.districtLa,
                };
                const response = await this.$axios.post(apiEndpoint, districtData);
                console.log('Response:', response.data);
                this.onGetprovin();
                this.dialogVisible = false;
            } catch (error) {
                this.loading_processing = false;
                console.error('Error saving district:', error);
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
        async save_village() {
            try {
                this.loading_processing = true;
                const apiEndpoint = 'https://octopus-app-n476x.ondigitalocean.app/village';
                const districtData = {
                    provinceId:this.provinceId,
                    districtId:this.districtId,
                    villageLa: this.villageLa,
                    villageEn: this.villageEn,
                    villageCode: this.villageCode,
                };
                const response = await this.$axios.post(apiEndpoint, districtData);
                console.log('Response:', response.data);
                this.dialogVisible_1 = false;
            } catch (error) {
                this.loading_processing = false;
                console.error('Error saving district:', error);
                swal.fire({
                    title: 'ແຈ້ງເຕືອນ',
                    text: error,
                    icon: 'error',
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                });
                // this.onGetvillage()
            }
        },

        async submitForm() {
            try {
                this.loading_processing = true;

                // Replace 'https://octopus-app-n476x.ondigitalocean.app/province' with your actual API endpoint
                const apiEndpoint = 'https://octopus-app-n476x.ondigitalocean.app/province';

                const userData = {
                    provinceEn: this.provinceEn,
                    provinceLa: this.provinceLa,
                };

                console.log('Request Payload:', userData); // Log the request payload

                // Use this.$axios.post instead of this.$axios.$post
                const response = await this.$axios.post(apiEndpoint, userData);

                // Handle success
                console.log('Response:', response.data);
                // Optionally, you can navigate to another page or display a success message here.
                this.onGetprovin();
            } catch (error) {
                // Handle errors
                console.error('Error submitting form:', error);
                // Optionally, you can display an error message or perform other actions based on the error.
            } finally {
                this.loading_processing = false; // Set loading_processing to false regardless of success or error
            }
        },

        async onGetprovin() {
            try {
                this.loading_processing = true;

                const response = await this.$axios.$get('https://octopus-app-n476x.ondigitalocean.app/provinces');

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
        async onGetdistricts(provinceId) {
            try {
                this.loading_processing = true;

                const response = await this.$axios.$get(`https://octopus-app-n476x.ondigitalocean.app/districts?provinceId=${provinceId}`);

                if (response?.status === true) {
                    this.loading_processing = false;
                    console.log('user:', response.data);
                    this.user_data_districts = response.data;
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
        async onGetvillage(districtId) {
            try {
                this.loading_processing = true;

                const response = await this.$axios.$get(`https://octopus-app-n476x.ondigitalocean.app/villages?districtId=${districtId}`);

                if (response?.status === true) {
                    this.loading_processing = false;
                    console.log('user:', response.data);
                    this.user_data_village = response.data;
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

    },
};
</script>