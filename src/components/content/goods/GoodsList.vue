<template>
 <div class="goods">
   <goods-list-item v-for="(item,index) in goods" :goods-item="item" :key="index"/>
 </div>
</template>

<script>
import GoodsListItem from './GoodsListItem';
 export default {
   name:'GoodsList',
   props:{
     goods:{
       type:Array,
       defalut(){
         return []
       }
     }
   },
   components: {
     GoodsListItem
   }
 }
</script>

<style scoped>
.goods{
  display: flex;
  flex-wrap: wrap;
  /* 均等分 */
  justify-content: space-around;
  padding: 2px;
}

</style>
