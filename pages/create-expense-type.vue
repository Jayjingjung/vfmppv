<template>
    <div>
        <v-card width="500" class="mx-auto card-shadow">
            <v-card-title style="background-color:#E57373;color:white">ປະເພດລາຍຮັບ - ລາຍຈ່າຍ</v-card-title>
            <v-card-text class="pt-4">
                <div style="display:flex">
                    <v-text-field outlined label="ປ້ອນປະເພດລາຍຮັບ - ລາຍຈ່າຍ" dense v-model="typeName"></v-text-field>
                    <v-btn v-if="!checkbtn" elevation="0" height="40" color="#448AFF" class="white--text ml-2"
                        @click="onSave">ເພີ່ມ</v-btn>
                    <v-btn v-else elevation="0" height="40" color="#FFB74D" class="white--text ml-2"
                        @click="onUpdate">ອັບເດດ</v-btn>
                </div>
                <div>
                    <v-data-table :items="expense_list" :headers="expense_headers" dense>
                        <template v-slot:item="row">
                            <tr>
                                <td>{{ row?.item?.typeName }}</td>
                                <td>
                                    <v-btn color="#FFB74D" small elevation="0"
                                        @click="onGetforUp(row?.item?.key_id, row?.item?.typeName)">
                                        <v-icon color="white">mdi-pencil</v-icon>
                                        <span class="white--text">ແກ້ໄຂ</span>
                                    </v-btn>
                                </td>
                                <td>
                                    <v-btn color="red" small elevation="0" @click="onDelete(row?.item?.key_id)">
                                        <v-icon color="white">mdi-delete</v-icon>
                                        <span class="white--text">ລົບ</span>
                                    </v-btn>
                                </td>
                            </tr>
                        </template>
                    </v-data-table>
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import swal from 'sweetalert2'
export default {
    data() {
        return {
            expense_headers: [
                { text: 'ຊື່ປະເພດລາຍຈ່າຍ', value: 'typeName' },
                { text: '', value: '' },
                { text: '', value: '' }
            ],
            expense_list: [],
            typeName: '',
            checkbtn: false,
            key_up: ''
        }
    },
    mounted() {
        this.onGetAll()
    },
    methods: {
        onGetforUp(id, name) {
            this.key_up = id;
            this.typeName = name;
            this.checkbtn = true
        },
        onUpdate() {
            let data = {
                key_id: this.key_up,
                typeName: this.typeName
            }
            try {
                this.$axios.$post('/storeExpensesTypeUpdate.service', data).then((data) => {
                    if (data?.status === '00') {
                        this.onGetAll()
                        this.$toast.success('ສຳເລັດ')
                        this.typeName = ''
                        this.checkbtn = false
                    }
                })
            } catch (error) {
                console.log(error)
            }
        },
        onDelete(key) {
            try {
                let data = {
                    key_id: key
                }
                this.$axios.$post('/storeExpensesTypeDel.service', data).then((data) => {
                    if (data?.status === '00') {
                        this.$toast.success('ສຳເລັດ')
                        this.onGetAll()
                    }
                })
            } catch (error) {
                console.log(error)
            }
        },
        onSave() {
            try {
                let data = {
                    typeName: this.typeName
                }
                this.$axios.$post('/storeExpensesType.service', data).then((data) => {
                    if (data?.status === '00') {
                        console.log("data", data)
                        this.$toast.success('ສຳເລັດ')
                        this.onGetAll()
                        this.typeName = ''
                    }
                })
            } catch (error) {
                console.log(error)
            }
        },
        onGetAll() {
            try {
                this.$axios.$post('/getExpensesTypeAll.service').then((data) => {
                    this.expense_list = data?.data
                    console.log('all====', data?.data)
                })
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style></style>