<template>
      <div class="app-container">
        <v-card class="card-shadow mb-6 " rounded="lg" style="height: 100%;">
            <v-card-title style="background-color:#008000;">
                <div style="display:flex;justify-content:space-between;width:100%;">
                    <span style="font-family: 'Times New Roman', Times, serif;" class="white--text">VFMP
                        information</span>
                </div>
            </v-card-title>
            <!-- <v-spacer></v-spacer> -->
            <div style="display: flex;">
                <v-card>
                    <div style="display: flex;flex-direction: column;width: 300px;">
                        
                    <v-btn ref="btn1" class="hovered" value="1" @click="selectedCard = '1'"
                        @mouseover="changeColor('red', $refs.btn1)" @mouseleave="changeColor('green', $refs.btn1)"
                        style="margin-bottom: 30px;margin-top: 30px;height: 50px;color: aliceblue;margin-left: 10px;margin-right: 10px;font-size: 13px; background-color: green; color: aliceblue;">
                        About
                    </v-btn>
                    <v-btn ref="btn2" class="hovered" value="2" @click="selectedCard = '2'"
                        @mouseover="changeColor('red', $refs.btn2)" @mouseleave="changeColor('green', $refs.btn2)"
                        style="margin-bottom: 30px;margin-top: 30px;height: 50px;color: aliceblue;margin-left: 10px;margin-right: 10px;font-size: 13px; background-color: green; color: aliceblue;">
                        Forest land and other land
                    </v-btn>
                    <v-btn ref="btn3" class="hovered" value="3" @click="selectedCard = '3'"
                        @mouseover="changeColor('red', $refs.btn3)" @mouseleave="changeColor('green', $refs.btn3)"
                        style="margin-bottom: 30px;margin-top: 30px;height: 50px;color: aliceblue;margin-left: 10px;margin-right: 10px;font-size: 13px; background-color: green; color: aliceblue;">
                        Covering Areas of VFMP
                    </v-btn>
                    <v-btn ref="btn4" class="hovered" value="4" @click="selectedCardvillage = '4'"
                        @mouseover="changeColor('red', $refs.btn4)" @mouseleave="changeColor('green', $refs.btn4)"
                        style="margin-bottom: 30px;margin-top: 30px;height: 50px;color: aliceblue;margin-left: 10px;margin-right: 10px;font-size: 13px; background-color: green; color: aliceblue;">
                        Baseline Data
                    </v-btn>
                  
                    </div>
                </v-card>
         
                <div v-if="selectedCard === '1'">  
                    <!-- Display about, Land, and convertingArea data in a horizontal table -->

                    <v-card class="card-center" v-if="villageData && villageData.about && villageData.about.file"
                        style="text-align: center; width: 850px; margin-top: 10px; margin-left: 7px; margin-right: 7px; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                        <div>
                            <span style="font-family: 'Times New Roman', Times, serif;">ABOUT</span>
                        </div>
                        <iframe :src="`https://docs.google.com/gview?embedded=true&url=${villageData.about.file}`"
                            style="width: 650px; height: 700px;" frameborder="0">
                        </iframe>
                        <!-- <pdf class="pdf-border"  style="width: 900px; " :src="villageData.about.file"></pdf> -->
                    </v-card>
                </div>
                <div v-if="selectedCard === '2'">  
                    <!-- Display about, Land, and convertingArea data in a horizontal table -->
                    <v-card class="card-center" v-if="villageData && villageData.about && villageData.about.file"
                        style="text-align: center; width: 850px; margin-top: 10px; margin-left: 7px; margin-right: 7px; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                        <div>
                            <span style="font-family: 'Times New Roman', Times, serif;">LAND</span>
                        </div>

                        <iframe :src="`https://docs.google.com/gview?embedded=true&url=${villageData.Land.file}`"
                            style="width: 650px; height: 700px;" frameborder="0">
                        </iframe>
                        <!-- <pdf class="pdf-border"  style="width: 1400px; " :src="villageData.Land.file"></pdf> -->
                    </v-card>
                </div>

                <div v-if="selectedCard === '3'">  
                    <!-- Display about, Land, and convertingArea data in a horizontal table -->
                    <v-card class="card-center"v-if="villageData && villageData.about && villageData.about.file"
                        style="text-align: center; width: 850px; margin-top: 10px; margin-left: 7px; margin-right: 7px; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                        <div>
                            <span style="font-family: 'Times New Roman', Times, serif;">CONVERTING AREA</span>
                        </div>

                        <iframe
                            :src="`https://docs.google.com/gview?embedded=true&url=${villageData.convertingArea.file}`"
                            style="width: 650px; height: 700px;" frameborder="0">
                        </iframe>
                        <!-- <pdf class="pdf-border"  style="width: 1400px; " :src="villageData.convertingArea.file"></pdf> -->
                    </v-card>
                </div>
                <v-card style="display: flex; flex-direction: column; justify-content: center; align-items: center; width: 800px;">
                    <div>
                        <div v-if="villageData" style="display: flex; margin-top: 30px;">
                            <span
                                style="margin-top: 7px; font-family: 'Times New Roman', Times, serif; font-size: 20px; display: block;width: 130px;margin-right: 10px;margin-left: 15px;margin-right: 15px;margin-left: 15px;"
                                class="back--text">VillageID</span>
                            <v-text-field
                                style="font-family: 'Times New Roman', Times, serif; font-size: 20px;margin-right: 15px;"
                                class="mr-10 ml-1" label="VillageID" dense flat solo background-color="#f5f5f5"
                                v-if="villageData.villageCode" :value="villageData.villageCode" readonly></v-text-field>
                        </div>

                        <div v-if="villageData && villageData.villageId" style="display: flex;">
                            <div>
                                <span
                                    style="display: block; margin-top: 7px; font-family: 'Times New Roman', Times, serif; font-size: 20px;width: 130px;margin-right: 5px;margin-left: 15px;"
                                    class="back--text">Village Name</span>
                            </div>
                            <div>
                                <v-text-field style="font-family: 'Times New Roman', Times, serif; font-size: 20px;"
                                    class="mr-1 ml-1" label="Village Name (En)" dense flat solo
                                    background-color="#f5f5f5" :value="villageData.villageId.villageEn"
                                    readonly></v-text-field>
                            </div>
                            <div>
                                <v-text-field style="font-family: 'Times New Roman', Times, serif; font-size: 20px;"
                                    class="mr-10 ml-1" label="Village Name (Lao)" dense flat solo
                                    background-color="#f5f5f5" :value="villageData.villageId.villageLa"
                                    readonly></v-text-field>
                            </div>
                        </div>

                        <div v-if="villageData" style="display: flex;">
                            <span
                                style="margin-top: 7px; font-family: 'Times New Roman', Times, serif; font-size: 20px; display: block;margin-right: 15px;margin-left: 15px;"
                                class="back--text">X-coordinate</span>
                            <v-text-field style="font-family: 'Times New Roman', Times, serif; font-size: 20px;"
                                class="mr-1 ml-1" label="X-coordinate" dense flat solo background-color="#f5f5f5"
                                v-if="villageData.lat" :value="villageData.lat" readonly></v-text-field>
                        </div>

                        <div v-if="villageData" style="display: flex;">
                            <span
                                style="margin-top: 8px; font-family: 'Times New Roman', Times, serif; font-size: 20px; display: block;margin-right: 15px;margin-left: 15px;"
                                class="back--text">Y-coordinate</span>
                            <v-text-field style="font-family: 'Times New Roman', Times, serif; font-size: 20px;"
                                class="mr-1 ml-1" label="Y-coordinate" dense flat solo background-color="#f5f5f5"
                                v-if="villageData.long" :value="villageData.long" readonly></v-text-field>
                        </div>
                    </div>

                    <div>
                        <div v-if="villageData" class="image-container"
                            style="display: flex; justify-content: center; margin-top: 20px; margin-bottom: 20px;">
                            <!-- Add a click handler to show the modal -->
                            <img :src="villageData.image" alt="Village Image" class="village-image"
                                style="cursor: pointer; max-width: 100%; border-radius: 2px;" @click="openImageModal" />
                        </div>
                    </div>

                    <v-dialog v-model="showImageModal" max-width="100%">
                        <v-card>
                            <v-card-text style="display: flex; justify-content: center; align-items: center;">
                                <img :src="villageData.image" alt="Enlarged Village Image"
                                    style="max-width: 100%; max-height: 100%;" />
                            </v-card-text>
                       
                        </v-card>
                    </v-dialog>
                </v-card>

            </div>
           
            <div v-if="selectedCardvillage === '4'">  

               
                <div v-if="villagePX && villagePX.length > 0">

                    <v-card-title style="background-color:#008000;">
                        <div style="display:flex;justify-content:space-between;width:100%;">
                            <span style="font-family: 'Times New Roman', Times, serif;" class="white--text">Baseline Data1</span>
                        </div>
                    </v-card-title>
                    <v-card>
                        <v-data-table :headers="headersvillagePX" :items="villagePX" item-value="village_id" dense
                            class="elevation-1">
                            <template v-slot:top>
                                <v-toolbar flat>
                                    <v-toolbar-title>Village DataLPB</v-toolbar-title>
                                    <v-spacer></v-spacer>
                                </v-toolbar>
                            </template>

                            <template v-slot:item="{ item }">
                                <tr>
                                <td>{{ item.village_id }}</td>
           
                                <td style="width: 100%;">{{ item.village_id }}</td>
                                <td style="width: 100%;">{{ item.ບ້ານ }}</td>
                                <td style="width: 100%;">{{ item["Village name"] }}</td>
                                <td style="width: 100%;">{{ item["ລາວລຸ່ມ\nLao loum"] }}</td>
                                <td style="width: 100%;">{{ item["ກຶມມຸ\nKeum mu"] }}</td>
                                <td style="width: 100%;">{{ item["ມົ້ງ\nHmong"] }}</td>
                                <td style="width: 100%;">{{ item["ລວມ\nTotal"] }}</td>
                                <td style="width: 100%;">{{ item["ພະນັກງານ\nstaff"] }}</td>
                                <td style="width: 100%;">{{ item["ເຄິງພະນັກງານ\nsemi-saff"] }}</td>
                                <td style="width: 100%;">{{ item["ການຄ້າບໍລິການ\nCommercial and service"] }}</td>
                                <td style="width: 100%;">{{ item["ເຮັດໄຮ່ ຫຼື ເຮັດສວ່ນ\nFarmng"] }}</td>
                                <td style="width: 100%;">{{ item["ລຽ້ງສັດ\nLive stock raising"] }}</td>
                                <td style="width: 100%;">{{ item["ຕັ້ງໂຕະ (ໜວ່ຍ)\nTelephone"] }}</td>
                                <td style="width: 100%;">{{ item["ມີຈັກເລກໝາຍ\nNumber of simcard"] }}</td>
                                <td style="width: 100%;">{{ item["ໂທລະສັບມືຖື(ໜວ່ຍ)Smart phone"] }}</td>
                                <td style="width: 100%;">{{ item["ຄວາຍ\nBuffalo"] }}</td>
                                <td style="width: 100%;">{{ item["ງົວ\nCow"] }}</td>
                                <td style="width: 100%;">{{ item["ມ້າ\nHorse"] }}</td>
                                <td style="width: 100%;">{{ item["ໝູ\nPig"] }}</td>
                                <td style="width: 100%;">{{ item["ແບ້\nGoat"] }}</td>
                                <td style="width: 100%;">{{ item["ສັດປີກ\nPoultry"] }}</td>
                                <td style="width: 100%;">{{ item["ໜອງປາ\nFish pool"] }}</td>
                                <td style="width: 100%;">{{ item["ປອ່ຍປາ(ໂຕ)\nFish releasing"] }}</td>
                                <td style="width: 100%;">{{ item["ເນື້ອທີ່ (ຮຕ)\nArea (ha)"] }}</td>
                                <td style="width: 100%;">{{ item["ຜົນຜະລິດ (ໂຕນ)\nYield (ton)"] }}</td>
                                <td style="width: 100%;">{{ item["ຕິດຕັ້ງກົງເຕີ\nSet up eclectric transformers"] }}</td>
                                <td style="width: 100%;">{{ item["ບໍ່ໄດ້ຕິດຕັ້ງກົງເຕີ\nNot yet set up electricity transformers"]
                                        }}</td>
                                <td style="width: 100%;">{{ item["ພະລັງງານແສງຕາເວັນ\nSolar cell"] }}</td>
                                <td style="width: 100%;">{{ item["ພະລັງງານນ້ຳຢອດ\nsmall water power"] }}</td>
                                <td style="width: 100%;">{{ item["ບໍ່ໄດ້ໃຊ້ໄຟຟ້າ\nNo eclectricity"] }}</td>
                                <td style="width: 100%;">{{ item["ລົດ 6 ລໍ້ຂື້ນໄປ (ຄັນ)\ntruck with 6 wheels"] }}</td>
                                <td style="width: 100%;">{{ item["ລົດກະບະ 4ລໍ້ (ຄັນ)\ncar with 4 wheels"] }}</td>
                                <td style="width: 100%;">{{ item["ລົດຊີ້ງ (ຄັນ)\nsimple 4WD tractor"] }}</td>
                                <td style="width: 100%;">{{ item["ລົດໄຖນາ (ຄັນ)\ntractor"] }}</td>
                                <td style="width: 100%;">{{ item["ລົດຈັກ (ຄັນ)\nmotorbike"] }}</td>
                                <td style="width: 100%;">{{ item["ເຮືອ (ລຳ)\nboat"] }}</td>
                                <td style="width: 100%;">{{ item["ນ້ຳຕົ້ນ\nboil"] }}</td>
                                <td style="width: 100%;">{{ item["ນ້ຳດື່ມບໍລິສຸດ\npurified water"] }}</td>
                                <td style="width: 100%;">{{ item["ນ້ຳປະປາ\nsupply water"] }}</td>
                                <td style="width: 100%;">{{ item["ນ້ຳລິນ\nspringshed"] }}</td>
                                <td style="width: 100%;">{{ item["ນ້ຳສ້າງມີຟາປິດ\nhell pond"] }}</td>
                                <td style="width: 100%;">{{ item["ນ້ຳຫວ້ຍ ແລະ ໜອງ\nriver"] }}</td>
                                <td style="width: 100%;">{{ item["ຮ້ານ\nretail outlet"] }}</td>
                                <td style="width: 100%;">{{ item["ຮ້ານ\nShop"] }}</td>
                                <td style="width: 100%;">{{ item["ຮ້ານ\nSalon Shop"] }}</td>
                                <td style="width: 100%;">{{ item["ຮ້ານ\nshop"] }}</td>
                                <td style="width: 100%;">{{ item["(ແຫ່ງ)\nfactory"] }}</td>
                                <td style="width: 100%;">{{ item["(ເຄື່ອງ)\nmachine"] }}</td>
                                <td style="width: 100%;">{{ item["ຈ/ນເດັກຮຽນອານຸບານ+ຫອ້ງກຽມ\nnursery class "] }}</td>
                                <td style="width: 100%;">{{ item["ຈ/ນ ນ/ຮທີ່ຮຽນຊັ້ນປະຖົມ\nprimary class"] }}</td>
                                <td style="width: 100%;">{{ item["ຈ/ນທີ່ຈົບຊັ້ນປະຖົມບໍາລຸງ\nfinished primary sub-class"] }}</td>
                                <td style="width: 100%;">{{ item["ຈ/ນທີ່ຈົບຊັ້ນມັດທະຍົມຕົ້ນບໍາລຸງ\nfinished secondarysub-class"] }}</td>
                                  


                                <td style="width: 100%;">{{ item["ຈ/ນທີ່ຈົບຊັ້ນປະຖົມ\nfinished primary class"] }}</td>

                                <td style="width: 100%;">{{ item["ຈ/ນທີ່ຈົບຊັ້ນມັດທະຍົມ ຕົ້ນ\nfinished secondary class"] }}</td>

                                <td style="width: 100%;">{{ item["ຈ/ນທີ່ຈົບຊັ້ນມັດທະຍົມ ປາຍ\nfinished high class"] }}</td>

                                <td style="width: 100%;">{{ item["ຈົບຊັ້ນຕົ້ນ\nbeginner"] }}</td>


                                <td style="width: 100%;">{{ item["ຈົບຊັ້ນກາງ\nmeduim"] }}</td>
                                <td style="width: 100%;">{{ item["ຈົບຊັ້ນສູງ\ndiploma"] }}</td>

                                <td style="width: 100%;">{{ item["ຈົບປະລິນຍາຕີ ຫຼື ສູງກ່ວາ\nbachelor or higher"] }}</td>

                                <td style="width: 100%;">{{ item["ຈ/ນແຮງງານຕົ້ນຕໍ 18-60 ປີ\nlabor 18-60 years old ລວມ\nTotal"] }}</td>

                                    
                                <td style="width: 100%;">{{ item["ຍິງ\nwomen"] }}</td>
                                <td style="width: 100%;">{{ item["ຄົວເຮືອນພົ້ນທຸກ un-poor household 2"]["800"]["000 ກີບຂື້ນໄປ/ຄົນ/ປີ\nmore than 2"]["800"]["000 kip/person/year ລວມ\nTotal"] }}</td>
                                <td style="width: 100%;">{{ item["ຄົວເຮືອນຍັງທຸກ\npoor household ຫຼຸດ 2"]["800"]["000 ລ້ານກີບລົງມາ/ຄົນ/ປີ\nlower than 2"]["800"]["000 kip/person/year ລວມ\nTotal"] }}</td>
                                    <!-- Add more table columns as needed -->
                                </tr>
                            </template>
                        </v-data-table>
                    </v-card>
                </div>
                <!-- Display the PX Data -->
           
                <div v-if="villageLPB && villageLPB.length > 0">

                            <v-card-title style="background-color:#008000;">
                        <div style="display:flex;justify-content:space-between;width:100%;">
                            <span style="font-family: 'Times New Roman', Times, serif;" class="white--text">Baseline Data1</span>
                        </div>
                    </v-card-title>
                    <v-card>
                        <v-data-table :headers="headersvillageLPB" :items="villageLPB" item-value="village_id" dense
                            class="elevation-1">
                            <template v-slot:top>
                                <v-toolbar flat>
                                    <v-toolbar-title>Village DataPX</v-toolbar-title>
                                    <v-spacer></v-spacer>
                                </v-toolbar>
                            </template>

                            <template v-slot:item="{ item }">
                                <tr>
                                    <td>{{ item.village_id }}</td>
                                    <td>{{ item.village_id }}</td>
            <td>{{ item.ບ້ານ }}</td>
            <td>{{ item["Village name"] }}</td>
            <td>{{ item.HH }}</td>
            <td>{{ item["ເຜົ່າລາວລຸ່ມ\nlao loum"] }}</td>
            <td>{{ item["ເຜົ່າລື້\nlue"] }}</td>
            <td>{{ item["ເຜົ່ກຶມມຸ\nkeum mu"] }}</td>
            <td>{{ item["ເຜົ່າມົ້ງ\nhmong"] }}</td>
            <td>{{ item["ເຜົ່າໄປຼ\npai"] }}</td>
            <td>{{ item["ເຜົ່າໄທດຳ\nthaidam"] }}</td>
            <td>{{ item["ເຜົ່າຍວນ\nYuan"] }}</td>
            <td>{{ item["ເຜົ່າອິວມຽນ\neiw mien"] }}</td>
            <td>{{ item["ແຮງງານຕົ້ນຕໍ່\nMain labor ເພດຍິງ\nFemale"] }}</td>
            <td>{{ item["ແຮງງານຕົ້ນຕໍ່\nMain labor ເພດຊາຍ\nMan"] }}</td>
            <td>{{ item["ແຮງງານຕົ້ນຕໍ່\nMain labor ລວມ\nTotal"] }}</td>
            <td>{{ item["\"ແຮງງານສຳຮອງ\nsub-labor\"ເພດຍິງ\nFemale"] }}</td>
            <td>{{ item["\"ແຮງງານສຳຮອງ\nsub-labor\"ເພດຊາຍ\nMan"] }}</td>
            <td>{{ item["\"ແຮງງານສຳຮອງ\nsub-labor ລວມ\nTotal"] }}</td>
            <td>{{ item["ເຮັດວຽກກະສິກຳ\nfarming"] }}</td>
            <td>{{ item["ເຮັດວຽກການຄ້າ ແລະ ບໍລິການ\ncommerce and service"] }}</td>
            <td>{{ item["ພະນັກງານ\nstaff"] }}</td>
            <td>{{ item["ໂທລະສັບມືຖື\nsmart phone    "] }}</td>
            <td>{{ item["ໂທລະສັບຕັ້ງໂຕະ\ntelephone                "] }}</td>
            <td>{{ item["ຈານດາວທຽມ/ເຄື່ອງສັນຍາໂທລະສັບ\nSatellite dish/Telecom            "] }}</td>
            <td>{{ item["ຈກກຳເນີດໄຟ້າ\nelectirc generator"] }}</td>
            <td>{{ item["ໄຟຟ້າແສງສະຫວ່າງ\nsolar cell"] }}</td>
            <td>{{ item["ໄຟຟ້ານ້ຳຢອດ\nsmall water power"] }}</td>
            <td>{{ item["ບໍ່ໄດ້ໃຊ້ໄຟ້າ\nnon electricity"] }}</td>
            <td>{{ item["  ລົດຫົກລໍ້,ລົດສິບສອງລໍ້\ntruck with 6 and wheels                                                                      "] }}</td>
            <td>{{ item[" ລົດກະບະ/ລົດເກງ \ncar with 4 wheels                     "] }}</td>
            <td>{{ item["ລົດຈັກ\nmotorbike                                       "] }}</td>
            <td>{{ item["ລົດໂອ໊ກສາຍ\nTouk Touk                                    "] }}</td>
            <td>{{ item["ລົດຖີບ\nbicycle                                                            "] }}</td>
            <td>{{ item["ເຄື່ອງຕົວປັ່ນ\ntractor                             "] }}</td>
            <td>{{ item["ຕົວປັ່ນໃຫຍ່\nsimple 4WD tractor                      "] }}</td>
            <td>{{ item["ຕົວປັ່ນໃຫຍ່\nbig tractor                               "] }}</td>
            <td>{{ item["ເຄື່ອງຕັດຫຍ້າ\ngrass cut machine"] }}</td>
            <td>{{ item["ໂຮງສີ່ເຂົ້າ\nrice mill"] }}</td>
            <td>{{ item["ໂຮງສີ່ເຂົ້ານ້ອຍ\nsmall rice mill"] }}</td>
            <td>{{ item["ຮ້ານຄ້າ\nRetail outlet"] }}</td>
            <td>{{ item["ປະຈຸບັນຈຳນວນນັກຮຽນກຳລັງຮຽນໜັງສື ອະນຸບານ\nnursery"] }}</td>
            <td>{{ item["ປະຈຸບັນຈຳນວນນັກຮຽນກຳລັງຮຽນໜັງສື ປະຖົມ\nprimary"] }}</td>
            <td>{{ item["ປະຈຸບັນຈຳນວນນັກຮຽນກຳລັງຮຽນໜັງສື ມັດທະຍົມຕົ້ນ\nsecondary"] }}</td>
            <td>{{ item[ "ປະຈຸບັນຈຳນວນນັກຮຽນກຳລັງຮຽນໜັງສື ມັດທະຍົມຕອນປາຍ\nhigh\"ລວມ\nTotal\""] }}</td>
            <td>{{ item["ປະຈຸບັນຈຳນວນນັກຮຽນກຳລັງຮຽນໜັງສື ມັດທະຍົມຕອນປາຍ\nhigh\"ຍິງ\nwomen\""] }}</td>
            <td>{{ item["ຈຳນວນປະລະການຮຽນ\nstop studying ປະຖົມ\nprimary ລວມ\r\nTotal"] }}</td>
            <td>{{ item["ຈຳນວນປະລະການຮຽນ\nstop studying ປະຖົມ\nprimaryຍິງ\r\nwomen"] }}</td>
            
            
            
            <td>{{ item[" ຈຳນວນປະລະການຮຽນ\nstop studyingມັດທະຍົມຕົ້ນ\nsecondaryລວມ\r\nTotal"] }}</td>
            <td>{{ item[" ຈຳນວນປະລະການຮຽນ\nstop studyingມັດທະຍົມຕົ້ນ\nsecondaryຍິງ\r\nwomen"] }}</td>
            <td>{{ item["ຈຳນວນປະລະການຮຽນ\nstop studying ອ່ານບໍ່ໄດ້,ຂຽນບໍ່ເປັນ\ncan not reach and writeລວມ\r\nTotal"] }}</td>
            <td>{{ item["ຈຳນວນປະລະການຮຽນ\nstop studying ອ່ານບໍ່ໄດ້,ຂຽນບໍ່ເປັນ\ncan not reach and writeຍິງ\r\nwomen"] }}</td>
            <td>{{ item["ແຫຼ່ງນ້ຳດື່ມຕົ້ນຕໍ ນ້ຳດື່ມບໍລິສຸດ\npurified water"] }}</td>
            <td>{{ item["ແຫຼ່ງນ້ຳດື່ມຕົ້ນຕໍ  ນ້ຳບາດານ/ນ້ຳລິນ/ນ້ຳສ້າງມີຜາປິດ\nundergroud/sprindshed/hell pond"] }}</td>
            <td>{{ item["ແຫຼ່ງນ້ຳດື່ມຕົ້ນຕໍ  ນ້ຳສ້າງບໍ່ມີຝາປິດ\nThe well has no cover"] }}</td>
            <td>{{ item["ແຫຼ່ງນ້ຳດື່ມຕົ້ນຕໍ ນ້ຳແມ່/ນ້ຳຫ້ວຍ\nriver"] }}</td>

            <td>{{ item["Total in ha"] }}</td>

            <td>{{ item["ດີນປຸກສ້າງ\nhousing ຈຳນວນຕອນ\r\nnumber of plot"] }}</td>
            <td>{{ item["ດີນນາ\npaddy ຈຳນວນຕອນ\r\nnumber of plot"] }}</td>
            <td>{{ item["ດີນໄຮ່\nupland ຈຳນວນຕອນ\r\nnumber of plot"] }}</td>
            <td>{{ item["ດີນສວນ\nfarming ຈຳນວນຕອນ\r\nnumber of plot"] }}</td>
            <td>{{ item["ນາປີ rainy season rice ເນື້ອທີ່ (ເຮັກຕາ)\r\narea (ha)"] }}</td>

            <td>{{ item["ໄຮ່/ສວນເຂົ້າ upland rice ເນື້ອທີ່ (ເຮັກຕາ)\r\narea (ha)"] }}</td>
            <td>{{ item["ສາລີ maize ເນື້ອທີ່ (ເຮັກຕາ)\r\narea (ha)"] }}</td>
            <td>{{ item["ໝາກເດືອຍ job tear ເນື້ອທີ່ (ເຮັກຕາ)\r\narea (ha)"] }}</td>

            <td>{{ item["ໝາກງາ Sesame ເນື້ອທີ່ (ເຮັກຕາ)\r\narea (ha)"] }}</td>
            <td>{{ item[" ການລ້ຽງ (ຫົວໜ່ວຍ: ໂຕ) Livestock ງົວ\ncow "] }}</td>
            <td>{{ item[" ການລ້ຽງ (ຫົວໜ່ວຍ: ໂຕ) Livestock ຄວາຍ\nBuffalo "] }}</td>
            <td>{{ item[" ການລ້ຽງ (ຫົວໜ່ວຍ: ໂຕ) Livestock ໝູ\npig "] }}</td>
            <td>{{ item[" ການລ້ຽງ (ຫົວໜ່ວຍ: ໂຕ) Livestock poultry "] }}</td>
            <td>{{ item[" ການລ້ຽງ (ຫົວໜ່ວຍ: ໂຕ) Livestockໜອງປາ fish pond "] }}</td>
            <td>{{ item[" ການລ້ຽງ (ຫົວໜ່ວຍ: ໂຕ) Livestockປາປ່ອຍ (ລ້ຽງປາ)\nFish release "] }}</td>
            <td>{{ item[" ການລ້ຽງ (ຫົວໜ່ວຍ: ໂຕ) Livestockກົບ\nfrog  "] }}</td>
            <td>{{ item[" ການລ້ຽງ (ຫົວໜ່ວຍ: ໂຕ) Livestockສັດອື່ນໆ\nother "] }}</td>
                                    <!-- Add more table columns as needed -->
                                </tr>
                            </template>
                        </v-data-table>
                    </v-card>
                </div>    
           
            </div>
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
            selectedCardvillage: '0', // Ensure this property is defined if it's needed
            selectedCardPDF: '0',
            file: '',
            about: '',
            villageData: {
                about: {
                    file: '',
                    description: ''
                }
            },
            showImageModal: false, // State to control the visibility of the modal
        
            villagePX: null,  // Add a data property to store PX village data
            villageLPB: null,  // Add a data property to store PX village data
            headersvillageLPB: [
          
            { text:"VillageID",value:""},
            { text:"ບ້ານ",value:""},
            { text:"Village name",value:""},
            { text:"HH",value:""},
            { text:"ເຜົ່າລາວລຸ່ມ lao loum",value:""},
            { text:"ເຜົ່າລື້ lue",value:""},
            { text:"ເຜົ່ກຶມມຸ keum mu",value:""},
            { text:"ເຜົ່າມົ້ງ hmong",value:""},
            { text:"ເຜົ່າໄປຼ pai",value:""},
            { text:"ເຜົ່າໄທດຳ thaidam",value:""},
            { text:"ເຜົ່າຍວນ Yuan",value:""},
            { text:"ເຜົ່າອິວມຽນ eiw mien",value:""},
            { text:"ແຮງງານຕົ້ນຕໍ່ Main labor Female",value:""},
            { text:"ແຮງງານຕົ້ນຕໍ່ Main labor Man",value:""},
            { text:"ແຮງງານຕົ້ນຕໍ່ Main labor Total",value:""},
            { text:"ແຮງງານສຳຮອງSub-labor Female",value:""},
            { text:"ແຮງງານສຳຮອງSub-labor Man",value:""},
            { text:"ແຮງງານສຳຮອງSub-labor Total",value:""},
            { text:"ເຮັດວຽກກະສິກຳFarming",value:""},
            { text:"ເຮັດວຽກການຄ້າ ແລະ ບໍລິການCommerce and Service",value:""},
            { text:"ພະນັກງານStaff",value:""},
            { text:"ໂທລະສັບມືຖືSmart Phone",value:""},
            { text:"ໂທລະສັບຕັ້ງໂຕະTelephone",value:""},
            { text:"ຈານດາວທຽມ_ເຄື່ອງສັນຍາໂທລະສັບSatellite dish/Telecom",value:""},
            { text:"ຈກກຳເນີດໄຟ້າElectric Generator",value:""},
            { text:"ໄຟຟ້າແສງສະຫວ່າງSolar Cell",value:""},
            { text:"ໄຟຟ້ານ້ຳຢອດSmall Water Power",value:""},
            { text:"ບໍ່ໄດ້ໃຊ້ໄຟ້າNon Electricity",value:""},
            { text:"ລົດຫົກລໍ້,ລົດສິບສອງລໍ້Truck with 6 and 10 wheels",value:""},
            { text:"ລົດກະບະ/ລົດເກງ Car with 4 wheels",value:""},
            { text:"ລົດຈັກMotorbike",value:""},
            { text:"ລົດໂອ໊ກສາຍTouk Touk",value:""},
            { text:"ລົດຖີບBicycle",value:""},
            { text:"ເຄື່ອງຕົວປັ່ນTractor",value:""},
            { text:"ຕົວປັ່ນໃຫຍ່Simple 4WD Tractor",value:""},
            { text:"ຕົວປັ່ນໃຫຍ່ Big Tractor",value:""},
            { text:"ເຄື່ອງຕັດຫຍ້າ Grass Cut Machine",value:""},
            { text:"ໂຮງສີ່ເຂົ້າ Rice Mill",value:""},
            { text:"ໂຮງສີ່ເຂົ້ານ້ອຍ Small Rice Mill",value:""},
            { text:"ຮ້ານຄ້າ Retail Outlet",value:""},
            { text:"ປະຈຸບັນຈຳນວນນັກຮຽນກຳລັງຮຽນໜັງສື ອະນຸບານ Nursery",value:""},
            { text:"ປະຈຸບັນຈຳນວນນັກຮຽນກຳລັງຮຽນໜັງສື ປະຖົມ Primary",value:""},
            { text:"ປະຈຸບັນຈຳນວນນັກຮຽນກຳລັງຮຽນໜັງສື ມັດທະຍົມຕົ້ນ Secondary",value:""},
            { text:"ປະຈຸບັນຈຳນວນນັກຮຽນກຳລັງຮຽນໜັງສື ມັດທະຍົມຕອນປາຍ ລວມ\High Total",value:""},
            { text:"ປະຈຸບັນຈຳນວນນັກຮຽນກຳລັງຮຽນໜັງສື ມັດທະຍົມຕອນປາຍ\ຍິງ High Women",value:""},
            { text:"ຈຳນວນປະລະການຮຽນ\nstop studying ປະຖົມ\nprimary ລວມ Stop Studying Primary Total",value:""},
            { text:"ຈຳນວນປະລະການຮຽນ\ປະຖົມ ຍິງ Stop Studying Primary Women",value:""},
            { text:"ຈຳນວນປະລະການຮຽນ\ມັດທະຍົມຕົ້ນ\ລວມ Stop Studying Secondary Total",value:""},
            { text:"ຈຳນວນປະລະການຮຽນ\ມັດທະຍົມຕົ້ນ\ຍິງ  Stop Studying Secondary Women",value:""},
            { text:"ຈຳນວນປະລະການຮຽນ\ ອ່ານບໍ່ໄດ້,ຂຽນບໍ່ເປັນ ລວມ Can Not Read and Write Total",value:""},
            { text:"ຈຳນວນປະລະການຮຽນ\ອ່ານບໍ່ໄດ້,ຂຽນບໍ່ເປັນ\ຍິງ Can Not Read and Write Women",value:""},
            { text:"ແຫຼ່ງນ້ຳດື່ມຕົ້ນຕໍ ນ້ຳດື່ມບໍລິສຸດ Purified Water",value:""},
            { text:"ແຫຼ່ງນ້ຳດື່ມຕົ້ນຕໍ  ນ້ຳບາດານ/ນ້ຳລິນ/ນ້ຳສ້າງມີຜາປິດ\nundergroud/sprindshed/hell pond",value:""},
            { text:"ແຫຼ່ງນ້ຳດື່ມຕົ້ນຕໍ ນ້ຳບາດານ/ນ້ຳລິນ/ນ້ຳສ້າງມີຜາປິດ Underground/Well/Well without Cover",value:""},
            { text:"ແຫຼ່ງນ້ຳດື່ມຕົ້ນຕໍ ນ້ຳແມ່/ນ້ຳຫ້ວຍ River",value:""},
            { text:"Total Area in ha",value:""},
            { text:"ດີນປຸກສ້າງ\nhousing ຈຳນວນຕອນ     Housing Plots",value:""},
            { text:"ດີນນາ\npaddy ຈຳນວນຕອນ     Paddy Plots",value:""},
            { text:"ດີນໄຮ່\nupland ຈຳນວນຕອນ\     Upland Plots",value:""},
            { text:"ດີນສວນ\nfarming ຈຳນວນຕອນ     Farming Plots",value:""},
            { text:"ນາປີ rainy season rice ເນື້ອທີ່ (ເຮັກຕາ)   Rainy Season Rice Area",value:""},
            { text:"ໄຮ່/ສວນເຂົ້າ upland rice ເນື້ອທີ່ (ເຮັກຕາ)     Upland Rice Area",value:""},
            { text:"ສາລີ maize ເນື້ອທີ່ (ເຮັກຕາ)     Maize Area",value:""},
            { text:" ໝາກເດືອຍ job tear ເນື້ອທີ່ (ເຮັກຕາ)    Job Tear Area",value:""},
            { text:" ໝາກງາ Sesame ເນື້ອທີ່ (ເຮັກຕາ)    Sesame Area",value:""},
            { text:" ການລ້ຽງ (ຫົວໜ່ວຍ: ໂຕ) Livestock ງົວ     Cow",value:""},
            { text:"  ການລ້ຽງ (ຫົວໜ່ວຍ: ໂຕ) Livestock ຄວາຍ    Buffalo",value:""},
            { text:" ການລ້ຽງ (ຫົວໜ່ວຍ: ໂຕ) Livestock ໝູ    Pig",value:""},
            { text:" ການລ້ຽງ (ຫົວໜ່ວຍ: ໂຕ)      Poultry",value:""},
            { text:"  ການລ້ຽງ (ຫົວໜ່ວຍ: ໂຕ) Livestockໜອງປາ    Fish Pond",value:""},
            { text:" ການລ້ຽງ (ຫົວໜ່ວຍ: ໂຕ) Livestockປາປ່ອຍ (ລ້ຽງປາ)     Fish Release",value:""},
            { text:" ການລ້ຽງ (ຫົວໜ່ວຍ: ໂຕ) Livestockກົບ     Other Livestock",value:""},
            { text:"  ການລ້ຽງ (ຫົວໜ່ວຍ: ໂຕ)    Other Livestock",value:""},
            ],
            headersvillagePX: [
            { text: "VillageID" ,value: "village_id"},
            { text: "ບ້ານ",vulue :""},
            { text: "Village_name",vulue :""},
            { text: "ລາວ_ລຸ່ມ",vulue :""},
            { text: "ກຶມມຸKeum_mu",vulue :""}, 
            { text: "ມົ້ງ",vulue :""},
            { text: "ລວມ",vulue :""},
            { text: "ພະນັກງານ\staff",vulue :""},
            { text: "ເຄິງ_ພະນັກງານ_semi_saff",vulue :""},
            { text: "ການ_ຄ້າ_ບໍລິການ_Commercial_and_service",vulue :""},
            { text: "ເຮັດ_ໄຮ່_ຫຼື_ເຮັດ_ສວ່ນ/Farmng",vulue :""},
            { text: "ລຽ້ງ_ສັດ\Live_stock_raising",vulue :""},
            { text: "ຕັ້ງ_ໂຕະ_(ໜວ່ຍ)\Telephone",vulue :""},
            { text: "ມີ_ຈັກ_ເລກ_ໝາຍ Number_of_simcard",vulue :""},
            { text: "ໂທ_ລະ_ສັບ_ມື_ຖື(ໜວ່ຍ) Smart_phone",vulue :""},
            { text: "ຄວາຍ/Buffalo",vulue :""},
            { text: "ງົວ/Cow",vulue :""},
            { text: "ມ້າ/Horse",vulue :""},
            { text: "ໝູ/Pig",vulue :""},
            { text: "ແບ້/Goat",vulue :""},
            { text: "ສັດປີກ/Poultry",vulue :""},
            { text: "ໜອງ_ປາ Fish_pool",vulue :""},
            { text: "ປອ່ຍປາ(ໂຕ) Fish_releasing",vulue :""},
            { text: "ເນື້ອ_ທີ່_(ຮຕ) Area_(ha)",vulue :""},
            { text: "ຜົນ_ຜະລິດ_(ໂຕນ) Yield_(ton)",vulue :""},
            { text: "ຕິດ_ຕັ້ງ_ກົງ_ເຕີ Set_up_eclectric_transformers",vulue :""},
            { text: "ບໍ່_ໄດ້_ຕິດ_ຕັ້ງ_ກົງ_ເຕີ Not_yet_set_up_electricity_transformers",vulue :""},
            { text: "ພະລັງງານແສງຕາເວັນ Solar_cell",vulue :""},
            { text: "ພະລັງງານນ້ຳຢອດ Small_water_power",vulue :""},
            { text: "ບໍ່ໄດ້ໃຊ້ໄຟຟ້າ No_electricity",vulue :""},
            { text: "ລົດ_6_ລໍ້ຂື້ນໄປ_(ຄັນ) Truck_with_6_wheels",vulue :""},
            { text: "ລົດກະບະ_4ລໍ້_(ຄັນ) Car_with_4_wheels",vulue :""},
            { text: "ລົດຊີ້ງ_(ຄັນ) Simple_4WD_tractor",vulue :""},
            { text: "ລົດໄຖນາ_(ຄັນ) Tractor",vulue :""},
            { text: "ລົດຈັກ_(ຄັນ) Motorbike",vulue :""},
            { text: "ເຮືອ_(ລຳ) Boat",vulue :""},
            { text: "ນ້ຳຕົ້ນ Boil",vulue :""},
            { text: "ນ້ຳດື່ມບໍລິສຸດ Purified_water",vulue :""},
            { text: "ນ້ຳປະປາ Supply_water",vulue :""},
            { text: "ນ້ຳລິນ Springshed",vulue :""},
            { text: "ນ້ຳສ້າງມີຟາປິດ Hell_pond",vulue :""},
            { text: "ນ້ຳຫວ້ຍ_ແລະ_ໜອງ River",vulue :""},
            { text: "ຮ້ານ Retail_outlet",vulue :""},
            { text: "ຮ້ານ Shop",vulue :""},
            { text: "ຮ້ານ Salon_Shop",vulue :""},
            { text: "(ແຫ່ງ) Factory",vulue :""},
            { text: "(ເຄື່ອງ) Machine",vulue :""},
            { text: "ຈ/ນເດັກຮຽນອານຸບານ+ຫອ້ງກຽມ Nursery_class",vulue :""},
            { text: "ຈ/ນ_ນ/ຮທີ່ຮຽນຊັ້ນປະຖົມ Primary_class",vulue :""},
            { text: "ຈ/ນທີ່ຈົບຊັ້ນມັດທະຍົມຕົ້ນບໍາລຸງ Finished_primary_sub_class",vulue :""},
            { text: "ຈ/ນທີ່ຈົບຊັ້ນມັດທະຍົມຕົ້ນບໍາລຸງ Finished_secondary_sub_class",vulue :""},
            { text: "ຈ/ນທີ່ຈົບຊັ້ນປະຖົມ Finished_primary_class",vulue :""},
            { text: "ຈ/ນທີ່ຈົບຊັ້ນມັດທະຍົມ_ຕົ້ນ Finished_secondary_class",vulue :""},
            { text: "ຈ/ນທີ່ຈົບຊັ້ນມັດທະຍົມ_ປາຍ Finished_high_class",vulue :""},
            { text: "ຈົບຊັ້ນຕົ້ນ Beginner",vulue :""},
            { text: "ຈົບຊັ້ນກາງ Medium",vulue :""},
            { text: "ຈົບຊັ້ນສູງ Diploma",vulue :""},
            { text: "ຈົບປະລິນຍາຕີ_ຫຼື_ສູງກ່ວາ Bachelor_or_higher",vulue :""},
            { text: "ຈ/ນແຮງງານຕົ້ນຕໍ Labor_18-60_years_old_(Total)",vulue :""},
            { text: "ຍິງ Women",vulue :""},                  
            { text: "ຄົວ_ເຮືອນ_ພົ້ນທຸກ_un-poor_household_2.800.000_ກີບ_ຂື້ນໄປ/ຄົນ/ປີmore_than_2.800.000_kip/person_year_ລວມ_Total",vulue :""},
            { text: "ຄົວ_ເຮືອນ_ຍັງ_ທຸກ_poor_household_ຫຼຸດ_2.800.000_ລ້ານກີບລົງມາ/ຄົນ/ປີlower_than_2.800.000 kip/person/year_ລວມ_Total",vulue :""},
            ],
            villagePX: [], // Initialize with empty data
            villageLPB: [], // Initialize with empty data
        };
    },
    methods: {
        openImageModal() {
      this.showImageModal = true; // Open the modal when the image is clicked
    },
        changeColor(color, ref) {
            ref.$el.style.backgroundColor = color;
        },
        changeColorPDF(color, ref) {
            ref.$el.style.backgroundColor = color;
        },
        async fetchData() {
            try {
                const response = await fetch(`https://api.vfmp.dof.maf.gov.la/villageDetail/${this.villageId}`, {
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
                const response = await fetch(`https://api.vfmp.dof.maf.gov.la/infoVillagesLPB/${this.villageId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('LPB Data:', data);

                    this.villageLPB = [data.data]; // Store the LPB data

                } else {
                    console.error('Error fetching LPB data from API');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },
        async fetchPXData() {
      try {
        const response = await fetch(
          `https://api.vfmp.dof.maf.gov.la/infoVillagesPX/${this.villageId}`
        );
        if (response.ok) {
          const data = await response.json();
          this.villagePX = [data.data]; // Ensure data is in an array format
        } else {
          console.error("Error fetching PX data from API");
        }
      } catch (error) {
        console.error("Error fetching PX data:", error);
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
.elevation-1 {
  margin: 20px;
}
.village-image {
  transition: transform 0.3s ease-in-out;
}
.village-image:hover {
  transform: scale(1.05);
}
.app-container {
  font-family: Arial, sans-serif;
  max-width: 1600px;
  margin: 0 auto;
  padding: 20px;
}
/* .image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  
    height: 100%;
} */

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
