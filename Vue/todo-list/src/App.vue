<template>
  <div id="app" class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-4">
        <Todo />
      </div>
    </div>
  </div>
</template>

<script>
import Todo from './components/Todo.vue'

export default {
  name: 'app',
  components: {
      Todo
  }
}
</script>
