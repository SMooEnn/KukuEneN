
class Swiper{
    constructor(){
        this.olLiClick();
        this.setClick();
        this.autoPlay();
        this.pause();
    }
    static $$(ele){
        let res=document.querySelectorAll(ele);
        if(res.length==1)return res[0];
        else return res;
    }
    //获取元素
    ulLi=Swiper.$$('.swiper ul>li');
    olLi=Swiper.$$('.swiper ol>li');
    nextBtn=Swiper.$$('#next');
    previousBtn=Swiper.$$('#previous');
    ul=Swiper.$$('.swiper ul');
    //当前要出来的图片
    index=0;
    //上一张图片
    lastIndex=0;
    timer=null;
    //给Ol绑定点击事件实现轮播
    setClick(){
        this.nextBtn.onclick=()=>{
            this.lastIndex=this.index;
            ++this.index;
            if(this.index>this.ulLi.length-1)this.index=0;
            this.change();
        };
        this.previousBtn.onclick=()=>{
            this.lastIndex=this.index;
            --this.index;
            if(this.index<0)this.index=this.ulLi.length-1
            this.change();
        };
    };
    olLiClick(){
        this.olLi.forEach((val,key)=>{
           val.onclick=()=>{
            this.lastIndex=this.index;
            this.index=key;
            this.change();
            
           };
        });
        // console.log(this.nextBtn,this.previousBtn);
        
    }
    autoPlay(){
        this.timer=setInterval(()=>{
            this.nextBtn.onclick();
        },3000);
    }



    change(){
       this.olLi[this.lastIndex].className='';
       this.ulLi[this.lastIndex].className='';
        
       this.olLi[this.index].className='olAc';
       this.ulLi[this.index].className='ulAc';
    }
    pause(){
        // console.log(this.ul);
        this.ul.onmouseenter=()=>{
            clearInterval(this.timer);
        };
        this.ul.onmouseleave=()=>{
            this.autoPlay();
        }
    }
}






class List{
    baseUrl='http://localhost:3000/goodLists';
    cartUrl='http://localhost:3000/cartList';
    static $$(ele){
        let res=document.querySelectorAll(ele);
        if(res.length==1)return res[0];
        else return res;
    }
    constructor(){
   
        this.load();
        this.getData(this.currentPage);
        this.listBox.addEventListener('click',this.heart.bind(this))
       
    }
    count=0;
   async heart(event){
       let target=event.target;
       if(target.classList[1]=='heartk'){
           this.count++;
        //console.log(this.count);
           if(this.count%2){
            target.innerHTML='&#xe8c3;'
           }
           else{
            target.innerHTML='&#xe8ab;'
           } 
       }
       if(target.classList[1]=='cart'){
            let goodsId=target.parentNode.parentNode.parentNode.dataset.id;
          let{data,status}= await axios.get(`${this.baseUrl}?id=${goodsId}`)
          if(status==200){
            // console.log(data[0].img);
            axios.post(this.cartUrl, {
                img:data[0].img,
                name:data[0].name,
                price:data[0].price,
                color:data[0].color,
                materials:data[0].materials,
                amount:data[0].amount,
                number:data[0].number
              })

          }
          
       }
       

   }

   limit=3;
   html='';
   currentPage=1;
    listBox=List.$$('.list');
    price=List.$$('#priceH');
    loading=List.$$('#loading');
     async getData(page){
        let {data,status}=await axios.get(`${this.baseUrl}?_page=${page}&_limit=${this.limit}`);
        // console.log(data,status);
        // console.log(this.listBox);
        if(status==200){
           
            data.forEach((goods,index)=>{
                // console.log(goods,index);
                this.html+=`<div data-id="${goods.id}">
                <div class="goods">
                    <p>
                        <a href="#none" class="iconfont heartk">&#xe8ab;</a>
                        <a href="#none" class="iconfont cart">&#xe61a;</a>
                    </p>
                    <img src="${goods.img}" alt="">
                </div>
                <div class="info">
                    <p>${goods.name}</p>
                    <p>￥${goods.price}</p>
                </div>
            </div>`

            });
            
            this.listBox.innerHTML=this.html;
            // console.log(this.html); 
        }
    }


    load(){
        let count=84;
        window.onscroll=()=>{
            // console.log(document.documentElement.scrollTop);
            if(document.documentElement.scrollTop>=count){
                this.getData(++this.currentPage);
                count+=600;
            }
        }
    }  
}



new Swiper;
new List;


