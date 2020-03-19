<template>
    <div class=info-bar>
        <div @click="restart" class="info-bar-item">restart</div>
        <div class="info-bar-item">记录：{{time|time_format}}</div>
    </div>
</template>

<script>
    export default{
        name:"my_footer",
        data(){
            return{
                time : 3599
            }
        },
        methods:{
            restart(){
                this.$emit("restart");
            },
            change_record(index){
                if(this.time>index)
                    this.time = index;
            }
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
    cursor: default;
}
</style>