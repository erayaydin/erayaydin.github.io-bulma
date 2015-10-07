---
layout:     post
title:      "Pixi.js - Başlangıç"
subtitle:   "HTML5 Game Framework"
date:       2015-04-06 12:00:00
author:     "Eray Aydın"
header-img: "media/pixi-js-baslangic.jpg"
tags: [html5]
---

<div class="alert alert-warning">
	Eski bir yazıyı okumaktasınız, tasarım ile ilgili bazı sorunlar oluşabilir.
</div>

Pixi.js - Başlangıç
===============

Bu makale serisinde Pixi.js ile ilgili anlatımlar yer alacaktır. 

## Ortamın Hazırlanması

Öncelikle Pixi.js'yi indirmemiz gerekiyor. Bunun için github'ı kullanacağız. `git` kurulumunuzu yaptığınızı varsayarak devam ediyorum.

{% highlight bash %}
git clone https://github.com/GoodBoyDigital/pixi.js.git
{% endhighlight %}

Bize aslında gereken `bin` klasörü içerisindeki `pixi.js` dosyası fakat kaynak kodlarını da indirmemiz avantajımıza olacaktır.

Hemen bir index.html dosyası oluşturalım ve bu `pixi.js` kütüphanemizi dosyaya ekleyelim. 

Daha sonra karışma olmaması için `uygulama` isminde bir klasör oluşturuyoruz ve içerisine bu `index.html` dosyamızı oluşturalım.

{% highlight html %}
<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">

	<title>Pixi.js</title>

	<!--[if lt IE 9]>
	<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
</head>
<body>

<!-- Pixi.js -->
<script src="../bin/pixi.js"></script>
</body>
</html>
{% endhighlight %}

## Stage

**Stage**, görünümün ana kısmıdır. Her nesne **stage**'e bağlanmakta ve görüntülenmektedir. Yani nesnelerimizi, sahnemizi ve bütün ortamı 
**stage** kullanarak yerleştireceğiz.

{% highlight javascript %}
// PIXI.Stage(backgroundColor);
var stage = new PIXI.Stage(0xFFFFFF); // Beyaz arkaplan
{% endhighlight %}

## Renderer

**Renderer**, Stage'i ve stage içerisindeki tüm nesneleri ekrana çizer. WebGL ve Canvas seçiminize göre bu çizim işlemi yapılır.

{% highlight javascript %}
/*
 * Canvas Renderer
 * PIXI.CanvasRenderer(uzunluk=800], [yukseklik=600], [ozellikler]);
 */
var canvasRenderer = new PIXI.CanvasRenderer(800, 600);

/*
 * WebGL Renderer
 * PIXI.WebGLRenderer([uzunluk=0], [yukseklik=0], [ozellikler]);
 *
 */
 var webGLRenderer = new PIXI.WebGLRenderer(800, 600);

/*
 * Auto Detect Renderer
 * Otomatik olarak uygun olan render seçimini yapar.
 * PIXI.autoDetectRenderer([uzunluk=0], [yukseklik=0], [ozellikler]);
 */
 var autoDetectRenderer = new PIXI.autoDetectRenderer(800, 600);
{% endhighlight %}

**Auto Detect Renderer** kullanmak daha iyi olacaktır. Eğer tarayıcı WebGL çalıştırıyorsa WebGL, çalıştırmıyorsa Canvas kullanacaktır.

## Frame

Çizimin her karede yapılması gerekiyor, öbür türlü ilk frameden sonra bir çizim gerçekleşmeyecektir. Bunun için bir döngü oluşturacağız ve 
sürekli çizim yapılmasını sağlayacağız.

{% highlight javascript %}
document.body.appendChild(renderer.view);
requestAnimFrame(cizimYap);
function cizimYap() {
	requestAnimFrame(cizimYap); 
	renderer.render(stage);
}
{% endhighlight %}

Farkettiyseniz bizim **renderer** isminde bir değişkenimiz yok. Bu değişkeni seçtiğiniz **renderer**'a göre ayarlamanız gerekiyor.

Şimdi sonuç olarak oluşturduğumuz script:

{% highlight javascript %}
var stage = new PIXI.Stage(0xFFFFFF);
var renderer = new PIXI.autoDetectRenderer(400, 300);

document.body.appendChild(renderer.view);
requestAnimFrame(cizimYap);
function cizimYap() {
	requestAnimFrame(cizimYap); 
	renderer.render(stage);
}
{% endhighlight %}

Çalışıp çalışmadığını kontrol etmek isterseniz isterseniz arkaplanı kırmızı yapabilirsiniz.

> `0xFF0303` renk kodunu kullanabilirsiniz.

## Texture

**Texture** ile resim dosyalarını hafızada tutacağız. Bu sayede **sprite**'da resim kullanmamız gerektiğinde bu **texture** nesnesini 
kullanacağız. Bu sayede resimler tekrar ve tekrar yüklenmeyecek, sadece 1 defa çekilecektir.

{% highlight javascript %}
// PIXI.Texture.fromImage(dosyaYolu, orjin, olcek);
var texture = PIXI.Texture.fromImage("resim.png");
{% endhighlight %}

## Sprite

Sprite'lar sahnemizdeki nesnelerimiz olacaktır. 

{% highlight javascript %}
// PIXI.Sprite(PIXI.Texture texture);
var sprite = new PIXI.Sprite(texture);
{% endhighlight %}

### Anchor

Nesnelerimizin orjin noktası olacaktır. Texture resmi de orjin noktasına göre çizilecektir. Bu sayede objenin tam olarak orta noktasının 
neresi olacağını belirliyoruz.

{% highlight javascript %}
/* 0-0     => Sol Üst
 * 0.5-0.5 => Ortala
 * 1-1     => Sağ Alt
 */
sprite.anchor.x = 0.5;
sprite.anchor.y = 0.5;
{% endhighlight %}

### Position

Sprite nesnesinin sahnede bulunacağı koordinatlardır.

{% highlight javascript %}
sprite.position.x = 200;
sprite.position.y = 150;
{% endhighlight %}

### Rotation

Sprite nesnesini orjin etrafında döndürmenizi sağlar.

{% highlight javascript %}
sprite.rotation += 0.1;
{% endhighlight %}

> Döndürme kodunu çizim döngüsü dışında yaparsanız sadece 1 seferlik +0.1 artış yapacaktır. Sürekli dönmesi için döngü içerisinde bu kodu 
kullanmanız gerekiyor.

### Sahneye Ekleme

Sprite nesnemizi artık sahneye ekleyelim.

{% highlight javascript %}
stage.addChild(sprite);
{% endhighlight %}

## Tüm Kaynak

Ders içerisindeki bilgilerle yapılan tüm script kodu

{% highlight javascript %}

var stage = new PIXI.Stage(0xFFFFFF);
var renderer = new PIXI.autoDetectRenderer(400, 300);

var texture = PIXI.Texture.fromImage("resim.png");
var sprite  = new PIXI.Sprite(texture);

sprite.anchor.x = 0.5;
sprite.anchor.y = 0.5;

sprite.position.x = 200;
sprite.position.y = 150;

stage.addChild(sprite);

document.body.appendChild(renderer.view);
requestAnimFrame(cizimYap);
function cizimYap() {
	requestAnimFrame(cizimYap); 

	sprite.rotation += 0.1;

	renderer.render(stage);
}

{% endhighlight %}
