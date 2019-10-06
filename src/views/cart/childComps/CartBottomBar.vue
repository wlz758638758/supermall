<template>
 <div class="bottom-bar">
   <div class="check-content">
     <check-button
        class="check-button"
        :is-checked="isSelectAll"
        @click.native="checkClick"/>
     <span>全选</span>
   </div>

   <div class="price">
     合计:{{totalPrice}}
   </div>
   <div class="calculate" @click="calcClick">去计算：({{checkLength}})</div>
 </div>
</template>

<script>
import CheckButton from '@/components/content/checkButton/CheckButton'

 export default {
   name:'CartBottomBar',
   components: {
     CheckButton
   },
   computed: {
     totalPrice(){
       return '￥'+ this.$store.state.cartList.filter(item => {
         return item.checked
       }).reduce((preValue,item)=>{
         return  preValue + item.price*item.count
       },0).toFixed(2)
     },
     checkLength(){
       return this.$store.state.cartList.filter(item=>item.checked).length
     },
     isSelectAll(){
      //  找下数组里面有没有被选中的 有被选中的就取反
      //  if(this.$store.state.cartList.length===0) return false
      //  return !(this.$store.state.cartList.filter(item=>!item.checked).length)
       if(this.$store.state.cartList.length===0) return false
       return !this.$store.state.cartList.find(item=>!item.checked)
     }
   },
   methods: {
     checkClick(){
       if(this.isSelectAll){
         this.$store.state.cartList.forEach(item => item.checked = false)
       }else{
         this.$store.state.cartList.forEach(item => item.checked = true)
       }
     },
     calcClick(){
       if(!this.isSelectAll){
         this.$toast.show('请选择购买的商品',2000)
       }
     }

   },
 }
</script>

<style scoped>
.bottom-bar{
  width:100%;
  height: 44px;
  background-color: #eee;
  position: fixed;
  bottom: 50px;
  left: 0;
  line-height: 44px;
  display: flex;
  font-size: 14px;
}
.check-content{
  display: flex;
  align-items: center;
  margin-left: 10ox;
}
.check-button{
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}

.price{
  margin-left: 20px;
  flex:1;
}

.calculate{
  width: 90px;
  background-color: orange;
text-align: center;
color: #fff;
}

</style>
