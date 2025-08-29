<template>
    <v-container>
      <!-- Input -->
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="lat"
            label="Latitude"
            type="number"
            outlined
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="lon"
            label="Longitude"
            type="number"
            outlined
          />
        </v-col>
      </v-row>
  
      <!-- Button -->
      <v-btn color="primary" @click="convertToUTM">
        Convert to UTM
      </v-btn>
  
      <!-- Output -->
      <div class="mt-4">
        <div 
          v-if="utmResult" 
          @click="copyLatLon" 
          style="cursor: pointer; user-select: none;"
        >
          <strong>UTM:</strong> {{ utmResult }}
          <br />
          <small>(Click to copy Lat/Lon)</small>
        </div>
      </div>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        lat: null,
        lon: null,
        utmResult: ''
      }
    },
    methods: {
      convertToUTM() {
        if (!this.lat || !this.lon) {
          this.utmResult = "Please input lat and long!";
          return;
        }
        const utm = this.latLonToUTM(Number(this.lat), Number(this.lon));
        this.utmResult = `Zone ${utm.zoneNumber}${utm.zoneLetter}, Easting ${Math.round(utm.easting)}, Northing ${Math.round(utm.northing)}`;
      },
  
      copyLatLon() {
        const text = `${this.lat}, ${this.lon}`;
        navigator.clipboard.writeText(text)
          .then(() => {
            alert(`Copied: ${text}`);
          })
          .catch(err => {
            console.error("Failed to copy", err);
          });
      },
  
      // --- UTM helpers ---
      latLonToUTM(lat, lon) {
        const a = 6378137.0;
        const f = 1 / 298.257223563;
        const b = a * (1 - f);
        const e2 = (a*a - b*b) / (a*a);
        const ep2 = (a*a - b*b) / (b*b);
        const k0 = 0.9996;
  
        const zoneNumber = this.utmZoneNumber(lon, lat);
        const lon0 = ((zoneNumber - 1) * 6 - 180 + 3) * Math.PI / 180.0;
  
        const φ = lat * Math.PI / 180.0;
        const λ = lon * Math.PI / 180.0;
  
        const N = a / Math.sqrt(1 - e2 * Math.sin(φ) * Math.sin(φ));
        const T = Math.tan(φ) * Math.tan(φ);
        const C = ep2 * Math.cos(φ) * Math.cos(φ);
        const A = Math.cos(φ) * (λ - lon0);
  
        const e4 = e2 * e2;
        const e6 = e4 * e2;
        const M = a * (
          (1 - e2/4 - 3*e4/64 - 5*e6/256) * φ
          - (3*e2/8 + 3*e4/32 + 45*e6/1024) * Math.sin(2*φ)
          + (15*e4/256 + 45*e6/1024) * Math.sin(4*φ)
          - (35*e6/3072) * Math.sin(6*φ)
        );
  
        const easting = k0 * N * (
          A + (1 - T + C) * Math.pow(A,3) / 6
            + (5 - 18*T + T*T + 72*C - 58*ep2) * Math.pow(A,5) / 120
        ) + 500000.0;
  
        let northing = k0 * (
          M + N * Math.tan(φ) * (
            A*A/2 + (5 - T + 9*C + 4*C*C) * Math.pow(A,4) / 24
              + (61 - 58*T + T*T + 600*C - 330*ep2) * Math.pow(A,6) / 720
          )
        );
        if (lat < 0) northing += 10000000.0;
  
        return {
          easting,
          northing,
          zoneNumber,
          zoneLetter: this.utmZoneLetter(lat)
        };
      },
  
      utmZoneNumber(lon, lat) {
        let zone = Math.floor((lon + 180) / 6) + 1;
        if (lat >= 56.0 && lat < 64.0 && lon >= 3.0 && lon < 12.0) zone = 32;
        if (lat >= 72.0 && lat < 84.0) {
          if      (lon >= 0.0  && lon <  9.0) zone = 31;
          else if (lon >= 9.0  && lon < 21.0) zone = 33;
          else if (lon >= 21.0 && lon < 33.0) zone = 35;
          else if (lon >= 33.0 && lon < 42.0) zone = 37;
        }
        return zone;
      },
  
      utmZoneLetter(lat) {
        if (lat >= 84) return 'X';
        if (lat < -80) return 'C';
        const letters = 'CDEFGHJKLMNPQRSTUVWX';
        const index = Math.floor((lat + 80) / 8);
        return letters[Math.max(0, Math.min(letters.length - 1, index))];
      }
      // --- end UTM helpers ---
    }
  }
  </script>
  