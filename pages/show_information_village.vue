<template>
    <div>
        <v-card class="card-shadow mb-6 mt-1" rounded="lg" style="height: 2500px;">
            <v-card-title style="background-color:#3766A4;">
                <div style="display:flex;justify-content:space-between;width:100%;">
                    <span style="font-family: 'Times New Roman', Times, serif;" class="white--text">VFMP
                        information</span>
                </div>
            </v-card-title>
            <div>

                <v-card
                    style="width:100%;margin-top: 10px;margin-left: 7px;margin-right: 7px;height: 390px;display: flex;">
                    <!-- Village ID, Village Name, District Name, Province Name -->
                    <!-- Use conditional rendering to check if villageData is not null -->
                    <div style="width: 600px;margin-right: 50px;font-size: 20px;">


                        <!-- <div v-if="villageData"
                            style="display: flex;margin-left: 10px;margin-right: 5px;margin-top: 30px;">
                            <div style="width: 50%">

                                <span
                                    style="display: block; text-align: center; margin-top: 7px; font-family: 'Times New Roman', Times, serif;"
                                    class="back--text"> VillageID</span>

                            </div>
                            <div style="width:50%">

                                <v-text-field style="font-family: 'Times New Roman', Times, serif;font-size: 20px;width:50%"
                                class="mr-1 ml-1" label="X-coordinate" dense flat solo background-color="#f5f5f5"
                                v-if="villageData.villageCode" :value="villageData.villageCode" readonly></v-text-field>
                            </div>
                        </div> -->

                        <div v-if="villageData" style="display: flex;margin-left: 10px;margin-right: 5px;margin-top: 30px;">
                            <span
                                style="margin-top: 7px;font-family: 'Times New Roman', Times, serif;font-size: 20px;width:50%;display: block; text-align: center;"
                                class="back--text">VillageID</span>


                            <v-text-field style="font-family: 'Times New Roman', Times, serif;font-size: 20px;width:50%"
                                class="mr-1 ml-1" label="VillageID" dense flat solo background-color="#f5f5f5"
                                v-if="villageData.villageCode" :value="villageData.villageCode" readonly></v-text-field>

                        </div>
                        <!-- Add similar conditional blocks for other fields -->

                        <div v-if="villageData && villageData.villageId"
                            style="display: flex;margin-left: 10px;margin-right: 5px;">
                            <div style="width: 50%">
                                <span
                                    style="display: block; text-align: center; margin-top: 7px; font-family: 'Times New Roman', Times, serif;font-size: 20px;"
                                    class="back--text">Village Name</span>

                            </div>

                            <div style="width: 25%">
                                <v-text-field style="font-family: 'Times New Roman', Times, serif;font-size: 20px;"
                                    class="mr-1 ml-1" label="Village Name (En)" dense flat solo
                                    background-color="#f5f5f5" :value="villageData.villageId.villageEn"
                                    readonly></v-text-field>
                            </div>
                            <div style="width: 25%">
                                <v-text-field style="font-family: 'Times New Roman', Times, serif;font-size: 20px;"
                                    class="mr-1 ml-1" label="Village Name (Lao)" dense flat solo
                                    background-color="#f5f5f5" :value="villageData.villageId.villageLa"
                                    readonly></v-text-field>
                            </div>

                        </div>
                        <div v-if="villageData" style="display: flex;margin-left: 10px;margin-right: 5px;">
                            <span
                                style="margin-top: 7px;font-family: 'Times New Roman', Times, serif;font-size: 20px;width:50%;display: block; text-align: center;"
                                class="back--text">X-coordinate</span>


                            <v-text-field style="font-family: 'Times New Roman', Times, serif;font-size: 20px;width:50%"
                                class="mr-1 ml-1" label="X-coordinate" dense flat solo background-color="#f5f5f5"
                                v-if="villageData.lat" :value="villageData.lat" readonly></v-text-field>

                        </div>
                        <div v-if="villageData" style="display: flex;margin-left: 10px;margin-right: 5px;">
                            <span
                                style="margin-top: 8px;font-family: 'Times New Roman', Times, serif;font-size: 20px;width:50%;display: block; text-align: center;"
                                class="back--text">Y-coordinate</span>

                            <v-text-field
                                style="font-family: 'Times New Roman', Times, serif;font-size: 20px;width:50%;display: block; text-align: center;"
                                class="mr-1 ml-1" label="Y-coordinate" dense flat solo background-color="#f5f5f5"
                                v-if="villageData.long" :value="villageData.long" readonly></v-text-field>
                        </div>
                    </div>

                    <div>

                        <div v-if="villageData" class="image-container">
                            <img :src="villageData.image" alt="Village Image" class="village-image" />
                            <!-- Other data from the API can be displayed here -->
                        </div>
                    </div>

                </v-card>
                <!-- <v-card style="width: 100%;height: auto;">

                </v-card> -->
            </div>
            <!-- <div
                style="display: flex; overflow-x: auto; width: 1640px; margin-left: 10px;margin-top: 30px;margin-bottom: 30px;">
                <v-card>

                    <v-list style="display: flex; min-width: 1200px;" v-model="selectedCard">
                        <v-btn ref="btn1" class="hovered" value="1" @click="selectedCard = '1'"
                            @mouseover="changeColor('red', $refs.btn1)" @mouseleave="changeColor('green', $refs.btn1)"
                            style="margin-left: 2px; margin-right: 2px; background-color: green; color: aliceblue;font-family: 'Times New Roman', Times, serif;">
                            HOME RESEARCH ANALYSIS
                        </v-btn>
                        <v-btn ref="btn2" value="2" @click="selectedCard = '2'"
                            @mouseover="changeColor('red', $refs.btn2)" @mouseleave="changeColor('green', $refs.btn2)"
                            style="margin-left: 2px; margin-right: 2px; background-color: green; color: aliceblue;font-family: 'Times New Roman', Times, serif;">
                            VILLAGE FACILITIES
                        </v-btn>
                        <v-btn ref="btn3" value="3" @click="selectedCard = '3'"
                            @mouseover="changeColor('red', $refs.btn3)" @mouseleave="changeColor('green', $refs.btn3)"
                            style="margin-left: 2px;margin-right: 2px;background-color: green; color: aliceblue;font-family: 'Times New Roman', Times, serif;">POPULATION</v-btn>

                        <v-btn ref="btn4" value="1" @click="selectedCard = '4'"
                            @mouseover="changeColor('red', $refs.btn4)" @mouseleave="changeColor('green', $refs.btn4)"
                            style="margin-left: 2px;margin-right: 2px;background-color: green; color: aliceblue;font-family: 'Times New Roman', Times, serif;">SCHOOL
                            FACILITIES</v-btn>

                        <v-btn ref="btn5" value="5" @click="selectedCard = '5'"
                            @mouseover="changeColor('red', $refs.btn5)" @mouseleave="changeColor('green', $refs.btn5)"
                            style="margin-left: 2px;margin-right: 2px;background-color: green; color: aliceblue;font-family: 'Times New Roman', Times, serif;">WELL
                            BEING ACCESS CRITERIA</v-btn>
                        <v-btn value="1" @click="selectedCard = '6'"
                            style="margin-left: 2px;margin-right: 2px;background-color: green; color: aliceblue;font-family: 'Times New Roman', Times, serif;">HOUSEHOLD
                            ASSETS</v-btn>
                        <v-btn value="1" @click="selectedCard = '7'"
                            style="margin-left: 2px;margin-right: 2px;background-color: green; color: aliceblue;font-family: 'Times New Roman', Times, serif;">SOCIAL
                            RISKS</v-btn>
                        <v-btn value="1" @click="selectedCard = '8'"
                            style="margin-left: 2px;margin-right: 2px;background-color: green; color: aliceblue;font-family: 'Times New Roman', Times, serif;">WATER
                            SUPPLY</v-btn>
                        <v-btn value="1" @click="selectedCard = '9'"
                            style="margin-left: 2px;margin-right: 2px;background-color: green; color: aliceblue;font-family: 'Times New Roman', Times, serif;">ROAD
                            ACCESS TO VILLAGE</v-btn>
                        <v-btn value="1" @click="selectedCard = '10'"
                            style="margin-left: 2px;margin-right: 2px;background-color: green; color: aliceblue;font-family: 'Times New Roman', Times, serif;">VILLAGE
                            ACCESS ROAD STANDARD</v-btn>
                        <v-btn value="1" @click="selectedCard = '11'"
                            style="margin-left: 2px;margin-right: 2px;background-color: green; color: aliceblue;font-family: 'Times New Roman', Times, serif;">ACCESS
                            TO MARKETS (FOR SALE OF PRODUCTS)</v-btn>
                        <v-btn value="1" @click="selectedCard = '12'"
                            style="margin-left: 2px;margin-right: 2px;background-color: green; color: aliceblue;font-family: 'Times New Roman', Times, serif;">OCCUPATION</v-btn>
                        <v-btn value="1" @click="selectedCard = '13'"
                            style="margin-left: 2px;margin-right: 2px;background-color: green; color: aliceblue;font-family: 'Times New Roman', Times, serif;">OTHER
                            LIVELIHOOD SOURCES</v-btn>
                        <v-btn value="1" @click="selectedCard = '14'"
                            style="margin-left: 2px;margin-right: 2px;background-color: green; color: aliceblue;font-family: 'Times New Roman', Times, serif;">CROPPING
                            AREA</v-btn>
                        <v-btn value="1" @click="selectedCard = '15'"
                            style="margin-left: 2px;margin-right: 2px;background-color: green; color: aliceblue;font-family: 'Times New Roman', Times, serif;">CROP
                            YIELD</v-btn>
                        <v-btn value="1" @click="selectedCard = '16'"
                            style="margin-left: 2px;margin-right: 2px;background-color: green; color: aliceblue;font-family: 'Times New Roman', Times, serif;">IRRIGATION</v-btn>
                        <v-btn value="1" @click="selectedCard = '17'"
                            style="margin-left: 2px;margin-right: 2px;background-color: green; color: aliceblue;font-family: 'Times New Roman', Times, serif;">ANIMALS</v-btn>
                        <v-btn value="1" @click="selectedCard = '18'"
                            style="margin-left: 2px;margin-right: 2px;background-color: green; color: aliceblue;font-family: 'Times New Roman', Times, serif;">INCOME
                            SOURCES</v-btn>
                        <v-btn value="1" @click="selectedCard = '19'"
                            style="margin-left: 2px;margin-right: 2px;background-color: green; color: aliceblue;font-family: 'Times New Roman', Times, serif;">CREDIT
                            SOURCES</v-btn>
                        <v-btn value="1" @click="selectedCard = '20'"
                            style="margin-left: 2px;margin-right: 2px;background-color: green; color: aliceblue;font-family: 'Times New Roman', Times, serif;">AGRICULTURE
                            AND FORESTRY TRENDS (CHANGES DURING LAST 5 YEARS)</v-btn>

                        <v-btn value="1" @click="selectedCard = '21'"
                            style="margin-left: 2px;margin-right: 2px;background-color: green; color: aliceblue;font-family: 'Times New Roman', Times, serif;">AGRICULTURE
                            Physiography</v-btn>

                        <v-btn value="1" @click="selectedCard = '22'"
                            style="margin-left: 2px;margin-right: 2px;background-color: green; color: aliceblue;font-family: 'Times New Roman', Times, serif;">AGRICULTURE
                            Distances</v-btn>

                        <v-btn value="1" @click="selectedCard = '23'"
                            style="margin-left: 2px;margin-right: 2px;background-color: green; color: aliceblue;font-family: 'Times New Roman', Times, serif;">AGRICULTURE
                            LandGovernance</v-btn>

                        <v-btn value="1" @click="selectedCard = '24'"
                            style="margin-left: 2px;margin-right: 2px;background-color: green; color: aliceblue;font-family: 'Times New Roman', Times, serif;">AGRICULTURE
                            Risks</v-btn>


                    </v-list>

                </v-card>
            </div> -->
            <div>
                <div style="text-align: center; margin-top: 10px;">
                    <v-btn ref="btn1" class="hovered" value="1" @click="selectedCard = '1'"
                        @mouseover="changeColor('red', $refs.btn1)" @mouseleave="changeColor('green', $refs.btn1)"
                        style="margin-left: 2px; margin-right: 2px; background-color: green; color: aliceblue;font-family: 'Times New Roman', Times, serif;font-size: 25px;">
                        Baseline Data
                    </v-btn>
                </div>

                <!-- Display the PX Data -->
                <div
                    style="display: flex; overflow-x: auto; width: 100%; margin-left: 10px;margin-top: 30px;margin-bottom: 30px;">
                    <v-card>
                        <div v-if="selectedCard === '1'" style="margin-top: 20px;">

                            <div v-if="villagePX">
                            
                            <table>
                            
                                <tr>
                                   
                                <th>VillageID</th>
                                    <th style="width: 100%;">ບ້ານ</th>
                                    <th style="width: 100%;">Village_name</th>
                                    <th style="width: 100%;">ລາວ_ລຸ່ມ</th>
                                    <th style="width: 100%;">ກຶມມຸKeum_mu</th> 
                                    <th style="width: 100%;">ມົ້ງ</th>
                                    <th style="width: 100%;">ລວມ</th>
                                    <th style="width: 100%;">ພະນັກງານ\staff</th>
                                    <th style="width: 100%;">ເຄິງ_ພະນັກງານ_semi_saff</th>
                                    <th style="width: 100%;">ການ_ຄ້າ_ບໍລິການ_Commercial_and_service</th>
                                    <th style="width: 100%;">ເຮັດ_ໄຮ່_ຫຼື_ເຮັດ_ສວ່ນ/Farmng</th>
                                    <th style="width: 100%;">ລຽ້ງ_ສັດ\Live_stock_raising</th>
                                    <th style="width: 100%;">ຕັ້ງ_ໂຕະ_(ໜວ່ຍ)\Telephone</th>
                                    <th style="width: 100%;">ມີ_ຈັກ_ເລກ_ໝາຍ Number_of_simcard</th>
                                    <th style="width: 100%;">ໂທ_ລະ_ສັບ_ມື_ຖື(ໜວ່ຍ) Smart_phone</th>
                                    <th style="width: 100%;">ຄວາຍ/Buffalo</th>
                                    <th style="width: 100%;">ງົວ/Cow</th>
                                    <th style="width: 100%;">ມ້າ/Horse</th>
                                    <th style="width: 100%;">ໝູ/Pig</th>
                                    <th style="width: 100%;">ແບ້/Goat</th>
                                    <th style="width: 100%;">ສັດປີກ/Poultry</th>
                                    <th style="width: 100%;">ໜອງ_ປາ Fish_pool</th>
                                    <th style="width: 100%;">ປອ່ຍປາ(ໂຕ) Fish_releasing</th>
                                    <th style="width: 100%;">ເນື້ອ_ທີ່_(ຮຕ) Area_(ha)</th>
                                    <th style="width: 100%;">ຜົນ_ຜະລິດ_(ໂຕນ) Yield_(ton)</th>
                                    <th style="width: 100%;">ຕິດ_ຕັ້ງ_ກົງ_ເຕີ Set_up_eclectric_transformers</th>
                                    <th style="width: 100%;">ບໍ່_ໄດ້_ຕິດ_ຕັ້ງ_ກົງ_ເຕີ Not_yet_set_up_electricity_transformers</th>
                                    <th style="width: 100%;">ພະລັງງານແສງຕາເວັນ Solar_cell</th>
                                    <th style="width: 100%;">ພະລັງງານນ້ຳຢອດ Small_water_power</th>
                                    <th style="width: 100%;">ບໍ່ໄດ້ໃຊ້ໄຟຟ້າ No_electricity</th>
                                    <th style="width: 100%;">ລົດ_6_ລໍ້ຂື້ນໄປ_(ຄັນ) Truck_with_6_wheels</th>
                                    <th style="width: 100%;">ລົດກະບະ_4ລໍ້_(ຄັນ) Car_with_4_wheels</th>
                                    <th style="width: 100%;">ລົດຊີ້ງ_(ຄັນ) Simple_4WD_tractor</th>
                                    <th style="width: 100%;">ລົດໄຖນາ_(ຄັນ) Tractor</th>
                                    <th style="width: 100%;">ລົດຈັກ_(ຄັນ) Motorbike</th>
                                    <th style="width: 100%;">ເຮືອ_(ລຳ) Boat</th>
                                    <th style="width: 100%;">ນ້ຳຕົ້ນ Boil</th>
                                    <th style="width: 100%;">ນ້ຳດື່ມບໍລິສຸດ Purified_water</th>
                                    <th style="width: 100%;">ນ້ຳປະປາ Supply_water</th>
                                    <th style="width: 100%;">ນ້ຳລິນ Springshed</th>
                                    <th style="width: 100%;">ນ້ຳສ້າງມີຟາປິດ Hell_pond</th>
                                    <th style="width: 100%;">ນ້ຳຫວ້ຍ_ແລະ_ໜອງ River</th>
                                    <th style="width: 100%;">ຮ້ານ Retail_outlet</th>
                                    <th style="width: 100%;">ຮ້ານ Shop</th>
                                    <th style="width: 100%;">ຮ້ານ Salon_Shop</th>
                                    <th style="width: 100%;">(ແຫ່ງ) Factory</th>
                                    <th style="width: 100%;">(ເຄື່ອງ) Machine</th>
                                    <th style="width: 100%;">ຈ/ນເດັກຮຽນອານຸບານ+ຫອ້ງກຽມ Nursery_class</th>
                                    <th style="width: 100%;">ຈ/ນ_ນ/ຮທີ່ຮຽນຊັ້ນປະຖົມ Primary_class</th>


                                    <th style="width: 100%;">ຈ/ນທີ່ຈົບຊັ້ນມັດທະຍົມຕົ້ນບໍາລຸງ Finished_primary_sub_class</th>
                                    <th style="width: 100%;">ຈ/ນທີ່ຈົບຊັ້ນມັດທະຍົມຕົ້ນບໍາລຸງ Finished_secondary_sub_class</th>
                                    <th style="width: 100%;">ຈ/ນທີ່ຈົບຊັ້ນປະຖົມ Finished_primary_class</th>
                                    <th style="width: 100%;">ຈ/ນທີ່ຈົບຊັ້ນມັດທະຍົມ_ຕົ້ນ Finished_secondary_class</th>
                                    <th style="width: 100%;">ຈ/ນທີ່ຈົບຊັ້ນມັດທະຍົມ_ປາຍ Finished_high_class</th>
                                    <th style="width: 100%;">ຈົບຊັ້ນຕົ້ນ Beginner</th>
                                    <th style="width: 100%;">ຈົບຊັ້ນກາງ Medium</th>
                                    <th style="width: 100%;">ຈົບຊັ້ນສູງ Diploma</th>
                                    <th style="width: 100%;">ຈົບປະລິນຍາຕີ_ຫຼື_ສູງກ່ວາ Bachelor_or_higher</th>
                                    <th style="width: 100%;">ຈ/ນແຮງງານຕົ້ນຕໍ Labor_18-60_years_old_(Total)</th>
                                    <th style="width: 100%;">ຍິງ Women</th>
                                    
                                    <th style="width: 100%;">ຄົວ_ເຮືອນ_ພົ້ນທຸກ_un-poor_household_2.800.000_ກີບ_ຂື້ນໄປ/ຄົນ/ປີ
                                        more_than_2.800.000_kip/person_year_ລວມ_Total</th>

                                    <th style="width: 100%;">ຄົວ_ເຮືອນ_ຍັງ_ທຸກ_poor_household_ຫຼຸດ_2.800.000_ລ້ານກີບລົງມາ/ຄົນ/ປີ
                                        lower_than_2.800.000 kip/person/year_ລວມ_Total</th>
                                </tr>
                                <tr>
                                    <td style="width: 100%;">{{ villagePX.village_id }}</td>
                                    <td style="width: 100%;">{{ villagePX.ບ້ານ }}</td>
                                    <td style="width: 100%;">{{ villagePX["Village name"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ລາວລຸ່ມ\nLao loum"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ກຶມມຸ\nKeum mu"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ມົ້ງ\nHmong"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ລວມ\nTotal"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ພະນັກງານ\nstaff"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ເຄິງພະນັກງານ\nsemi-saff"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ການຄ້າບໍລິການ\nCommercial and service"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ເຮັດໄຮ່ ຫຼື ເຮັດສວ່ນ\nFarmng"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ລຽ້ງສັດ\nLive stock raising"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ຕັ້ງໂຕະ (ໜວ່ຍ)\nTelephone"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ມີຈັກເລກໝາຍ\nNumber of simcard"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ໂທລະສັບມືຖື(ໜວ່ຍ)Smart phone"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ຄວາຍ\nBuffalo"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ງົວ\nCow"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ມ້າ\nHorse"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ໝູ\nPig"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ແບ້\nGoat"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ສັດປີກ\nPoultry"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ໜອງປາ\nFish pool"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ປອ່ຍປາ(ໂຕ)\nFish releasing"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ເນື້ອທີ່ (ຮຕ)\nArea (ha)"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ຜົນຜະລິດ (ໂຕນ)\nYield (ton)"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ຕິດຕັ້ງກົງເຕີ\nSet up eclectric transformers"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ບໍ່ໄດ້ຕິດຕັ້ງກົງເຕີ\nNot yet set up electricity transformers"]
                                        }}</td>
                                    <td style="width: 100%;">{{ villagePX["ພະລັງງານແສງຕາເວັນ\nSolar cell"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ພະລັງງານນ້ຳຢອດ\nsmall water power"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ບໍ່ໄດ້ໃຊ້ໄຟຟ້າ\nNo eclectricity"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ລົດ 6 ລໍ້ຂື້ນໄປ (ຄັນ)\ntruck with 6 wheels"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ລົດກະບະ 4ລໍ້ (ຄັນ)\ncar with 4 wheels"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ລົດຊີ້ງ (ຄັນ)\nsimple 4WD tractor"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ລົດໄຖນາ (ຄັນ)\ntractor"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ລົດຈັກ (ຄັນ)\nmotorbike"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ເຮືອ (ລຳ)\nboat"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ນ້ຳຕົ້ນ\nboil"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ນ້ຳດື່ມບໍລິສຸດ\npurified water"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ນ້ຳປະປາ\nsupply water"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ນ້ຳລິນ\nspringshed"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ນ້ຳສ້າງມີຟາປິດ\nhell pond"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ນ້ຳຫວ້ຍ ແລະ ໜອງ\nriver"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ຮ້ານ\nretail outlet"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ຮ້ານ\nShop"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ຮ້ານ\nSalon Shop"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ຮ້ານ\nshop"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["(ແຫ່ງ)\nfactory"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["(ເຄື່ອງ)\nmachine"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ຈ/ນເດັກຮຽນອານຸບານ+ຫອ້ງກຽມ\nnursery class "] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ຈ/ນ ນ/ຮທີ່ຮຽນຊັ້ນປະຖົມ\nprimary class"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ຈ/ນທີ່ຈົບຊັ້ນປະຖົມບໍາລຸງ\nfinished primary sub-class"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ຈ/ນທີ່ຈົບຊັ້ນມັດທະຍົມຕົ້ນບໍາລຸງ\nfinished secondarysub-class"] }}</td>
                                  


                                    <td style="width: 100%;">{{ villagePX["ຈ/ນທີ່ຈົບຊັ້ນປະຖົມ\nfinished primary class"] }}</td>

                                    <td style="width: 100%;">{{ villagePX["ຈ/ນທີ່ຈົບຊັ້ນມັດທະຍົມ ຕົ້ນ\nfinished secondary class"] }}</td>

                                    <td style="width: 100%;">{{ villagePX["ຈ/ນທີ່ຈົບຊັ້ນມັດທະຍົມ ປາຍ\nfinished high class"] }}</td>

                                    <td style="width: 100%;">{{ villagePX["ຈົບຊັ້ນຕົ້ນ\nbeginner"] }}</td>


                                    <td style="width: 100%;">{{ villagePX["ຈົບຊັ້ນກາງ\nmeduim"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ຈົບຊັ້ນສູງ\ndiploma"] }}</td>

                                    <td style="width: 100%;">{{ villagePX["ຈົບປະລິນຍາຕີ ຫຼື ສູງກ່ວາ\nbachelor or higher"] }}</td>

                                    <td style="width: 100%;">{{ villagePX["ຈ/ນແຮງງານຕົ້ນຕໍ 18-60 ປີ\nlabor 18-60 years old ລວມ\nTotal"] }}</td>

                                    
                                    <td style="width: 100%;">{{ villagePX["ຍິງ\nwomen"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ຄົວເຮືອນພົ້ນທຸກ un-poor household 2"]["800"]["000 ກີບຂື້ນໄປ/ຄົນ/ປີ\nmore than 2"]["800"]["000 kip/person/year ລວມ\nTotal"] }}</td>
                                    <td style="width: 100%;">{{ villagePX["ຄົວເຮືອນຍັງທຸກ\npoor household ຫຼຸດ 2"]["800"]["000 ລ້ານກີບລົງມາ/ຄົນ/ປີ\nlower than 2"]["800"]["000 kip/person/year ລວມ\nTotal"] }}</td>

                                </tr>
                                <!-- Add more rows as needed -->
                            </table>
                        </div>
                        <div v-if="villageLPB">
    <table>
        <tr>
            <th>VillageID</th>
            <th>ບ້ານ</th>
            <th>Village name</th>
            <th>HH</th>
            <th>ເຜົ່າລາວລຸ່ມ lao loum</th>
            <th>ເຜົ່າລື້ lue</th>
            <th>ເຜົ່ກຶມມຸ keum mu</th>
            <th>ເຜົ່າມົ້ງ hmong</th>
            <th>ເຜົ່າໄປຼ pai</th>
            <th>ເຜົ່າໄທດຳ thaidam</th>
            <th>ເຜົ່າຍວນ Yuan</th>
            <th>ເຜົ່າອິວມຽນ eiw mien</th>
            <th>ແຮງງານຕົ້ນຕໍ່ Main labor Female</th>
            <th>ແຮງງານຕົ້ນຕໍ່ Main labor Man</th>
            <th>ແຮງງານຕົ້ນຕໍ່ Main labor Total</th>
            <th>ແຮງງານສຳຮອງSub-labor Female</th>
            <th>ແຮງງານສຳຮອງSub-labor Man</th>
            <th>ແຮງງານສຳຮອງSub-labor Total</th>
            <th>ເຮັດວຽກກະສິກຳFarming</th>
            <th>ເຮັດວຽກການຄ້າ ແລະ ບໍລິການCommerce and Service</th>
            <th>ພະນັກງານStaff</th>
            <th>ໂທລະສັບມືຖືSmart Phone</th>
            <th>ໂທລະສັບຕັ້ງໂຕະTelephone</th>
            <th>ຈານດາວທຽມ_ເຄື່ອງສັນຍາໂທລະສັບSatellite dish/Telecom</th>
            <th>ຈກກຳເນີດໄຟ້າElectric Generator</th>
            <th>ໄຟຟ້າແສງສະຫວ່າງSolar Cell</th>
            <th>ໄຟຟ້ານ້ຳຢອດSmall Water Power</th>
            <th>ບໍ່ໄດ້ໃຊ້ໄຟ້າNon Electricity</th>
            <th>ລົດຫົກລໍ້,ລົດສິບສອງລໍ້Truck with 6 and 10 wheels</th>
            <th>ລົດກະບະ/ລົດເກງ Car with 4 wheels</th>
            <th>ລົດຈັກMotorbike</th>
            <th>ລົດໂອ໊ກສາຍTouk Touk</th>
            <th>ລົດຖີບBicycle</th>
            <th>ເຄື່ອງຕົວປັ່ນTractor</th>
            <th>ຕົວປັ່ນໃຫຍ່Simple 4WD Tractor</th>

            <th>ຕົວປັ່ນໃຫຍ່ Big Tractor</th>
            <th>ເຄື່ອງຕັດຫຍ້າ Grass Cut Machine</th>
            <th>ໂຮງສີ່ເຂົ້າ Rice Mill</th>
            <th>ໂຮງສີ່ເຂົ້ານ້ອຍ Small Rice Mill</th>
            <th>ຮ້ານຄ້າ Retail Outlet</th>
            <th>ປະຈຸບັນຈຳນວນນັກຮຽນກຳລັງຮຽນໜັງສື ອະນຸບານ Nursery</th>
            <th>ປະຈຸບັນຈຳນວນນັກຮຽນກຳລັງຮຽນໜັງສື ປະຖົມ Primary</th>
            <th>ປະຈຸບັນຈຳນວນນັກຮຽນກຳລັງຮຽນໜັງສື ມັດທະຍົມຕົ້ນ Secondary</th>
            <th>ປະຈຸບັນຈຳນວນນັກຮຽນກຳລັງຮຽນໜັງສື ມັດທະຍົມຕອນປາຍ ລວມ\High Total</th>
            <th>ປະຈຸບັນຈຳນວນນັກຮຽນກຳລັງຮຽນໜັງສື ມັດທະຍົມຕອນປາຍ\ຍິງ High Women</th>
            <th>ຈຳນວນປະລະການຮຽນ\nstop studying ປະຖົມ\nprimary ລວມ Stop Studying Primary Total</th>
            <th>ຈຳນວນປະລະການຮຽນ\ປະຖົມ ຍິງ Stop Studying Primary Women</th>


            <th>ຈຳນວນປະລະການຮຽນ\ມັດທະຍົມຕົ້ນ\ລວມ Stop Studying Secondary Total</th>
            <th>ຈຳນວນປະລະການຮຽນ\ມັດທະຍົມຕົ້ນ\ຍິງ  Stop Studying Secondary Women</th>
            <th>ຈຳນວນປະລະການຮຽນ\ ອ່ານບໍ່ໄດ້,ຂຽນບໍ່ເປັນ ລວມ Can Not Read and Write Total</th>
            <th>ຈຳນວນປະລະການຮຽນ\ອ່ານບໍ່ໄດ້,ຂຽນບໍ່ເປັນ\ຍິງ Can Not Read and Write Women</th>
            <th>ແຫຼ່ງນ້ຳດື່ມຕົ້ນຕໍ ນ້ຳດື່ມບໍລິສຸດ Purified Water</th>

            <th>ແຫຼ່ງນ້ຳດື່ມຕົ້ນຕໍ  ນ້ຳບາດານ/ນ້ຳລິນ/ນ້ຳສ້າງມີຜາປິດ\nundergroud/sprindshed/hell pond"</th>

            <th>ແຫຼ່ງນ້ຳດື່ມຕົ້ນຕໍ ນ້ຳບາດານ/ນ້ຳລິນ/ນ້ຳສ້າງມີຜາປິດ Underground/Well/Well without Cover</th>
            <th>ແຫຼ່ງນ້ຳດື່ມຕົ້ນຕໍ ນ້ຳແມ່/ນ້ຳຫ້ວຍ River</th>

            <th>Total Area in ha</th>
            
            <th>ດີນປຸກສ້າງ\nhousing ຈຳນວນຕອນ     Housing Plots</th>
            <th>ດີນນາ\npaddy ຈຳນວນຕອນ     Paddy Plots</th>
            <th>ດີນໄຮ່\nupland ຈຳນວນຕອນ\     Upland Plots</th>
            <th>ດີນສວນ\nfarming ຈຳນວນຕອນ     Farming Plots</th>
            <th>ນາປີ rainy season rice ເນື້ອທີ່ (ເຮັກຕາ)   Rainy Season Rice Area</th>
            <th>ໄຮ່/ສວນເຂົ້າ upland rice ເນື້ອທີ່ (ເຮັກຕາ)     Upland Rice Area</th>
            <th>ສາລີ maize ເນື້ອທີ່ (ເຮັກຕາ)     Maize Area</th>
            <th> ໝາກເດືອຍ job tear ເນື້ອທີ່ (ເຮັກຕາ)    Job Tear Area</th>
            <th> ໝາກງາ Sesame ເນື້ອທີ່ (ເຮັກຕາ)    Sesame Area</th>
            <th> ການລ້ຽງ (ຫົວໜ່ວຍ: ໂຕ) Livestock ງົວ     Cow</th>
            <th>  ການລ້ຽງ (ຫົວໜ່ວຍ: ໂຕ) Livestock ຄວາຍ    Buffalo</th>
            <th> ການລ້ຽງ (ຫົວໜ່ວຍ: ໂຕ) Livestock ໝູ    Pig</th>
            <th> ການລ້ຽງ (ຫົວໜ່ວຍ: ໂຕ)      Poultry</th>
            <th>  ການລ້ຽງ (ຫົວໜ່ວຍ: ໂຕ) Livestockໜອງປາ    Fish Pond</th>
            <th> ການລ້ຽງ (ຫົວໜ່ວຍ: ໂຕ) Livestockປາປ່ອຍ (ລ້ຽງປາ)     Fish Release</th>
            <th> ການລ້ຽງ (ຫົວໜ່ວຍ: ໂຕ) Livestockກົບ     Other Livestock</th>
            <th>  ການລ້ຽງ (ຫົວໜ່ວຍ: ໂຕ)    Other Livestock</th>
       
        </tr>
        <tr>
            <td>{{ villageLPB.village_id }}</td>
            <td>{{ villageLPB.ບ້ານ }}</td>
            <td>{{ villageLPB["Village name"] }}</td>
            <td>{{ villageLPB.HH }}</td>
            <td>{{ villageLPB["ເຜົ່າລາວລຸ່ມ\nlao loum"] }}</td>
            <td>{{ villageLPB["ເຜົ່າລື້\nlue"] }}</td>
            <td>{{ villageLPB["ເຜົ່ກຶມມຸ\nkeum mu"] }}</td>
            <td>{{ villageLPB["ເຜົ່າມົ້ງ\nhmong"] }}</td>
            <td>{{ villageLPB["ເຜົ່າໄປຼ\npai"] }}</td>
            <td>{{ villageLPB["ເຜົ່າໄທດຳ\nthaidam"] }}</td>
            <td>{{ villageLPB["ເຜົ່າຍວນ\nYuan"] }}</td>
            <td>{{ villageLPB["ເຜົ່າອິວມຽນ\neiw mien"] }}</td>
            <td>{{ villageLPB["ແຮງງານຕົ້ນຕໍ່\nMain labor ເພດຍິງ\nFemale"] }}</td>
            <td>{{ villageLPB["ແຮງງານຕົ້ນຕໍ່\nMain labor ເພດຊາຍ\nMan"] }}</td>
            <td>{{ villageLPB["ແຮງງານຕົ້ນຕໍ່\nMain labor ລວມ\nTotal"] }}</td>
            <td>{{ villageLPB["\"ແຮງງານສຳຮອງ\nsub-labor\"ເພດຍິງ\nFemale"] }}</td>
            <td>{{ villageLPB["\"ແຮງງານສຳຮອງ\nsub-labor\"ເພດຊາຍ\nMan"] }}</td>
            <td>{{ villageLPB["\"ແຮງງານສຳຮອງ\nsub-labor ລວມ\nTotal"] }}</td>
            <td>{{ villageLPB["ເຮັດວຽກກະສິກຳ\nfarming"] }}</td>
            <td>{{ villageLPB["ເຮັດວຽກການຄ້າ ແລະ ບໍລິການ\ncommerce and service"] }}</td>
            <td>{{ villageLPB["ພະນັກງານ\nstaff"] }}</td>
            <td>{{ villageLPB["ໂທລະສັບມືຖື\nsmart phone    "] }}</td>
            <td>{{ villageLPB["ໂທລະສັບຕັ້ງໂຕະ\ntelephone                "] }}</td>
            <td>{{ villageLPB["ຈານດາວທຽມ/ເຄື່ອງສັນຍາໂທລະສັບ\nSatellite dish/Telecom            "] }}</td>
            <td>{{ villageLPB["ຈກກຳເນີດໄຟ້າ\nelectirc generator"] }}</td>
            <td>{{ villageLPB["ໄຟຟ້າແສງສະຫວ່າງ\nsolar cell"] }}</td>
            <td>{{ villageLPB["ໄຟຟ້ານ້ຳຢອດ\nsmall water power"] }}</td>
            <td>{{ villageLPB["ບໍ່ໄດ້ໃຊ້ໄຟ້າ\nnon electricity"] }}</td>
            <td>{{ villageLPB["  ລົດຫົກລໍ້,ລົດສິບສອງລໍ້\ntruck with 6 and wheels                                                                      "] }}</td>
            <td>{{ villageLPB[" ລົດກະບະ/ລົດເກງ \ncar with 4 wheels                     "] }}</td>
            <td>{{ villageLPB["ລົດຈັກ\nmotorbike                                       "] }}</td>
            <td>{{ villageLPB["ລົດໂອ໊ກສາຍ\nTouk Touk                                    "] }}</td>
            <td>{{ villageLPB["ລົດຖີບ\nbicycle                                                            "] }}</td>
            <td>{{ villageLPB["ເຄື່ອງຕົວປັ່ນ\ntractor                             "] }}</td>
            <td>{{ villageLPB["ຕົວປັ່ນໃຫຍ່\nsimple 4WD tractor                      "] }}</td>
            <td>{{ villageLPB["ຕົວປັ່ນໃຫຍ່\nbig tractor                               "] }}</td>
            <td>{{ villageLPB["ເຄື່ອງຕັດຫຍ້າ\ngrass cut machine"] }}</td>
            <td>{{ villageLPB["ໂຮງສີ່ເຂົ້າ\nrice mill"] }}</td>
            <td>{{ villageLPB["ໂຮງສີ່ເຂົ້ານ້ອຍ\nsmall rice mill"] }}</td>
            <td>{{ villageLPB["ຮ້ານຄ້າ\nRetail outlet"] }}</td>
            <td>{{ villageLPB["ປະຈຸບັນຈຳນວນນັກຮຽນກຳລັງຮຽນໜັງສື ອະນຸບານ\nnursery"] }}</td>
            <td>{{ villageLPB["ປະຈຸບັນຈຳນວນນັກຮຽນກຳລັງຮຽນໜັງສື ປະຖົມ\nprimary"] }}</td>
            <td>{{ villageLPB["ປະຈຸບັນຈຳນວນນັກຮຽນກຳລັງຮຽນໜັງສື ມັດທະຍົມຕົ້ນ\nsecondary"] }}</td>
            <td>{{ villageLPB[ "ປະຈຸບັນຈຳນວນນັກຮຽນກຳລັງຮຽນໜັງສື ມັດທະຍົມຕອນປາຍ\nhigh\"ລວມ\nTotal\""] }}</td>
            <td>{{ villageLPB["ປະຈຸບັນຈຳນວນນັກຮຽນກຳລັງຮຽນໜັງສື ມັດທະຍົມຕອນປາຍ\nhigh\"ຍິງ\nwomen\""] }}</td>
            <td>{{ villageLPB["ຈຳນວນປະລະການຮຽນ\nstop studying ປະຖົມ\nprimary ລວມ\r\nTotal"] }}</td>
            <td>{{ villageLPB["ຈຳນວນປະລະການຮຽນ\nstop studying ປະຖົມ\nprimaryຍິງ\r\nwomen"] }}</td>
            
            
            
            <td>{{ villageLPB[" ຈຳນວນປະລະການຮຽນ\nstop studyingມັດທະຍົມຕົ້ນ\nsecondaryລວມ\r\nTotal"] }}</td>
            <td>{{ villageLPB[" ຈຳນວນປະລະການຮຽນ\nstop studyingມັດທະຍົມຕົ້ນ\nsecondaryຍິງ\r\nwomen"] }}</td>
            <td>{{ villageLPB["ຈຳນວນປະລະການຮຽນ\nstop studying ອ່ານບໍ່ໄດ້,ຂຽນບໍ່ເປັນ\ncan not reach and writeລວມ\r\nTotal"] }}</td>
            <td>{{ villageLPB["ຈຳນວນປະລະການຮຽນ\nstop studying ອ່ານບໍ່ໄດ້,ຂຽນບໍ່ເປັນ\ncan not reach and writeຍິງ\r\nwomen"] }}</td>
            <td>{{ villageLPB["ແຫຼ່ງນ້ຳດື່ມຕົ້ນຕໍ ນ້ຳດື່ມບໍລິສຸດ\npurified water"] }}</td>
            <td>{{ villageLPB["ແຫຼ່ງນ້ຳດື່ມຕົ້ນຕໍ  ນ້ຳບາດານ/ນ້ຳລິນ/ນ້ຳສ້າງມີຜາປິດ\nundergroud/sprindshed/hell pond"] }}</td>
            <td>{{ villageLPB["ແຫຼ່ງນ້ຳດື່ມຕົ້ນຕໍ  ນ້ຳສ້າງບໍ່ມີຝາປິດ\nThe well has no cover"] }}</td>
            <td>{{ villageLPB["ແຫຼ່ງນ້ຳດື່ມຕົ້ນຕໍ ນ້ຳແມ່/ນ້ຳຫ້ວຍ\nriver"] }}</td>

            <td>{{ villageLPB["Total in ha"] }}</td>

            <td>{{ villageLPB["ດີນປຸກສ້າງ\nhousing ຈຳນວນຕອນ\r\nnumber of plot"] }}</td>
            <td>{{ villageLPB["ດີນນາ\npaddy ຈຳນວນຕອນ\r\nnumber of plot"] }}</td>
            <td>{{ villageLPB["ດີນໄຮ່\nupland ຈຳນວນຕອນ\r\nnumber of plot"] }}</td>
            <td>{{ villageLPB["ດີນສວນ\nfarming ຈຳນວນຕອນ\r\nnumber of plot"] }}</td>
            <td>{{ villageLPB["ນາປີ rainy season rice ເນື້ອທີ່ (ເຮັກຕາ)\r\narea (ha)"] }}</td>

            <td>{{ villageLPB["ໄຮ່/ສວນເຂົ້າ upland rice ເນື້ອທີ່ (ເຮັກຕາ)\r\narea (ha)"] }}</td>
            <td>{{ villageLPB["ສາລີ maize ເນື້ອທີ່ (ເຮັກຕາ)\r\narea (ha)"] }}</td>
            <td>{{ villageLPB["ໝາກເດືອຍ job tear ເນື້ອທີ່ (ເຮັກຕາ)\r\narea (ha)"] }}</td>

            <td>{{ villageLPB["ໝາກງາ Sesame ເນື້ອທີ່ (ເຮັກຕາ)\r\narea (ha)"] }}</td>
            <td>{{ villageLPB[" ການລ້ຽງ (ຫົວໜ່ວຍ: ໂຕ) Livestock ງົວ\ncow "] }}</td>
            <td>{{ villageLPB[" ການລ້ຽງ (ຫົວໜ່ວຍ: ໂຕ) Livestock ຄວາຍ\nBuffalo "] }}</td>
            <td>{{ villageLPB[" ການລ້ຽງ (ຫົວໜ່ວຍ: ໂຕ) Livestock ໝູ\npig "] }}</td>
            <td>{{ villageLPB[" ການລ້ຽງ (ຫົວໜ່ວຍ: ໂຕ) Livestock poultry "] }}</td>
            <td>{{ villageLPB[" ການລ້ຽງ (ຫົວໜ່ວຍ: ໂຕ) Livestockໜອງປາ fish pond "] }}</td>
            <td>{{ villageLPB[" ການລ້ຽງ (ຫົວໜ່ວຍ: ໂຕ) Livestockປາປ່ອຍ (ລ້ຽງປາ)\nFish release "] }}</td>
            <td>{{ villageLPB[" ການລ້ຽງ (ຫົວໜ່ວຍ: ໂຕ) Livestockກົບ\nfrog  "] }}</td>
            <td>{{ villageLPB[" ການລ້ຽງ (ຫົວໜ່ວຍ: ໂຕ) Livestockສັດອື່ນໆ\nother "] }}</td>
        </tr>
    </table>
</div>

                        </div>
                    </v-card>
                </div>


            </div>


            <!-- <div>
                <div v-if="selectedCard === '1'" style="margin-top: 20px;">
                    <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
                        <v-card-title>
                            <span style="font-family: 'Times New Roman', Times, serif;">Home Research Analysis</span>
                        </v-card-title>
                        <v-card-text>
                            <div style="overflow-x: auto;"
                                v-if="villageData && villageData.baselineData && villageData.baselineData.homeResearchAnalysis">
                                <table>
                                    <thead>
                                        <tr>
                                            <th v-for="(item, index) in villageData.baselineData.homeResearchAnalysis"
                                                :key="'title-' + index">
                                                {{ item.title }}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td v-for="(item, index) in villageData.baselineData.homeResearchAnalysis"
                                                :key="'value-' + index">
                                                {{ item.value }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </v-card-text>

                    </v-card>
                </div>
                <div v-if="selectedCard === '2'" style="margin-top: 20px;">
                    <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
                        <v-card-title>
                            <span style="font-family: 'Times New Roman', Times, serif;">
                                villageFacilities</span>
                        </v-card-title>
                        <v-card-text>
                            <div style="overflow-x: auto;"
                                v-if="villageData && villageData.baselineData && villageData.baselineData.villageFacilities">
                                <table>
                                    <thead>
                                        <tr>
                                            <th v-for="(item, index) in villageData.baselineData.villageFacilities"
                                                :key="'title-' + index">
                                                {{ item.title }}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td v-for="(item, index) in villageData.baselineData.villageFacilities"
                                                :key="'value-' + index">
                                                {{ item.value }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </v-card-text>

                    </v-card>
                </div>
                <div v-if="selectedCard === '3'" style="margin-top: 20px;">
                    <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
                        <div style="text-align: center;">

                            <span style="font-family: 'Times New Roman', Times, serif;"
                                class="back--text">Population</span>
                        </div>
                        <div style="overflow-x: auto;" v-if="villageData && villageData.baselineData && villageData.baselineData.population
                        ">
                            <table>
                                <thead>
                                    <tr>
                                        <th v-for="(item, index) in villageData.baselineData.population"
                                            :key="'title-' + index">
                                            {{ item.title }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td v-for="(item, index) in villageData.baselineData.population"
                                            :key="'value-' + index">
                                            {{ item.value }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </v-card>
                </div>
                <div v-if="selectedCard === '4'" style="margin-top: 20px;">
                    <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
                        <div style="text-align: center;">
                            <span style="font-family: 'Times New Roman', Times, serif;"
                                class="back--text">schoolFacilities</span>
                        </div>
                        <div style="overflow-x: auto;" v-if="villageData && villageData.baselineData && villageData.baselineData.schoolFacilities
                        ">
                            <table>
                                <thead>
                                    <tr>
                                        <th v-for="(item, index) in villageData.baselineData.schoolFacilities"
                                            :key="'title-' + index">
                                            {{ item.title }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td v-for="(item, index) in villageData.baselineData.schoolFacilities"
                                            :key="'value-' + index">
                                            {{ item.value }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </v-card>
                </div>
                <div v-if="selectedCard === '5'" style="margin-top: 20px;">
                    <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
                        <div style="text-align: center;">
                            <span style="font-family: 'Times New Roman', Times, serif;"
                                class="back--text">wellBeingAccessCriteria</span>
                        </div>
                        <div style="overflow-x: auto;"
                            v-if="villageData && villageData.baselineData && villageData.baselineData.wellBeingAccessCriteria">
                            <table>
                                <thead>
                                    <tr>
                                        <th v-for="(item, index) in villageData.baselineData.wellBeingAccessCriteria"
                                            :key="'title-' + index">
                                            {{ item.title }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td v-for="(item, index) in villageData.baselineData.wellBeingAccessCriteria"
                                            :key="'value-' + index">
                                            {{ item.value }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </v-card>
                </div>
                <div v-if="selectedCard === '6'" style="margin-top: 20px;">
                    <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
                        <div style="text-align: center;">
                            <span style="font-family: 'Times New Roman', Times, serif;"
                                class="back--text">houseHoldAssets</span>
                        </div>
                        <div style="overflow-x: auto;"
                            v-if="villageData && villageData.baselineData && villageData.baselineData.houseHoldAssets">
                            <table>
                                <thead>
                                    <tr>
                                        <th v-for="(item, index) in villageData.baselineData.houseHoldAssets"
                                            :key="'title-' + index">
                                            {{ item.title }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td v-for="(item, index) in villageData.baselineData.houseHoldAssets"
                                            :key="'value-' + index">
                                            {{ item.value }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </v-card>
                </div>
                <div v-if="selectedCard === '7'" style="margin-top: 20px;">
                    <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
                        <div style="text-align: center;">
                            <span style="font-family: 'Times New Roman', Times, serif;"
                                class="back--text">socialRisks</span>
                        </div>
                        <div style="overflow-x: auto;"
                            v-if="villageData && villageData.baselineData && villageData.baselineData.socialRisks">
                            <table>
                                <thead>
                                    <tr>
                                        <th v-for="(item, index) in villageData.baselineData.socialRisks"
                                            :key="'title-' + index">
                                            {{ item.title }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td v-for="(item, index) in villageData.baselineData.socialRisks"
                                            :key="'value-' + index">
                                            {{ item.value }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </v-card>
                </div>

                <div v-if="selectedCard === '8'" style="margin-top: 20px;">
                    <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
                        <div style="text-align: center;">
                            <span style="font-family: 'Times New Roman', Times, serif;"
                                class="back--text">waterSupply</span>
                        </div>
                        <div style="overflow-x: auto;"
                            v-if="villageData && villageData.baselineData && villageData.baselineData.waterSupply">
                            <table>
                                <thead>
                                    <tr>
                                        <th v-for="(item, index) in villageData.baselineData.waterSupply"
                                            :key="'title-' + index">
                                            {{ item.title }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td v-for="(item, index) in villageData.baselineData.waterSupply"
                                            :key="'value-' + index">
                                            {{ item.value }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </v-card>
                </div>
                <div v-if="selectedCard === '9'" style="margin-top: 20px;">
                    <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
                        <div style="text-align: center;">
                            <span style="font-family: 'Times New Roman', Times, serif;"
                                class="back--text">roadAccessToVillage</span>
                        </div>
                        <div style="overflow-x: auto;"
                            v-if="villageData && villageData.baselineData && villageData.baselineData.roadAccessToVillage">
                            <table>
                                <thead>
                                    <tr>
                                        <th v-for="(item, index) in villageData.baselineData.roadAccessToVillage"
                                            :key="'title-' + index">
                                            {{ item.title }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td v-for="(item, index) in villageData.baselineData.roadAccessToVillage"
                                            :key="'value-' + index">
                                            {{ item.value }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </v-card>
                </div>
                <div v-if="selectedCard === '10'" style="margin-top: 20px;">
                    <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
                        <div style="text-align: center;">
                            <span style="font-family: 'Times New Roman', Times, serif;"
                                class="back--text">villageAccessRoadStandard</span>
                        </div>
                        <div style="overflow-x: auto;"
                            v-if="villageData && villageData.baselineData && villageData.baselineData.villageAccessRoadStandard">
                            <table>
                                <thead>
                                    <tr>
                                        <th v-for="(item, index) in villageData.baselineData.villageAccessRoadStandard"
                                            :key="'title-' + index">
                                            {{ item.title }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td v-for="(item, index) in villageData.baselineData.villageAccessRoadStandard"
                                            :key="'value-' + index">
                                            {{ item.value }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </v-card>
                </div>
                <div v-if="selectedCard === '11'" style="margin-top: 20px;">
                    <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
                        <div style="text-align: center;">
                            <span style="font-family: 'Times New Roman', Times, serif;"
                                class="back--text">accessToMarkets</span>
                        </div>
                        <div style="overflow-x: auto;"
                            v-if="villageData && villageData.baselineData && villageData.baselineData.accessToMarkets">
                            <table>
                                <thead>
                                    <tr>
                                        <th v-for="(item, index) in villageData.baselineData.accessToMarkets"
                                            :key="'title-' + index">
                                            {{ item.title }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td v-for="(item, index) in villageData.baselineData.accessToMarkets"
                                            :key="'value-' + index">
                                            {{ item.value }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </v-card>
                </div>

                <div v-if="selectedCard === '12'" style="margin-top: 20px;">
                    <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
                        <div style="text-align: center;">
                            <span style="font-family: 'Times New Roman', Times, serif;"
                                class="back--text">occupation</span>
                        </div>
                        <div style="overflow-x: auto;"
                            v-if="villageData && villageData.baselineData && villageData.baselineData.occupation">
                            <table>
                                <thead>
                                    <tr>
                                        <th v-for="(item, index) in villageData.baselineData.occupation"
                                            :key="'title-' + index">
                                            {{ item.title }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td v-for="(item, index) in villageData.baselineData.occupation"
                                            :key="'value-' + index">
                                            {{ item.value }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </v-card>
                </div>
                <div v-if="selectedCard === '13'" style="margin-top: 20px;">
                    <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
                        <div style="text-align: center;">
                            <span style="font-family: 'Times New Roman', Times, serif;"
                                class="back--text">otherLivelihoodSources</span>
                        </div>
                        <div style="overflow-x: auto;"
                            v-if="villageData && villageData.baselineData && villageData.baselineData.otherLivelihoodSources">
                            <table>
                                <thead>
                                    <tr>
                                        <th v-for="(item, index) in villageData.baselineData.otherLivelihoodSources"
                                            :key="'title-' + index">
                                            {{ item.title }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td v-for="(item, index) in villageData.baselineData.otherLivelihoodSources"
                                            :key="'value-' + index">
                                            {{ item.value }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </v-card>
                </div>
                <div v-if="selectedCard === '14'" style="margin-top: 20px;">
                    <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
                        <div style="text-align: center;">
                            <span style="font-family: 'Times New Roman', Times, serif;"
                                class="back--text">croppingArea</span>
                        </div>
                        <div style="overflow-x: auto;"
                            v-if="villageData && villageData.baselineData && villageData.baselineData.croppingArea">
                            <table>
                                <thead>
                                    <tr>
                                        <th v-for="(item, index) in villageData.baselineData.croppingArea"
                                            :key="'title-' + index">
                                            {{ item.title }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td v-for="(item, index) in villageData.baselineData.croppingArea"
                                            :key="'value-' + index">
                                            {{ item.value }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </v-card>
                </div>
                <div v-if="selectedCard === '15'" style="margin-top: 20px;">
                    <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
                        <div style="text-align: center;">
                            <span style="font-family: 'Times New Roman', Times, serif;"
                                class="back--text">cropYield</span>
                        </div>
                        <div style="overflow-x: auto;"
                            v-if="villageData && villageData.baselineData && villageData.baselineData.cropYield">
                            <table>
                                <thead>
                                    <tr>
                                        <th v-for="(item, index) in villageData.baselineData.cropYield"
                                            :key="'title-' + index">
                                            {{ item.title }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td v-for="(item, index) in villageData.baselineData.cropYield"
                                            :key="'value-' + index">
                                            {{ item.value }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </v-card>
                </div>
                <div v-if="selectedCard === '16'" style="margin-top: 20px;">
                    <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
                        <div style="text-align: center;">
                            <span style="font-family: 'Times New Roman', Times, serif;"
                                class="back--text">Irrigation</span>
                        </div>
                        <div style="overflow-x: auto;"
                            v-if="villageData && villageData.baselineData && villageData.baselineData.Irrigation">
                            <table>
                                <thead>
                                    <tr>
                                        <th v-for="(item, index) in villageData.baselineData.Irrigation"
                                            :key="'title-' + index">
                                            {{ item.title }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td v-for="(item, index) in villageData.baselineData.Irrigation"
                                            :key="'value-' + index">
                                            {{ item.value }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </v-card>
                </div>
                <div v-if="selectedCard === '17'" style="margin-top: 20px;">
                    <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
                        <div style="text-align: center;">
                            <span style="font-family: 'Times New Roman', Times, serif;"
                                class="back--text">animals</span>
                        </div>
                        <div style="overflow-x: auto;"
                            v-if="villageData && villageData.baselineData && villageData.baselineData.animals">
                            <table>
                                <thead>
                                    <tr>
                                        <th v-for="(item, index) in villageData.baselineData.animals"
                                            :key="'title-' + index">
                                            {{ item.title }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td v-for="(item, index) in villageData.baselineData.animals"
                                            :key="'value-' + index">
                                            {{ item.value }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </v-card>
                </div>
                <div v-if="selectedCard === '18'" style="margin-top: 20px;">
                    <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
                        <div style="text-align: center;">
                            <span style="font-family: 'Times New Roman', Times, serif;"
                                class="back--text">incomeSources</span>
                        </div>
                        <div style="overflow-x: auto;"
                            v-if="villageData && villageData.baselineData && villageData.baselineData.incomeSources">
                            <table>
                                <thead>
                                    <tr>
                                        <th v-for="(item, index) in villageData.baselineData.incomeSources"
                                            :key="'title-' + index">
                                            {{ item.title }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td v-for="(item, index) in villageData.baselineData.incomeSources"
                                            :key="'value-' + index">
                                            {{ item.value }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </v-card>
                </div>
                <div v-if="selectedCard === '19'" style="margin-top: 20px;">
                    <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
                        <div style="text-align: center;">
                            <span style="font-family: 'Times New Roman', Times, serif;"
                                class="back--text">creditSources</span>
                        </div>
                        <div style="overflow-x: auto;"
                            v-if="villageData && villageData.baselineData && villageData.baselineData.creditSources">
                            <table>
                                <thead>
                                    <tr>
                                        <th v-for="(item, index) in villageData.baselineData.creditSources"
                                            :key="'title-' + index">
                                            {{ item.title }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td v-for="(item, index) in villageData.baselineData.creditSources"
                                            :key="'value-' + index">
                                            {{ item.value }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </v-card>
                </div>
                <div v-if="selectedCard === '20'" style="margin-top: 20px;">
                    <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
                        <div style="text-align: center;">
                            <span style="font-family: 'Times New Roman', Times, serif;"
                                class="back--text">agricultureAndForestryTrends</span>
                        </div>
                        <div style="overflow-x: auto;"
                            v-if="villageData && villageData.baselineData && villageData.baselineData.agricultureAndForestryTrends">
                            <table>
                                <thead>
                                    <tr>
                                        <th v-for="(item, index) in villageData.baselineData.agricultureAndForestryTrends"
                                            :key="'title-' + index">
                                            {{ item.title }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td v-for="(item, index) in villageData.baselineData.agricultureAndForestryTrends"
                                            :key="'value-' + index">
                                            {{ item.value }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </v-card>
                </div>
                <div v-if="selectedCard === '21'" style="margin-top: 20px;">
                    <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
                        <div style="text-align: center;">
                            <span style="font-family: 'Times New Roman', Times, serif;"
                                class="back--text">physiography</span>
                        </div>
                        <div style="overflow-x: auto;"
                            v-if="villageData && villageData.baselineData && villageData.baselineData.physiography">
                            <table>
                                <thead>
                                    <tr>
                                        <th v-for="(item, index) in villageData.baselineData.physiography"
                                            :key="'title-' + index">
                                            {{ item.title }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td v-for="(item, index) in villageData.baselineData.physiography"
                                            :key="'value-' + index">
                                            {{ item.value }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </v-card>
                </div>
                <div v-if="selectedCard === '22'" style="margin-top: 20px;">
                    <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
                        <div style="text-align: center;">
                            <span style="font-family: 'Times New Roman', Times, serif;"
                                class="back--text">distances</span>
                        </div>
                        <div style="overflow-x: auto;"
                            v-if="villageData && villageData.baselineData && villageData.baselineData.distances">
                            <table>
                                <thead>
                                    <tr>
                                        <th v-for="(item, index) in villageData.baselineData.distances"
                                            :key="'title-' + index">
                                            {{ item.title }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td v-for="(item, index) in villageData.baselineData.distances"
                                            :key="'value-' + index">
                                            {{ item.value }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </v-card>
                </div>
                <div v-if="selectedCard === '23'" style="margin-top: 20px;">
                    <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
                        <div style="text-align: center;">
                            <span style="font-family: 'Times New Roman', Times, serif;"
                                class="back--text">landGovernance</span>
                        </div>
                        <div style="overflow-x: auto;"
                            v-if="villageData && villageData.baselineData && villageData.baselineData.landGovernance">
                            <table>
                                <thead>
                                    <tr>
                                        <th v-for="(item, index) in villageData.baselineData.landGovernance"
                                            :key="'title-' + index">
                                            {{ item.title }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td v-for="(item, index) in villageData.baselineData.landGovernance"
                                            :key="'value-' + index">
                                            {{ item.value }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </v-card>
                </div>
                <div v-if="selectedCard === '24'" style="margin-top: 20px;">
                    <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
                        <div style="text-align: center;">
                            <span style="font-family: 'Times New Roman', Times, serif;" class="back--text">risks</span>
                        </div>
                        <div style="overflow-x: auto;"
                            v-if="villageData && villageData.baselineData && villageData.baselineData.risks">
                            <table>
                                <thead>
                                    <tr>
                                        <th v-for="(item, index) in villageData.baselineData.risks"
                                            :key="'title-' + index">
                                            {{ item.title }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td v-for="(item, index) in villageData.baselineData.risks"
                                            :key="'value-' + index">
                                            {{ item.value }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </v-card>
                </div>
            </div> -->
            <div v-if="villageData && villageData.about && villageData.about.file">
    <!-- Display about, Land, and convertingArea data in a horizontal table -->
    <v-card
      class="card-center"
      style="text-align: center; width: 100%; margin-top: 10px; margin-left: 7px; margin-right: 7px; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
      <div>
        <span style="font-family: 'Times New Roman', Times, serif;">ABOUT</span>
      </div>
      <pdf class="pdf-border"  style="width: 900px; " :src="villageData.about.file"></pdf>
    </v-card>
  </div>

  <div v-if="villageData && villageData.about && villageData.about.file">
    <!-- Display about, Land, and convertingArea data in a horizontal table -->
    <v-card
      class="card-center"
      style="text-align: center; width: 100%; margin-top: 10px; margin-left: 7px; margin-right: 7px; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
      <div>
        <span style="font-family: 'Times New Roman', Times, serif;">LAND</span>
      </div>
      <pdf class="pdf-border"  style="width: 1400px; " :src="villageData.Land.file"></pdf>
    </v-card>
  </div>

  <div v-if="villageData && villageData.about && villageData.about.file">
    <!-- Display about, Land, and convertingArea data in a horizontal table -->
    <v-card
      class="card-center"
      style="text-align: center; width: 100%; margin-top: 10px; margin-left: 7px; margin-right: 7px; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
      <div>
        <span style="font-family: 'Times New Roman', Times, serif;">CONVERTING AREA</span>
      </div>
      <pdf class="pdf-border"  style="width: 1400px; " :src="villageData.convertingArea.file"></pdf>
    </v-card>
  </div>

          
            <!-- <v-card style="width: 40%;height: 800px;">
                    <v-list style="display: flex; margin-left: 8px;" v-model="selectedCardPDF">
                        <v-btn ref="btn25" class="hovered" value="1" @click="selectedCardPDF = '1'"
                            @mouseover="changeColorPDF('red', $refs.btn25)"
                            @mouseleave="changeColorPDF('chocolate', $refs.btn25)"
                            style="margin-left: 2px; margin-right: 2px; background-color: chocolate; color: aliceblue;font-family: 'Times New Roman', Times, serif;">
                            ABOUT
                        </v-btn>
                        <v-btn ref="btn26" class="hovered" value="2" @click="selectedCardPDF = '2'"
                            @mouseover="changeColorPDF('red', $refs.btn26)"
                            @mouseleave="changeColorPDF('chocolate', $refs.btn26)"
                            style="margin-left: 2px; margin-right: 2px; background-color: chocolate; color: aliceblue;font-family: 'Times New Roman', Times, serif;">
                            Land
                        </v-btn>
                        <v-btn ref="btn27" class="hovered" value="3" @click="selectedCardPDF = '3'"
                            @mouseover="changeColorPDF('red', $refs.btn27)"
                            @mouseleave="changeColorPDF('chocolate', $refs.btn27)"
                            style="margin-left: 2px; margin-right: 2px; background-color: chocolate; color: aliceblue;font-family: 'Times New Roman', Times, serif;">
                            Converting Area
                        </v-btn>
                    </v-list>
                </v-card> -->


        </v-card>

    </div>
</template>
<script>
import pdf from 'vue-pdf';

// import PdfViewer from './PdfViewer.vue'; // Adjust the path as necessary
export default {
    components: {
        pdf,
    },
    data() {
        return {
            villageData: null, // Add a data property to store the village data
            villageId: '', // Add a data property to store the village ID
            lat: '', // Add a data property to store the village latitude
            long: '', // Add a data property to store the village longitude
            selectedCard: '0', // Ensure this property is defined if it's needed
            selectedCardPDF: '0',
            file: '',
            about: '',
            villageData: {
                about: {
                    file: '',
                    description: ''
                }
            },
            villageLPB: null, // Add a data property to store LPB village data
            villagePX: null,  // Add a data property to store PX village data
        };
    },
    methods: {
        changeColor(color, ref) {
            ref.$el.style.backgroundColor = color;
        },
        changeColorPDF(color, ref) {
            ref.$el.style.backgroundColor = color;
        },
        async fetchData() {
            try {
                const response = await fetch(`https://octopus-app-n476x.ondigitalocean.app/villageDetail/${this.villageId}`, {
                    method: 'GET', // Adjust the method as needed (GET, POST, etc.)
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Data:', data);

                    this.villageData = data.data; // Store the data in the villageData property

                } else {
                    console.error('Error fetching data from API');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },
        async fetchLPBData() {
            try {
                const response = await fetch(`https://octopus-app-n476x.ondigitalocean.app/infoVillagesLPB/${this.villageId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('LPB Data:', data);

                    this.villageLPB = data.data; // Store the LPB data

                } else {
                    console.error('Error fetching LPB data from API');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },
        async fetchPXData() {
            try {
                const response = await fetch(`https://octopus-app-n476x.ondigitalocean.app/infoVillagesPX/${this.villageId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('PX Data:', data);

                    this.villagePX = data.data; // Store the PX data

                } else {
                    console.error('Error fetching PX data from API');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },
        async sendVillageIdToAPIs() {
            await this.fetchLPBData();
            await this.fetchPXData();
        },
    },
    mounted() {
        // Get the village_id from the URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const villageIdFromUrl = urlParams.get('village_id');
        this.villageId = villageIdFromUrl;

        // Fetch data from all APIs
        this.fetchData();
        this.fetchLPBData();
        this.fetchPXData();
    },
    watch: {
        villageId(newValue, oldValue) {
            // Fetch data again if villageId changes
            if (newValue !== oldValue) {
                this.fetchData();
            }
        },
    },
};
</script>
<style scoped>
.image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    /* Set flex container to take up 100% width */
    height: 100%;
}

.village-image {
    margin-top: 10px;
    max-width: 420px;
    height: 360px;
}

.hovered {
    transition: background-color 0.3s ease;
    /* Add transition effect for smooth color change */
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
    width: 50px;
}

th {
    background-color: #f2f2f2;
}
.card-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.pdf-border {
  border: 2px solid #000; /* Change the color and width as needed */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Optional: add a shadow */
}
</style>
