function _preparaNavegador() {
		var meta0=document.createElement("META");
		meta0.httpEquiv="Content-type";
		meta0.content="text/html; charset=utf-8";
		document.head.appendChild(meta0);
		var meta1=document.createElement("META");
		meta1.name="viewport";
		meta1.content="width=device-width initial-scale=1.0 maximum-scale=1.0 user-scalable=0";
		document.head.appendChild(meta1);
		var meta2=document.createElement("META");
		meta2.name="apple-mobile-web-app-capable";
		meta2.content="yes";
		document.head.appendChild(meta2);
		var meta3=document.createElement("META");
		meta3.name="mobile-web-app-capable";
		meta3.content="yes";
		document.head.appendChild(meta3);
		var meta4=document.createElement("META");
		meta4.name="apple-mobile-web-app-status-bar-style";
		meta4.content="black";
		document.head.appendChild(meta4);
		var style = document.head.getElementsByTagName("STYLE")[0];
		if (!style) {
			style=document.createElement("STYLE");
			document.head.appendChild(style);
		}
		style.innerHTML+="* {"+
			"-webkit-tap-highlight-color: transparent;"+
			"-webkit-user-drag: none;"+
			"-webkit-touch-callout: none;"+
			"-webkit-user-select: none;"+
			"-khtml-user-select: none;"+
			"-moz-user-select: none;"+
			"-ms-user-select: none;"+
			"-ms-touch-action: manipulation;"+
			"touch-action: manipulation;"+
			"overflow:hidden;"+
			"}";
		document.ontouchmove=	function(event){event.preventDefault();}
		document.ontouchstart=	function(event){event.preventDefault();}
		document.ontouchcancel=	function(event){event.preventDefault();}
		document.onmousedown=	function(event){event.preventDefault();}
		document.onclick=		function(event){event.preventDefault();}
		document.ondblclick=	function(event){event.preventDefault();}
		document.oncontextmenu=	function(event){event.preventDefault();}
		document.ondrag=		function(event){event.preventDefault();}
		window.ontouchmove=	function(event){event.preventDefault();}
		window.ontouchstart=	function(event){event.preventDefault();}
		window.ontouchcancel=	function(event){event.preventDefault();}
		window.onmousedown=	function(event){event.preventDefault();}
		window.onclick=		function(event){event.preventDefault();}
		window.ondblclick=		function(event){event.preventDefault();}
		window.oncontextmenu=	function(event){event.preventDefault();}
		window.ondrag= 		function(event){event.preventDefault();}
	}

	function centraIampliaCanvas(obj){
	//var ctx = obj.getContext("2d");
	document.body.style.height = window.innerHeight;
	requestAnimationFrame (function(){ // Alguns navegadors triguen una mica a indicar mida correcte de pantalla.
//		console.log("HE ARRIBAT");
		//obj.style.width = obj.width + "px";
		//obj.style.height = obj.height + "px";
		obj.style.left = window.innerWidth/ 2 - obj.width / 2+"px ";
		obj.style.bottom =window.innerHeight/ 2 - obj.height / 2+"px";
		var w =  window.innerWidth/obj.width;
		var h =  window.innerHeight/obj.height;
		var mesPetit=0;
		if (h<w){mesPetit = h;}else{mesPetit = w;}
		obj.style.transform = "scale("+mesPetit+")";
		obj.style.msTransform="scale("+mesPetit+")";
		obj.style.MozTransform="scale("+mesPetit+")";
		obj.style.WebkitTransform="scale("+mesPetit+")";
		//obj.style.height  = obj.height*h + "px";
//		console.log(mesPetit)
//		console.log("HE ARRIBAT 2 "+obj.width+" "+ w + " = "+obj.offsetWidth);
//		console.log("HE ARRIBAT 2 "+obj.height+" "+ h + " = "+obj.offsetHeight);
		
	});
};