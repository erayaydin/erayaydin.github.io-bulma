---
layout:     post
title:      "Linux - Screenfetch Kurulumu"
subtitle:   "Linux için Screenfetch kurulumu"
date:       2016-01-28 16:04:00
author:     "Eray Aydın"
header-img: "media/screenfetch.jpg"
tags: [linux-mint, arch-linux]
---

Linux - Screenfetch Kurulumu
==================

Screenfetch'i indirin.

{% highlight bash %}
wget -O screenfetch 'https://raw.github.com/KittyKatt/screenFetch/master/screenfetch-dev'
{% endhighlight %}

Çalıştırılabilir dosya olarak belirtin.

{% highlight bash %}
chmod +x screenfetch
{% endhighlight %}

Genel kullanım için `/usr/bin`'e taşıyın.

{% highlight bash %}
sudo mv screenfetch /usr/bin/
{% endhighlight %}

Terminal açılınca otomatik çalıştırmak için `~/.bashrc` dosyasını açın.

{% highlight bash %}
nano ~/.bashrc
{% endhighlight %}

Dosyaya `screenfetch` programını ekleyin.

{% highlight bash %}
screenfetch
{% endhighlight %}
