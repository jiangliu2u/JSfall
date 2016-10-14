/**
 * Created by jiangliu on 2016/10/12.
 */
window.onload = function () {
    imgLocation("container", "box");
    window.onscroll = function () {
        var imgData = {"data": []};

        for (var i = 0; i < 20; i++) {
            var src2= Math.floor(40 * Math.random()) + ".jpg";//随机生成图片的引用
            imgData.data.push({"src":src2});
        }
        if (checkFlag()) {
            var cparent = document.getElementById("container");
            for (var i = 0; i < imgData.data.length; i++) {
                var ccontent = document.createElement("div");
                ccontent.className = "box";
                cparent.appendChild(ccontent);
                var boxImg = document.createElement("div");
                boxImg.className = "box_img";
                ccontent.appendChild(boxImg);
                var img = document.createElement("img");
                img.src = "img/" + imgData.data[i].src;
                boxImg.appendChild(img);
            }
            imgLocation("container", "box");
          //  console.log(typeof imgData.data);
        }
    }
}

function imgLocation(parent, content) {
    //找出所有的box
    var cparent = document.getElementById(parent);
    var ccontent = getChildElement(cparent, content);//获取图片盒子
    var imgWidth = ccontent[0].offsetWidth;//获取图片的宽度
    var num = Math.floor(document.documentElement.clientWidth / imgWidth);//图片的列数，屏幕宽度/图片宽度
    cparent.style.cssText = "width:" + imgWidth * num + "px; margin:0 auto;";

    var boxHeightArr = [];
    for (var i = 0; i < ccontent.length; i++) {
        if (i < num) {
            boxHeightArr[i] = ccontent[i].offsetHeight;
        } else {
            var miniHeight = Math.min.apply(null, boxHeightArr);//最小的高度
            var minIndex = getMiniHeightLoc(boxHeightArr, miniHeight);//获取最低高度图片的位置，从左到右第几列
            ccontent[i].style.position = "absolute";
            ccontent[i].style.top = miniHeight + "px";
            ccontent[i].style.left = ccontent[minIndex].offsetLeft + "px";//第二列的图片的左边偏移
            boxHeightArr[minIndex] = boxHeightArr[minIndex] + ccontent[i].offsetHeight;//把当前最小的高度变为加上下张图片的高度
        }
    }
}
function getChildElement(parent, content) {//找到所有的子元素
    var contentArr = [];
    var allContent = parent.getElementsByTagName("*");
    for (var i = 0; i < allContent.length; i++) {
        if (allContent[i].className == content) {
            contentArr.push(allContent[i]);
        }
    }
    return contentArr;
}

function getMiniHeightLoc(boxHeightArr, miniHeight) {//获取最低高度图片的位置i
    for (var i in boxHeightArr) {
        if (boxHeightArr[i] == miniHeight) {
            return i;
        }
    }
}

function checkFlag() {//检查是否滚动到最下面
    var cparent = document.getElementById("container");
    var ccontent = getChildElement(cparent, "box");
    var lastContentHeight = ccontent[ccontent.length - 1].offsetTop;
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;//浏览器兼容性
    var pageHeight = document.documentElement.clientHeight || document.body.clientHeight;
    console.log(lastContentHeight + ":" + scrollTop + ":" + pageHeight);
    if (lastContentHeight < scrollTop + pageHeight) {
        return true;
    }
}