<template>
    <div>
        <v-card class="card-shadow" rounded="lg">
            <v-card-title style="background-color:#E57373;color:white">
                <div style="display:flex;align-items:center;width:100%">
                    <v-btn fab elevation="0" dark width="30" height="30" small color="white" to="operation-list">
                        <v-icon color="#E57373">mdi-arrow-left</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <span>ແກ້ໄຂໃບປະຕິບັດງານ</span>
                    <v-spacer></v-spacer>
                </div>

            </v-card-title>
            <v-card-text class="pt-6 pa-6">
                <!-- <v-divider class="mx-4"></v-divider> -->
                <div class="pa-4 d-flex align-center pt-5">
                    <div style="width:100%">
                        <v-menu ref="start_go_menu" v-model="start_go_menu" :close-on-content-click="false"
                            :return-value.sync="performanceReDate" transition="scale-transition" offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <span>ວັນທີກັບ</span>
                                <v-text-field v-model="performanceReDate" solo flat background-color="#f5f5f5" dense
                                    required placeholder="ເລືອກວັນທີກັບ" prepend-inner-icon="mdi-calendar" readonly
                                    v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="performanceReDate" no-title scrollable
                                @input="$refs.start_go_menu.save(performanceReDate)">
                                <v-spacer></v-spacer>
                            </v-date-picker>
                        </v-menu>
                    </div>


                    <div style="width:100%" class="pl-2">
                        <span>ລາຄາ</span>
                        <v-text-field solo flat background-color="#f5f5f5" dense placeholder="ລາຄາ"
                            v-model="proAmount"></v-text-field>
                    </div>
                    <div style="width:100%" class="pl-2">
                        <span>ລາຄາລວມ</span>
                        <v-text-field readonly solo flat background-color="#f5f5f5" dense placeholder="ຈຳນວນ"
                            v-model="proTotalAmount"></v-text-field>
                    </div>
                    <div style="width:100%" class="pl-2">
                        <span>ສະກຸນເງິນ</span>
                        <v-select placeholder="ເລືອກສະກຸນເງິນ" style="width:100%" class="pl-2" flat solo dense
                            background-color="#f5f5f5" :items="currency_items" v-model="currency"></v-select>
                    </div>
                    <div style="width:100%" class="pl-2">
                        <span>ນໍ້າໜັກ</span>
                        <v-text-field solo flat background-color="#f5f5f5" dense placeholder="ລາຄາລວມ" v-model="proSize"
                            append-icon="mdi-format-title"></v-text-field>
                    </div>
                </div>
                <v-divider class="mx-4"></v-divider>
                <div class=" pa-4">
                    <span>+ ຄ່າສິ້ນເປືອງ</span>
                    <div style="width:100%" class="pt-4">
                        <div style="display:flex;justify-content:space-between">
                            <div style="width:100%">
                                <span>ຄ່າຊິງມະຫາໄຊ</span>
                                <v-text-field solo flat background-color="#f5f5f5" dense placeholder="ຄ່າຊິງມະຫາໄຊ"
                                    v-model="performanceJumPho"></v-text-field>

                            </div>
                            <div style="width:100%" class="px-2">
                                <span>ຄ່າຕຳລວດ</span>
                                <v-text-field solo flat background-color="#f5f5f5" dense placeholder="ຄ່າຕຳລວດ"
                                    v-model="performanceFeePolish"></v-text-field>
                            </div>
                            <div style="width:100%">
                                <span>ຄ່າສິ້ນເປືອງຢູ່ສາງພາສີ</span>
                                <v-text-field solo flat background-color="#f5f5f5" dense
                                    placeholder="ຄ່າສິ້ນເປືອງຢູ່ສາງພາສີ" v-model="per_PA"></v-text-field>
                            </div>
                            <div style="width:100%">
                                <span>ຄ່າດ່ານຫວຽດຂາກັບ</span>
                                <v-text-field solo flat background-color="#f5f5f5" dense placeholder="ຄ່າດ່ານຫວຽດຂາກັບ"
                                    v-model="performanceOverVN"></v-text-field>
                            </div>
                            <div style="width:100%" class="px-2">
                                <span>ຄ່າດ່ານລາວຂາໄປ - ຂາກັບ</span>
                                <v-text-field solo flat background-color="#f5f5f5" dense
                                    placeholder="ຄ່າດ່ານລາວຂາໄປ - ຂາກັບ" v-model="performanceOvertime"></v-text-field>
                            </div>

                            <!-- <div style="width:100%" class="pl-2">
                                <span>ຄ່າໃບຊິງ</span>
                                <v-text-field solo flat background-color="#f5f5f5" dense placeholder="ຄ່າໃບຊິງ"
                                    v-model="performanceFeeTaxung"></v-text-field>
                            </div> -->
                        </div>
                        <div style="display:flex;justify-content:space-between">
                            <div style="width:100%">
                                <span>ຄ່າຊິບປິ້ງຫວຽດແລ່ນເອກະສານ</span>
                                <v-text-field solo flat background-color="#f5f5f5" dense
                                    placeholder="ຄ່າຊິບປິ້ງຫວຽດແລ່ນເອກະສານ" v-model="performanceFeeTaxung"></v-text-field>
                            </div>
                            <div style="width:100%" class="px-2">
                                <span>ຄ່າໃບຊິງ</span>
                                <v-text-field solo flat background-color="#f5f5f5" dense placeholder="ຄ່າໃບຊິງ"
                                    v-model="performanceFeeSing"></v-text-field>
                            </div>
                            <div style="width:100%">
                                <span>ຄ່າແຈ້ງເອກະສານຢູ່ບ່ອນຂຶ້ນເກືອ</span>
                                <v-text-field solo flat background-color="#f5f5f5" dense
                                    placeholder="ຄ່າແຈ້ງເອກະສານຢູ່ບ່ອນຂຶ້ນເກືອ"
                                    v-model="performanceFeeSaPhan"></v-text-field>
                            </div>
                            <div style="width:100%" class="px-2">
                                <span>ຄ່າລົງເກືອ</span>
                                <v-text-field solo flat background-color="#f5f5f5" dense placeholder="ຄ່າລົງເກືອ"
                                    v-model="performanceFeeOutContainer"></v-text-field>
                            </div>

                            <!-- 
                            <div style="width:100%">
                                <span>ຄ່າລ່ວງເວລາ</span>
                                <v-text-field solo flat background-color="#f5f5f5" dense placeholder="ຄ່າລ່ວງເວລາ"
                                    v-model="performanceFeeYoktu"></v-text-field>
                            </div> -->

                            <div style="width:100%" class="pl-2">
                                <span>ຄ່າລ່ວງເວລາ</span>
                                <v-text-field solo flat background-color="#f5f5f5" dense placeholder="ຄ່າລ່ວງເວລາ"
                                    v-model="performanceFeeYoktu"></v-text-field>
                            </div>

                            <!-- <div style="width:100%" class="pl-2">
                                <span>ຄ່າເອົາຕູ້ອອກຈາກດ່ານລາວ</span>
                                <v-text-field solo flat background-color="#f5f5f5" dense
                                    placeholder="ຄ່າເອົາຕູ້ອອກຈາກດ່ານລາວ"
                                    v-model="performanceFeeOutContainer"></v-text-field>
                            </div>
                            <div style="width:100%" class="pl-2">
                                <span>ຄ່າລ່ວງເວລາ</span>
                                <v-text-field solo flat background-color="#f5f5f5" dense placeholder="ຄ່າລ່ວງເວລາ"
                                    v-model="performanceOvertime"></v-text-field>
                            </div> -->
                            <!-- <div style="width:100%" class="pl-2"></div> -->
                        </div>

                    </div>
                </div>
                <v-divider class="mx-4"></v-divider>
            </v-card-text>

            <v-card-actions class="pr-10 pb-8">
                <v-spacer></v-spacer>
                <v-btn @click="onUpdate" width="200" color="#FFB74D" class="card-shadow">
                    <span class="white--text pl-2">ແກ້ໄຂ</span>
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import swal from 'sweetalert2'
export default {
    data() {
        return {
            currency_items: ['LAK', 'USD', 'THB', 'CNY'],
            currency: '',
            loading_processing: false,
            start_go_menu: false,
            end_menu: false,
            start_go_date: null,
            l_id: '',
            performanceBillNo: '',
            performanceReDate: '',
            performanceTotal: '',
            performanceOvertime: '',
            performanceJumPho: '',
            performanceFeePolish: '',
            performanceFeeTaxung: '',
            performanceFeeTiew: '',
            performanceOverVN: '',
            performanceBoderLak20: '',
            performancePassport: '',
            performanceVaccine: '',
            performanceFeeSing: '',
            performanceFeeSaPhan: '0',
            performanceFeeYoktu: '',
            performanceFeeOutContainer: '',
            performancedate: '',
            feeUnit: '',
            feeTotal: '',
            currency: '',
            proAmount: '',

            proTotalAmount: '',
            proSize: '',
            per_PA: '',
            performancefe_PAYANG: ''
        }
    },
    watch: {
        proAmount: function (newValue) {
            const resp = parseFloat(newValue?.split(',').join('')) * parseFloat(this.proSize)
            console.log(resp)
            if(resp.toString()?.includes('.')){
                const newPrice = resp.toString().split('.')
                console.log("new",newPrice[0])
                this.proTotalAmount = newPrice[0]?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }else{

                this.proTotalAmount = resp?.toString()?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            const result = newValue?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.proAmount = result
        },
        proSize: function (newValue) {
            const realP = parseFloat(newValue) * parseFloat(this.proAmount?.split(',')?.join(''))
            if(realP.toString()?.includes('.')){
                const newPrice = realP.toString().split('.')
                console.log("new",newPrice[0])
                this.proTotalAmount = newPrice[0]?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }else{
                this.proTotalAmount = realP?.toString()?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            // const result = newValue?.replace(/\D/g, '')?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.proSize = newValue
        },
    },
    mounted() {
        this.onGetDataListForPrint()
    },
    methods: {
        onGetDataListForPrint() {
            try {
                let data = {
                    performanceBillNo: this.$route?.query?.key
                }
                console.log("datadend:", data)
                this.$axios.$post('/showPerformanceByNo.service', data).then((data) => {
                    if (data?.status === '00') {
                        // this.performancedate = data?.data[0]?.performancedate
                        this.proAmount = data?.data[0]?.price
                        this.currency = data?.data[0]?.currency
                        this.proSize = data?.data[0]?.proSize
                        this.performanceReDate = data?.data[0].performanceReDate
                        this.performanceTotal = data?.data[0].performanceTotal
                        this.performanceOvertime = data?.data[0].performanceovertime
                        this.performanceJumPho = data?.data[0].performancejumpho
                        this.performanceFeePolish = data?.data[0].performancefeepolish
                        this.performanceFeeTaxung = data?.data[0].performancefeetaxung
                        this.performanceFeeTiew = data?.data[0].performancefeetiew
                        this.performanceOverVN = data?.data[0].performanceovervn
                        this.performanceBoderLak20 = data?.data[0].performanceboderlak20
                        this.performancePassport = data?.data[0].performancepassport
                        this.performanceVaccine = data?.data[0].performancevaccine
                        this.performanceFeeSing = data?.data[0].performancefeesing
                        this.performanceFeeSaPhan = data?.data[0].performancefeesaphan
                        this.performanceFeeYoktu = data?.data[0].performancefeeyoktu
                        this.performanceFeeOutContainer = data?.data[0].performancefeeoutcontainer
                        this.per_PA = data?.data[0]?.performancefe_PAYANG
                    }
                })
            } catch (error) {
                console.log(error)
            }
        },
        onUpdate() {
            try {
                let data = {
                    performanceReDate: this.performanceReDate ? this.performanceReDate : 0,
                    // performanceTotal: this.performance_data[0]?.total_PRICE,
                    performanceOvertime: this.performanceOvertime ? this.performanceOvertime : 0,
                    performanceJumPho: this.performanceJumPho ? this.performanceJumPho : 0,
                    performanceFeePolish: this.performanceFeePolish ? this.performanceFeePolish : 0,
                    performanceFeeTaxung: this.performanceFeeTaxung ? this.performanceFeeTaxung : 0,
                    performanceFeeTiew: this.performanceFeeTiew ? this.performanceFeeTiew : 0,
                    performanceOverVN: this.performanceOverVN ? this.performanceOverVN : 0,
                    performanceBoderLak20: this.performanceBoderLak20 ? this.performanceBoderLak20 : 0,
                    performancePassport: this.performancePassport ? this.performancePassport : 0,
                    performanceVaccine: this.performanceVaccine ? this.performanceVaccine : 0,
                    performanceFeeSing: this.performanceFeeSing ? this.performanceFeeSing : 0,
                    performanceFeeSaPhan: this.performanceFeeSaPhan ? this.performanceFeeSaPhan : 0,
                    performanceFeeYoktu: this.performanceFeeYoktu ? this.performanceFeeYoktu : 0,
                    performanceFeeOutContainer: this.performanceFeeOutContainer ? this.performanceFeeOutContainer : 0,
                    per_PA: this.per_PA ? this.per_PA : 0,
                    key_id: this.$route?.query?.key,
                    currency: this.currency,
                    total_PRICE: this.proTotalAmount,
                    proAmount : this.proAmount,
                    proSize: this.proSize,
                }
                this.$axios.$post('/updatePerformanceAllTxn.service', data).then((data) => {
                    swal.fire({
                        icon: 'success',
                        text: 'ສຳເລັດ'
                    })

                })
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style></style>