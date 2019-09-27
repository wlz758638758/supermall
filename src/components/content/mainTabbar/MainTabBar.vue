<template>
  <tab-bar>
      <tab-bar-item path="/home" activeColor="#FC869C">
        <img src="@/assets/img/tabbar/home.png" slot="item-icon" alt="">
        <img src="@/assets/img/tabbar/home_active.png" slot="item-icon-active" alt="">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category" activeColor="#FC869C">
          <img src="@/assets/img/tabbar/category.png" slot="item-icon" alt="">
          <img src="@/assets/img/tabbar/category_active.png" slot="item-icon-active" alt="">

        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart" activeColor="#FC869C">
          <img src="@/assets/img/tabbar/cart.png" slot="item-icon" alt="">
          <img src="@/assets/img/tabbar/cart_active.png" slot="item-icon-active" alt="">

        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile" activeColor="#FC869C">
          <img src="@/assets/img/tabbar/profile.png" slot="item-icon" alt="">
          <img src="@/assets/img/tabbar/profile_active.png" slot="item-icon-active" alt="">
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
</template>

  <script>
    import TabBar from '@/components/common/tabbar/TabBar.vue'
    import TabBarItem from '@/components/common/tabbar/TabBarItem.vue'

    export default {
      name: "MainTabBar",
      components: {
        TabBar, TabBarItem
      }
    }
  </script>

<style scoped>

</style>
