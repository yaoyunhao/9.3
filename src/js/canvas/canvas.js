
  //线
    function line(k,x, y, x1, y1,color) {
        k.beginPath();
        k.moveTo(x, y);
        k.lineTo(x1, y1);
        k.strokeStyle=color;
        k.stroke();
        k.closePath();
    }
    //圆形
    function cir(k,x, y, r, s, e, color) {
        k.beginPath();
        k.moveTo(x, y);
        k.arc(x, y, r, s, e);
        k.fillStyle = color;
        //k.strokeStyle=color;
        k.fill();
        //k.strokes();
        k.closePath();
    };
    //文本
    function text(k,text, x, y,color) {
        k.beginPath();
        k.textAlign = "center";
        k.textBaseline = "middle";
        k.strokeStyle=color;
        //k.lineStyle=color;
        k.strokeText(text, x, y);
        //k.lineText(text,x,y)
        k.closePath();
    }
    //矩形
    function Rect(k,x, y, w, h, color) {
        k.beginPath();
        k.fillStyle = color;
        //k.strokeStyle=color;
        k.fillRect(x, y, w, h);
        //k.strokeRect(x,y,w,h);
        k.closePath();
    }
    function maxMin(min,max){
    	return Math.floor(Math.random()*(max-min+1)+min);
    }
    CanvasRenderingContext2D.prototype.fillTextVertical = function(text, x, y) {
    var context = this;
    var canvas = context.canvas;

    var arrText = text.split('');
    var arrWidth = arrText.map(function(letter) {
        return context.measureText(letter).width;
    });

    var align = context.textAlign;
    var baseline = context.textBaseline;

    if (align == 'left') {
        x = x + Math.max.apply(null, arrWidth) / 2;
    } else if (align == 'right') {
        x = x - Math.max.apply(null, arrWidth) / 2;
    }
    if (baseline == 'bottom' || baseline == 'alphabetic' || baseline == 'ideographic') {
        y = y - arrWidth[0] / 2;
    } else if (baseline == 'top' || baseline == 'hanging') {
        y = y + arrWidth[0] / 2;
    }

    context.textAlign = 'center';
    context.textBaseline = 'middle';

    // 开始逐字绘制
    arrText.forEach(function(letter, index) {
        // 确定下一个字符的纵坐标位置
        var letterWidth = arrWidth[index];
        // 是否需要旋转判断
        var code = letter.charCodeAt(0);
        if (code <= 256) {
            context.translate(x, y);
            // 英文字符，旋转90°
            context.rotate(90 * Math.PI / 180);
            context.translate(-x, -y);
        } else if (index > 0 && text.charCodeAt(index - 1) < 256) {
            // y修正
            y = y + arrWidth[index - 1] / 2;
        }
        context.fillText(letter, x, y);
        // 旋转坐标系还原成初始态
        context.setTransform(1, 0, 0, 1, 0, 0);
        // 确定下一个字符的纵坐标位置
        var letterWidth = arrWidth[index];
        y = y + letterWidth;
    });
    // 水平垂直对齐方式还原
    context.textAlign = align;
    context.textBaseline = baseline;
};
 function getGrey(r, g, b) { //转化成灰色的公式，记住就行
        return 0.299 * r + 0.578 * g + 0.144 * b;
    }
    function getParams(name) {//获取地址栏
            var params = window.location.search;       
            var str = params.slice(1);      
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                if (name == strs[i].split("=")[0]) {
                    return decodeURI(strs[i].split("=")[1]);
                }
            }
        }