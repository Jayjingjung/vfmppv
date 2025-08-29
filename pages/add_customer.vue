<template>
    <div>
        <v-container fluid fill-height>
            <v-row align="center" justify="center">
                <v-col>
                    <v-card-title style="background-color:#009f62">
                        <div style="display:flex;justify-content:space-between;width:100%">
                            <span class="white--text">ເພີ່ມຂໍ້ມູນ ພະນັກງານ</span>
                        </div>
                    </v-card-title>

                    <v-card style="display: flex; flex-direction: column; align-items: center;">

                        <div class="pt-4" style="width: 100%; display: flex; justify-content: center;">
                            <div style="width: 180px; margin-left: 5px; margin-right: 5px;">
                                <v-autocomplete v-model="province" :items="user_data_list" item-text="provinceLa"
                                    item-value="_id" label="ເລືອກ ເເຂວງ" @change="onProvinceChange" outlined></v-autocomplete>
                            </div>
                            <div style="width: 180px; margin-left: 5px; margin-right: 5px;">
                                <v-autocomplete v-if="user_data_districts.length" v-model="district"
                                    :items="user_data_districts" item-text="districtLa" item-value="_id"
                                    label="ເລືອກ ເມືອງ" @change="onDistrictChange" outlined></v-autocomplete>
                            </div>
                            <div style="width: 180px; margin-left: 5px; margin-right: 5px;">
                                <v-autocomplete v-if="user_data_village.length" v-model="village" :items="user_data_village"
                                    item-text="villageLa" item-value="_id" label="ເລືອກ ບ້ານ" @change="onVillageChange"
                                    outlined></v-autocomplete>
                            </div>
                        </div>

                        <v-list class="mt-4 mb-4" @submit.prevent="submitForm" style="width: 300px;">
                            <v-text-field v-model="userName" outlined label="Username"></v-text-field>
                            <v-text-field v-model="phoneNumber" outlined label="Phone Number"></v-text-field>
                            <v-text-field v-model="password" outlined label="Password" type="password"></v-text-field>
                            <v-text-field v-model="email" outlined label="Email"></v-text-field>
                        </v-list>
                        <div style="width: 100%; display: flex; flex-direction: column; align-items: center;">
                            <v-autocomplete v-model="role" outlined :items="['STAFF', 'ADMIN', 'TRETTER']" label="Role"
                                style="width: 180px;"></v-autocomplete>
                            <v-btn @click="submitForm" type="submit" color="primary" class="mt-4">Submit</v-btn>
                        </div>
                    </v-card>

                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
import axios from 'axios';

export default {
    data() {
        return {
            province: null,
            district: null,
            village: null,
            user_data_list: [],
            user_data_districts: [],
            user_data_village: [],
            userName: '',
            phoneNumber: '',
            password: '',
            email: '',
            role: '',
            loading_processing: false,
            villageCode: '608021',
        }
    },
    async mounted() {
        await this.onGetprovin();
    },
    methods: {
        async onGetprovin() {
            try {
                this.loading_processing = true;
                const response = await this.$axios.$get('https://api.vfmp.dof.maf.gov.la/provinces');
                this.loading_processing = false;
                if (response?.status === true) {
                    this.user_data_list = response.data.map(item => ({
                        ...item,
                        provinceEn: item.provinceEn // Adding provinceEn to the item
                    }));
                } else {
                    Swal.fire({
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
                Swal.fire({
                    title: 'ແຈ້ງເຕືອນ',
                    text: error.message,
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
                const response = await this.$axios.$get(`https://api.vfmp.dof.maf.gov.la/districts?provinceId=${provinceId}`);
                this.loading_processing = false;
                if (response?.status === true) {
                    this.user_data_districts = response.data.map(item => ({
                        ...item,
                        districtEn: item.districtEn // Adding districtEn to the item
                    }));
                } else {
                    Swal.fire({
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
                Swal.fire({
                    title: 'ແຈ້ງເຕືອນ',
                    text: error.message,
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
                const response = await this.$axios.$get(`https://api.vfmp.dof.maf.gov.la/villages?districtId=${districtId}`);
                this.loading_processing = false;
                if (response?.status === true) {
                    this.user_data_village = response.data.map(item => ({
                        ...item,
                        villageEn: item.villageEn // Adding villageEn to the item
                    }));
                } else {
                    Swal.fire({
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
                Swal.fire({
                    title: 'ແຈ້ງເຕືອນ',
                    text: error.message,
                    icon: 'error',
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                });
            }
        },
        onProvinceChange() {
            this.onGetdistricts(this.province);
        },
        onDistrictChange() {
            this.onGetvillage(this.district);
        },
        onVillageChange() {
            // Define this method if there is any action needed when a village is changed.
            console.log('Village changed:', this.village);
        },
        async submitForm() {
            const apiEndpoint = 'https://api.vfmp.dof.maf.gov.la/user/create';

            try {
                // Retrieve the token from local storage
                const storedToken = localStorage.getItem('TOKEN');

                if (!storedToken) {
                    console.error('Token not found in local storage');
                    Swal.fire({
                        title: 'Error',
                        text: 'Token not found in local storage',
                        icon: 'error',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK',
                    });
                    return;
                }

                const headers = {
                    Authorization: `Bearer ${storedToken}`, // Use the retrieved token with the "Bearer " prefix
                    'Content-Type': 'application/json',
                };

                console.log('Token:', storedToken); // Log the retrieved token

                const selectedProvince = this.user_data_list.find(item => item._id === this.province);
                const selectedDistrict = this.user_data_districts.find(item => item._id === this.district);
                const selectedVillage = this.user_data_village.find(item => item._id === this.village);

                const userData = {
                    userName: this.userName,
                    phoneNumber: this.phoneNumber,
                    password: this.password,
                    email: this.email,
                    province: selectedProvince ? selectedProvince.provinceEn : null,
                    district: selectedDistrict ? selectedDistrict.districtEn : null,
                    village: selectedVillage ? selectedVillage.villageEn : null,
                    villageCode: this.villageCode,
                    role: this.role,
                };

                console.log('Request Payload:', userData); // Log the request payload

                // Use this.$axios.post instead of this.$axios.$post
                const response = await this.$axios.post(apiEndpoint, userData, { headers });

                // Handle success
                console.log('Response:', response.data);

                Swal.fire({
                    title: 'Success',
                    text: 'User data submitted successfully',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                });

                // Optionally, you can navigate to another page or display a success message here.
                // this.onGetUserList(); // Remove this line if you don't have the onGetUserList method

            } catch (error) {
                // Handle errors
                console.error('Error submitting form:', error);
                Swal.fire({
                    title: 'Error',
                    text: error.message,
                    icon: 'error',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                });
            }
        }

    },
}
</script>
