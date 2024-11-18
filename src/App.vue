<template>
  {{ test }}
  <div class="text-center" v-if="isPending">
    <q-spinner
      color="primary"
      size="3em"
    />
    <br />
    Loading...
  </div>
  <div class="row wrap justify-center" v-else>
    <div>
      <Categories category="all" @click="allCategory">all</Categories>
    </div>
    <div v-for="category in categories" :key="category">
      <Categories :category="category" @changeCategory="changeCategory"/>
    </div>
    <div class="text-h5 cat">
      Current category: {{ currentCategory }}
    </div>
    <div class="q-pa-md row justify-around items-stretch q-gutter-sm">
      <div v-for="product in productsFiltred" :key="product.id" class="q-mb-md">
        <Product :product_info="product" />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue'
  import Categories from './components/Categories.vue'
  import Product from './components/Product.vue'
  import { useGetProducts } from './composables'

  const categories = ref([])
  const productsFiltred = ref([])
  const currentCategory = ref("all")

  const { data: products, isPending } = useGetProducts()

  watch(isPending, () => {
    categories.value = [...new Set(products.value.map(item => item.category))]
    productsFiltred.value = products.value
  })

  const changeCategory = (category) => {
    currentCategory.value = category
    productsFiltred.value = products.value.filter(item => item.category == category)
  }

  const allCategory = () => {
    productsFiltred.value = products.value
    currentCategory.value = "all"
  }
</script>

<style scoped>
.cat {
  width: 100%;
}
</style>
