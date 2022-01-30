let container = document.querySelector('#slide')
let logos = document.querySelector('#logo')
let arrow = document.querySelectorAll('.arrow')
let prev = document.querySelector('.prev')
let down = document.querySelector('.next')
let index = 0 //图片下标
let textArr = ['Travel - I want to be free!',
    'Travel - Living in countryside!',
    'Living in a private house, enjoy different customs, enjoy different cuisines, and different nights.',
    'In the embrace of nature, feel the greatness of the world and the preciousness of life.']
let time = 400  // 翻页的持续时间
let item_time = 13 //间隔时间
let imgList = document.querySelector('#imgList')
let imgLength = document.querySelectorAll('#imgList img')
let page_width = imgLength[0].clientWidth //获取图片的宽度
let imgCount = imgLength.length - 2
let moving = false/*标识定时器*/
let imgs = document.querySelectorAll('#gallery>div img')
let slide = false/*标识循环定时器是否开启*/
let as = document.querySelectorAll('#logo>ul>li>a')
let lis = document.querySelectorAll('#logo>ul>li')
let da = document.querySelectorAll('#da>div')
let scroll = document.querySelector('.scrollObj')
let pack = document.querySelector('.pack')
let lantern = document.querySelector('.lantern')
let lans = document.querySelectorAll('.lantern ul li')
let numbers = document.querySelectorAll('.numbertext')
let dotList = document.querySelectorAll('.dot li')
let dotIndex = 0

/*let lanterna = document.querySelectorAll('.lanterna')
let lantern_width = lans[0].offsetWidth //获取走马灯图片的宽度
let lanternCount = lans.length - 2
let removal = false*/
let speed = 20 //滚动体条速度
/*let img = false/!*标识图片是否在运行*!/
let cc = 0 /!*判断触发事件*!/
let go = -1/!*标识图片索引*!/
let sus = -1/!*保存现在悬浮的图片下标*!/*/
//初始化变量

let intervalId = setInterval(function () {
    /*判断循环定时器是否在运行*/
    if (slide) return
    slide = true //循环在运行
    dotIndex++;//圆点下标自增
    // index %= dotList.length //图标下标
    nextPage(true)
}, 3000)
container.onmousemove = function () {
    /*鼠标移入事件*/
    clearInterval(intervalId)/*清除定时器*/
    for (let i = 0; i < arrow.length; i++) {
        arrow[i].style.opacity = '1' /*显示左，右按钮*/
        arrow[i].style.background = 'rgba(0,0,0,0.3)'
    }
}
container.onmouseout = function () {
    clearInterval(intervalId)/*清除定时器*/
    /*鼠标移出事件*/
    intervalId = setInterval(function () {/*开启定时器*/
        if (slide) return
        slide = true
        nextPage(true)
    }, 3000)
    for (let i = 0; i < arrow.length; i++) {
        arrow[i].style.opacity = '0.3'/*隐藏左，右按钮*/
        arrow[i].style.background = 'rgba(0,0,0,0)'
    }
}

prev.onclick = function () {
    /*点击上一页*/
    nextPage(false)
}
down.onclick = function () {
    /*点击下一页*/
    nextPage(true)
}

//圆点标记
for (let i = 0; i < dotList.length; i++) {
    // dotList[i].sum = i
    dotList[i].onclick = function () { //i=3
        clearInterval(intervalId)
        //i是当前点击的圆点，dotIndex是旧的下标
        if (i > dotIndex) {
            // dotIndex = i//更新下标为i //dotIndex=3
            // console.log(i)
            nextPage(true, i)
        } else if (i < dotIndex) {//i=0
            // i  -= dotIndex
            // i>0?i:i = -i
            // dotIndex = i
            // console.log(i)
            nextPage(false, i)
        }
        dotList[i].className += ' dotFirst'
        return dotIndex

    }
}


function nextPage(next, i) {/*判断下一页是否还在执行*/
    if (moving) {
        return
    }
    moving = true/*标识定时器在运行，*/
    let offset; //定义变量
    if (typeof next === 'boolean') {
        offset = next ? -page_width : page_width //判断是上一页还是下一页， 上一页是正值下一页是负值
        if (typeof i === 'number') {
            i = next ? i : -i //当前圆点 如果是向上翻为负值，下翻就是正值
            // console.log(i)
        }
    }/*判断上一页还是下一页*/
    // console.log(i,offset)
    //如果下一页 itemOffset是负值，上一页为正值
    let itemOffset = offset / (time / item_time)/*每次运行的速度*/
    let currLeft = parseInt(getComputedStyle(imgList)["left"])/*获取原来的left值*/
    let targetLeft = offset + currLeft //目标
    if (typeof i === 'number') {
        if (i > 0) {//向下翻
            targetLeft = offset * (i + 1)//修改target为圆点的目标
        } else {
            targetLeft = offset * (i - 1)//怎么说都是负值，我看我应该又是弄错了
        }
    }
    console.log(targetLeft)
    //初始化定时器数值
    // currLeft = parseInt(currLeft)/*取整*/
    // targetLeft = parseInt(targetLeft)
    let intervalId = setInterval(function () {/*开启定时器*/
        currLeft += itemOffset //循环 因为一开始的left就是负值 如果下一页 加负值才能到达目标 ，上一页加正值
        if (offset < 0 && currLeft < targetLeft || offset > 0 && currLeft > targetLeft) {/*判断是否超过目标长度，如果超过则等于目标宽度*/
            currLeft = targetLeft
            clearInterval(intervalId)/*清除定时器*/

            // console.log(dotIndex)

            /*            if (typeof i==='number'){
                            dotIndex = index //同步圆点下标和图片下标一样
                            dotList[dotIndex].className = dotList[dotIndex].className.replace(' dotFirst','')//移除classname
                        }*/
            console.log('---------原点下标' + dotIndex)
            console.log('----------图片下标' + index)
            next ? index++ : index--//判断需要自增还是自减
            if (index === textArr.length) index = 0//如果index
            if (index < 0) index = textArr.length - 1
            document.querySelector("#text").innerText = textArr[index]/*循环修改文字标题*/
            moving = false/*标识下一页执行完毕*/
            slide = false/*标识定时器执行完毕*/
            if (currLeft === (imgCount + 1) * offset) {/*判断图片是否是第一张或者最后一张*/
                currLeft = offset
            } else if (currLeft === 0) {//如果是第一张往上翻就修改
                currLeft = -imgCount * offset
            }
            if (typeof i === 'number') {
                // dotIndex = index
                dotIndex = i > 0 ? i : -i
                index = dotIndex
                // dotList[dotIndex].className += ' dotFirst'
            } else {
                dotIndex = index
                dotList[index].className += ' dotFirst'
            }
            console.log('----------新的图片下标' + index)
            console.log('---------新的原点下标' + dotIndex)
            // dotIndex = index//更新原点下标
            // console.log(dotIndex)
        }
        imgList.style.left = currLeft + 'px'/*定时器更新left值*/

    }, item_time)
    if (intervalId) {
        if (typeof i === 'number') {
            // index = i //如果点击圆点则更新图片下标为圆点下标
            index = dotIndex
            dotList[dotIndex].className = dotList[dotIndex].className.replace(' dotFirst', '')//移除classname
        } else {
            if (index === dotList.length) index = 0//如果index
            if (index < 0) index = dotList.length - 1
            console.log(index)
            dotIndex = index
            dotList[index].className = dotList[index].className.replace(' dotFirst', '')//移除classname
        }
    }
}


/*for (let i = 0; i < imgs.length; i++) {
    imgs[i].num = i //给每个图片一个下标
    // console.log(imgs[i].num)
    /!*给每个图片一个点击按钮*!/
    imgs[i].onclick = function () {
        console.log(this.num)
        if (go !== this.num) {/!*判断上一个下标是否不等于现在点击的下标*!/
            if (img) return
            img = true/!*标识图片正在悬浮*!/
            if (cc === 0) { /!*判断是否执行悬浮事件*!/
                this.parentNode.style.position = 'fixed'
                this.parentNode.style.top = '0px'
                this.parentNode.style.left = '0px'
                this.parentNode.style.margin = '40px'
                cc++ //1
                sus = this.num //0
                /!*使图片悬浮*!/
            }
            go = this.num //0
        } else if (sus === this.num) {
            this.parentNode.style.position = ''
            this.parentNode.style.top = ''
            this.parentNode.style.left = ''
            this.parentNode.style.margin = ''
            cc = 0
            img = false
        }

    }
}*/

for (let i = 0; i < as.length; i++) {
    /*导航栏点击效果*/
    as[i].onclick = function () {
        console.log(da[i].offsetTop)
        if (document.documentElement.scrollTop > da[i].offsetTop) {
            /*document.documentElement.scrollTop 滚动条距离顶部的距离*/
            /*da[i].offsetTop距离顶部的距离*/
            if (speed > 0) {
                speed = -speed
            }
        } else {
            speed = 20
        }
        let interval = setInterval(function () {
            let newValue = document.documentElement.scrollTop + speed
            if (speed < 0 && newValue < da[i].offsetTop || speed > 0 && newValue > da[i].offsetTop) {
                newValue = da[i].offsetTop
            }
            if (document.documentElement.scrollHeight - document.documentElement.scrollTop < document.documentElement.clientHeight) {
                /*
                document.documentElement.scrollHeight总高度
                document.documentElement.scrollTop滚动条距离顶部的高度
                document.documentElement.clientHeight浏览器窗口高度
                *
                * */
                clearInterval(interval)
            }
            document.documentElement.scrollTop = newValue
            //判断滚动条是否到底了
            if (document.documentElement.scrollHeight - document.documentElement.scrollTop === document.documentElement.clientHeight) {
                clearInterval(interval)
            }

            if (newValue === da[i].offsetTop) {
                clearInterval(interval)
            }
        }, 10)
    }
}

/*判断滚动条是否移动*/
function debounce(func, wait) {
    let timeout;
    return function () {
        let context = this;
        let args = arguments;

        if (timeout) clearTimeout(timeout);

        timeout = setTimeout(() => {
            func.apply(context, args)
        }, wait);
    }
}


function handle() {
    if (document.documentElement.scrollTop >= document.documentElement.scrollHeight * 0.1) {
        console.log('ccc')
        logos.style.background = 'rgba(0,0,0,0.3)'
    } else if (document.documentElement.scrollTop <= document.documentElement.scrollHeight * 0.1) {
        logos.style.background = ''
    }
}

window.addEventListener("scroll", debounce(handle, 500));

/*window.addEventListener('scroll', function () {
    if (document.documentElement.scrollTop >= document.documentElement.scrollHeight * 0.1) {
        console.log('ccc')
        logos.style.background = 'rgba(0,0,0,0.3)'
    } else if (document.documentElement.scrollTop <= document.documentElement.scrollHeight * 0.1) {
        logos.style.background = ''
    }
})*/


/*导航栏动画效果*/
for (let i = 0; i < lis.length; i++) {
    lis[i].onmousemove = function () {
        // this.style.background = 'red'
        scroll.style.left = this.offsetLeft + 'px'
        scroll.style.width = this.clientWidth + 'px'
        // scroll.style.display= 'block'
        // 鼠标移进来的时候，div添加的伪元素跟着动起来达到效果这样可不可以？ 明天试试今天太晚了，晚安
    }
    lis[i].onmouseout = function () {
        // scroll.style.display= 'none'
        scroll.style.left = '-999px'
        scroll.style.width = '-999px'
    }
}
/* 走马灯*/
//初始化
lantern.style.width = lans[0].offsetWidth * lans.length + 'px'
pack.style.width = lans[0].offsetWidth * 4 + 'px'
lantern.style.left = -lans[0].offsetWidth + 'px'


//鼠标经过移出事件
pack.onmousemove = function () {
    clearInterval(lanternId)
}
pack.onmouseout = function () {
    clearInterval(lanternId)
    lanternId = setInterval(() => {
        let cc = parseInt(getComputedStyle(lantern)["left"])/*获取原来的left值*/
        let newCc = cc - 1 //循环变动left值
        if (newCc === -lans[0].offsetWidth * 3) newCc = 0 //如果超过三张图片的长度left清零
        lantern.style.left = newCc + 'px' //更新
    }, 10)
}

//循环播放
let lanternId = setInterval(() => {
    let cc = parseInt(getComputedStyle(lantern)["left"])/*获取原来的left值*/
    let newCc = cc - 1
    if (newCc === -lans[0].offsetWidth * 3) newCc = 0
    lantern.style.left = newCc + 'px'
}, 10)


/*图片*/
let slidesIndex = 0 //获取当前图片下标
let oldslides = 0 //获取旧值
let divtitle = document.querySelectorAll('#gallery div h4')
for (let i = 0; i < imgs.length; i++) {
    /*循环遍历*/
    numbers[i].innerText = i + 1 + '/' + imgs.length//修改文本值
    imgs[i].onclick = function () {//给图片绑定
        openModal()//打开
        slidesIndex = i//更新下标
        showSlides(i)//传点击图片的下标
    }
}


function openModal() {
    document.getElementById('myModal').style.display = "block";//显示大背景
    document.documentElement.style.overflowY = 'hidden';//隐藏滚动条
}

function closeModal() {
    document.getElementById('myModal').style.display = "none";//隐藏大背景
    document.documentElement.style.overflowY = 'scroll';//显示滚动条
}


function plusSlides(next) {
    showSlides(slidesIndex += next);//点击下一张或上一张更新当前下标
}

function currentSlide(n) {
    showSlides(slidesIndex = n);//点击小图片更新当前坐标
}

const slides = document.getElementsByClassName("mySlides");
const dots = document.getElementsByClassName("demo");
const captionText = document.getElementById("caption");
const columns = document.querySelectorAll('.column')
/*----------获取元素就不多说了*/
for (let i = 0; i < columns.length; i++) {
    columns[i].onclick = function () {//给小图片添加按钮
        currentSlide(i)
    }
}
for (let i = 0; i < slides.length; i++) {
    slides[i].className += ' fade'//给每个图片添加fade动画效果
}

function showSlides(n) {
    if (n + 1 > slides.length) {
        n = 0
    }//大于图片总长度就返回第一张
    if (n + 1 < 1) {
        n = slides.length - 1
    }

    slides[oldslides].style.display = "none";//隐藏上一次的图片
    dots[oldslides].className = dots[oldslides].className.replace(" active", "");//移除上一个className
    slides[n].style.display = "block";//显示现在的下标
    dots[n].className += " active";//添加class图片
    captionText.innerHTML = divtitle[n].innerText;//修改文字
    oldslides = n //更新旧坐标
    slidesIndex = n //更新当前的下标 slidesIndex就是点击下一页需要的值罢了
}

document.getElementById('myModal').onclick = function (event) {
    if (event.target === document.getElementById('myModal')) {
        closeModal()//点击灰色背景就关闭
    }
}


/*
for (let i = 0; i <lanterna.length; i++) {
    lanterna[0].onclick = function () {
        lanterns(false)
    }
    lanterna[1].onclick = function () {
        lanterns(true)
    }
}
function lanterns(next) {
        if (removal) {
            return
        }
        removal = true/!*标识定时器在运行，*!/
        let offsetzuo = 0

    if (typeof next === 'boolean') {
            offsetzuo = next ? -lantern_width : lantern_width
        }
        /!*判断上一页还是下一页*!/
        let lanternOffset = offsetzuo / (time / item_time)/!*每次运行的速度*!/
        let lanternLeft = parseInt(getComputedStyle(lantern)["left"])/!*获取原来的left值*!/
        let targetLeft = offsetzuo + lanternLeft
        //初始化定时器数值
        lanternLeft = parseInt(lanternLeft)/!*取整*!/
        // targetLeft = parseInt(targetLeft)
        let intervalId = setInterval(function () {/!*开启定时器*!/
            lanternLeft += lanternOffset
            if (offsetzuo < 0 && lanternLeft < targetLeft || offsetzuo > 0 && lanternLeft > targetLeft) {/!*判断是否超过目标长度，如果超过则等于目标宽度*!/
                for (let i = 0; i < lans.length; i++) {
                    // console.log(lanternLeft + lans[i].offsetLeft)
                    // console.log(lanternLeft + lans[i].offsetLeft<=lans[0].offsetWidth)
                    if (lanternLeft + lans[i].offsetLeft<=0 && lanternLeft + lans[i].offsetLeft<-lans[i].offsetLeft){
                        // targetLeft = -lans[i].offsetLeft
                        console.log(lans[i])
                    }
                }
                lanternLeft = targetLeft
                clearInterval(intervalId)/!*清除定时器*!/
                removal = false
                if (lanternLeft === (lanternCount + 1) * offsetzuo) {/!*判断图片是否是第一张或者最后一张*!/
                    lanternLeft = offsetzuo
                } else if (lanternLeft === 0) {
                    lanternLeft = -lanternCount * offsetzuo
                }
            }
            lantern.style.left = lanternLeft + 'px'/!*定时器更新left值*!/
        }, item_time)

}
*/


/*function smooth(obj,attr,target,speed,time,callback) {
    clearInterval(obj.interval)
    let current = parseInt(getStyle(obj,attr))
    if (current>target) speed = -speed
   obj.interval = setInterval(function () {
       let oldValue = parseInt(getStyle(obj,attr))
       let newValue = oldValue + speed
       if(speed<0 && newValue < target || speed>0 && newValue > target){
           newValue = target
       }

       obj.style[attr] = newValue+'px'
       if (newValue === target){
           clearInterval(obj.interval)
           callback && callback()
       }
   },time)
}
function getStyle(obj,name){
    return getComputedStyle(obj)[name]
}*/