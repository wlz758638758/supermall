<template>
  <div class="wrapper" ref="wrapper">
     <div class="content">
     <slot></slot>
   </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

	export default {
    name: "Scroll",
    props: {
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad:{
        type:Boolean,
        default:false
      }

    },
    data() {
		  return {
        scroll: null,
        message:'hahaha'
      }
    },
    mounted() {
      //1.创建BScroll对象
		  this.scroll=new BScroll(this.$refs.wrapper,{
        click:true,
        probeType:this.probeType,
        pullUpLoad:this.pullUpLoad
     })

      //2.监听滚动的位置
      this.scroll.on('scroll',(position)=>{
        // console.log(position);
        this.$emit('scroll',position)
      })

      //3.监听scroll滚到底部
      if(this.pullUpLoad){
        this.scroll.on('pullingUp',()=>{
          // console.log('上拉到底部')
          this.$emit('pullingUp')
        })
      }
    },
		components:{
			BScroll
    },
    methods: {
      scrollTo(x,y,time=300){
        this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x,y,time)
      },
      finishPullUp(){
        this.scroll.finishPullUp()
      },
      refresh(){
        this.scroll && this.scroll.refresh()
        // console.log('----')
      },
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp()
      }
    },
	}
</script>

<style scoped>

</style>
