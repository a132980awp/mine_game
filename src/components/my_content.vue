<template>
    <div class="boom-list">
        <div v-for="i in 100" class="boom-items">
            <div class="shadow"></div>
            <div>{{list[i]}}</div>
        </div>
        </div>
    </div>
</template>

<script>
    export default{
        name:"my_content",
        props:{
            list: {
                type: Array,
                default: ()=>{return Array(130).fill(0)}
            },
            time: {
                type: Number,
                default: 10
            }
        },
        data(){
            return{
                
            }
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
</style>