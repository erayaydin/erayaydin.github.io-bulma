---
layout:     post
title:      "Linux - SDL2 Kurulumu"
subtitle:   "Paket yönetim sistemlerinden ve kaynaktan SDL2 kurulumu"
date:       2015-08-24 01:00:00
author:     "Eray Aydın"
header-img: "media/sdl2.jpg"
tags: [sdl]
---

Linux - SDL2 Kurulumu
========================

### Yum Paket Yöneticisi ile Kurulum

{% highlight bash %}
yum install SDL2-devel
{% endhighlight %}

### Apt Paket Yöneticisi ile Kurulum

{% highlight bash %}
apt-get install libsdl2-dev
{% endhighlight %}

### Pacman Paket Yöneticisi ile Kurulum

{% highlight bash %}
pacman -S sdl2
{% endhighlight %}

### Kaynaktan Derleme

> Kaynaktan derlemek için `base-devel` paketinin yüklü olduğundan emin olunuz.

Kaynak kodu tar.gz olarak [buradan](https://www.libsdl.org/download-2.0.php) indirin.

İndirdiğiniz tar.gz dosyasını açın.

{% highlight bash %}
tar -xf SDL2-X.x.x.tar.gz
{% endhighlight %}

Açılan klasörün içeriğine gidelim. (`cd SDL2-X.x.x`)

{% highlight bash %}
./configure
make
make install
{% endhighlight %}
