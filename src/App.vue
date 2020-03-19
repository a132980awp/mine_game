<template>
  <div id="app">
    <div class="bg"></div>
    <my_header ref="head" :boom="boom_nums"></my_header>
    <my_content ref="content" @change_mine_nums="change_mine_nums" @reset_time="reset_time" @change_record="change_record"></my_content>
    <my_footer ref="foot" @restart="restart"></my_footer>
  </div>
</template>

<script>
  import my_header from "./components/my_header.vue";
  import my_content from "./components/my_content.vue";
  import my_footer from "./components/my_footer.vue";
  export default {
    name: 'app',
    data(){
      return{
        boom_nums : 10
      }
    },
    components:{
      my_header,
      my_content,
      my_footer
    },
    methods:{
      change_mine_nums(nums){
        this.boom_nums = nums;
      },
      reset_time(){
        this.$refs.head.reset();
      },
      restart(){
        this.$refs.content.restart();
      },
      change_record(nums){
        let recode = this.$refs.head.time;
        this.$refs.foot.change_record(recode);
      }
    }
  }
</script>

<style>
  #app{
    max-width: 400px;
    min-height: 500px;
    position: relative;
    border-radius: 6px;
    overflow: hidden;
  }

  .bg{
    position: absolute;
    width: 200%;
    height: 100%;
    background: linear-gradient(to right,#fa03b0,#4b0303,blue);
    animation: color_change linear infinite 7s;
    z-index: -1;
  }

  .btn{
    width: 50px;
    height: 60px;
    font-size: 20px;
    font-weight: 600;
    color: rgb(182, 179, 179);
  }

  @keyframes color_change {
    0%{
      left: 0;
    }
    50%{
      left: -100%;
    }
    100%{
      left: 0;
    }
  }

 
</style>