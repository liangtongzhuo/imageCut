window.onload = function() {
    //选择框大小
    var widthMax = 400;
    var heightMax = 400;

    //设置预览图大小,也就是以后生成图片的尺寸
    var widthSmall = 200;
    var heightSmall = 200;
    //默认图片路径
    var imgSrc = 'img/logo.jpg';
    //图片上传路径 POST 请求,注意跨域问题
    var upImageUrl = 'upload';

    //获取图片,并且记录图片大小比例
    var img1, img2, widthSacle, heightScale;
    var input = document.getElementById("imageFile");
    img1 = document.getElementById("img1");
    img2 = document.getElementById("img2");
    img1.src = imgSrc;
    img2.src = imgSrc;

    //画布
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = widthSmall;
    canvas.height = heightSmall;

    //图片加载成功
    img1.onload = function() {
        var img = new Image();
        img.src = img1.src;

        widthSacle = widthMax / img.width;
        heightScale = heightMax / img.height;

        img1.width = widthMax;
        img1.height = heightMax;

        img2.width = widthMax;
        img2.height = heightMax;

        setPreview(); //预览一下
    }
    //点击选择图片后触发
    input.addEventListener('change', function() {
        var file = this.files[0];
        img1.src = window.URL.createObjectURL(file);
        img2.src = window.URL.createObjectURL(file);
    });

    //点击了上传
    var btn = document.getElementById("button");
    btn.onclick = function() {
        //利用Blob插件转换
        canvas.toBlob(function(blob) {
            var form = new FormData();
            form.append('file', blob); //
            // form.append("fileName", "123jpg"); //fileName为自定义，名字随机生成或者写死，看需求
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("POST", upImageUrl); //注意跨域问题
            xmlHttp.send(form);
            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {　　　　　　
                    console.log(xmlHttp.responseText);　　　　
                } else {　　　　　　
                    console.log(xmlHttp.statusText);　　　　
                }
            };

        });

    }


    document.onselectstart = new Function('event.returnValue=false;'); //防止选中蓝色提示， 不明白注释了以后，尝试拖拽看看效果。
    $("#main").draggable({
        containment: 'parent',
        drag: setChoice
    });
    var mainDiv = document.getElementById("main");
    var upDiv = document.getElementById("up");
    var rightDiv = document.getElementById("right");
    var downDiv = document.getElementById("down");
    var leftDiv = document.getElementById("left");
    var leftUpDiv = document.getElementById("left-up");
    var rightUpDiv = document.getElementById("right-up");
    var rightDownDiv = document.getElementById("right-down");
    var leftDownDiv = document.getElementById("left-down");

    var ifKeyDown = false; //鼠标按下状态
    var contact = ""; //表示被按下的触点
    //鼠标按下事件
    upDiv.onmousedown = function(e) {
        e.stopPropagation();
        ifKeyDown = true;
        contact = "up";
    }
    rightDiv.onmousedown = function(e) {
        e.stopPropagation();
        ifKeyDown = true;
        contact = "right";
    }
    downDiv.onmousedown = function(e) {
        e.stopPropagation();
        ifKeyDown = true;
        contact = "down";
    }
    leftDiv.onmousedown = function(e) {
        e.stopPropagation();
        ifKeyDown = true;
        contact = "left";
    }
    leftUpDiv.onmousedown = function(e) {
        e.stopPropagation();
        ifKeyDown = true;
        contact = "left-up";
    }
    rightUpDiv.onmousedown = function(e) {
        e.stopPropagation();
        ifKeyDown = true;
        contact = "right-up";
    }
    rightDownDiv.onmousedown = function(e) {
        e.stopPropagation();
        ifKeyDown = true;
        contact = "right-down";
    }
    leftDownDiv.onmousedown = function(e) {
        e.stopPropagation();
        ifKeyDown = true;
        contact = "left-down";
    }

    //鼠标松开事件
    window.onmouseup = function() {
        ifKeyDown = false;
    }

    //鼠标移动事件
    window.onmousemove = function(e) {
        if (ifKeyDown == true) {
            switch (contact) {
                case "up":
                    upMove(e);
                    break;
                case "right":
                    rightMove(e);
                    break;
                case "down":
                    downMove(e);
                    break;
                case "left":
                    leftMove(e);
                    break;
                case "left-up":
                    leftMove(e);
                    upMove(e);
                    break;
                case "right-up":
                    rightMove(e);
                    upMove(e);
                    break;
                case "right-down":
                    rightMove(e);
                    downMove(e);
                    break;
                case "left-down":
                    leftMove(e);
                    downMove(e);
                    break;
            }
        }
        setChoice();
        setPreview();
    }
    //右边移动
    function rightMove(e) {
        var x = e.clientX; //鼠标X坐标
        var widthBefore = mainDiv.offsetWidth - 2; //选取框变化前的宽度
        var addWidth = x - getPosition(mainDiv).left - widthBefore; //鼠标移动后增加的宽度;
        if (addWidth + widthBefore > widthMax) return;
        mainDiv.style.width = addWidth + widthBefore + "px"; //选取框变化后
    }
    //上边移动
    function upMove(e) {
        var y = e.clientY; //鼠标纵坐标
        var mainY = getPosition(mainDiv).top; //选取框相对于屏幕上边的距离
        var addHeight = mainY - y; //增加的高度
        var heightBefore = mainDiv.offsetHeight - 2; //原来的高度
        if (heightBefore + addHeight > heightMax) return;
        mainDiv.style.height = heightBefore + addHeight + "px";
        mainDiv.style.top = mainDiv.offsetTop - addHeight + "px";
    }
    //左边移动
    function leftMove(e) {
        var x = e.clientX; //鼠标X坐标
        var mainX = getPosition(mainDiv).left; //选取框相对于屏幕左边的距离
        var addWidth = mainX - x; //增加的宽度
        var widthBefore = mainDiv.offsetWidth - 2; //原来的宽度
        if (widthBefore + addWidth > widthMax) return;
        mainDiv.style.width = widthBefore + addWidth + "px";
        mainDiv.style.left = mainDiv.offsetLeft - addWidth + "px";
    }
    //下边移动
    function downMove(e) {
        var y = e.clientY; //鼠标纵坐标
        var heightBefore = mainDiv.offsetHeight - 2; //原来的高度
        var mainY = getPosition(mainDiv).top; //选取框相对于屏幕上边的距离
        var addHeight = y - heightBefore - mainY; //增加的高度
        if (addHeight + heightBefore > heightMax) return;
        mainDiv.style.height = addHeight + heightBefore + "px";
    }

    //获取元素相对于屏幕左边的距离 利用offsetLeft
    function getPosition(node) {
        var left = node.offsetLeft;
        var top = node.offsetTop;
        var parent = node.offsetParent;
        while (parent != null) {
            left += parent.offsetLeft;
            top += parent.offsetTop;
            parent = parent.offsetParent;
        }
        return {
            "left": left,
            "top": top
        };
    }

    //设置选取区域高亮可见
    function setChoice() {
        var top = mainDiv.offsetTop;
        var right = mainDiv.offsetLeft + mainDiv.offsetWidth;
        var bottom = mainDiv.offsetTop + mainDiv.offsetHeight;
        var left = mainDiv.offsetLeft;
        var img2 = document.getElementById("img2");
        img2.style.clip = "rect(" + top + "px," + right + "px," + bottom + "px," + left + "px)";

    }



    //预览函数
    function setPreview() {
        if (!img1) return;
        var top = mainDiv.offsetTop / heightScale;
        var left = mainDiv.offsetLeft / widthSacle;
        var width = mainDiv.offsetWidth / widthSacle;
        var height = mainDiv.offsetHeight / heightScale;
        ctx.drawImage(img1, left, top, width * 2, height * 2, 0, 0, widthMax, heightMax);
    }



}
