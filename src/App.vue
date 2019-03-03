<template>
  <div id="app">
    <div id="container">
      <Board />
    </div>
  </div>
</template>

<script>
import Board from './components/Board.vue';

export default {
  name:'App',
  components: {Board}
}
</script>
