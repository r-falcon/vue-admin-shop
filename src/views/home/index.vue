<template>
  <div>
    <!-- title -->
    <h1>欢迎！{{name}}这是主页面板</h1>

    <!-- 展示dw区域 -->
    <div class="dw_box">
      <div class="dw_item"><img src="@/assets/index_imgs/dw1.png" alt=""></div>
      <div class="dw_item"><img src="@/assets/index_imgs/dw2.png" alt=""></div>
      <div class="dw_item"><img src="@/assets/index_imgs/dw3.png" alt=""></div>
      <div class="dw_item"><img src="@/assets/index_imgs/dw4.png" alt=""></div>
    </div>

  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data(){
    return{

    }
  },

  computed:{
    ...mapGetters([
      'name'
    ])
  }
  
}
</script>

<style scoped>
  h1{
    text-align: center;
  }

  .dw_box{
    width: 100%;
    height: 120px;
    /* height: 200px; */
    /* background:red; */
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }

  .dw_box .dw_item{
    width: 25%;
    height: 100%;
  }

  .dw_box .dw_item img{
    width: 220px;
    height: 110px;
    display: block;
    margin: 5px auto;
  }
</style>