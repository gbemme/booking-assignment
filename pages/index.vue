<template>
  <div>
    <div class="bg-blue-700 w-full pb-24">
      <div class="container mx-auto text-white text-2xl py-6 font-bold mb-4">
        Shiphol NL Parking
      </div>

      <div
        class="bg-gray-100 container mx-auto p-4 rounded-lg mb-4 md:flex items-center justify-between"
      >
        <div>
          <label class="block text-sm font-medium">From</label>
          <input
            type="date"
            v-model="arrivalDate"
            class="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label class="block text-sm font-medium">To</label>
          <input
            type="date"
            v-model="departureDate"
            class="border p-2 rounded w-full"
          />
        </div>
        <button
          class="bg-blue-500 text-white mt-4 lg:mt-0 flex justify-end px-4 py-2 rounded hover:bg-blue-700"
          @click="searchParkings"
          :disabled="loading"
        >
          Search parkings
        </button>
      </div>
    </div>
    <div class="container mx-auto p-4 pt-12">
      <LoaderComponent v-if="loading" />
      <div class="text-2xl font-bold my-10" v-else-if="!results.length">
        No Parking Space available!!
      </div>

      <div v-else-if="error" class="text-red-500">Failed to load data</div>
      <div v-else>
        <div v-for="item in results" :key="item.name" class="">
          <ParkingCard :item="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

const formatDate = (date: Date) => date.toISOString().split("T")[0];

const arrivalDate = ref(formatDate(today));
const departureDate = ref(formatDate(tomorrow));

const results = ref([]);
const loading = ref(false);
const error = ref(false);
const lang = ref('en')

const variant = lang.value === 'nl' ? "A" : "B";


const sortOptions = variant === "A"
  ? { sort_f: "price", sort_w: "asc" }  
  : { sort_f: "distance", sort_w: "asc" };  


const searchParkings = async () => {
  loading.value = false;
  error.value = false;

  try {
    const { data } = await useFetch("/api/search", {
      query: {
        location: "parkeren-schiphol",
        arrival: arrivalDate.value,
        arrivalTime: "12:00",
        departure: departureDate.value,
        departureTime: "12:00",
        ...sortOptions
      },
    });

    if (data.value && data.value.available) {
      results.value = Object.values(data.value.available).map((parking) => ({
        name: parking.merchant.name,
        price: parking.price,
        currency: parking.currency,
      }));
    } else {
      results.value = [];
    }
  } catch (err) {
    error.value = true;
  } finally {
    loading.value = false;
  }
};


searchParkings();
</script>
<style>
.container {
  max-width: 800px;
  margin: auto;
}
</style>
