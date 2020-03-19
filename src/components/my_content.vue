<template>
    <div class="boom-list">
        <div v-for="i in 100" class="boom-items"  @click="hit(i-1)">
            <div :class="{shadow:true,hidden:list_state[i-1]}"></div>
            <div :class="{hidden:list_state[i-1]}">{{list[i-1]}}</div>
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
                list_state: Array(100).fill(false)
            }
        },
        methods:{
            hit(index){
                if(this.list_state[index])
                    return;
                this.list_state.splice(index,1,true);
                console.log(index);
            },
            restart(){
                this.list = create_mine();
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
</style>