<!-- <template>
  <div>
    <div class="centered-container">
      <v-btn @click="exportToExcel" color="primary">Export to Excel</v-btn>
    </div>
    <v-list-item-subtitle>

      <v-img :width="300" aspect-ratio="16/9" cover src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-img>

    </v-list-item-subtitle>
  </div>
</template> -->

<!-- <script>
import XLSX from 'xlsx';

export default {
  data() {
    return {

      dataToExport: [
        ['Name', 'Age', 'Country'],
        ['John Doe', 25, 'USA'],
        ['Jane Doe', 30, 'Canada'],
   
      ],
    };
  },
  methods: {
    exportToExcel() {

      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(this.dataToExport);

 
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');

    
      const blob = XLSX.write(wb, { bookType: 'xlsx', type: 'blob', mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'exported_data.xlsx';
      link.click();
    },
  },
};
</script> -->
<!-- <style scoped>
.centered-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
 
}
</style> -->