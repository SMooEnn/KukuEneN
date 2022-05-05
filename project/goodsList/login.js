class Login {
    baseUrl = 'http://localhost:3000/userInfo';
    constructor() {
        Login.$$('.login').addEventListener('click', this.loginClick.bind(this));
        Login.$$('#register').addEventListener('click', this.registerClick.bind(this));
    }
    static $$(ele) {
        let res = document.querySelectorAll(ele);
        if (res.length == 1) return res[0];
        else return res;
    }
    async loginClick() {
        let usernameval = document.forms[1].elements.username.value.trim();
        let passwordval = document.forms[1].elements.password.value.trim();
        if (!usernameval || !passwordval) throw new Error('can not be blank');
        let {
            data,
            status
        } = await axios.get(this.baseUrl);
        if (status == 200) {
            // console.log(data);
            data.forEach((val) => {
                if (usernameval == val.username && passwordval == val.password) {
                    location.assign('./shopcart.html')
                }
            });
        }
        // console.log(document.forms[0].elements.username.value);

    }
   registerClick() {
       
        let usernameV = document.forms[0].elements[0].value.trim();
        let passwordV = document.forms[0].elements[1].value.trim();
        let cpasswordV = document.forms[0].elements[2].value.trim();
        if (!usernameV || !passwordV || !cpasswordV) throw new Error('can not be blank');
        if(cpasswordV==passwordV){
            axios.post(this.baseUrl, {
                username: usernameV,
                password: passwordV
              }).then(() => {
                  alert('注册成功')
              });
        }else{
            Login.$$('.tap').style.display='block'
            setTimeout(()=>{
                Login.$$('.tap').style.display='none'
            },1000)
        }
    
         
        
    }

}
new Login;