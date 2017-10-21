//共享onload事件，当执行函数多的时候很方便
function addLoadEvent(func) {
    var oldonload=window.onload;
    if (typeof window.onload!='function') {
        window.onload=func;
    }
    else {
        window.onload=function(){
            oldonload();
            func();
        }
    }
}
//添加到目标元素后面
function insertAfter(newElement,targetElement) {
    var parent=targetElement.parentNode;
    if (parent.lastChild==targetElement) {
        parent.appendChild(newElement);
    }
    else {
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}
function addClass(element,value){
    if(!element.className){
        element.className=value;
    }
    else {
        newClassName=element.className;
        newClassName+="";
        newClassName+=value;
        element.className=newClassName;
    }
}
//页面突出显示函数
function highlightPage(){
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById) return false;
    var headers=document.getElementsByTagName('header');
    if(headers.length==0)    return false;
    var navs=headers[0].getElementsByTagName('nav');
    if(navs.length==0)   return false;
    var links=navs[0].getElementsByTagName('a');
    var linkurl;
    var currenturl;
    for (var i = 0; i < links.length; i++) {
        linkurl=links[i].getAttribute("href");
        currenturl=window.location.href;
        if(currenturl.indexOf(linkurl)!=-1)
        {
            links[i].className="here";
            var linktext=links[i].lastChild.nodeValue.toLowerCase();
            document.body.setAttribute("id",linktext);
        }
    }
}
addLoadEvent(highlightPage);
//移动元素函数
function moveElement(elementID,final_x,final_y,interval) {
    if(!document.getElementById) return false;
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById(elementID)) return false;
    var elem=document.getElementById(elementID);
    if(elem.movement){
        clearTimeout(elem.movement);
    }
    if(!elem.style.left){
        elem.style.left="0px";
    }
    if(!elem.style.top){
        elem.style.top="0px";
    }
    var xpos=parseInt(elem.style.left);
    var ypos=parseInt(elem.style.top);
    if(xpos==final_x&&ypos==final_y){
        return true;
    }
    if(xpos<final_x){
        var dist=Math.ceil((final_x-xpos)/10);
        xpos+=dist;
    }
    if(xpos>final_x){
        var dist=Math.ceil((xpos-final_x)/10);
        xpos-=dist;
    }
    if(ypos<final_y){
        var dist=Math.ceil((final_y-ypos)/10);
        ypos+=dist;
    }
    if(ypos>final_y){
        var dist=Math.ceil((ypos-final_y)/10);
        ypos-=dist;
    }
    elem.style.left=xpos+"px";
    elem.style.top=ypos+"px";
    var repeat="moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
    elem.movement=setTimeout(repeat,interval)
}
//插入幻灯片框，播放幻灯片
function prepareSlideshow() {
    if(!document.getElementById) return false;
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById("intro")) return false;
    var intro=document.getElementById("intro");
    var slideshow=document.createElement("div");
    slideshow.setAttribute("id","slideshow");
    var frame=document.createElement("img");
    frame.setAttribute("src","images/frame.gif");
    frame.setAttribute("alt","");
    frame.setAttribute("id","frame");
    slideshow.appendChild(frame);
    var preview=document.createElement("img");
    preview.setAttribute("src","images/slideshow.gif");//这里的路径是HTML文件的相对路径，！！！
    preview.setAttribute("alt","幻灯片");
    preview.setAttribute("id","preview");
    slideshow.appendChild(preview);
    insertAfter(slideshow,intro);
    var links=document.getElementsByTagName("a");
    var destination;
    for (var i = 0; i < links.length; i++) {
            links[i].onmouseover=function() {
                destination=this.getAttribute("href");
                if(destination.indexOf("index.html")!=-1)
                {
                    moveElement("preview",0,0,5);
                }
                if(destination.indexOf("about.html")!=1)
                {
                    moveElement("preview",-150,0,5);
                }
                if(destination.indexOf("photos.html")!=-1)
                {
                    moveElement("preview",-300,0,5);
                }
                if(destination.indexOf("live.html")!=-1)
                {
                    moveElement("preview",-450,0,5);
                }
                if(destination.indexOf("contact.html")!=-1)
                {
                    moveElement("preview",-600,0,5);
                }
        }
    }
}
addLoadEvent(prepareSlideshow);
//about里每次只显示一部分内容
function showSection(id){
    var sections=document.getElementsByTagName("section");
    for (var i = 0; i <sections.length; i++) {
        if(sections[i].getAttribute("id")!=id)
        {
            sections[i].style.display="none";
        }
        else {
            sections[i].style.display="block";
        }
    }
}
function prepareInternalnav(){
    if(!document.getElementById) return false;
    if(!document.getElementsByTagName) return false;
    var articles=document.getElementsByTagName("article");
    if(articles.length==0) return false;
    var navs=articles[0].getElementsByTagName("nav");
    if(navs.length==0) return false;
    var nav=navs[0];
    var links=nav.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        var sectionId=links[i].getAttribute("href").split("#")[1];
        if(!document.getElementById(sectionId)) continue;
        document.getElementById(sectionId).style.display="none";
        links[i].destination=sectionId;
        links[i].onclick=function(){
            showSection(this.destination);
            return false;
        }
    }
}
addLoadEvent(prepareInternalnav);

//photos显示图片
function preparePlaceholder() {
    if(!document.getElementById) return false;
    if(!document.createElement) return false;
    if(!document.createTextNode) return false;
    if(!document.getElementById("imagegallery")) return false;
    var gallery=document.getElementById("imagegallery");
    var placeholder=document.createElement("img");
    placeholder.setAttribute("src","images/placeholder.gif");
    placeholder.setAttribute("alt","placeholder");
    placeholder.setAttribute("id","placeholder");
    //insertAfter(placeholder,gallery);
    var description=document.createElement("p");
    var desctext=document.createTextNode("Choose a images!");
    description.appendChild(desctext);
    description.setAttribute("id","description");
    insertAfter(description,gallery);
    insertAfter(placeholder,description);


}
addLoadEvent(preparePlaceholder);

function showPic(whichpic) {
    if(!document.getElementById("placeholder")) return false;
    var source = whichpic.getAttribute("href");
    var placeholder=document.getElementById('placeholder');
    if(placeholder.nodeName!="IMG") return false;
    placeholder.setAttribute("src",source);
    if(document.getElementById("description")){
        var description=document.getElementById("description");
        if (whichpic.getAttribute("title")) {
            var source_desc=whichpic.getAttribute("title");
        }
        else {
            var source_desc="";
        }
        if (description.firstChild.nodeType == 3) {
            description.firstChild.nodeValue=source_desc;
        }
    }
    return true;
}

function prepareGallery() {
    if (!document.getElementsByTagName) {
        return false;
    }
    if (!document.getElementById) {
        return false;
    }
    if (!document.getElementById("imagegallery")) {
        return false;
    }
    var gallery=document.getElementById("imagegallery");
    var links=gallery.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        links[i].onclick=function () {
            return !showPic(this);
        }
    }
}
addLoadEvent(prepareGallery);

//live表格样式
function stripeTables() {
    if(!document.getElementsByTagName) return false;
    var tables=document.getElementsByTagName("table");
    for (var i = 0; i < tables.length; i++) {
        var odd=false;
        var rows=tables[i].getElementsByTagName("tr");
        for (var j = 0; j < rows.length; j++) {
            if(odd==true){
                addClass(rows[j],"odd");
                odd=false;
            }
            else {
                odd=true;
            }
        }
    }
}
addLoadEvent(stripeTables);

function highlightRows() {
    if(!document.getElementsByTagName)  return false;
    var rows=document.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        rows[i].oldClassName=rows[i].className;
        rows[i].onmouseover=function() {
            addClass(this,"highlight");
        }
        rows[i].onmouseout=function() {
            this.className=this.oldClassName;
        }
    }
}
addLoadEvent(highlightRows);


//contact页面的表单
//label获取焦点，如果浏览器不支持的情况下
function focuslabels() {
    if(!document.getElementsByTagName) return false;
    var labels=document.getElementsByTagName("label");
    for (var i = 0; i < labels.length; i++) {
        if(!labels[i].getAttribute("for")) continue;
        labels[i].onclick=function(){
            var id=this.getAttribute("for");
            if(!document.getElementById(id)) return;
            var element=document.getElementById(id);
            element.focus();
        }

    }
}
//和placeholer作用一样
function resetFields(whichform) {
    if(Modernizr.input.placeholder) return;
    for (var i = 0; i < whichform.elements.length; i++) {
        var element=whichform.elements[i];
        if (element.type=="submit") {
            continue;
        }
        var check=element.placeholder||element.getAttribute("placeholder");
        if(!check) continue;
        element.onfocus=function() {
            var text=this.placeholder||this.getAttribute("placeholder");
            if (this.value==text) {
                this.className="";
                this.value="";
            }
        }
        element.onblur=function () {
            if (this.value="") {
                this.className='placeholder';
                this.value=this.placeholder||this.getAttribute("placeholder");
            }
        }
        element.onblur();
    }
}
addLoadEvent(focuslabels);
// IDEA检验表单
function isFilled(field) {
    if(field.value.replace(" ","").length==0) return false;
    var placeholder=field.placeholder||field.getAttribute("placeholder");
    return(field.value!=placeholder);
}
function isEmail(field) {
    return(field.value.indexOf("@")!=-1&&field.value.indexOf(".")!=-1);
}

// IDEA: 必填字段检验
function validateForm(whichform) {
    for (var i = 0; i < whichform.elements.length; i++) {
        var element=whichform.elements[i];
        if(element.required=="required")
        {
            if(!isFilled(element)){
                alert("请输入"+element.name+"的内容！");
                return false;
            }
        }
        if(element.type=="email")
        {
            if(!isEmail(element)){
                alert("请输入有效的"+element.name+"!");
                return false;
            }
        }
    }
    return true;
}


/*function getHTTPObject() {
    if(typeof XMlHttpRequest=="undefined")
        XMlHttpRequest=function(){
            try {
                return new ActiveXObject("Msxml2.XMLHTTP.6.0");}
                catch (e) {}
            try {
                return new ActiveXObject("Msxml2.XMLHTTP.3.0");}
                catch (e) {}
            try {
                return new ActiveXObject("Msxml2.XMLHTTP");}
                catch (e) {}
            return false;
        }
    return new XMlHttpRequest();
}
*/


// IDEA加载图像
function displayAjaxLoading(element) {
    while (element.hasChildNodes()) {
        element.removeChild(element.lastChild);
    }
    var content=document.createElement("img");
    content.setAttribute("src","images/loading.gif");
    content.setAttribute("alt","loading...");
    element.appendChild(content);
}
function submitFormWithAjax(whichform,thetarget) {
    //var request=getHTTPObject();
    var request;
    if (window.XMLHttpRequest)
      {// code for IE7+, Firefox, Chrome, Opera, Safari
      request=new XMLHttpRequest();
      }
    else
      {// code for IE6, IE5
      request=new ActiveXObject("Microsoft.XMLHTTP");
      }
    //if(!request) return false;
    displayAjaxLoading(thetarget);
    var dataParts=[];
    var element;
    for (var i = 0; i < whichform.elements.length; i++) {
        element=whichform.elements[i];
        dataParts[i]=element.name+ '=' + encodeURIComponent(element.value);
    }
    var data=dataParts.join('&');
    request.open("POST",whichform.getAttribute("action"),true);
    request.setRequestHeader("Content-type","application/x-www-form-urlencoded;charset=utf-8");
    request.onreadystatechange=function(){
        if(request.readyState==4){
            if(request.status==200||request.status==0){
                var matches=request.responseText.match(/<article>([\s\S]+)<\/article>/);
                if (matches.length>0) {
                    thetarget.innerHTML=matches[1];
                }
                else {
                    thetarget.innerHTML="<p>发生了错误！</p>";
                    }
                }
            else {
                    thetarget.innerHTML='<p>'+request.statusText+'</p>';
                }
        }
    }
    request.send(data);
    return true;

}
function prepareForms() {
    for (var i = 0; i < document.forms.length; i++) {
        var thisform=document.forms[i];
        resetFields(thisform);
        thisform.onsubmit=function(){
            if (!validateForm(this)) {
                return false;
            }
            var article=document.getElementsByTagName("article")[0];
            if(submitFormWithAjax(this,article)) return false;
            return true;
        }

    }
}
addLoadEvent(prepareForms);
