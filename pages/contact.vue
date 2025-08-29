<template>
    <v-container>
      <v-card outlined class="pa-4">
        <v-card-title class="text-h6">ຂໍ້ມູນຕິດຕໍ່</v-card-title>
        <v-card-text>
          <p><strong>📞 ເບີໂທ:</strong> 
            <a :href="'tel:' + phone" class="text-decoration-none">
              {{ phone }}
            </a>
          </p>
          <p><strong>📧 ອີເມວ:</strong> 
            <a :href="'mailto:' + email" class="text-decoration-none">
              {{ email }}
            </a>
          </p>
          <p><strong>🌐 ເວັບໄຊ:</strong> 
            <a :href="website" target="_blank" class="text-decoration-none">
              {{ website }}
            </a>
          </p>
  
          <div class="map-container mt-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d780.6084266395778!2d102.6224146417089!3d17.992127056620973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3124677dd69b7b23%3A0xace64835a0458378!2sDepartment%20of%20Forestry%20REDD%2B%20Division!5e1!3m2!1sth!2sla!4v1745056971636!5m2!1sth!2sla"
              width="100%"
              height="450"
              style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'ContactPage',
    data() {
      return {
        phone: '+8562028211315',
        email: 'VFMP.gov@gmail.com',
        website: 'https://vfmp.dof.maf.gov.la/'
      }
    }
  }
  </script>
  
  <style scoped>
  .map-container {
    width: 100%;
    height: auto;
    overflow: hidden;
    border-radius: 12px;
  }
  </style>
  