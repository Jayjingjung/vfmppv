<template>
  <div class="bgss">
    <v-row class="bgs" align="center">
      <v-col>

        <v-card width="400" class="mx-auto card-shadow" rounded="lg">
          <div class="text-center pt-6 pb-4" style="font-size:18pt">ຍິນດີເຂົ້າສູ່ລະບົບ</div>
          <v-divider></v-divider>
          <v-card-text>
            <v-text-field label="ຊື່ຜູ້ໃຊ້" prepend-icon="mdi-account" v-model="phoneNumber"></v-text-field>
            <v-text-field label="ລະຫັດຜ່ານ" placeholder="**********"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" prepend-icon="mdi-lock" v-model="password"
              :type="showPassword ? 'text' : 'password'" @click:append="onShowpassword"
              @keyup.enter="onLogin"></v-text-field>

          </v-card-text>
          <v-divider></v-divider>
          <div style="display:flex;flex-direction:row;justify-content:center" class="px-10 pb-6">
            <v-btn :loading="loadingLogin" color="#50A54D" class="card-shadow mt-4 white--text" @click="onLogin">
              ເຂົ້າສູ່ລະບົບ
            </v-btn>
          </div>
        </v-card>

      </v-col>
    </v-row>


  </div>
</template>
<script>
import swal from 'sweetalert2'
export default {
  layout: 'blank',
  data() {
    return {
      showPassword: false,
      phoneNumber: '',
      password: '',
      loadingLogin: false,
    }
  },
  methods: {
    onShowpassword() {
      this.showPassword = !this.showPassword
    },
    async onLogin() {
      try {
        if (this.phoneNumber != '' && this.password != '') {
          let data = {
            phoneNumber: this.phoneNumber,
            password: this.password,
          }
          this.loadingLogin = true
          await this.$axios.$post('https://trackingapp-qupd.onrender.com/adminLogin', data)
            .then((response) => {
              console.log(response);  // Log the server response
              if (response?.status == true) {
               
                
                const userData = response?.data;
                localStorage.setItem('USER_ID', userData?._id);
                localStorage.setItem('USER_NAME', userData?.userName);
                localStorage.setItem('USER_ROLE', userData?.role);
                localStorage.setItem('TOKEN', userData?.accessToken);

                this.loadingLogin = false;
                this.$router.push('/homepage');
              } else {
                this.loadingLogin = false;
                swal.fire({
                  title: 'ແຈ້ງເຕືອນ',
                  text: response?.message,
                  icon: 'error',
                  allowOutsideClick: false,
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: 'OK',
                });
              }
            });

        }
      } catch (error) {
        this.loadingLogin = false
        swal.fire({
          title: 'ແຈ້ງເຕືອນ',
          text: error,
          icon: 'error',
          allowOutsideClick: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        })
      }
    },
  },
}
</script>
<style scoped>
.bg {
  background-color: #3992C8;
}

.bgs {
  background: linear-gradient(#3C98CE, #2171A1, #144D70);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  height: 100VH;
  background-image: url('../assets/images/cover-01.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

}
</style>