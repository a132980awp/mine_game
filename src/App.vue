<template>
  <div id="app">
    <my_header :boom="1"></my_header>
    <my_content></my_content>
    <!--
        <div>
          <div v-for="i in 10" class="info-bar">
            <div v-for="j in 10" class="button-list">
              <button :class="{buttonItem:box_hit[(i-1)*10+j-1],buttonItemH:!box_hit[(i-1)*10+j-1],
                bslanbox:box_blan[(i-1)*10+j-1]}"
                      :disabled = "!box_hit[(i-1)*10+j-1]"
                      @click = "button_hit(((i - 1) * 10 + j - 1))">
                <p v-if="!box_hit[(i-1)*10+j-1]" style="color:white;">
                  {{box[(i-1)*10+j-1]}}
                </p>
              </button>
            </div>
          </div>
        </div>
        <div style="text-align: center;">
          <button class="blan" @click="is_blan=!is_blan">
            <p v-if="is_blan" style="color:gold;">标雷</p>
            <p v-else>标雷</p>
          </button>
          <button class="blan" @click="restart()">重新开始</button>
        </div>
        -->
  </div>
</template>

<script>
  import my_header from "./components/my_header.vue";
  import my_content from "./components/my_content.vue";
  export default {
    name: 'app',
    data(){
      var box = new Array(100);
      var box_hit = new Array(100);
      var box_blan = new Array(100);
      return{
        boom : 10,
        time : 0,
        box,
        box_hit,
        is_blan : false,
        box_blan
      }
    },
    components:{
      my_header,
      my_content
    },
    methods:{
      button_hit(s){
        if( this.is_blan ){
          this.box_blan.splice(s,1,!this.box_blan[s]);
          if(this.box_blan[s])
            this.boom -= 1;
          else
            this.boom += 1;
          return;
        }
        if(this.box_blan[s])
          return;

        console.log(s);
        this.box_hit.splice(s,1,0);
        if(this.box[s]>100) {
          this.box[s] = 'X';
          alert("game over!!!");
          this.restart();
          return;
        }
        if(this.game_over()){
          alert('you win!!!');
          this.restart();
          return;
        }
        if(this.box[s]==0) {
          console.log(this.ninel(s));
          for (var itm of this.ninel(s)) {

            if (this.box_hit[itm] != 0)
             this.button_hit(itm);
          }
        }
      },
      restart(){
          this.boom = 10;
          this.time = 0;
          this.is_blan = false;
          for(var i = 0;i < this.box.length; i++){
              if(i<10)
                this.box[i] = 100;
              else
                this.box[i] = 0;
              this.box_hit[i] = 1;
              this.box_blan[i] = false;
          }
          this.shuffle(this.box);
          console.log(this.box);
          //生成数字
          
          for(var i = 0; i < this.box.length; i++){
              if(this.box[i]<100)
                continue;
              for(var k of this.ninel(i))
                this.box[k] += 1;
            }

      },
      ninel(i){
        var i_z = parseInt(i/10);
        var i_l = i%10;
        var bij = [];
        for(var i=-1;i<2;i++){
          for(var j=-1;j<2;j++){
            if(0<=i_z+i&&i_z+i<=9&&0<=i_l+j&&i_l+j<=9){
              bij.push((i_z+i)*10+i_l+j);
            }
          }
        }
        return bij;
      },
      game_over(){
        let hitts = 0;
        for(let i = 0; i < this.box_hit.length; i++){
          if(this.box_hit[i]){
            hitts += 1;
          }
        }
        if(hitts <= 10){
          return true;
        }
        return false;
      },
      shuffle(arr) {
        let new_arr = arr.map(i => ({v: i, r: Math.random()}));
        new_arr.sort((a, b) => a.r - b.r);
        arr.splice(0, arr.length, ...new_arr.map(i => i.v));
      }
    },
    created() {
      this.restart();
    }
  }
</script>

<style>
  #app{
    max-width: 400px;
    background: linear-gradient(to right bottom,#fa03b0,#fc000d);
    border-radius: 6px;
  }

</style>