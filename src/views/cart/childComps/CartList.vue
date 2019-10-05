<template>
 <div class="cart-list">
   <scroll class="content" ref="scroll">
     <cart-list-item
        v-for="(item,index) in cartList"
        :item-info="item"
        :key="index"/>
   </scroll>
 </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Scroll from '@/components/common/scroll/Scroll';
import CartListItem from './CartListItem';
 export default {
   name:'CartList',
   components: {
     Scroll,
     CartListItem
   },
   computed: {
     ...mapGetters(['cartList'])

   },
   activated () {
     this.$refs.scroll.refresh();
   }
 }
</script>

<style scoped>

.content{
  height: cale(100%-44px-49px-40px);
}

</style>
