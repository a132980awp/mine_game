export default function create_mine(){    //挂载在静态方法上
    let context = this;
    let list = Array(100).fill(0);
    for(let i = 0;i < 10;i++)
        list[i] = 100;//用>=100代表此处有雷

    /**
        洗牌函数，会将list洗成100与0混杂的数组
    */
    function shuffle(list) {  
        let new_arr = list.map(i => ({v: i, r: Math.random()}));
        new_arr.sort((a, b) => a.r - b.r);
        list.splice(0, list.length, ...new_arr.map(i => i.v));
    };

    /**
        返回i下标周围8个方格的下标数组
    */
    function near_8(i){
        var i_z = parseInt(i/10);   //十位，代表行
        var i_l = i%10;             //个位，代表列
        var nums = [];
        for(var i=-1;i<2;i++){
            for(var j=-1;j<2;j++){
                if(0<=i_z+i&&i_z+i<=9&&0<=i_l+j&&i_l+j<=9){ //不能超过10x10
                    nums.push((i_z+i)*10+i_l+j);
                }
            }
        }
        return nums;
    }

    /**
        生成数字，会将混杂的数组处理成我们常见的扫雷数字，其中雷>=100表示
    */
    function create_num(list){
        list.forEach((i,index) => {
            if(i>=100){
                near_8.call(context,index).forEach(j =>{
                    list[j]+=1;
                });
            }
        });
    };

    shuffle.call(context,list);
    create_num.call(context,list);
    return list;
};





