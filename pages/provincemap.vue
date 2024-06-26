<template>
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="auto"
        height="auto"
        viewBox="0 0 1900 900"
        @click="handleMapClick"
      >
        <!-- Your SVG path with class st2 and click event -->
        <path
          class="st2"
          d="M1405.8,588.32c-12.67-1.18-24.49-17.47-20.41-26.08c3.73-7.87,21.76-11.43,30.61-2.27
          c6.39,6.61,7.28,19.09,1.13,24.94C1413.11,588.77,1407.39,588.47,1405.8,588.32z"
          @click="navigateToProvince"
        />
      </svg>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      handleMapClick(event) {
        // You can perform additional logic here if needed
        console.log('Clicked on the map');
      },
      navigateToProvince() {
        // Use router.push to navigate to the province route
        this.$router.push('/province');
      },
    },
  };
  </script>
  
  <style scoped>
 	.st2{fill:#00AEEF;}

  </style>
  