<template>
<div id="detail">
  <detail-nav-bar  class="detail-nav" @titleClick="titleClick" ref="nav"/>
  <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
    <!-- <div>{{$store.state.cartList.length}}</div> -->
    <!-- <ul>
      <li v-for="item in $store.state.cartList">
        {{item}}
      </li>
    </ul> -->
    <detail-swiper :top-images="topImages"/>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"/>
    <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
    <detail-param-info ref="params" :param-info="paramInfo" />
    <detail-comment-info ref="comment" :comment-info="commentInfo" />
    <goods-list ref="recommend" :goods="recommends"/>
  </scroll>
  <back-top @click.native="backClick" v-show="isShowBackTop"/>
  <detail-bottom-bar  @addCart="addToCart"/>
  <!-- <toast :message="message" :show="show"/> -->

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
import DetailBottomBar from './childComps/DetailBottomBar'
import GoodsList from '@/components/content/goods/GoodsList'



import {debounce} from '@/common/utils'
import {itemListenerMixin,backTopMixin} from '@/common/mixin'
import {mapActions} from 'vuex'

import Scroll from '@/components/common/scroll/Scroll'
// import Toast from '@/components/common/toast/Toast'
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
       commentInfo:{},
       recommends:[],
       themeTopYs:[],
       getThemeTopY:null,
       currentIndex:0,
      //  message:'',
      //  show:false
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
     DetailCommentInfo,
     DetailBottomBar,
     GoodsList,
    //  Toast
   },
   mixins:[itemListenerMixin,backTopMixin],
   created () {
    //  1.保存我们传入的iid
     this.iid=this.$route.params.iid
    // 2.根据iid请求详细数据
    getDetail(this.iid).then(res=>{
      console.log(res);
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
      if(data.rate.cRate!=0){
        this.commentInfo=data.rate.list[0];
      }

      // this.$nextTick(()=>{
      //   // 根据最新的数据，对应的dom已经被渲染出来
      //   // 但是图片依旧没有渲染完，获取的offsetTop不包含其中的图片
      //     // this.themeTopYs.push(0);
      //     // //  this.themeTopYs.push(参数的offsetTop);
      //     // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //     // //  this.themeTopYs.push(评论的offsetTop);
      //     // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //     // //  this.themeTopYs.push(推荐的offsetTop);
      //     // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      //     // console.log(this.themeTopYs)
      // })

    }),
    // 3.请求推荐数据
    getRecommend().then(res=>{
      this.recommends=res.data.list
    }),

    // 4.给getThemeTopY赋值(对this.themeTopYs赋值操作进行防抖)
    this.getThemeTopY=debounce(()=>{
          this.themeTopYs=[]
          this.themeTopYs.push(0);
          //  this.themeTopYs.push(参数的offsetTop);
          this.themeTopYs.push(this.$refs.params.$el.offsetTop);
          //  this.themeTopYs.push(评论的offsetTop);
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
          //  this.themeTopYs.push(推荐的offsetTop);
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
          this.themeTopYs.push(Number.MAX_VALUE)
          console.log(this.themeTopYs);
    },100)

   },
   methods: {
     ...mapActions(['addCart']),
     imageLoad(){
       this.$refs.scroll.refresh();
       this.getThemeTopY()
     },
     titleClick(index){
       console.log(index)
       this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
     },

     contentScroll(position){
      //  console.log(position)
      // 1.获取y值
      const positionY = -position.y
      // 2.positionY和主题中的值进行对比
      let length=this.themeTopYs.length
      for(let i=0;i<length-1;i++){
        // console.log(i) //str
        // if(positionY>this.themeTopYs[i] && positionY<this.themeTopYs[i+1]){
        //   console.log(i)
        // }

        // 常规做法：
        // if(this.currentIndex!==i&&((i<length-1 && positionY>=this.themeTopYs[i] && positionY<this.themeTopYs[i+1]) ||
        // (i===length-1 && positionY>=this.themeTopYs[i]))){
        //   this.currentIndex=i;
        //   console.log(this.currentIndex)
        //   this.$refs.nav.currentIndex=this.currentIndex;
        // }
        // hack做法:
        if(this.currentIndex!==i &&
        (positionY>this.themeTopYs[i] && positionY<this.themeTopYs[i+1])){
            this.currentIndex=i;
            console.log(this.currentIndex)
            this.$refs.nav.currentIndex=this.currentIndex;
        }
      }
        this.isShowBackTop= -position.y>1000;
     },
     addToCart(){
      //  1.获取购物车需要展示的信息
      const product={}
      product.img=this.topImages[0];
      product.title=this.goods.title;
      product.desc=this.goods.desc;
      product.price=this.goods.realPrice;
      product.iid=this.iid;

      // console.log(product)
      // 2.将商品添加到购物车里
      // this.$store.cartList.push(product)
      // 在mutations里使用commit调用
      // this.$store.commit('addCart',product)
      // 在actions里使用dispatch调用
      // this.$store.dispatch('addCart',product).then(res=>{
      //   console.log(res);
      // })

      this.addCart(product).then(res=>{
        // this.show=true;
        // this.message=res;

        // setTimeout(() => {
        //   this.show=false;
        //   this.message='';
        // }, 1500);

        console.log(this.$toast)
        this.$toast.show(res,2000)
      })

      // 3.添加到购物车成功

     }
   },
  //  updated() {
  //    this.themeTopYs=[]
  //      this.themeTopYs.push(0);
  //   //  this.themeTopYs.push(参数的offsetTop);
  //    this.themeTopYs.push(this.$refs.params.$el.offsetTop);
  //   //  this.themeTopYs.push(评论的offsetTop);
  //    this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
  //   //  this.themeTopYs.push(推荐的offsetTop);
  //    this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
  //    console.log(this.themeTopYs)
  //  },
   mounted () {
   },
   destroyed () {
    //  console.log('deaccc')
     this.$bus.$off('itemImgLoad',this.itemImgListener)

   }
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
  height: calc(100%-93px);
}

</style>
