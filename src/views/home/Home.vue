<template>
 <div id="home">
   <nav-bar class="home-nav">
     <div slot="center">购物街</div>
   </nav-bar>

  <scroll class="wrapper"
          ref="scroll"
          :probe-type="3"
          :pull-up-load="true"
          @scroll="contentScroll"
          @pullingUp="loadMore"
         >
   <!-- 轮播图 -->
    <home-swiper :banners="banners" />
   <!-- 热点推荐 -->
    <recommend-view :recommends="recommends"/>
   <!-- 本周流行 -->
    <feature-view />
    <!-- 选项卡 -->
    <tab-control
          class="tab-control"
          :titles="['流行','新款','精选']"
          @tabClick="tabClick"
          ref="tabControl"/>
    <goods-list :goods="showGoods"/>
  </scroll>
  <!-- 回到顶部箭头 .native修饰符可以监听组件的原生事件 -->
  <back-top @click.native="backClick" v-show="isShowBackTop"/>
 </div>
</template>

<script>
import Scroll from '@/components/common/scroll/Scroll'
import NavBar from '@/components/common/navbar/NavBar'
import TabControl from '@/components/content/tabControl/TabControl'
import GoodsList from '@/components/content/goods/GoodsList'
import BackTop from '@/components/content/backTop/BackTop'

import {getHomeMultidata,getHomeGoods} from '@/network/home'
import {debounce} from '@/common/utils'

import HomeSwiper from './childrenComps/HomeSwiper'
import RecommendView from './childrenComps/RecommendView'
import FeatureView from './childrenComps/FeatureView'

 export default {
   name:'Home',
   components: {
     HomeSwiper,
     RecommendView,
     FeatureView,
     NavBar,
     TabControl,
     GoodsList,
     Scroll,
     BackTop
   },
   data(){
     return {
       banners:[],
       recommends:[],
      //  商品列表的数据模型设计
       goods:{
         'pop':{page:0,list:[]},
         'new':{page:0,list:[]},
         'sell':{page:0,list:[]},
       },
      //  当前的默认类型为pop
       currentType:'pop',
       isShowBackTop:false,
       tabOffsetTop:0
     }
   },
   computed: {
     showGoods(){
       return this.goods[this.currentType].list
     }
   },
   created(){
     //1.请求多个数据
      this.getHomeMultidata();
     //2.请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');

   },
   mounted () {
    //  1.图片加载完成的事件监听
     const refresh=debounce(this.$refs.scroll.refresh,50)
      //3.监听item中的图片加载完成
      //事件总线
      this.$bus.$on('itemImageLoad',()=>{
      // console.log('-----')
      // this.$refs.scroll.refresh()
      refresh()
      })

      // 2.获取tabControl的offsetTop
      //   所有的组件都拥有一个属性$el,用于获取组件中的元素
      console.log(this.$refs.tabControl.$el.offsetTop)
   },
   methods: {
     /**
      * 事件监听相关的方法
      */


      // 根据点击的index值，设置商品列表的pop，new，sell
      tabClick(index){
        switch(index){
          case 0:
            this.currentType='pop';
            break;
          case 1:
              this.currentType='new';
              break;
          case 2:
              this.currentType='sell';
              break;
        }
      },
      backClick(){
        console.log('backClick')
        this.$refs.scroll.scrollTo(0,0,500)
      },
      contentScroll(position){
        // console.log(position);
        this.isShowBackTop= -position.y>1000;
      },

      loadMore(){
        console.log('加载更多')
        this.getHomeGoods(this.currentType)
      },

     /**
      * 网络请求相关的方法
      */
        getHomeMultidata(){
        getHomeMultidata().then(res=>{
      //  console.log(res);
      //  保存数据
       this.banners=res.data.banner.list;
       this.recommends=res.data.recommend.list;
      })
     },
        getHomeGoods(type){
          // 设置页码
          const page=this.goods[type].page+1;
          // 传递type和页码
          getHomeGoods(type,page).then(res=>{
            // console.log(res);
            // 将list的数据保存起来。保存起来的同时页码也需要+1
            // console.log(res.data)
            // console.log(res.data.list)
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;

          //完成上拉加载更多
          this.$refs.scroll.finishPullUp();


      })
     }
   },
 }
</script>

<style>
#home{
  /* padding-top: 44px; */
  height: 100vh;
  /* position: relative; */
}
.home-nav{
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
/* .tab-control{
  position: sticky;
  top: 42px;
  z-index:9
} */
 .wrapper{
   /* height: cale(100%-93px); */
   /* margin-top: 44px; */
   /* height: 300px; */
   /* overflow: hidden; */

   position: absolute;
   top: 44px;
   bottom: 49px;
   left: 0;
   right: 0;
 }
</style>
