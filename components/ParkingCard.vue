<template>
      <div class="border p-4 mb-2 flex justify-between items-center bg-white shadow-sm rounded-lg">
            <h2 class="font-semibold">{{ item.name }}</h2>
            <span class="font-bold">{{ item.currency }} {{ item.price }}</span>
          </div>
</template>

<script setup lang="ts">
defineProps<{
  item: {
    id: string
    name: string
    price: string
    currency: string
  }
}>();

</script>