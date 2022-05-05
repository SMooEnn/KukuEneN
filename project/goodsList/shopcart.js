class Cart {
    ListUrl = 'http://localhost:3000/cartList';
    detailUrl = 'http://localhost:3000/detailsList';
    constructor() {
       
        this.getList();
        Cart.$$('#delSure').addEventListener('click', this.delsure.bind(this))
        Cart.$$('.cartList').addEventListener('click', this.operate.bind(this))
        this.count();

    }
    static $$(ele) {
        let res = document.querySelectorAll(ele);
        if (res.length == 1) return res[0];
        else return res;
    }
    content = ''
    async getList() {

        let {
            data,
            status
        } = await axios.get(this.ListUrl);
        // console.log(data,status);
        if (status == 200) {
            data.forEach((val) => {

                this.content += `<li data-no=${val.id}>
                <div class="img"> <img src="${val.img}" alt=""></div>
                <div class="info">
                    <div>
                       <p>${val.number}</p>
                       <p>${val.name}</p>
                    </div>
                    <div>
                        <p>颜色<span>${val.color}</span></p>
                        <p>材料<span>${val.materials}</span></p>
                        <div>
                           <div>
                               <button class="decrease">-</button>
                               <span>${val.amount}</span>
                               <button class="add">+</button>
                           </div>
                            <span>￥${val.price*val.amount}</span>
                        </div>
                       
                    </div>
                    <div>
                        <button class="details">查看详情</button>
                        <button class="delBtn" type=""button>删除</button>
                    </div>
                </div>
            </li>`
            })
            Cart.$$('.cartList').innerHTML = this.content;
        }
    }
    
    operate(event) {
        // console.log(this);
        // console.log(event.target.className);
        // if(event.target.classList)
        
        if(event.target.className=='delBtn')this.delete(event.target);
        if(event.target.className=='add')this.add(event.target);
        if(event.target.className=='decrease')this.decrease(event.target);
        if(event.target.className=='details')this.details(event.target);

    }
    details(target){
        // axios.get()
       let id=target.parentNode.parentNode.parentNode.dataset.no
        axios.get(this.ListUrl+'/'+id).then(({data,status})=>{
           if(status==200){
            axios.post(this.detailUrl,{
                img:data.img,
                name:data.name,
                price:data.price,
                color:data.color,
                materials:data.materials,
                number:data.number,
                amount:data.amount
            })
            location.assign('./details.html')
           }
        })
       
    }
    
    async add(target){
        let id=target.parentNode.parentNode.parentNode.parentNode.parentNode.dataset.no;
        // console.log(target.previousElementSibling);
        let n=target.previousElementSibling.innerHTML-0;
        ++n;
        target.previousElementSibling.innerHTML=n;

        let {status}=await axios.patch(this.ListUrl+'/'+id,{
            amount:n
        })
        status==200&&location.reload();
      
    }
   async decrease(target){
        let id=target.parentNode.parentNode.parentNode.parentNode.parentNode.dataset.no;
        // console.log(target.previousElementSibling);
        let n=target.nextElementSibling.innerHTML-0;
        --n;
        target.nextElementSibling.innerHTML=n;

        let {data,status}=await axios.patch(this.ListUrl+'/'+id,{
            amount:n
        })
        status==200&&location.reload();
    }
    delete(target) {
        this.target=target;
        // console.log(target);
        $('#delModal').modal('show');
        
    }
    delsure(){
        let tr=this.target.parentNode.parentNode.parentNode;
        let id=this.target.parentNode.parentNode.parentNode.dataset.no;
        axios.delete(this.ListUrl + '/' + id).then(({status})=>{
            if(status==200){
                tr.remove();
                $('#delModal').modal('hide');
            }
        })
        // console.log(id.dataset.no);
    }
    count(){
        let num=0;
        axios.get(this.ListUrl).then(({data})=>{
            // console.log(data,status);
            data.forEach((val)=>{
                // console.log(val.amount,val.price);
                num+=val.amount*val.price;
            });
            Cart.$$('.sum').innerHTML=`￥${num}`;
            Cart.$$('.xSum').innerHTML=`￥${num}`;
            // console.log(num);
        });
        
        // console.log(Cart.$$('.sum').innerText);
    }
}
new Cart;