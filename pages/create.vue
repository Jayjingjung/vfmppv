<template>
    <div>
      <v-btn @click="exportToExcel" color="primary">Export to Excel</v-btn>
    </div>
  </template>
  
  <script>
  import XLSX from 'xlsx';
  
  export default {
    data() {
      return {
        // Your data to export
        dataToExport: [
          ['Name', 'Age', 'Country'],
          ['John Doe', 25, 'USA'],
          ['Jane Doe', 30, 'Canada'],
          // Add more rows as needed
        ],
      };
    },
    methods: {
      exportToExcel() {
        // Create a new workbook
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(this.dataToExport);
  
        // Add the worksheet to the workbook
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
  
        // Generate a blob containing the workbook as an Excel file
        const blob = XLSX.write(wb, { bookType: 'xlsx', type: 'blob', mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
        // Create a link element and trigger a click to download the file
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'exported_data.xlsx';
        link.click();
      },
    },
  };
  </script>
  