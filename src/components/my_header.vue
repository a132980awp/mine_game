<template>
    <div class=info-bar>
        <div class="info-bar-item">剩余雷数：{{boom}}</div>
        <div class="info-bar-item">时间：{{time|time_format}}</div>
    </div>
</template>

<script>
    export default{
        name:"my_header",
        props:{
            boom: {
                type: Number,
                default: 10
            }
        },
        data(){
            return{
                time : 0,
                timer : null
            }
        },
        mounted(){
            this.timer = setInterval(()=>{
                this.time += 1;
            },1000)
        },
        destoryed(){
            clearInterval(this.timer);
        },
        filters:{
            time_format(second){
                let mins = parseInt(second/60)%60;
                let sec = second%60;
                if(mins<10)
                    mins = '0' + mins;
                if(sec<10)
                    sec = '0' + sec;
                return mins + ':' + sec;
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