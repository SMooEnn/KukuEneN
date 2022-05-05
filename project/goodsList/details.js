class Details {
    constructor() {
        this.getData();
        this.bindEvent();
    }
    url = 'http://localhost:3000/detailsList';
    static $$(ele) {
        let res = document.querySelectorAll(ele);
        if (res.length == 1) return res[0];
        else return res;
    }
    bindEvent(){
        

        Details.$$('.box').addEventListener('mouseenter', this.boxenter.bind(this));
        Details.$$('.box').addEventListener('mouseleave', this.boxleave.bind(this));
        Details.$$('.box').addEventListener('mousemove', this.boxmove.bind(this));
      /*   this.small.addEventListener('mouseenter', this.enter.bind(this));
        this.small.addEventListener('mouseleave', this.leave.bind(this));
        this.small.addEventListener('mousemove', this.move.bind(this)); */
    }
    boxenter(event){
        // console.log(event.target.children[0].className='box');
        // event.target.className=='box'
        this.enter(event.target);
        // if(event.target.children[0].className='box')this.enter(event.target);
    }
    boxleave(event){
        this.leave(event.target);
    }
    boxmove(event){
        // console.log(event.target);
        this.move(event);
    }

    getData() {

        let html = ''
        axios.get(this.url).then(({
            data,
            status
        }) => {
            if (status == 200) {
                let val = data[data.length - 1];
                // console.log(val.img);
                html = `
                <div class="small" id="small">
                <img src="${val.img}" width="350" alt="" />
                <div class="mask" id="mask"></div>
            </div>
            <div class="big" id="big">
                <img src="${val.img}" width="800" alt="" id="img" />
            </div>`
                // console.log(html);
            }
            Details.$$('.box').innerHTML = html;
        })

      
    }


    enter(target) {
        this.mask=target.children.small.children.mask
        this.big=target.children.big;
        this.small=target.children.small;
        this.box=target;
        this.img=target.children.big.children.img;
        this.mask.style.display = 'block'
        this.big.style.display = 'block'
    }
    leave() {
        this.mask.style.display = 'none'
        this.big.style.display = 'none'
    }
    move(event) {
    
        let cX = event.clientX;
        let cY = event.clientY;
        let boxL = this.box.offsetLeft;
        let boxT = this.box.offsetTop;
        let boxW = this.box.offsetWidth;
        let boxH = this.box.offsetHeight;
        let maskL = cX - boxL;
        let maskT = cY - boxT;
        let maskW = this.mask.offsetWidth / 2;
        let maskH = this.mask.offsetHeight / 2;
        let maxW = boxW - maskW * 2;
        let maxH = boxH - maskH * 2;
        // console.log(boxW, boxH);
        // console.log(maskL - maskW*);
        // console.log(maskT - maskH*);
        let targetX = maskL - maskW;
        let targetY = maskT - maskH;
        targetX = targetX < 0 ? 0 : targetX;
        targetY = targetY < 0 ? 0 : targetY;
        targetX = targetX > maxW ? maxW : targetX;
        targetY = targetY > maxH ? maxH : targetY;

        // console.log(targetX,targetY);
        this.mask.style.left = targetX + 'px';
        this.mask.style.top = targetY + 'px';

        let bigMaxX = this.img.offsetWidth - this.big.offsetWidth;
        let bigMaxY = this.img.offsetHeight - this.big.offsetHeight;

        let bigMoveX = targetX / maxW * bigMaxX;
        let bigMoveY = targetY / maxH * bigMaxY;
        this.img.style.left = -bigMoveX + 'px';
        this.img.style.top = -bigMoveY + 'px';

         console.log(boxL,boxT,box.offsetParent);

    }
}
new Details;