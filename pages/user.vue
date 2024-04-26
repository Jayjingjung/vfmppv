<template>
    <div>
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
                        <tr @click="selectUser(item)">
                            <td>{{ item.userName }}</td>
                            <td>{{ item.phoneNumber }}</td>
                            <td>{{ item.role }}</td>
                            <td>{{ item.address.province }}</td>
                            <td>{{ item.address.district }}</td>
                            <td>{{ item.address.village }}</td>
                        </tr>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>


    </div>
</template>

<script>
import swal from 'sweetalert2'
export default {
    data() {
        return {
            user_data_list: [],
            user_table_headers: [
                { text: 'ຊື່ຜູ້ໃຊ້ລະບົບ', value: 'name' },
                { text: 'ເບີ', value: '' },
                { text: 'ສິດເຂົ້າໃຊ້ ', value: 'role' },
                { text: 'ເເຂວງ', value: 'userid' },
                { text: 'ເມື່ອງ', value: 'district' },
                { text: 'ບ້ານ', value: '' },
                { text: '', value: '' },

            ],
            selectedUser: {
                village: '',
                district: '',
                province: '',
                userName: '',
                role: '',
            },

        }
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
    }
}
</script>

<style>
.tops {
    margin-top: -25px;
    font-size: 12px;
}
</style>