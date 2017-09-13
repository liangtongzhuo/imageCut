![](http://ac-2my9ah1h.clouddn.com/ffcf7ef55adbee3f3cd3.png)
- ## 文章分为两段
- 一：讲解思路
- 二：项目使用

---

项目GitHub地址：https://github.com/liangtongzhuo/imageCut

 ## 一：项目思路展示，打开 idea.html
- 1.获取图片，绘制到 canvas
- 2.使用 blob 插件，将 canvas 转换成 blob 对象
- 3.组装 FormData
- 4.ajax上传

```
<!DOCTYPE html>
<html>

<head>
    <title>
    </title>
    <!-- canvas转换blob -->
    <script type="text/javascript" src="lib/blob/canvas-to-blob.min.js"></script>
</head>

<body>
    <h1>这个页面仅仅是记录想法的</h1>
    <script>
        var input = document.createElement('input');
        input.type = 'file';
        input.addEventListener('change', function() {
            //获取上传文件
            var file = this.files[0];
            //转换成img
            var img = document.createElement('img');
            img.src = window.URL.createObjectURL(file);
            //加载图片成功
            img.onload = function() {
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");

                var width = img.width;
                var height = img.height;

                canvas.width = width;
                canvas.height = height;
                //绘制到canvas上
                ctx.drawImage(img, 0, 0, width, height);
                document.getElementsByTagName('body')[0].appendChild(canvas);


                // 利用插件
                //利用Blob插件转换，成数据
                canvas.toBlob(function(blob) {
                    //创建forme
                    var form = new FormData();
                    form.append('file', blob); 
                    // form.append("fileName", "123jpg"); //fileName为自定义，名字随机生成或者写死，看需求
                    var xmlHttp = new XMLHttpRequest();
                    xmlHttp.open("POST", '上传路径'); //注意跨域问题
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
        });
        document.getElementsByTagName('body')[0].appendChild(input);
    </script>
</body>
</html>
```
- blob 插件 GitHub地址：https://github.com/blueimp/JavaScript-Canvas-to-Blob
- 还有一种不用 blob 插件转换博客地址：http://blog.csdn.net/ztop_f/article/details/53219275

## 二：项目使用
- 打开 js/cut.js

```
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
```
- 运行 index.html 


- 项目运行地址：https://liangtongzhuo.github.io/imageCut/
- 自此就完成了，我的个人博客地址：http://liangtongzhuo.com
