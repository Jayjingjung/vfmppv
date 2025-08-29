<template>
    <div>

        <v-card class="card-shadow mb-6 mt-1" rounded="lg" style="height: 100%;">
            <v-card-title style="background-color:#3766A4;display:flex;justify-content:space-between;">
                <div>
                    <span class="white--text">VFMP information</span>
                </div>
                <div style="margin-right: 50px;">
                    <v-btn style="background-color: goldenrod; color: white;" @click="saveVillage"
                        :disabled="!imageUploaded">
                        Save
                    </v-btn>
                </div>

            </v-card-title>

            <div style="display: flex;  justify-content: space-between;" class="">
                <v-card style="width: 35%;margin-top: 10px;margin-left: 7px;margin-right: 7px;height: 390px;">
                    <div style="display: flex;">
                        <div style="width: 150px; margin-left: 5px; margin-right: 5px;">
                            <v-select v-model="province" :items="user_data_list" item-text="provinceLa" item-value="_id"
                                label="ເລືອກ ເເຂວງ" @change="onProvinceChange" outlined></v-select>
                        </div>

                        <div style="width: 150px; margin-left: 5px; margin-right: 5px;">
                            <v-select v-if="user_data_districts.length" v-model="district" :items="user_data_districts"
                                item-text="districtLa" item-value="_id" label="ເລືອກ ເມືອງ" @change="onDistrictChange"
                                outlined></v-select>
                        </div>

                        <div style="width: 150px; margin-left: 5px; margin-right: 5px;">
                            <v-select v-if="user_data_village.length" v-model="village" :items="user_data_village"
                                item-text="villageLa" item-value="_id" label="ເລືອກ ບ້ານ" @input="onVillageChange"
                                outlined></v-select>
                        </div>
                    </div>

                    <div style="display: flex; margin-left: 5px;margin-right: 5px;">
                        <v-text-field class="mr-1 ml-1" v-model="lat" label="lat" dense flat solo
                            background-color="#f5f5f5"></v-text-field>

                        <v-text-field class="mr-1 ml-1" label="long" v-model="long" dense flat solo
                            background-color="#f5f5f5"></v-text-field>
                    </div>
                    <!-- Image Upload Input -->
                    <div>
                        <span style="flex: 1; display: flex; justify-content: center;">VFMP information</span>
                    </div>
                    <v-file-input style="margin-top: 10px;margin-right: 10px;" v-model="image" label="Select an image"
                        accept="image/*" outlined @change="uploadImage"></v-file-input>

                </v-card>
                <!-- Display the uploaded image -->
                <v-card style="width: 30%;margin-top: 10px;margin-left: 7px;margin-right: 7px;height: 390px;">
                    <div v-if="imageUploaded">
                        <img :src="imageUrl" alt="Uploaded Image"
                            style="margin-top: 10px; max-width: 420px; height:360px;margin-left: 30px; ">
                    </div>
                </v-card>
                <!-- Display the uploaded image -->


                <v-card style="width: 35%;margin-top: 10px;margin-left: 7px;margin-right: 7px;height: 390px;">
                    <div style="margin-top: 25px;">
                        <div>
                            <span style="flex: 1; display: flex; justify-content: center;">about</span>
                        </div>
                        <div style="margin-left: 5px;margin-right: 5px;">

                            <div>
                                <input type="file" multiple @change="handleFilesChange" />

                            </div>
                            <v-text-field dense background-color="#f5f5f5" required v-model="about.description"
                                label="About description" outlined></v-text-field>
                        </div>

                        <div>
                            <span style="flex: 1; display: flex; justify-content: center;">Land</span>
                        </div>
                        <div style="margin-left: 5px;margin-right: 5px;">

                            <div>
                                <input type="file" multiple @change="handleFilesChange" />

                            </div>
                            <v-text-field dense background-color="#f5f5f5" required v-model="Land.description"
                                label="Land description" outlined></v-text-field>
                        </div>
                        <div>
                            <span style="flex: 1; display: flex; justify-content: center;">convertingArea</span>
                        </div>
                        <div style="margin-left: 5px;margin-right: 5px;">

                            <div>
                                <input type="file" multiple @change="handleFilesChange" />

                            </div>
                            <v-text-field dense background-color="#f5f5f5" required v-model="convertingArea.description"
                                label="convertingArea description" outlined></v-text-field>
                        </div>
                    </div>
                </v-card>
            </div>
            <div style="display: flex;">
                <!-- Display the uploaded file -->
                <v-card style="width: 33%;margin-top: 10px;margin-left: 7px;margin-right: 7px;height:auto;">
                    <div v-if="Uploadedfile">

                    </div>
                </v-card>
                <!-- Display the uploaded file -->

                <!-- Display the uploaded file -->
                <v-card style="width: 33%;margin-top: 10px;margin-left: 7px;margin-right: 7px;height:auto;">
                    <div v-if="Uploadedfile">

                    </div>
                </v-card>
                <!-- Display the uploaded file -->

                <!-- Display the uploaded file -->
                <v-card style="width: 33%;margin-top: 10px;margin-left: 7px;margin-right: 7px;height:auto;">
                    <div v-if="Uploadedfile">

                    </div>
                </v-card>
                <!-- Display the uploaded file -->
            </div>
            <div style="display: flex; overflow-x: auto; width: 1640px; margin-left: 10px;">
                <v-list style="display: flex; min-width: 1200px;" v-model="selectedCard">
                    <v-btn ref="btn1" class="hovered" value="1" @click="selectedCard = '1'"
                        @mouseover="changeColor('red', $refs.btn1)" @mouseleave="changeColor('green', $refs.btn1)"
                        style="margin-left: 2px; margin-right: 2px; background-color: green; color: aliceblue;">
                        HOME RESEARCH ANALYSIS
                    </v-btn>
                    <v-btn ref="btn2" value="2" @click="selectedCard = '2'" @mouseover="changeColor('red', $refs.btn2)"
                        @mouseleave="changeColor('green', $refs.btn2)"
                        style="margin-left: 2px; margin-right: 2px; background-color: green; color: aliceblue;">
                        VILLAGE FACILITIES
                    </v-btn>
                    <v-btn ref="btn3" value="3" @click="selectedCard = '3'" @mouseover="changeColor('red', $refs.btn3)"
                        @mouseleave="changeColor('green', $refs.btn3)"
                        style="margin-left: 2px;margin-right: 2px;background-color: green; color: aliceblue;">POPULATION</v-btn>

                    <v-btn ref="btn4" value="1" @click="selectedCard = '4'" @mouseover="changeColor('red', $refs.btn4)"
                        @mouseleave="changeColor('green', $refs.btn4)"
                        style="margin-left: 2px;margin-right: 2px;background-color: green; color: aliceblue;">SCHOOL
                        FACILITIES</v-btn>

                    <v-btn ref="btn5" value="5" @click="selectedCard = '5'" @mouseover="changeColor('red', $refs.btn5)"
                        @mouseleave="changeColor('green', $refs.btn5)"
                        style="margin-left: 2px;margin-right: 2px;background-color: green; color: aliceblue;">WELL
                        BEING ACCESS CRITERIA</v-btn>
                    <v-btn value="1" @click="selectedCard = '6'"
                        style="margin-left: 2px;margin-right: 2px;background-color: green; color: aliceblue;">HOUSEHOLD
                        ASSETS</v-btn>
                    <v-btn value="1" @click="selectedCard = '7'"
                        style="margin-left: 2px;margin-right: 2px;background-color: green; color: aliceblue;">SOCIAL
                        RISKS</v-btn>
                    <v-btn value="1" @click="selectedCard = '8'"
                        style="margin-left: 2px;margin-right: 2px;background-color: green; color: aliceblue;">WATER
                        SUPPLY</v-btn>
                    <v-btn value="1" @click="selectedCard = '9'"
                        style="margin-left: 2px;margin-right: 2px;background-color: green; color: aliceblue;">ROAD
                        ACCESS TO VILLAGE</v-btn>
                    <v-btn value="1" @click="selectedCard = '10'"
                        style="margin-left: 2px;margin-right: 2px;background-color: green; color: aliceblue;">VILLAGE
                        ACCESS ROAD STANDARD</v-btn>
                    <v-btn value="1" @click="selectedCard = '11'"
                        style="margin-left: 2px;margin-right: 2px;background-color: green; color: aliceblue;">ACCESS
                        TO MARKETS (FOR SALE OF PRODUCTS)</v-btn>
                    <v-btn value="1" @click="selectedCard = '12'"
                        style="margin-left: 2px;margin-right: 2px;background-color: green; color: aliceblue;">OCCUPATION</v-btn>
                    <v-btn value="1" @click="selectedCard = '13'"
                        style="margin-left: 2px;margin-right: 2px;background-color: green; color: aliceblue;">OTHER
                        LIVELIHOOD SOURCES</v-btn>
                    <v-btn value="1" @click="selectedCard = '14'"
                        style="margin-left: 2px;margin-right: 2px;background-color: green; color: aliceblue;">CROPPING
                        AREA</v-btn>
                    <v-btn value="1" @click="selectedCard = '15'"
                        style="margin-left: 2px;margin-right: 2px;background-color: green; color: aliceblue;">CROP
                        YIELD</v-btn>
                    <v-btn value="1" @click="selectedCard = '16'"
                        style="margin-left: 2px;margin-right: 2px;background-color: green; color: aliceblue;">IRRIGATION</v-btn>
                    <v-btn value="1" @click="selectedCard = '17'"
                        style="margin-left: 2px;margin-right: 2px;background-color: green; color: aliceblue;">ANIMALS</v-btn>
                    <v-btn value="1" @click="selectedCard = '18'"
                        style="margin-left: 2px;margin-right: 2px;background-color: green; color: aliceblue;">INCOME
                        SOURCES</v-btn>
                    <v-btn value="1" @click="selectedCard = '19'"
                        style="margin-left: 2px;margin-right: 2px;background-color: green; color: aliceblue;">CREDIT
                        SOURCES</v-btn>
                    <v-btn value="1" @click="selectedCard = '20'"
                        style="margin-left: 2px;margin-right: 2px;background-color: green; color: aliceblue;">AGRICULTURE
                        AND FORESTRY TRENDS (CHANGES DURING LAST 5 YEARS)</v-btn>

                    <v-btn value="1" @click="selectedCard = '21'"
                        style="margin-left: 2px;margin-right: 2px;background-color: green; color: aliceblue;">AGRICULTURE
                        Physiography</v-btn>

                    <v-btn value="1" @click="selectedCard = '22'"
                        style="margin-left: 2px;margin-right: 2px;background-color: green; color: aliceblue;">AGRICULTURE
                        Distances</v-btn>

                    <v-btn value="1" @click="selectedCard = '23'"
                        style="margin-left: 2px;margin-right: 2px;background-color: green; color: aliceblue;">AGRICULTURE
                        LandGovernance</v-btn>

                    <v-btn value="1" @click="selectedCard = '24'"
                        style="margin-left: 2px;margin-right: 2px;background-color: green; color: aliceblue;">AGRICULTURE
                        Risks</v-btn>


                </v-list>
            </div>

            <div>
                <div v-if="selectedCard === '1'" style="margin-top: 20px;">
                    <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
                        <div>
                            <span class="back--text">Home Research Analysis</span>
                        </div>
                        <!-- Dynamic Home Research Analysis Fields -->
                        <div v-for="(item, index) in baselineData.homeResearchAnalysis" :key="index"
                            style="display: flex; margin-left: 5px; margin-right: 5px;">
                            <v-text-field dense outlined background-color="#f5f5f5" required v-model="item.title"
                                label="Title"></v-text-field>
                            <v-text-field v-model="item.value" label="Value" dense outlined
                                background-color="#f5f5f5"></v-text-field>
                            <v-btn icon @click="removeHomeResearchAnalysis(index)">
                                <v-icon color="red">mdi-delete</v-icon>
                            </v-btn>
                        </div>
                        <div style="margin-left: 5px; margin-right: 5px;">
                            <v-btn @click="addHomeResearchAnalysis">Add More Home Research Analysis</v-btn>
                        </div>
                    </v-card>
                </div>
                <div v-if="selectedCard === '2'" style="margin-top: 20px;">
                    <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
                        <div>
                            <span class="back--text">village Facilities</span>
                        </div>
                        <!-- Dynamic Village Facilities Fields -->
                        <div v-for="(item, index) in baselineData.villageFacilities" :key="index"
                            style="display: flex; margin-left: 5px; margin-right: 5px;">
                            <v-text-field v-model="item.title" label="Facility Name" outlined></v-text-field>
                            <v-text-field v-model="item.value" label="Facility Description" outlined></v-text-field>
                            <v-btn icon @click="removeVillageFacility(index)">
                                <v-icon color="red">mdi-delete</v-icon>
                            </v-btn>
                        </div>
                        <div style="margin-left: 5px; margin-right: 5px;">
                            <v-btn @click="addVillageFacility">Add More Village Facilities</v-btn>
                        </div>
                    </v-card>
                </div>
                <div v-if="selectedCard === '3'" style="margin-top: 20px;">
                    <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
                        <div style="text-align: center;">
                            <span class="back--text">Population</span>
                        </div>
                        <div v-for="(item, index) in baselineData.population" :key="index"
                            style="display: flex; margin-left: 5px; margin-right: 5px;">
                            <v-text-field v-model="item.title" label="Title" outlined></v-text-field>
                            <v-text-field v-model="item.value" label="Value" outlined></v-text-field>
                            <v-btn icon @click="removePopulation(index)">
                                <v-icon color="red">mdi-delete</v-icon>
                            </v-btn>
                        </div>
                        <div style="margin-left: 5px; margin-right: 5px;">
                            <v-btn @click="addPopulation">Add More Population</v-btn>
                        </div>
                    </v-card>
                </div>
                <div v-if="selectedCard === '4'" style="margin-top: 20px;">
                    <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
                        <div style="text-align: center;">
                            <span class="back--text">schoolFacilities</span>
                        </div>
                        <div v-for="(item, index) in baselineData.schoolFacilities" :key="index"
                            style="display: flex; margin-left: 5px; margin-right: 5px;">
                            <v-text-field v-model="item.title" label="Title" outlined></v-text-field>
                            <v-text-field v-model="item.value" label="Value" outlined></v-text-field>
                            <v-btn icon @click="removeschoolFacilities(index)">
                                <v-icon color="red">mdi-delete</v-icon>
                            </v-btn>
                        </div>
                        <div style="margin-left: 5px; margin-right: 5px;">
                            <v-btn @click="addschoolFacilities">Add More schoolFacilities</v-btn>
                        </div>
                    </v-card>
                </div>
                <div v-if="selectedCard === '5'" style="margin-top: 20px;">
                    <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
                        <div style="text-align: center;">
                            <span class="back--text">wellBeingAccessCriteria</span>
                        </div>
                        <div v-for="(item, index) in baselineData.wellBeingAccessCriteria" :key="index"
                            style="display: flex; margin-left: 5px; margin-right: 5px;">
                            <v-text-field v-model="item.title" label="Title" outlined></v-text-field>
                            <v-text-field v-model="item.value" label="Value" outlined></v-text-field>
                            <v-btn icon @click="removewellBeingAccessCriteria(index)">
                                <v-icon color="red">mdi-delete</v-icon>
                            </v-btn>
                        </div>
                        <div style="margin-left: 5px; margin-right: 5px;">
                            <v-btn @click="addwellBeingAccessCriteria">Add More wellBeingAccessCriteria</v-btn>
                        </div>
                    </v-card>
                </div>
                <div v-if="selectedCard === '6'" style="margin-top: 20px;">
                    <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
                        <div style="text-align: center;">
                            <span class="back--text">houseHoldAssets</span>
                        </div>
                        <div v-for="(item, index) in baselineData.houseHoldAssets" :key="index"
                            style="display: flex; margin-left: 5px; margin-right: 5px;">
                            <v-text-field v-model="item.title" label="Title" outlined></v-text-field>
                            <v-text-field v-model="item.value" label="Value" outlined></v-text-field>
                            <v-btn icon @click="removehouseHoldAssets(index)">
                                <v-icon color="red">mdi-delete</v-icon>
                            </v-btn>
                        </div>
                        <div style="margin-left: 5px; margin-right: 5px;">
                            <v-btn @click="addhouseHoldAssets">Add More houseHoldAssets</v-btn>
                        </div>
                    </v-card>
                </div>
                <div v-if="selectedCard === '7'" style="margin-top: 20px;">
                    <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
                        <div style="text-align: center;">
                            <span class="back--text">socialRisks</span>
                        </div>
                        <div v-for="(item, index) in baselineData.socialRisks" :key="index"
                            style="display: flex; margin-left: 5px; margin-right: 5px;">
                            <v-text-field v-model="item.title" label="Title" outlined></v-text-field>
                            <v-text-field v-model="item.value" label="Value" outlined></v-text-field>
                            <v-btn icon @click="removesocialRisks(index)">
                                <v-icon color="red">mdi-delete</v-icon>
                            </v-btn>
                        </div>
                        <div style="margin-left: 5px; margin-right: 5px;">
                            <v-btn @click="addsocialRisks">Add More socialRisks</v-btn>
                        </div>
                    </v-card>
                </div>

                <div v-if="selectedCard === '8'" style="margin-top: 20px;">
                    <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
                        <div style="text-align: center;">
                            <span class="back--text">waterSupply</span>
                        </div>
                        <div v-for="(item, index) in baselineData.waterSupply" :key="index"
                            style="display: flex; margin-left: 5px; margin-right: 5px;">
                            <v-text-field v-model="item.title" label="Title" outlined></v-text-field>
                            <v-text-field v-model="item.value" label="Value" outlined></v-text-field>
                            <v-btn icon @click="removewaterSupply(index)">
                                <v-icon color="red">mdi-delete</v-icon>
                            </v-btn>
                        </div>
                        <div style="margin-left: 5px; margin-right: 5px;">
                            <v-btn @click="addwaterSupply">Add More waterSupply</v-btn>
                        </div>
                    </v-card>
                </div>
                <div v-if="selectedCard === '9'" style="margin-top: 20px;">
                    <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
                        <div style="text-align: center;">
                            <span class="back--text">roadAccessToVillage</span>
                        </div>
                        <div v-for="(item, index) in baselineData.roadAccessToVillage" :key="index"
                            style="display: flex; margin-left: 5px; margin-right: 5px;">
                            <v-text-field v-model="item.title" label="Title" outlined></v-text-field>
                            <v-text-field v-model="item.value" label="Value" outlined></v-text-field>
                            <v-btn icon @click="removeroadAccessToVillage(index)">
                                <v-icon color="red">mdi-delete</v-icon>
                            </v-btn>
                        </div>
                        <div style="margin-left: 5px; margin-right: 5px;">
                            <v-btn @click="addroadAccessToVillage">Add More roadAccessToVillage</v-btn>
                        </div>
                    </v-card>
                </div>
                <div v-if="selectedCard === '10'" style="margin-top: 20px;">
                    <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
                        <div style="text-align: center;">
                            <span class="back--text">villageAccessRoadStandard</span>
                        </div>
                        <div v-for="(item, index) in baselineData.villageAccessRoadStandard" :key="index"
                            style="display: flex; margin-left: 5px; margin-right: 5px;">
                            <v-text-field v-model="item.title" label="Title" outlined></v-text-field>
                            <v-text-field v-model="item.value" label="Value" outlined></v-text-field>
                            <v-btn icon @click="removevillageAccessRoadStandard(index)">
                                <v-icon color="red">mdi-delete</v-icon>
                            </v-btn>
                        </div>
                        <div style="margin-left: 5px; margin-right: 5px;">
                            <v-btn @click="addvillageAccessRoadStandard">Add More villageAccessRoadStandard</v-btn>
                        </div>
                    </v-card>
                </div>
                <div v-if="selectedCard === '11'" style="margin-top: 20px;">
                    <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
                        <div style="text-align: center;">
                            <span class="back--text">accessToMarkets</span>
                        </div>
                        <div v-for="(item, index) in baselineData.accessToMarkets" :key="index"
                            style="display: flex; margin-left: 5px; margin-right: 5px;">
                            <v-text-field v-model="item.title" label="Title" outlined></v-text-field>
                            <v-text-field v-model="item.value" label="Value" outlined></v-text-field>
                            <v-btn icon @click="removeaccessToMarkets(index)">
                                <v-icon color="red">mdi-delete</v-icon>
                            </v-btn>
                        </div>
                        <div style="margin-left: 5px; margin-right: 5px;">
                            <v-btn @click="addaccessToMarkets">Add More accessToMarkets</v-btn>
                        </div>
                    </v-card>
                </div>

                <div v-if="selectedCard === '12'" style="margin-top: 20px;">
                    <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
                        <div style="text-align: center;">
                            <span class="back--text">occupation</span>
                        </div>
                        <div v-for="(item, index) in baselineData.occupation" :key="index"
                            style="display: flex; margin-left: 5px; margin-right: 5px;">
                            <v-text-field v-model="item.title" label="Title" outlined></v-text-field>
                            <v-text-field v-model="item.value" label="Value" outlined></v-text-field>
                            <v-btn icon @click="removeoccupation(index)">
                                <v-icon color="red">mdi-delete</v-icon>
                            </v-btn>
                        </div>
                        <div style="margin-left: 5px; margin-right: 5px;">
                            <v-btn @click="addoccupation">Add More occupation</v-btn>
                        </div>
                    </v-card>
                </div>
                <div v-if="selectedCard === '13'" style="margin-top: 20px;">
                    <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
                        <div style="text-align: center;">
                            <span class="back--text">otherLivelihoodSources</span>
                        </div>
                        <div v-for="(item, index) in baselineData.otherLivelihoodSources" :key="index"
                            style="display: flex; margin-left: 5px; margin-right: 5px;">
                            <v-text-field v-model="item.title" label="Title" outlined></v-text-field>
                            <v-text-field v-model="item.value" label="Value" outlined></v-text-field>
                            <v-btn icon @click="removeotherLivelihoodSources(index)">
                                <v-icon color="red">mdi-delete</v-icon>
                            </v-btn>
                        </div>
                        <div style="margin-left: 5px; margin-right: 5px;">
                            <v-btn @click="addotherLivelihoodSources">Add More otherLivelihoodSources</v-btn>
                        </div>
                    </v-card>
                </div>
                <div v-if="selectedCard === '14'" style="margin-top: 20px;">
                    <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
                        <div style="text-align: center;">
                            <span class="back--text">croppingArea</span>
                        </div>
                        <div v-for="(item, index) in baselineData.croppingArea" :key="index"
                            style="display: flex; margin-left: 5px; margin-right: 5px;">
                            <v-text-field v-model="item.title" label="Title" outlined></v-text-field>
                            <v-text-field v-model="item.value" label="Value" outlined></v-text-field>
                            <v-btn icon @click="removecroppingArea(index)">
                                <v-icon color="red">mdi-delete</v-icon>
                            </v-btn>
                        </div>
                        <div style="margin-left: 5px; margin-right: 5px;">
                            <v-btn @click="addcroppingArea">Add More croppingArea</v-btn>
                        </div>
                    </v-card>
                </div>
                <div v-if="selectedCard === '15'" style="margin-top: 20px;">
                    <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
                        <div style="text-align: center;">
                            <span class="back--text">cropYield</span>
                        </div>
                        <div v-for="(item, index) in baselineData.cropYield" :key="index"
                            style="display: flex; margin-left: 5px; margin-right: 5px;">
                            <v-text-field v-model="item.title" label="Title" outlined></v-text-field>
                            <v-text-field v-model="item.value" label="Value" outlined></v-text-field>
                            <v-btn icon @click="removecropYield(index)">
                                <v-icon color="red">mdi-delete</v-icon>
                            </v-btn>
                        </div>
                        <div style="margin-left: 5px; margin-right: 5px;">
                            <v-btn @click="addcropYield">Add More cropYield</v-btn>
                        </div>
                    </v-card>
                </div>
                <div v-if="selectedCard === '16'" style="margin-top: 20px;">
                    <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
                        <div style="text-align: center;">
                            <span class="back--text">Irrigation</span>
                        </div>
                        <div v-for="(item, index) in baselineData.Irrigation" :key="index"
                            style="display: flex; margin-left: 5px; margin-right: 5px;">
                            <v-text-field v-model="item.title" label="Title" outlined></v-text-field>
                            <v-text-field v-model="item.value" label="Value" outlined></v-text-field>
                            <v-btn icon @click="removeIrrigation(index)">
                                <v-icon color="red">mdi-delete</v-icon>
                            </v-btn>
                        </div>
                        <div style="margin-left: 5px; margin-right: 5px;">
                            <v-btn @click="addIrrigation">Add More Irrigation</v-btn>
                        </div>
                    </v-card>
                </div>
                <div v-if="selectedCard === '17'" style="margin-top: 20px;">
                    <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
                        <div style="text-align: center;">
                            <span class="back--text">animals</span>
                        </div>
                        <div v-for="(item, index) in baselineData.animals" :key="index"
                            style="display: flex; margin-left: 5px; margin-right: 5px;">
                            <v-text-field v-model="item.title" label="Title" outlined></v-text-field>
                            <v-text-field v-model="item.value" label="Value" outlined></v-text-field>
                            <v-btn icon @click="removeanimals(index)">
                                <v-icon color="red">mdi-delete</v-icon>
                            </v-btn>
                        </div>
                        <div style="margin-left: 5px; margin-right: 5px;">
                            <v-btn @click="addanimals">Add More animals</v-btn>
                        </div>
                    </v-card>
                </div>
                <div v-if="selectedCard === '18'" style="margin-top: 20px;">
                    <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
                        <div style="text-align: center;">
                            <span class="back--text">incomeSources</span>
                        </div>
                        <div v-for="(item, index) in baselineData.incomeSources" :key="index"
                            style="display: flex; margin-left: 5px; margin-right: 5px;">
                            <v-text-field v-model="item.title" label="Title" outlined></v-text-field>
                            <v-text-field v-model="item.value" label="Value" outlined></v-text-field>
                            <v-btn icon @click="removeincomeSources(index)">
                                <v-icon color="red">mdi-delete</v-icon>
                            </v-btn>
                        </div>
                        <div style="margin-left: 5px; margin-right: 5px;">
                            <v-btn @click="addincomeSources">Add More incomeSources</v-btn>
                        </div>
                    </v-card>
                </div>
                <div v-if="selectedCard === '19'" style="margin-top: 20px;">
                    <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
                        <div style="text-align: center;">
                            <span class="back--text">creditSources</span>
                        </div>
                        <div v-for="(item, index) in baselineData.creditSources" :key="index"
                            style="display: flex; margin-left: 5px; margin-right: 5px;">
                            <v-text-field v-model="item.title" label="Title" outlined></v-text-field>
                            <v-text-field v-model="item.value" label="Value" outlined></v-text-field>
                            <v-btn icon @click="removecreditSources(index)">
                                <v-icon color="red">mdi-delete</v-icon>
                            </v-btn>
                        </div>
                        <div style="margin-left: 5px; margin-right: 5px;">
                            <v-btn @click="addcreditSources">Add More creditSources</v-btn>
                        </div>
                    </v-card>
                </div>
                <div v-if="selectedCard === '20'" style="margin-top: 20px;">
                    <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
                        <div style="text-align: center;">
                            <span class="back--text">agricultureAndForestryTrends</span>
                        </div>
                        <div v-for="(item, index) in baselineData.agricultureAndForestryTrends" :key="index"
                            style="display: flex; margin-left: 5px; margin-right: 5px;">
                            <v-text-field v-model="item.title" label="Title" outlined></v-text-field>
                            <v-text-field v-model="item.value" label="Value" outlined></v-text-field>
                            <v-btn icon @click="removeagricultureAndForestryTrends(index)">
                                <v-icon color="red">mdi-delete</v-icon>
                            </v-btn>
                        </div>
                        <div style="margin-left: 5px; margin-right: 5px;">
                            <v-btn @click="addagricultureAndForestryTrends">Add More
                                agricultureAndForestryTrends</v-btn>
                        </div>
                    </v-card>
                </div>
                <div v-if="selectedCard === '21'" style="margin-top: 20px;">
                    <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
                        <div style="text-align: center;">
                            <span class="back--text">physiography</span>
                        </div>
                        <div v-for="(item, index) in baselineData.physiography" :key="index"
                            style="display: flex; margin-left: 5px; margin-right: 5px;">
                            <v-text-field v-model="item.title" label="Title" outlined></v-text-field>
                            <v-text-field v-model="item.value" label="Value" outlined></v-text-field>
                            <v-btn icon @click="removephysiography(index)">
                                <v-icon color="red">mdi-delete</v-icon>
                            </v-btn>
                        </div>
                        <div style="margin-left: 5px; margin-right: 5px;">
                            <v-btn @click="addphysiography">Add More physiography</v-btn>
                        </div>
                    </v-card>
                </div>
                <div v-if="selectedCard === '22'" style="margin-top: 20px;">
                    <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
                        <div style="text-align: center;">
                            <span class="back--text">distances</span>
                        </div>
                        <div v-for="(item, index) in baselineData.distances" :key="index"
                            style="display: flex; margin-left: 5px; margin-right: 5px;">
                            <v-text-field v-model="item.title" label="Title" outlined></v-text-field>
                            <v-text-field v-model="item.value" label="Value" outlined></v-text-field>
                            <v-btn icon @click="removedistances(index)">
                                <v-icon color="red">mdi-delete</v-icon>
                            </v-btn>
                        </div>
                        <div style="margin-left: 5px; margin-right: 5px;">
                            <v-btn @click="adddistances">Add More distances</v-btn>
                        </div>
                    </v-card>
                </div>
                <div v-if="selectedCard === '23'" style="margin-top: 20px;">
                    <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
                        <div style="text-align: center;">
                            <span class="back--text">landGovernance</span>
                        </div>
                        <div v-for="(item, index) in baselineData.landGovernance" :key="index"
                            style="display: flex; margin-left: 5px; margin-right: 5px;">
                            <v-text-field v-model="item.title" label="Title" outlined></v-text-field>
                            <v-text-field v-model="item.value" label="Value" outlined></v-text-field>
                            <v-btn icon @click="removelandGovernance(index)">
                                <v-icon color="red">mdi-delete</v-icon>
                            </v-btn>
                        </div>
                        <div style="margin-left: 5px; margin-right: 5px;">
                            <v-btn @click="addlandGovernance">Add More landGovernance</v-btn>
                        </div>
                    </v-card>
                </div>
                <div v-if="selectedCard === '24'" style="margin-top: 20px;">
                    <v-card style="width: 99%; margin-top: 5px; margin-left: 7px; margin-right: 7px; height: auto;">
                        <div style="text-align: center;">
                            <span class="back--text">risks</span>
                        </div>
                        <div v-for="(item, index) in baselineData.risks" :key="index"
                            style="display: flex; margin-left: 5px; margin-right: 5px;">
                            <v-text-field v-model="item.title" label="Title" outlined></v-text-field>
                            <v-text-field v-model="item.value" label="Value" outlined></v-text-field>
                            <v-btn icon @click="removerisks(index)">
                                <v-icon color="red">mdi-delete</v-icon>
                            </v-btn>
                        </div>
                        <div style="margin-left: 5px; margin-right: 5px;">
                            <v-btn @click="addrisks">Add More risks</v-btn>
                        </div>
                    </v-card>
                </div>



            </div>

        </v-card>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
import axios from 'axios';
export default {
    data() {
        return {
            user_data_list: [],
            user_data_districts: [],
            selectedCard: '1', // This will hold the selected card to display
            user_data_village: [],
            province: null,
            district: null,
            village: '',
            provinceLa: '',
            image: null,
            files: null, // Data property to hold the selected files file
            filesUrl: '',
            filesUploaded: false,
            districtLa: '',
            villageLa: '',
            imageUploaded: false,

            imageUrl: null,

            lat: '',
            long: '',
            about: {
                file: '1',
                description: '',
            },
            Land: {
                file: '1',
                description: '',
            },
            convertingArea: {
                file: '1',
                description: '',
            },
            baselineData: {
                homeResearchAnalysis: [
                    {
                        title: 'Village pilot',
                        value: ''
                    },
                    {
                        title: 'Data collection date',
                        value: ''
                    }
                    ,



                ],
                villageFacilities: [
                    {
                        title: 'Village meeting Hall',
                        value: '     '
                    },
                    {
                        title: 'Religious Building',
                        value: ''
                    },
                    {
                        title: 'Village office',
                        value: ''
                    },
                    {
                        title: 'VDC computer',
                        value: ''
                    },
                    {
                        title: 'Village loud speaker',
                        value: ''
                    },
                    {
                        title: 'Village notice board',
                        value: ''
                    },
                    {
                        title: 'Student dormitory',
                        value: ''
                    },
                    {
                        title: 'Teacher is dormitory - house',
                        value: ''
                    },

                    {
                        title: 'Village bank',
                        value: ''
                    },
                    {
                        title: 'Rice bank',
                        value: ''
                    },
                    {
                        title: 'Rice mill',
                        value: ''
                    },
                    {
                        title: 'Saving and loan group',
                        value: ''
                    },

                    {
                        title: 'Rice mill',
                        value: ''
                    },

                    {
                        title: 'Village supported by other project',
                        value: ''
                    },
                ],
                population: [
                    {
                        title: 'Households',
                        value: ''
                    },
                    {
                        title: 'Families',
                        value: ''
                    },
                    {
                        title: 'Poulation',
                        value: ''
                    },
                    {
                        title: 'Females',
                        value: ''
                    },
                    {
                        title: 'Men',
                        value: ''
                    },
                    {
                        title: 'Main ethnic group[no of HH]',
                        value: ''
                    },
                    {
                        title: 'Second ethnic group[no of HH]',
                        value: ''
                    },
                    {
                        title: 'Third ethnic group[no of HH]',
                        value: ''
                    },
                    {
                        title: 'Other households',
                        value: ''
                    },
                    {
                        title: 'Foreigners',
                        value: ''
                    },
                    {
                        title: 'Resettlemen',
                        value: ''
                    },
                    {
                        title: 'Population change last 5 year',
                        value: ''
                    },


                ],
                schoolFacilities: [
                    {
                        title: 'Nursery ',
                        value: ' '
                    },
                    {
                        title: ' kinder garen',
                        value: ' '
                    }, {
                        title: 'Basic primart school1-3',
                        value: ' '
                    }, {
                        title: 'Primaey school',
                        value: ' '
                    }, {
                        title: 'Lower secondary,less 1hr walk',
                        value: ' '
                    }, {
                        title: 'Higher secondery,less 1hr walk',
                        value: ' '
                    },
                ],
                wellBeingAccessCriteria: [
                    {
                        title: 'Health facility less than 2hrs walk away',
                        value: ''
                    },
                    {
                        title: 'clean water system',
                        value: ''
                    },
                    {
                        title: 'all year road',
                        value: ''
                    },
                    {
                        title: 'phone network',
                        value: ''
                    },
                    {
                        title: 'market',
                        value: ''
                    },
                    {
                        title: 'markets shed',
                        value: ''
                    },
                    {
                        title: 'Electricity grid	',
                        value: ''
                    },
                    {
                        title: 'Non poor>70%',
                        value: ''
                    },

                ],
                houseHoldAssets: [
                    {
                        title: 'TV(household)',
                        value: ''
                    },
                    {
                        title: 'smart phone(household)',
                        value: ''
                    },
                    {
                        title: 'mobile phone(household)',
                        value: ''
                    },
                    {
                        title: 'motorcycle(household)',
                        value: ''
                    },
                    {
                        title: 'car truck(uint)',
                        value: ''
                    },
                    {
                        title: 'four wheel tractor(household)',
                        value: ''
                    },
                    {
                        title: 'four wheel tractor(uint)',
                        value: ''
                    },
                    {
                        title: 'motorcycle(uint)',
                        value: ''
                    },
                    {
                        title: 'car truck(household)',
                        value: ''
                    },
                    {
                        title: 'two wheel tractor(household)',
                        value: ''
                    },
                    {
                        title: 'two wheel tractor(uint)',
                        value: ''
                    },


                ],
                socialRisks: [
                    {
                        title: 'non poor(household)',
                        value: ''
                    },
                    {
                        title: 'poor(household)',
                        value: ''
                    },
                    {
                        title: 'very poor(household)',
                        value: ''
                    },
                    {
                        title: 'opium affected(household)',
                        value: ''
                    },
                    {
                        title: 'yaba affected(household)',
                        value: ''
                    },
                    {
                        title: 'handicapped adult(uint)	',
                        value: ''
                    },
                    {
                        title: 'handicapped under 18(uint)',
                        value: ''
                    },

                ],
                waterSupply: [
                    {
                        title: 'nampapa(household)',
                        value: ''
                    },
                    {
                        title: 'Gravity fed(household)',
                        value: ''
                    },

                    {
                        title: 'bore hole(household)',
                        value: ''
                    },

                    {
                        title: 'protected well(household)',
                        value: ''
                    },
                    {
                        title: 'unprotected well(household)',
                        value: ''
                    },
                    {
                        title: 'open water',
                        value: ''
                    },
                    {
                        title: 'bottled water(family)',
                        value: ''
                    },
                    {
                        title: 'Water sufficient months per year(months/yr)',
                        value: ''
                    },
                    {
                        title: 'Distance to most important water supply(m)',
                        value: ''
                    },
                ],
                roadAccessToVillage: [
                    {
                        title: 'Road reaches Village',
                        value: ''
                    },
                    {
                        title: 'Road all weather',
                        value: ''
                    },
                    {
                        title: 'district to district road',
                        value: ''
                    },

                    {
                        title: 'village to village road',
                        value: ''
                    },
                    {
                        title: 'Local access road only',
                        value: ''
                    },
                    {
                        title: 'Motorcycle access if no road	',
                        value: ''
                    },
                    {
                        title: 'Two wheel tractor trail if no road',
                        value: ''
                    },
                    {
                        title: 'Walking distance to road if no road(km)',
                        value: ''
                    },


                ],
                villageAccessRoadStandard: [
                    {
                        title: 'dirt road',
                        value: ''
                    },
                    {
                        title: 'gravel raod',
                        value: ''
                    },
                    {
                        title: 'surfaced road',
                        value: ''
                    },
                    {
                        title: 'partially surfaced road',
                        value: ''
                    },
                    {
                        title: 'maintenance last month',
                        value: ''
                    },
                    {
                        title: 'Village responsible for maintenance',
                        value: ''
                    },
                    {
                        title: 'Access constrained by surface conditions',
                        value: ''
                    },

                    {
                        title: 'Access constrained by slope conditions',
                        value: ''
                    },
                    {
                        title: 'Access constrained by streams',
                        value: ''
                    },
                    {
                        title: 'Access constrained by flooding',
                        value: ''
                    },
                    {
                        title: 'Access constrained by landslides',
                        value: ''
                    },

                ],
                accessToMarkets: [
                    {
                        title: 'Products for sale transported to market by villagers(Household)',
                        value: ''
                    },
                    {
                        title: 'Distance to major market(km)',
                        value: ''
                    },
                    {
                        title: 'Number of traders visiting village(People)',
                        value: ''
                    },
                    {
                        title: 'Main products for sale',
                        value: ''
                    },
                    {
                        title: 'Households selling products',
                        value: ''
                    },

                ],
                occupation: [
                    {
                        title: 'paddy(Household)',
                        value: ''
                    },
                    {
                        title: 'Upland shifting cultivation(Household)	',
                        value: ''
                    },
                    {
                        title: 'Upland permanent cultivation(Household)',
                        value: ''
                    },
                    {
                        title: 'Mixed paddy upland cultivation(Household)',
                        value: ''
                    },
                    {
                        title: 'Gardening(Household)',
                        value: ''
                    },
                    {
                        title: 'Tree plantation(Household)',
                        value: ''
                    },
                    {
                        title: 'Fishpond(Household)',
                        value: ''
                    },
                    {
                        title: 'Total farming(household)',
                        value: ''
                    },
                    {
                        title: 'Laborer(Household)',
                        value: ''
                    },
                    {
                        title: 'trading(Household)',
                        value: ''
                    },
                    {
                        title: 'Looking for work > 25 years(Labor)',
                        value: ''
                    },
                    {
                        title: 'Looking for work < 25 years(Labor)',
                        value: ''
                    },
                    {
                        title: 'Government officers(Household)',
                        value: ''
                    },

                ],
                otherLivelihoodSources: [
                    {
                        title: 'NTFP collection(Household)',
                        value: ''
                    },
                    {
                        title: 'hunting(Household)',
                        value: ''
                    },
                    {
                        title: 'Fishing natural streams-water(Household)',
                        value: ''
                    },

                    {
                        title: 'boating(Household)',
                        value: ''
                    },
                    {
                        title: 'ຕໍ່ຫູກ(ຄົວເຄຶອນ)',
                        value: ''
                    },
                    {
                        title: 'handicraft(Household)',
                        value: ''
                    },
                    {
                        title: 'tourism',
                        value: ''
                    },
                    {
                        title: 'pension(Household)',
                        value: ''
                    },
                    {
                        title: 'Men who left for work in urban areas during last 5 years(Household)',
                        value: ''
                    },
                    {
                        title: 'Women who left for work in urban areas during last 5 years(Household)',
                        value: ''
                    },
                    {
                        title: 'Remittance from within Laos(Household)',
                        value: ''
                    },
                    {
                        title: 'Remittance from neighboring countries(Household)',
                        value: ''
                    },
                    {
                        title: 'Remittance from other countries(Household)',
                        value: ''
                    },


                ],
                croppingArea: [
                    {
                        title: 'Paddy land total(Hectares)',
                        value: ''
                    },
                    {
                        title: 'Paddy land wet-season irrigated(Hectares)',
                        value: ''
                    },
                    {
                        title: 'Paddy land dry-season irrigated(Hectares)',
                        value: ''
                    },
                    {
                        title: 'Paddy land increase potential(Hectares)',
                        value: ''
                    },
                    {
                        title: 'Upland rice area(Hectares)',
                        value: ''
                    },
                    {
                        title: 'Corn area(Hectares)',
                        value: ''
                    },
                    {
                        title: 'Other cash cropping area(Hectares)	',
                        value: ''
                    },
                    {
                        title: 'Fruit orchard area(Hectares)	',
                        value: ''
                    },
                    {
                        title: 'Teak plantations(Hectares)',
                        value: ''
                    },
                    {
                        title: 'Rubber plantations(Hectares)',
                        value: ''
                    },
                    {
                        title: 'Eucalyptus plantations(Hectares)',
                        value: ''
                    },
                    {
                        title: 'Other tree plantations(Hectares)',
                        value: ''
                    },
                    {
                        title: 'Shortest fallow period (years)',
                        value: ''
                    },

                    {
                        title: 'Longest fallow period (years)',
                        value: ''
                    },
                    {
                        title: 'Average fallow period (years)',
                        value: ''
                    },

                ],
                cropYield: [
                    {
                        title: 'Average paddy rice yield (kg/ha)',
                        value: ''
                    },
                    {
                        title: 'Average upland rice yield (kg/ha)',
                        value: ''
                    },
                    {
                        title: 'Rice deficiency (months/yr)',
                        value: ''
                    },
                    {
                        title: 'Average Jobs tears yield (kg/ha)	',
                        value: ''
                    },
                    {
                        title: 'Average maize yield (kg/ha)',
                        value: ''
                    },
                    {
                        title: 'Average cassava yield (kg/ha)',
                        value: ''
                    },
                    {
                        title: 'Other crops yield (kg/ha)',
                        value: ''
                    },



                ],
                Irrigation: [
                    {
                        title: 'irrigation',
                        value: ''
                    },
                    {
                        title: 'Irrigation water sufficient dry season	',
                        value: ''
                    },
                    {
                        title: 'Irrigation water sufficient wet season',
                        value: ''
                    },
                    {
                        title: 'Potential for irrigation increase',
                        value: ''
                    },
                ],
                animals: [
                    {
                        title: 'cattle',
                        value: ''
                    },
                    {
                        title: 'buffalo',
                        value: ''
                    }
                    ,
                    {
                        title: 'goat',
                        value: ''
                    },
                    {
                        title: 'Weaned pigs- no need of breastfeeding[no of heads]',
                        value: ''
                    },
                    {
                        title: 'cattle raising(Household)',
                        value: ''
                    },
                    {
                        title: 'buffalo raising(Household)',
                        value: ''
                    },
                    {
                        title: 'goat raising(Household)',
                        value: ''
                    },
                    {
                        title: 'pig raising(Household)',
                        value: ''
                    },
                    {
                        title: 'Most cattle vaccinated',
                        value: ''
                    },
                    {
                        title: 'Most buffalo vaccinated',
                        value: ''
                    },

                    {
                        title: 'Most pigs vaccinated',
                        value: ''
                    },
                    {
                        title: 'Most poultry vaccinated',
                        value: ''
                    },
                ],
                incomeSources: [
                    {
                        title: 'first income source of the village',
                        value: ''
                    }
                    ,
                    {
                        title: 'second income source of the village',
                        value: ''
                    },
                    {
                        title: 'third income source of the village',
                        value: ''
                    },
                    {
                        title: 'fourth income source of the village',
                        value: ''
                    },

                ],
                creditSources: [
                    {
                        title: 'credit through private lender',
                        value: ''
                    },
                    ,
                    {
                        title: 'credit nayobai bank',
                        value: ''
                    },
                    {
                        title: 'credit microfinace institute',
                        value: ''
                    },
                    {
                        title: 'credit village bank',
                        value: ''
                    },
                    {
                        title: 'credit through commercial bank',
                        value: ''
                    },
                    {
                        title: 'household debt(HH)',
                        value: ''
                    }
                ],
                agricultureAndForestryTrends: [
                    {
                        title: 'Use of new varieties of paddy rice last 5 years	',
                        value: ''
                    },
                    {
                        title: 'Pesticide use in paddy rice last 5 years',
                        value: ''
                    },
                    {
                        title: 'Fertilizer use in paddy rice last 5 years',
                        value: ''
                    },
                    {
                        title: 'New varieties of upland rice last 5 years',
                        value: ''
                    },
                    {
                        title: 'Pesticide use in upland rice last 5 years',
                        value: ''
                    },
                    {
                        title: 'Fertilizer use in upland rice last 5 years',
                        value: ''
                    },
                    {
                        title: 'New varieties use as commercial crops last 5 years',
                        value: ''
                    }
                    ,
                    {
                        title: 'Pesticide use in commercial crops last 5 years',
                        value: ''
                    },
                    {
                        title: 'Fertilizer use in commercial crops last 5 years	',
                        value: ''
                    },
                    {
                        title: 'Paddy rice yield last 5 years',
                        value: ''
                    },

                    {
                        title: 'Upland rice yield last 5 years',
                        value: ''
                    },

                    {
                        title: 'Access to agricultural land last 5 years',
                        value: ''
                    }
                    ,
                    {
                        title: 'Land conflicts last 5 years',
                        value: ''
                    },
                    {
                        title: 'Cultivation of tree crops last 5 years',
                        value: ''
                    },
                    {
                        title: 'NTFP importance last 5 years',
                        value: ''
                    },
                    {
                        title: 'Cash crop areas last 5 years',
                        value: ''
                    },

                    {
                        title: 'Cattle numbers last 5 years',
                        value: ''
                    },
                    {
                        title: 'Buffalo numbers last 5 years',
                        value: ''
                    },

                    {
                        title: 'Goat numbers last 5 years',
                        value: ''
                    },

                    {
                        title: 'Pig numbers last 5 years',
                        value: ''
                    },


                ],
                physiography: [
                    {
                        title: 'altitude village(m)',
                        value: ''
                    },
                    {
                        title: 'altitude lowest field (m)',
                        value: ''
                    },
                    {
                        title: 'altitude highest field(m)',
                        value: ''
                    },
                    {
                        title: 'altitude highest point of the village area(MASL)',
                        value: ''
                    },
                    {
                        title: 'village on plain or in the low land',
                        value: ''
                    },
                    {
                        title: 'village upland',
                        value: ''
                    },
                    {
                        title: 'village mountain',
                        value: ''
                    },
                ],
                distances: [
                    {
                        title: 'Distance to kumban centre(km)',
                        value: ''
                    },
                    {
                        title: 'Distance to district centre(km)',
                        value: ''
                    },
                    {
                        title: 'Distance to province centre(km)',
                        value: ''
                    },
                    {
                        title: 'Distance to health centre(km)',
                        value: ''
                    },
                    {
                        title: 'Distance to hospital()km',
                        value: ''
                    },
                    {
                        title: 'Distance to pharmacy(km)',
                        value: ''
                    },
                    {
                        title: 'Distance to primary school 1-3(km)',
                        value: ''
                    },
                    {
                        title: 'Distance to primary school 4-5(km)',
                        value: ''
                    },
                    ,
                    {
                        title: 'Distance to lower secondary school(km)',
                        value: ''
                    },
                    {
                        title: 'Distance to higher secondary school(km)',
                        value: ''
                    },
                    {
                        title: 'Distance to market centre(km)',
                        value: ''
                    },
                    {
                        title: 'Distance to bank(km)',
                        value: ''
                    },
                    {
                        title: 'Distance to ATM(km)',
                        value: ''
                    },


                ],
                landGovernance: [
                    {
                        title: 'boundary demarcated',
                        value: ''
                    },
                    {
                        title: 'village territory area[Hectares]',
                        value: ''
                    },
                    {
                        title: 'Water source protected area (Hectares)',
                        value: ''
                    },
                    {
                        title: 'warershed protected area(Hectares)',
                        value: ''
                    },
                    {
                        title: 'non hunting area(Hectares)',
                        value: ''
                    },
                    {
                        title: 'fish protection zone(Hectares)',
                        value: ''
                    },
                    {
                        title: 'religiou or burial site(Hectares)',
                        value: ''
                    },
                    {
                        title: 'archeological site(Hectares)',
                        value: ''
                    },


                    {
                        title: 'agriculltural concession',
                        value: ''
                    },

                    {
                        title: 'UXO contaminated area(Hectares)',
                        value: ''
                    },
                    {
                        title: 'upland annual cultivation(Hectares)',
                        value: ''
                    },
                    {
                        title: 'upland area rotation(Hectares)',
                        value: ''
                    },
                    {
                        title: 'communal land rights area(Hectares)',
                        value: ''
                    },


                    {
                        title: 'communal right area(Hectares)',
                        value: ''
                    }
                    ,
                    {
                        title: 'Land cultivated outsiders(Hectares)',
                        value: ''
                    },
                    {
                        title: 'Land owned by outsiders(Hectares)',
                        value: ''
                    },
                    {
                        title: 'Land rented by outsiders (Hectares)',
                        value: ''
                    },

                    {
                        title: 'production forest area(Hectares)',
                        value: ''
                    },
                    {
                        title: 'protection forest area(Hectares)',
                        value: ''
                    }
                    ,

                    {
                        title: 'forest plantation(Hectares)',
                        value: ''
                    },
                    {
                        title: 'village forest area(Hectares)',
                        value: ''
                    },
                    {
                        title: 'Forest cover forest land;0,5 ha,crown cover 20% height 5 meter+[percent](Hectares)',
                        value: ''
                    },
                    {
                        title: 'livestock grazing area(Hectares)',
                        value: ''
                    },
                    {
                        title: 'river crossing area',
                        value: ''
                    },
                    {
                        title: 'river hold water 6 months/year',
                        value: ''
                    },
                    {
                        title: 'htdropower concesston',
                        value: ''
                    },
                    {
                        title: 'Agricultural  concessions(Hectares)',
                        value: ''
                    },
                    {
                        title: 'livestock concession ',
                        value: ''
                    },
                    {
                        title: 'forestry concesstion',
                        value: ''
                    },

                    {
                        title: 'mining concession',
                        value: ''
                    },
                    {
                        title: 'Land use plan [PLUP,PSALUM]',
                        value: ''
                    },
                    {
                        title: 'Land zoning',
                        value: ''
                    },
                    {
                        title: 'Land titling',
                        value: ''
                    },
                    {
                        title: 'Land with title',
                        value: ''
                    },

                    {
                        title: 'Land taxed',
                        value: ''
                    },

                    {
                        title: 'village photo',
                        value: ''
                    },
                    {
                        title: 'village territory photo',
                        value: ''
                    },

                    {
                        title: 'village governance',
                        value: ''
                    }
                    ,
                    {
                        title: 'village governance GIS map',
                        value: ''
                    },




              



                ],
                risks: [
                    {
                        title: 'Flooding risk',
                        value: ''
                    },
                    {
                        title: 'Land slide risk',
                        value: ''
                    },
                    {
                        title: 'Road closure risk',
                        value: ''
                    },
                    {
                        title: 'Forest fire risk',
                        value: ''
                    },
                    {
                        title: 'Village fire risk',
                        value: ''
                    },
                    {
                        title: 'Dam collapse risk',
                        value: ''
                    },
                    {
                        title: 'Land expropriation risk',
                        value: ''
                    },
                    {
                        title: 'UXO risk',
                        value: ''
                    },
                    {
                        title: 'UXO clearance last 5 years',
                        value: ''
                    },
                
                

                ]
            }
        };
    },
    async mounted() {
        this.onGetprovin();
    },

    methods: {
        changeColor(color, ref) {
            ref.$el.style.backgroundColor = color;
        },
        async uploadImage() {
            try {
                if (!this.image) {
                    return; // No file selected, exit the method
                }
                // Create a FormData object
                const formData = new FormData();
                // Append the image file to the FormData object
                formData.append('image', this.image);
                // Send a POST request to the 'uploadFile' endpoint
                const response = await axios.post('https://api.vfmp.dof.maf.gov.la/uploadFile', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
                    },
                });
                // Check if the response status is successful
                if (response.data.status && response.data.message === 'SUCCESS' && response.data.data) {
                    // Save the uploaded image URL
                    this.imageUrl = response.data.data;
                    // Set imageUploaded to true
                    this.imageUploaded = true;
                } else {
                    console.error('Error uploading image:', response.data.message);
                }
            } catch (error) {
                // Handle errors
                console.error('Error uploading image:', error);
            }
        },

        async handleFilesChange(event) {
            const files = event.target.files; // Get the selected files
            const formData = new FormData(); // Create a FormData object

            // Append each file to the FormData object
            for (let i = 0; i < files.length; i++) {
                formData.append('files', files[i]);
            }

            try {
                // Send a POST request to the 'uploadFiles' endpoint
                const response = await axios.post('https://api.vfmp.dof.maf.gov.la/uploadFiles', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
                    },
                });

                // Check if the response status is successful
                if (response.data.status && response.data.message === 'SUCCESS' && response.data.data) {
                    console.log('Files uploaded successfully:', response.data.data);
                } else {
                    console.error('Error uploading files:', response.data.message);
                }
            } catch (error) {
                // Handle errors
                console.error('Error uploading files:', error);
            }
        },
        async saveVillage() {
            try {
                // Check if imageUploaded is true
                if (!this.imageUploaded) {
                    console.error('Image not uploaded yet.');
                    return;
                }
                const storedToken = localStorage.getItem('TOKEN');
                if (!storedToken) {
                    Swal.fire({
                        title: 'Error',
                        text: 'Token not found in local storage',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                    return;
                }
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${storedToken}`,
                };

                // Create the data object
                const data = {
                    villageId: this.village || '',
                    image: this.imageUrl,
                    lat: this.lat,
                    long: this.long,
                    about: {
                        file: this.about.file,
                        description: this.about.description,
                    },
                    Land: {
                        file: this.Land.file,
                        description: this.Land.description,
                    },
                    convertingArea: {
                        file: this.convertingArea.file,
                        description: this.convertingArea.description,
                    },
                    baselineData: {
                        homeResearchAnalysis: this.baselineData.homeResearchAnalysis,
                        villageFacilities: this.baselineData.villageFacilities,
                        population: this.baselineData.population,
                        schoolFacilities: this.baselineData.schoolFacilities,
                        wellBeingAccessCriteria: this.baselineData.wellBeingAccessCriteria,
                        houseHoldAssets: this.baselineData.houseHoldAssets,
                        socialRisks: this.baselineData.socialRisks,
                        waterSupply: this.baselineData.waterSupply,
                        roadAccessToVillage: this.baselineData.roadAccessToVillage,
                        villageAccessRoadStandard: this.baselineData.villageAccessRoadStandard,
                        accessToMarkets: this.baselineData.accessToMarkets,
                        occupation: this.baselineData.occupation,
                        otherLivelihoodSources: this.baselineData.otherLivelihoodSources,
                        croppingArea: this.baselineData.croppingArea,
                        cropYield: this.baselineData.cropYield,
                        Irrigation: this.baselineData.Irrigation,
                        animals: this.baselineData.animals,
                        incomeSources: this.baselineData.incomeSources,
                        creditSources: this.baselineData.creditSources,
                        agricultureAndForestryTrends: this.baselineData.agricultureAndForestryTrends,
                        physiography: this.baselineData.physiography,
                        distances: this.baselineData.distances,
                        landGovernance: this.baselineData.landGovernance,
                        risks: this.baselineData.risks
                    },
                };

                const response = await axios.post(
                    'https://api.vfmp.dof.maf.gov.la/villageDetail',
                    JSON.stringify(data),
                    { headers }
                );
                console.log('Response:', response.data);
                Swal.fire({
                    title: 'Success',
                    text: 'Village details saved successfully',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
            } catch (error) {
                console.error('Error:', error);
                if (error.response) {
                    console.error('Error Response Data:', error.response.data);
                    if (error.response.status === 401) {
                        console.error('Error: Unauthorized - Token is not valid or expired');
                        Swal.fire({
                            title: 'Unauthorized',
                            text: 'Token is not valid or expired',
                            icon: 'error',
                            confirmButtonText: 'OK',
                        });
                    } else {
                        Swal.fire({
                            title: 'Error',
                            text: error.response.data.message || 'An error occurred while saving the village details',
                            icon: 'error',
                            confirmButtonText: 'OK',
                        });
                    }
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'An error occurred while saving the village details',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                }
            } finally {
                this.loading_processing = false;
            }
        },
        async onGetprovin() {
            try {
                this.loading_processing = true;
                const response = await axios.get('https://api.vfmp.dof.maf.gov.la/provinces');
                this.loading_processing = false;
                if (response?.data?.status === true) {
                    this.user_data_list = response.data.data;
                } else {
                    Swal.fire({
                        title: 'Notification',
                        text: response?.data?.message,
                        icon: 'info',
                        allowOutsideClick: false,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK',
                    });
                }
            } catch (error) {
                this.loading_processing = false;
                Swal.fire({
                    title: 'Notification',
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
                const response = await axios.get(`https://api.vfmp.dof.maf.gov.la/districts?provinceId=${provinceId}`);
                this.loading_processing = false;
                if (response?.data?.status === true) {
                    this.user_data_districts = response.data.data;
                } else {
                    Swal.fire({
                        title: 'Notification',
                        text: response?.data?.message,
                        icon: 'info',
                        allowOutsideClick: false,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK',
                    });
                }
            } catch (error) {
                this.loading_processing = false;
                Swal.fire({
                    title: 'Notification',
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
                const response = await axios.get(`https://api.vfmp.dof.maf.gov.la/villages?districtId=${districtId}`);
                this.loading_processing = false;
                if (response?.data?.status === true) {
                    this.user_data_village = response.data.data;
                } else {
                    Swal.fire({
                        title: 'Notification',
                        text: response?.data?.message,
                        icon: 'info',
                        allowOutsideClick: false,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK',
                    });
                }
            } catch (error) {
                this.loading_processing = false;
                Swal.fire({
                    title: 'Notification',
                    text: error.message,
                    icon: 'error',
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                });
            }
        },
        onProvinceChange() {
            this.district = '';
            this.village = '';
            this.user_data_districts = [];
            this.user_data_village = [];
            if (this.province) {
                this.onGetdistricts(this.province);
                this.provinceLa = this.user_data_list.find(item => item._id === this.province).provinceLa;
            }
        },
        onDistrictChange() {
            this.village = '';
            this.user_data_village = [];
            if (this.district) {
                this.onGetvillage(this.district);
                this.districtLa = this.user_data_districts.find(item => item._id === this.district).districtLa;
            }
        },
        onVillageChange() {
            if (this.village) {
                this.villageLa = this.user_data_village.find(item => item._id === this.village).villageLa;
            }
        },
        addHomeResearchAnalysis() {
            this.baselineData.homeResearchAnalysis.push({ title: '', value: '' });
        },
        removeHomeResearchAnalysis(index) {
            this.baselineData.homeResearchAnalysis.splice(index, 1);
        },
        addVillageFacility() {
            this.baselineData.villageFacilities.push({ title: '', value: '' });
        },
        removeVillageFacility(index) {
            this.baselineData.villageFacilities.splice(index, 1);
        },
        addPopulation() {
            this.baselineData.population.push({ title: '', value: '' });
        },
        removePopulation(index) {
            this.baselineData.population.splice(index, 1);
        },


        addschoolFacilities() {
            this.baselineData.schoolFacilities.push({ title: '', value: '' });
        },
        removeschoolFacilities(index) {
            this.baselineData.schoolFacilities.splice(index, 1);
        },

        addwellBeingAccessCriteria() {
            this.baselineData.wellBeingAccessCriteria.push({ title: '', value: '' });
        },
        removewellBeingAccessCriteria(index) {
            this.baselineData.wellBeingAccessCriteria.splice(index, 1);
        },

        addhouseHoldAssets() {
            this.baselineData.houseHoldAssets.push({ title: '', value: '' });
        },
        removehouseHoldAssets(index) {
            this.baselineData.houseHoldAssets.splice(index, 1);
        },

        addsocialRisks() {
            this.baselineData.socialRisks.push({ title: '', value: '' });
        },
        removesocialRisks(index) {
            this.baselineData.socialRisks.splice(index, 1);
        },

        addwaterSupply() {
            this.baselineData.waterSupply.push({ title: '', value: '' });
        },
        removewaterSupply(index) {
            this.baselineData.waterSupply.splice(index, 1);
        },




        addroadAccessToVillage() {
            this.baselineData.roadAccessToVillage.push({ title: '', value: '' });
        },
        removeroadAccessToVillage(index) {
            this.baselineData.roadAccessToVillage.splice(index, 1);
        },

        addvillageAccessRoadStandard() {
            this.baselineData.villageAccessRoadStandard.push({ title: '', value: '' });
        },
        removevillageAccessRoadStandard(index) {
            this.baselineData.villageAccessRoadStandard.splice(index, 1);
        },


        addaccessToMarkets() {
            this.baselineData.accessToMarkets.push({ title: '', value: '' });
        },
        removeaccessToMarkets(index) {
            this.baselineData.accessToMarkets.splice(index, 1);
        },


        addoccupation() {
            this.baselineData.occupation.push({ title: '', value: '' });
        },
        removeoccupation(index) {
            this.baselineData.occupation.splice(index, 1);
        },


        addotherLivelihoodSources() {
            this.baselineData.otherLivelihoodSources.push({ title: '', value: '' });
        },
        removeotherLivelihoodSources(index) {
            this.baselineData.otherLivelihoodSources.splice(index, 1);
        },


        addcroppingArea() {
            this.baselineData.croppingArea.push({ title: '', value: '' });
        },
        removecroppingArea(index) {
            this.baselineData.croppingArea.splice(index, 1);
        },

        addcropYield() {
            this.baselineData.cropYield.push({ title: '', value: '' });
        },
        removecropYield(index) {
            this.baselineData.cropYield.splice(index, 1);
        },

        addIrrigation() {
            this.baselineData.Irrigation.push({ title: '', value: '' });
        },
        removeIrrigation(index) {
            this.baselineData.Irrigation.splice(index, 1);
        },

        addanimals() {
            this.baselineData.animals.push({ title: '', value: '' });
        },
        removeanimals(index) {
            this.baselineData.animals.splice(index, 1);
        },

        addincomeSources() {
            this.baselineData.incomeSources.push({ title: '', value: '' });
        },
        removeincomeSources(index) {
            this.baselineData.incomeSources.splice(index, 1);
        },

        addcreditSources() {
            this.baselineData.creditSources.push({ title: '', value: '' });
        },
        removecreditSources(index) {
            this.baselineData.creditSources.splice(index, 1);
        },

        addagricultureAndForestryTrends() {
            this.baselineData.agricultureAndForestryTrends.push({ title: '', value: '' });
        },
        removeagricultureAndForestryTrends(index) {
            this.baselineData.agricultureAndForestryTrends.splice(index, 1);
        },

        addphysiography() {
            this.baselineData.physiography.push({ title: '', value: '' });
        },
        removephysiography(index) {
            this.baselineData.physiography.splice(index, 1);
        },

        adddistances() {
            this.baselineData.distances.push({ title: '', value: '' });
        },
        removedistances(index) {
            this.baselineData.distances.splice(index, 1);
        },

        addlandGovernance() {
            this.baselineData.landGovernance.push({ title: '', value: '' });
        },
        removelandGovernance(index) {
            this.baselineData.landGovernance.splice(index, 1);
        },

        addrisks() {
            this.baselineData.risks.push({ title: '', value: '' });
        },
        removerisks(index) {
            this.baselineData.risks.splice(index, 1);
        },
    }
};
</script>

<style scoped>
.hovered {
    transition: background-color 0.3s ease;
    /* Add transition effect for smooth color change */
}
</style>
