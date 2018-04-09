<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods:{
    openOnetab(){
      window.open('/screen');
    }
  },
  mounted:function(){
    //window.open('/screen');
  }
}
</script>
<style lang="less">
@import './my-theme/index.less';
</style>

<style lang="less">
body{
  //overflow: hidden;
}
 #app {
  font-family: 'Arial Negreta', 'Arial Normal', 'Arial';
  font-weight: 700;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0,auto;

} 
</style>




