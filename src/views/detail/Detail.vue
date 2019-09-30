<template>
<div id="detail">
  <detail-nav-bar />
  <detail-swiper :top-images="topImages"/>
</div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import {getDetail} from '@/network/detail'
import DetailSwiper from './childComps/DetailSwiper';
 export default {
   name:'Detail',
   data () {
     return {
       iid:null,
       topImages:[]
     }
   },
   components: {
     DetailNavBar,
     DetailSwiper
   },
   created () {
    //  1.保存我们传入的iid
     this.iid=this.$route.params.iid
    // 2.根据iid请求详细数据
    getDetail(this.iid).then(res=>{
      console.log(res);
      //2.1获取顶部的图片轮播数据
      this.topImages=res.result.itemInfo.topImages
    })
   }
 }
</script>

<style scoped>


</style>
