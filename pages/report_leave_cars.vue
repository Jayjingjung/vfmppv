<template>
    <div>
      
        <v-card >
            <v-card-title style="border-bottom:0.5px solid #e0e0e0;background-color:#fd9220;color:white">
                ຂໍ້ມູນການລາດຕະເວດ
            </v-card-title>
            <v-card-text>
                <div style="width:100%;display:flex;justify-content:start" class="pt-4">

                    <div class="d-flex align-center">
                        <v-menu ref="start_menu" v-model="start_menu" :close-on-content-click="false"
                            :return-value.sync="start_date" transition="scale-transition" offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field dense outlined v-model="start_date" required label="ວັນທີເລີ່ມຕົ້ນ"
                                    append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="start_date" no-title scrollable
                                @input="$refs.start_menu.save(start_date)">
                                <v-spacer></v-spacer>
                            </v-date-picker>
                        </v-menu>
                    </div>
                    <div class="d-flex align-center pl-2">
                        <v-menu ref="end_menu" v-model="end_menu" :close-on-content-click="false"
                            :return-value.sync="end_date" transition="scale-transition" offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field dense outlined v-model="end_date" required label="ວັນທີສຸດທ້າຍ"
                                    append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="end_date" no-title scrollable @input="$refs.end_menu.save(end_date)">
                                <v-spacer></v-spacer>
                            </v-date-picker>
                        </v-menu>
                    </div>
                    <div class="ml-2 pt-1">
                        <v-btn color="#90A4AE" class="white--text" elevation="0"
                            @click="() => { onSearchLeaveCarReport(); }">
                            <v-icon>mdi-magnify</v-icon> ຄົ້ນຫາ
                        </v-btn>

                    </div>
                    <v-spacer></v-spacer>
                    <div style="width:600px" class="d-flex align-center">
                        <v-text-field placeholder="ຄົ້ນຫາດ້ວຍລະຫັດປ່ອຍລົດ..." v-model="search" rounded
                            background-color="#f5f5f5" prepend-inner-icon="mdi-magnify"></v-text-field>
                        <div style="width: 50px;"></div>
                     
                    </div>
                </div>
                <div style="display:flex;align-items:center">

                    <div v-if="showAlert === true"
                        style="border:1px solid red;height:40px;border-radius:3px;display:flex;align-items:center"
                        class="ml-2 pl-2 pr-10">
                        <v-icon color="red">mdi-alert-outline</v-icon>
                        <span class="ml-2 red--text">ລາຍການສີແດງຮອດກຳນົດແລ້ວ!</span>
                    </div>
                </div>
                <!-- Radio button -->
                <!-- <div style="width:100%; display:flex; justify-content:start" class="ml-5"> -->
                <v-radio-group v-model="status" column>
                    <v-radio label="ສັດປ່າຫາຢາກ" color="red darken-3" value="N"></v-radio>
                    <v-radio label="ການລ້າສັດ" color="success" value="Y"></v-radio>
                    <v-radio label="ການບຸກລຸກ" color="primary" value="A"></v-radio>
                </v-radio-group>
                <!-- </div> -->
                <div style="width:100%; display:flex; justify-content:start" class="ml-5">
                    <!-- Your existing divs -->
                    <div>
                        <h3>ທັງໝົດ: <span class="green--text">{{ report_leave_car_list?.length }}</span></h3>

                    </div>
                    <div class="ml-10 mr-5">
                        <h3>ໃບປ່ອຍລົດທີ່ໄດ້ອອກໃບປະຕິບັດງານແລ້ວ: <span class="green--text">{{ successList }}</span></h3>

                    </div>
                    <div class="ml-10 mr-5">
                        <h3>ໃບປ່ອຍລົດທີ່ຍັງບໍ່ໄດ້ອອກໃບປະຕິບັດງານ: <span class="red--text">{{ waitingList }}</span></h3>
                    </div>
                </div>

               
            </v-card-text>
        </v-card>
       
    </div>
</template>

<script>
import swal from 'sweetalert2'
import moment from 'moment'
export default {
    data() {
        return {
            moment: moment,
            ex7: 'red',
            sumFooter: null,
            // carPayTotal: null,
            // totalRow: null,
            active: '',
            showAlert: false,
            loading_processing: false,
            end_menu: false,
            end_date: null,
            start_menu: false,
            start_date: null,
            status: 'A',

            // totalPriceNm:priceNamMun*sainummun,
            report_leave_car_header: [
                { text: 'ເລກບິນ', value: 'lahud_POYLOD' },
                { text: 'ທະບຽນຫົວ', value: 'h_VICIVLE_NUMBER' },
                { text: 'ທະບຽນຫາງ', value: 'f_CARD_NO' },
                { text: 'ວັນທີອອກ', value: 'out_DATE' },
                { text: 'ຄົນຂັບ1', value: 'staft_NAME' },
                { text: 'ຄົນຂັບ2', value: 'staft_NAME1' },
                { text: 'ຊື່ສິນຄ້າ', value: 'pro_NAME' },
                { text: 'ເບ້ຍລ້ຽງຈ່າຍຕົວຈິງຂອງຜູ້ທີ1', value: 'totalBiaLieng' },
                { text: 'ເບ້ຍລ້ຽງຄ້າງຈ່າຍຜູ້ທີ1', value: 'staff_BIALINEG_KANGJAIY' },
                { text: 'ເບ້ຍລ້ຽງຄ້າງຈ່າຍຜູ້ທີ2', value: 'staff_BIALINEG_KANGSecond' },
                { text: 'ເບ້ຍລ້ຽງຈ່າຍຕົວຈິງຂອງຜູ້ທີ2', value: 'staff02_beforepay' },
                { text: 'ໃສ່ນ້ຳມັນ', value: 'sainummun' },
                { text: 'ລາຄານ້ຳມັນຕໍ່ລິດ', value: 'priceNamMun' },
                { text: 'ລວມເງິນນ້ຳມັນ', value: 'totalPriceFuel' },
                { text: 'ລວມເງິນສິ້ນເປືອງ', value: 'runningTotal' },
                { text: 'ລວມລາຍຈ່າຍທັງໝົດ', value: 'allLaiyJaiy' },
                { text: 'ສະຖານະ', value: '' },
                { text: '', value: '' },
            ],
            report_leave_car_list: [],
            selected: '',
            search: '',
            successList: 0,
            waitingList: 0,
            sumTotalPrice: '',
            
        }
    },
    mounted() {
        this.onSearchLeaveCarReport()
    },
    methods: {
        
        onCheckAlert() {
            this.report_leave_car_list.map((list) => {
                if (list?.totalDay >= '7' && list?.status === 'N') {
                    this.showAlert = true
                    return
                } else {
                    this.showAlert = false
                    return
                }
            })
        },
        
        onSearcReport() {

            this.loading_processing = true;
            try {
                let data = {
                    startDate: this.start_date,
                    endDate: this.end_date,
                    status: 0
                }
                // this.$axios.$post('/ReportStaff.service', data).then((data) => {
                this.$axios.$post('/ReportGiveCarAll', data).then((data) => {
                    console.log("staft:", data)
                    if (data?.status === '00') {
                        this.staft_data_list = data?.data;

                        this.sumFooter = data?.sumFooter
                        console.log("new data footer:", this.sumFooter)

                        this.loading_processing = false
                    } else {
                        this.loading_processing = false
                        swal.fire({
                            icon: 'error',
                            text: data?.message
                        })
                    }
                })
            } catch (error) {
                this.loading_processing = false
                swal.fire({
                    icon: 'error',
                    text: error
                })
                console.log(error)
            }
        },
        onSearcReport() {

            this.loading_processing = true;
            try {
                let data = {
                    startDate: this.start_date,
                    endDate: this.end_date,
                    status: 0
                }
                // this.$axios.$post('/ReportStaff.service', data).then((data) => {
                this.$axios.$post('/ReportGiveCarAll', data).then((data) => {
                    console.log("staft:", data)
                    if (data?.status === '00') {
                        this.staft_data_list = data?.data;

                        this.sumFooters = data?.sumFooter
                        console.log("new data footer:", this.sumFooters)

                        this.loading_processing = false
                    } else {
                        this.loading_processing = false
                        swal.fire({
                            icon: 'error',
                            text: data?.message
                        })
                    }
                })
            } catch (error) {
                this.loading_processing = false
                swal.fire({
                    icon: 'error',
                    text: error
                })
                console.log(error)
            }
        },
        onSearchLeaveCarReport() {
            try {
                this.loading_processing = true;
                this.successList = 0
                this.waitingList = 0
                let data = {
                    startDate: this.start_date,
                    endDate: this.end_date,
                    status: this.status
                }
                this.$axios.$post('/ListReportAll01.service', data).then((data) => {
                    console.log("allReport:", data)
                    if (data?.data) {
                        data.data.forEach(item => {
                            if (item.status === 'Y') {
                                this.successList += 1;
                            } else if (item.status === 'N') {
                                this.waitingList += 1;
                            }
                        });

                        this.report_leave_car_list = data?.data
                        this.sumFooter = data?.sumFooter
                        console.log("new data sum footer:", this.sumFooter)
                        this.loading_processing = false
                        this.onCheckAlert()
                    } else {
                        this.report_leave_car_list = []
                        this.loading_processing = false
                    }
                })
            } catch (error) {
                this.loading_processing = false
                swal.fire({
                    icon: 'error',
                    text: error
                })
                console.log(error)
            }
        },
        
    }

}
</script>

<style>
</style>