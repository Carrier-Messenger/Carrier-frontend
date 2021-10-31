<template>
  <div id="nav">
    <Header/>
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default ({
  components:{
    Header
  }
})
</script>

<style>
body{
  margin: 0;
}

* {
  font-family: Verdana;
}
</style>
