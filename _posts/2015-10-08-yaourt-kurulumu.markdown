---
layout:     post
title:      "Yaourt Kurulumu"
subtitle:   "Arch Linux için Pacman Yardımcısı"
date:       2015-10-08 16:46:00
author:     "Eray Aydın"
header-img: "media/yaourt.jpg"
tags: [arch-linux]
---

Yaourt Kurulumu
========================

Arch User Repository-diğer adıyla AUR- binlerce paketi barındırmaktadır (Steam da 
dahil). AUR’dan paket kurulumu oldukça basit. Yaourt ile çok daha kolay paket kurulumu 
yapabilirsiniz.

**pacman.conf** dosyasını açın

{% highlight bash %}
nano /etc/pacman.conf
{% endhighlight %}

En alt satıra alttaki depoyu ekleyin.

{% highlight bash %}
[archlinuxfr]
SigLevel = Never
Server = http://repo.archlinux.fr/$arch
{% endhighlight %}

Depoları güncelleyin ve yaourt paketini kurun.

{% highlight bash %}
pacman -Sy
pacman -S yaourt
{% endhighlight %}

Yaourt kurulumunu kontrol edin.

{% highlight bash %}
yaourt --version
{% endhighlight %}
