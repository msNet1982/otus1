<template>
  <q-chip clickable @click="changeCategory" color="primary" text-color="white" size="md" >
    {{ props.category }}
  </q-chip>
</template>

<script setup>

  const props = defineProps(['category'])
  const emit = defineEmits(['changeCategory'])

  const changeCategory = () => {
    emit("changeCategory", props.category)
  }
</script>
