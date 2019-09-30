<template>
 <swiper>
      <swiper-item v-for="item in banners" :key="item.id">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper,SwiperItem} from '@/components/common/swiper'
 export default {
   name:'HomeSwiper',
   props:{
     banners:{
       type:Array,
       default(){
         return []
       }
     }
   },
   data(){
     return{
       isLoad:false
     }
   },
   components: {
     SwiperItem,
     Swiper
   },
   methods: {
     imageLoad(){
      //  console.log('--')
      // 已经发送过的话就不用再发送了，只需要发送一次
      if(!this.isLoad){
      this.$emit('swiperImageLoad')
      this.isLoad=true;
      }
     }
   },
 }
</script>

<style scoped>


</style>
