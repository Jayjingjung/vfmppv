<template>
    <div>
      <svg
        width="500"
        height="500"
        xmlns="http://www.w3.org/2000/svg"
        @click="handleMapClick"
      >
        <!-- Define clickable areas with ids -->
        <path
          id="area1"
          d="M100,100 L200,100 L200,200 L100,200 Z"
          fill="blue"
        />
        <path
          id="area2"
          d="M300,100 L400,100 L400,200 L300,200 Z"
          fill="green"
        />
      </svg>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      handleMapClick(event) {
        // Handle click event on the map
        const clickedElementId = event.target.id;
        if (clickedElementId) {
          // Do something based on the clicked element id
          console.log('Clicked:', clickedElementId);
        }
      },
    },
  };
  </script>
  