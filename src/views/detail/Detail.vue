<template>
<div id="detail">
  <detail-nav-bar  class="detail-nav"/>
  <scroll class="content" ref="scroll">
    <detail-swiper :top-images="topImages"/>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"/>
    <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
    <detail-param-info :param-info="paramInfo" />
    <detail-comment-info :comment-info="commentInfo" />
  </scroll>

</div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from '@/network/detail'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'


import Scroll from '@/components/common/scroll/Scroll'
 export default {
   name:'Detail',
   data () {
     return {
       iid:null,
       topImages:[],
       goods:{},
       shop:{},
       detailInfo:{},
       paramInfo:{},
       commentInfo:{}
     }
   },
   components: {
     DetailNavBar,
     DetailSwiper,
     DetailBaseInfo,
     DetailShopInfo,
     Scroll,
     DetailGoodsInfo,
     DetailParamInfo,
     DetailCommentInfo
   },
   created () {
    //  1.保存我们传入的iid
     this.iid=this.$route.params.iid
    // 2.根据iid请求详细数据
    getDetail(this.iid).then(res=>{
      // console.log(res);
      const data=res.result
      //2.1获取顶部的图片轮播数据
      this.topImages=data.itemInfo.topImages

      //2.2获取商品信息
      this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      // console.log(this.goods)

      //2.3创建店铺信息对象
      this.shop=new Shop(data.shopInfo)
      console.log(this.shop)

      //2.4保存商品的详情数据
      this.detailInfo=data.detailInfo

      //2.5保存商品的参数信息
      this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)

      //2.6保存评论信息
      if(data.rate.list){
        this.commentInfo=data.rate.list[0];
      }

    })
   },
   methods: {
     imageLoad(){
       this.$refs.scroll.refresh();
     },
   },
 }
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav{
  position: relative;
  background-color: #fff;
}

.content{
  height: calc(100%-44px);
}

</style>
