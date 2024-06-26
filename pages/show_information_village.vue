<template>
    <div>
        <v-card class="card-shadow mb-6 mt-1" rounded="lg" style="height: 100%;">
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
                    <div style="width: 500px;margin-right: 50px;font-size: 20px;">


                        <div v-if="villageData"
                            style="display: flex;margin-left: 10px;margin-right: 5px;margin-top: 30px;">
                            <div style="width: 50%">

                                <span
                                    style="display: block; text-align: center; margin-top: 7px; font-family: 'Times New Roman', Times, serif;"
                                    class="back--text"> VillageID</span>

                            </div>
                            <div style="width:50%">

                                <v-text-field style="font-family: 'Times New Roman', Times, serif;font-size: 20px;"
                                    class="mr-1 ml-1" label="villageCode" dense flat solo background-color="#f5f5f5"
                                    v-if="villageData.lat" :value="villageData.villageCode" readonly></v-text-field>
                            </div>
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
                                <v-text-field style="font-family: 'Times New Roman', Times, serif;font-size: 20px;" class="mr-1 ml-1"
                                    label="Village Name (En)" dense flat solo background-color="#f5f5f5"
                                    :value="villageData.villageId.villageEn" readonly></v-text-field>
                            </div>
                            <div style="width: 25%">
                                <v-text-field style="font-family: 'Times New Roman', Times, serif;font-size: 20px;" class="mr-1 ml-1"
                                    label="Village Name (Lao)" dense flat solo background-color="#f5f5f5"
                                    :value="villageData.villageId.villageLa" readonly></v-text-field>
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
            <div
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
            </div>

            <div style="text-align: center;">
                <span class="back--text" style="font-family: 'Times New Roman', Times, serif;font-size: 25px;">Baseline
                    Data</span>
            </div>
            <div>
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
            </div>
            <div>
                <!-- Display about, Land, and convertingArea data in a horizontal table -->
                <v-card
                    style="width: 100%; margin-top: 10px; margin-left: 7px; margin-right: 7px; height: 800px; display: flex;">
                    <div style="margin-top: 20px;">
                        <div style="text-align: center;">
                            <span style="font-family: 'Times New Roman', Times, serif;">ABOUT</span>
                        </div>
                        <iframe v-if="villageData && villageData.about && villageData.about.file"
                            :src="'https://docs.google.com/gview?url=' + villageData.about.file + '&embedded=true'"
                            style=" width: 550px;height: 750px;"></iframe>
                    </div>

                    <div style="margin-top: 20px;">
                        <div style="text-align: center;">
                            <span style="font-family: 'Times New Roman', Times, serif;">LAND</span>
                        </div>
                        <iframe v-if="villageData && villageData.Land && villageData.Land.file"
                            :src="'https://docs.google.com/gview?url=' + villageData.Land.file + '&embedded=true'"
                            style=" width: 550px;height: 750px;"></iframe>
                    </div>

                    <div style="margin-top: 20px;">
                        <div style="text-align: center;">
                            <span style="font-family: 'Times New Roman', Times, serif;">CONVERTING AREA</span>
                        </div>
                        <iframe v-if="villageData && villageData.convertingArea && villageData.convertingArea.file"
                            :src="'https://docs.google.com/gview?url=' + villageData.convertingArea.file + '&embedded=true'"
                            style=" width: 550px;height: 750px;"></iframe>
                    </div>

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
// import PdfViewer from './PdfViewer.vue'; // Adjust the path as necessary
export default {
    data() {
        return {
            villageData: null, // Add a data property to store the village data
            villageId: '', // Add a data property to store the village ID
            lat: '', // Add a data property to store the village ID
            long: '', // Add a data property to store the village ID
            selectedCard: '1', // Ensure this property is defined if it's needed
            selectedCardPDF: '1',
            file: '',
            about: '',
            villageData: {
                about: {
                    file: '',
                    description: ''
                }
            },
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
    },
    mounted() {
        // Get the village_id from the URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const villageIdFromUrl = urlParams.get('village_id');
        this.villageId = villageIdFromUrl;

        // Fetch data when component is mounted
        // this.fetchData();
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
    height: 100px;
    border-collapse: collapse;
}

th,
td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #81d5e0;
}

th {
    height: 50px;
    background-color: #c9ffd0;
}
</style>
