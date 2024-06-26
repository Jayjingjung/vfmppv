<template>
    <div>

        <div class="map-container">
            <v-card class="map-card">
                <v-card-title class="headline">Location Map</v-card-title>
                <v-card-text>
                    <iframe :src="embedUrl" width="1200" height="650" style="border:0;" allowfullscreen=""
                        loading="lazy"></iframe>
                </v-card-text>
            </v-card>

        </div>
        <v-card-title style="display: flex;justify-content: center;align-items: center; color: green;" >Village Forest Management LAOS</v-card-title>
    </div>

</template>

<script>
export default {
    data() {
        return {
            embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3874.449740507606!2d102.62295!3d17.992131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31228a71a1c9d04b%3A0xad67f8b0c03d07e8!2sGoogle!5e0!3m2!1sen!2s!4v1637856522926!5m2!1sen!2s"
        };
    }
};
</script>

<style scoped>
.map-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin-top: -40px;
    /* Ensure the container takes full height of the viewport */
}

.map-card {
    width: 80%;
    /* Adjust width as needed */
    max-width: 1240px;
    margin: auto;
}
</style>