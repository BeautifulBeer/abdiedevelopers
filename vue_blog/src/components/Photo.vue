<template>
  <div>
    <AnimateWhenVisible name="bounce" :updatedFlag="updatedFlag">
      <h3>Photo</h3>
      <div class="person">
        <a @click.prevent="isModalVisible = true" class="me-photo">
          <img :src="src" alt="Personal Photo"/>
        </a>
      </div>
    </AnimateWhenVisible>

    <ModalView v-if="isModalVisible" @close="isModalVisible = false">
      <img :src="src" alt="Personal Photo"/>
    </ModalView>
  </div>
</template>

<script>
import ModalView from './ModalView'

  export default {
    name: 'Photo',
    components: {
      ModalView
    },
    props: ['src', 'updatedFlag'],
    data: () => ({
      isModalVisible: false
    })
  }
</script>

<style scoped lang="scss">
.person {

  a:focus {
    outline: none;
  }

  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    display: inline-block;
  }
}

img {
  max-width: 100%;
}
</style>
