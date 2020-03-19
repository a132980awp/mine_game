<template>
    <div class="boom-list">
        <div v-for="i in 100" class="boom-items"  @click="hit(i-1)" @contextmenu.prevent="mine_flag(i-1)">
            <div :class="{flag:true,hidden:!is_flag[i-1]}"></div>
            <div :class="{shadow:true,hidden:list_state[i-1]}"></div>
            <div v-show="list[i-1]" :class="{hidden:!list_state[i-1]}">{{list[i-1]}}</div>
        </div>
        </div>
    </div>
</template>

<script>
    import create_mine from "../assets/create_mine.js"
    export default{
        name:"my_content",
        data(){
            return{
                list: Array(100).fill(0),
                list_state: Array(100).fill(false),
                is_flag: Array(100).fill(false)
            }
        },
        computed:{
            flag_nums(){
                let i = 0;
                this.is_flag.forEach(con=>{
                    if(con)
                        i++;
                });
                return i;
            }
        },
        methods:{
            hit(index){
                if(this.list_state[index])
                    return;
                this.is_flag.splice(index,1,false);
                this.list_state.splice(index,1,true);
                this.$emit('change_mine_nums',10-this.flag_nums);
                if(this.is_game_over()==-1){
                    if(this.list[index]==0){
                        let others = create_mine.near_8(index);
                        others.forEach(i => {
                            if(!this.list_state[i])
                                this.hit(i);
                        });
                    }
                    return;
                }
                if(this.is_game_over()==1)
                    alert("游戏结束");
                if(this.is_game_over()==2){
                    this.$emit("change_record");
                    alert("游戏获胜");
                }
                this.restart();
            },
            restart(){
                this.list = create_mine();
                this.list_state = Array(100).fill(false);
                this.is_flag = Array(100).fill(false);
                this.$emit('change_mine_nums',10-this.flag_nums);
                this.$emit('reset_time');
            },
            is_game_over(){ //是否游戏结束
                let hits = 0;
                for(let i=0;i<100;i++){
                    if(this.list_state[i]){
                        if(this.list[i]<100)
                            hits++;
                        else
                            return 1;
                    }
                }
                console.log(hits);
                if(hits>=90)
                    return 2;
                else
                    return -1;
            },
            mine_flag(index){
                if(this.list_state[index])
                    return;    
                this.is_flag.splice(index,1,!this.is_flag[index]); 
                this.$emit('change_mine_nums',10-this.flag_nums);
                console.log(this.flag_nums);
            }
        },
        mounted(){
            this.restart();
        }
    }
</script>

<style scoped> 
.boom-list{
    display: grid;
    grid-template-columns: repeat(10,1fr);
    min-width: 360px;
    padding: 0px 20px;
}
.boom-items{
    position: relative;
    height: 34px;
    width: 34px;
    border: 1px solid red;
    background: rgb(240, 162, 175);
    display: flex;
	justify-content:center;
	align-items:center;
}

.shadow{
    position: absolute;
    height: 35px;
    width: 35px;
    background-color: rgba(0,0,0,0.3);
    opacity: 0.5;
}
.boom-items .shadow:hover{
    opacity: 0;
}
.hidden{
    visibility: hidden;
}

/*用CSS画一个雷出来，不用icon库*/
.flag{
    position: absolute;
    left: 3px;
    top: 3px;
    width: 0px;
    height: 0px;
    border-right:9px solid red;
    border-left:9px solid  transparent;
    border-top:9px solid  transparent;
    border-bottom: 9px solid transparent;
    z-index: 1;
}
.flag::before{
    content:"";
    display: block;
    position: relative;
    top: 15px;
    width: 12px;
    height: 2px;
    background: red;
}
.flag::after{
    content:"";
    display: block;
    position: relative;
    left: 7px;
    width: 2px;
    height: 12px;
    background: red;
}

@media(max-width: 399px) {
    .boom-list{
        min-width: 300px;
        padding: 0 15px;
    }

    .boom-items{
        height: 28px;
        width: 28px;
    }
}
</style>