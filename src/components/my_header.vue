<template>
    <div class=info-bar>
        <div class="info-bar-item">剩余雷数：{{boom}}</div>
        <div class="info-bar-item">时间：{{time}}</div>
    </div>
</template>

<script>
    export default{
        name:"my_header",
        props:{
            boom: {
                type: Number,
                default: 10
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
.info-bar{
    display:flex;
    align-items: center;
    height: 60px;
}
.info-bar-item{
    font-size: 20px;
    font-weight: 600;
    color: rgb(182, 179, 179);
    flex:1;
    text-align: center;
}
</style>