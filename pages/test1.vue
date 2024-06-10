<template>

</template>

<script>
mounted() {
    this.onGetprovin();
}
async onGetprovin() {
    try {
        this.loading_processing = true;

        const response = await this.$axios.$get('https://trackingapp-qupd.onrender.com/provinces');

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
        async onGetdistricts(provinceId) {
    try {
        this.loading_processing = true;

        const response = await this.$axios.$get(`https://trackingapp-qupd.onrender.com/districts?provinceId=${provinceId}`);

        if (response?.status === true) {
            this.loading_processing = false;
            console.log('user:', response.data);
            this.user_data_districts = response.data;
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
        async onGetvillage(districtId) {
    try {
        this.loading_processing = true;

        const response = await this.$axios.$get(`https://trackingapp-qupd.onrender.com/villages?districtId=${districtId}`);

        if (response?.status === true) {
            this.loading_processing = false;
            console.log('user:', response.data);
            this.user_data_village = response.data;
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
</script>