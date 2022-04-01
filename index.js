var cv = document.getElementById('myCanvas');
var ctx = cv.getContext('2d');
var tcv = document.getElementById('tmpCanvas');
var tctx = tcv.getContext('2d');
var imageloader = document.getElementById('upload');
var isDrawing, cnt=-1, posx, posy;
var size=15, color, frame=1, fin=1;
var mode = [true, false, false, false, false, false];
var idx=-1, size_font="20px Arial";
var radius;
var text_arr = new Array;
var History = new Array();
cv.style.cursor = "url('pen.png'), default";

cv.onmousedown = function(e) {
    if(fin){
        isDrawing = true;
        while(History.length > cnt+1)
            History.pop();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
        if(mode[2] || mode[3] || mode[4] || mode[5]){
            posx = e.clientX;
            posy = e.clientY;
            cv.style.zIndex = 0;
            tcv.style.zIndex = 1;
        }
    }
};
cv.onmousemove = function(e) {
    if (isDrawing && fin) {
        ctx.lineCap = "round";
        ctx.lineWidth = size;
        ctx.strokeStyle = color;
        if(mode[0])
            Brush(e);
        else if(mode[1])
            Eraser(e);
    }
};
cv.onmouseup = function() {
    if(fin){
        isDrawing = false;
        ctx.closePath();
        History.push(cv.toDataURL());
        cnt++;
    }
};

tcv.onmousemove = function(e) {
    if (isDrawing && fin) {
        ctx.lineCap = "round";
        ctx.lineWidth = size;
        ctx.strokeStyle = color;
        tctx.lineCap = "round";
        tctx.lineWidth = size;
        tctx.strokeStyle = color;
        if(mode[3])
            Circle(e);
        else if(mode[4])
            Rectangle(e);
        else if(mode[5])
            Triangle(e);
    }
};
tcv.onmouseup = function(e) {
    if(!mode[2] && fin){
        tctx.clearRect(0, 0, tcv.width, tcv.height);
        cv.style.zIndex = 1;
        tcv.style.zIndex = 0;
        isDrawing = false;
        ctx.beginPath();
        if(mode[3])
            ctx.arc(posx, posy, radius, 0, 2*Math.PI);
        else if(mode[4]){
            if(posx<e.clientX && posy<e.clientY)
                ctx.rect(posx, posy, Math.abs(e.clientX-posx), Math.abs(e.clientY-posy));
            else if(posx>e.clientX && posy<e.clientY)
                ctx.rect(e.clientX, posy, Math.abs(e.clientX-posx), Math.abs(e.clientY-posy));
            else if(posx<e.clientX && posy>e.clientY)
                ctx.rect(posx, e.clientY, Math.abs(e.clientX-posx), Math.abs(e.clientY-posy));
            else
                ctx.rect(e.clientX, e.clientY, Math.abs(e.clientX-posx), Math.abs(e.clientY-posy));
        }
        else if(mode[5]){
            ctx.moveTo(posx, posy);
            ctx.lineTo(e.clientX, e.clientY);
            ctx.lineTo(posx-(e.clientX-posx), e.clientY);
            ctx.lineTo(posx, posy);
        }
        ctx.stroke();
        ctx.closePath();
        History.push(cv.toDataURL());
        cnt++;
    }
};

window.addEventListener('keydown', function(e) {
    if(mode[2] && fin)
        Type(e);
})

function changeSize(){
    size = document.getElementById("size").valueAsNumber;
}

function changeColor(){
    color = document.getElementById("color").value;
};

function SizeFont(){
    size_font = document.getElementById("sizeMenu").value + " " + document.getElementById("fontMenu").value;
}

function changeFrame(){
    frame = document.getElementById("frameMenu").value;
}

function changeMode(value){
    if(fin){
        for(var i=0; i<6; i++){
            if(i == value)
                mode[i] = true;
            else
                mode[i] = false;
        }
        if(value == 0)
            cv.style.cursor = "url('pen.png'), default";
        else if(value == 1)
            cv.style.cursor = "url('eraser.png'), default";
        else if(value == 2)
            cv.style.cursor = "text";
        else
            cv.style.cursor = "crosshair";
    }
}

function Brush(e){
    if(fin){
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
    }
}

function Eraser(e){
    if(fin){
        ctx.clearRect(e.clientX, e.clientY, size, size);
        ctx.stroke();
    }
}

function Type(e){
    if(fin){
        if(e.keyCode === 8){
            text_arr.pop();
            idx--;
            tctx.clearRect(0, 0, tcv.width, tcv.height);
            tctx.font = size_font;
            tctx.fillStyle = color;
            tctx.fillText(text_arr.join(" "), posx, posy);
        }
        else if(e.keyCode == 13){
            tctx.clearRect(0, 0, tcv.width, tcv.height);
            cv.style.zIndex = 1;
            tcv.style.zIndex = 0;
            isDrawing = false;
            ctx.beginPath();
            ctx.font = size_font;
            ctx.fillStyle = color;
            ctx.fillText(text_arr.join(" "), posx, posy);        
            ctx.stroke();
            ctx.closePath();
            text_arr.length = 0;
            idx = -1;
            History.push(cv.toDataURL());
            cnt++;
        }
        else{
            idx++;
            text_arr[idx] = String.fromCharCode(e.keyCode);
            tctx.font = size_font;
            tctx.fillStyle = color;
            tctx.fillText(text_arr.join(" "), posx, posy);
        }
    }
}

function Circle(e){
    if(fin){
        tctx.clearRect(0, 0, tcv.width, tcv.height);
        tctx.beginPath();
        radius = Math.sqrt( Math.pow(e.clientX-posx, 2) + Math.pow(e.clientY-posy, 2) );
        tctx.arc(posx, posy, radius, 0, 2*Math.PI);
        tctx.stroke();
        tctx.closePath();
    }
}

function Rectangle(e){
    if(fin){
        tctx.clearRect(0, 0, tcv.width, tcv.height);
        tctx.beginPath();
        if(posx<e.clientX && posy<e.clientY)
            tctx.rect(posx, posy, Math.abs(e.clientX-posx), Math.abs(e.clientY-posy));
        else if(posx>e.clientX && posy<e.clientY)
            tctx.rect(e.clientX, posy, Math.abs(e.clientX-posx), Math.abs(e.clientY-posy));
        else if(posx<e.clientX && posy>e.clientY)
            tctx.rect(posx, e.clientY, Math.abs(e.clientX-posx), Math.abs(e.clientY-posy));
        else
            tctx.rect(e.clientX, e.clientY, Math.abs(e.clientX-posx), Math.abs(e.clientY-posy));
        tctx.stroke();
        tctx.closePath();
    }
}

function Triangle(e){
    if(fin){
        tctx.clearRect(0, 0, tcv.width, tcv.height);
        tctx.beginPath();
        tctx.moveTo(posx, posy);
        tctx.lineTo(e.clientX, e.clientY);
        tctx.lineTo(posx-(e.clientX-posx), e.clientY);
        tctx.lineTo(posx, posy);
        tctx.stroke();
        tctx.closePath();
    }
}

function Undo(){
    if(fin){
        if(cnt > 0){
            cnt --;
            ctx.clearRect(0, 0, cv.width, cv.height);
            var img = new Image();
            img.src = History[cnt];
            img.onload = function(){ctx.drawImage(img, 0, 0);};
        }
        else{
            ctx.clearRect(0, 0, cv.width, cv.height);
            cnt = -1;
        }
    }
}

function Redo(){
    if(cnt<History.length-1 && fin){
        cnt++;
        ctx.clearRect(0, 0, cv.width, cv.height);
        var img = new Image();
        img.src = History[cnt];
        img.onload = function(){ctx.drawImage(img, 0, 0);};
    }
}

function Reset(){
    while(History.length != 0)
        History.pop();
    cnt = -1;
    fin = 1;
    ctx.clearRect(0, 0, cv.width, cv.height);
}

imageloader.onchange = function(e){
    if(fin){
        var reader = new FileReader();
        reader.onload = function(event){
            var img = new Image();
            img.onload = function(){
                ctx.drawImage(img,0,0);
                History.push(cv.toDataURL());
                cnt++;
            };
            img.src = event.target.result;
        }
        reader.readAsDataURL(e.target.files[0]); 
    }
}

function Download(e){
    if(fin){
        var download = document.getElementById("Download");
        var image = cv.toDataURL("image/png").replace("image/png", "image/octet-stream");
        download.setAttribute("href", image);
    }
}

function Frame(){
    if(fin){
        var r = confirm("Once the frame is applied. You will not be able to change anything!");
        if(r)
            fin = 0;
        else
            fin = 1;
        if(!fin){
            if(frame == 1)
                var img = document.getElementById("luxury");
            else if(frame == 2)
                var img = document.getElementById("memecat");
            else
                var img = document.getElementById("mememan");
            ctx.drawImage(img, 0, 0);
        }
    }
}