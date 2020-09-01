const formModule = (function () {
    const nameRegExp = /^[a-zA-Z]{2,20}$/
    const emailRegExp = /^[a-zA-Z0-9_#&\.\+]{1,}@[a-zA-Z0-9_#&\.\+]{1,}\.com|ua|ru|org|pl$/
    const passwordRegExp = /^\w{8,16}$/
    const imgs = ['https://image.flaticon.com/icons/svg/929/929416.svg', 'https://image.flaticon.com/icons/svg/929/929440.svg']
    let inputElem;
    let agreeCheckElem;

    function getS(selector) {
        return document.querySelector(selector)
    }

    function initHtml() {
        inputElem = document.querySelectorAll('.input')
        agreeCheckElem = getS('#agree')
        for (let elem of inputElem) {
            elem.valid = false
            elem.addEventListener('input', checkValid)
        }
        agreeCheckElem.addEventListener('change', switchBtn)
        getS('#btn-submit').addEventListener('click', submit)
    }
    function switchBtn(){
        if(agreeCheckElem.checked){
            getS('#btn-submit').disabled = false
        }else{
            getS('#btn-submit').disabled = true
        }
    }
    function submit(){
        console.log('submit')
    }
    function checkValid() {
        let bool;
        if (this.id == 'name' || this.id == 'surname') {
            bool = nameRegExp.test(this.value)
        } else if (this.id == 'email') {
            bool = emailRegExp.test(this.value)
        } else if (this.id == 'password') {
            bool = passwordRegExp.test(this.value)
        }
        if (bool) {
            showIcon(this, true)
            this.valid = true
        } else {
            showIcon(this, false)
            this.valid = false
        }
        checkAllData();
    }
    function checkAllData() {
        let proms = new Promise((resolve, reject)=>{
            let permission = true;
            for(let elem of inputElem){
                if(elem.valid == false){
                    permission = false
                }
            }
            resolve(permission)
        })
        proms.then(data=>{
            if(data){
                agreeCheckElem.disabled = false
            }else{
                agreeCheckElem.disabled = true
                agreeCheckElem.checked = false
                switchBtn()
            }
        })
    }
    function showIcon(elem, state) {
        if (!state) {
            elem.nextSibling.style.background = `url(${imgs[0]})`
            elem.style.border = '2px solid #ea6a6a'
        } else {
            elem.nextSibling.style.background = `url(${imgs[1]})`
            elem.style.border = '2px solid #89dd89'

        }
    }
    function init() {
        getS();
        initHtml();
    }
    return {
        init: init
    }
})();

formModule.init();
