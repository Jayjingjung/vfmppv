<template>
    <div>
      <svg
        width="600"
        height="600"
        xmlns="http://www.w3.org/2000/svg"
        style="cursor: pointer;"
        @click="handleProvinceClick"
      >
        <!-- Path for Vientiane province with a link -->
        <a :href="provinceLinks['Vientiane']"> <!-- Use dynamic href binding -->
          <path id="Vientiane" d="M300,50 L350,50 L350,100 L300,100 Z" fill="#ffcc00" />
        </a>
        <!-- Add paths for other provinces -->
  
        <!-- Example: Label text for provinces -->
        <text x="300" y="75" fill="black">Vientiane</text>
        <!-- Add labels for other provinces -->
      </svg>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        provinceLinks: {
          Vientiane: 'https://example.com/homepage', // Replace with your actual homepage URL
          // Add links for other provinces as needed
        },
      };
    },
    methods: {
      handleProvinceClick(event) {
        const clickedProvinceId = event.target.id;
        if (clickedProvinceId) {
          // Redirect to the corresponding link when a province is clicked
          const link = this.provinceLinks[clickedProvinceId];
          if (link) {
            window.location.href = link;
          }
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any scoped styles as needed */
  </style>
  