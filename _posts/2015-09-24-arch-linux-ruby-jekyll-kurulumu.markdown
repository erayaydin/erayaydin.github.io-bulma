---
layout:     post
title:      "Arch Linux - Ruby ve Jekyll Kurulumu"
subtitle:   "Ruby, RubyGems, Bundler, Jekyll ve GithubPages kurulumu"
date:       2015-08-24 01:58:00
author:     "Eray Aydın"
header-img: "media/ruby.jpg"
tags: [arch-linux]
---

Arch Linux - Ruby ve Jekyll Kurulumu
========================

## Ruby Kurulumu

Ruby ile birlikte artık RubyGems de kuruluyor. O yüzden ayrıca bir RubyGems kurulumu 
yapmayacağız.

{% highlight bash %}
pacman -S ruby
{% endhighlight %}

## RubyGems Ayarlaması

RubyGems kurulu fakat gemlerin içerisindeki çalıştırılabilir dosyaları direk 
çalıştıramıyoruz. Tam yol belirtmemiz gerekiyor. Bu sorunu çözmek için PATH dizinine 
RubyGems yolunu ekleyeceğiz. `~/.bashrc` dosyasına şu eklemeyi yapalım.

{% highlight bash %}
PATH="$(ruby -e 'print Gem.user_dir')/bin:$PATH"
{% endhighlight %}

**Kurulu gemleri göster**mek için

{% highlight bash %}
gem list
{% endhighlight %}

**Bir gem ile ilgili bilgi al**mak için

{% highlight bash %}
gem spec gem_adi
{% endhighlight %}

Şu ana kadar yaptığımız komutların hepsi `--local` değeri ile çalışıyor. Yani bizim 
sistemimizdeki **gem**leri tarıyor/inceliyor. Eğer uzak sunucudaki gemleri incelemek 
istiyorsak `--remote` değeri eklememiz yeterli.

{% highlight bash %}
gem spec mysql --remote
{% endhighlight %}

MySQL **gem**i yüklü olmasada uzak sunucudan bilgisini getirecektir.

**Gem yükle**mek için

{% highlight bash %}
gem install mysql
{% endhighlight %}

Bu komutla beraber **mysql** gem yüklenecektir fakat dökümantasyonları da indirecek. 
Eğer **production** ortamında kurulum yapıyorsanız dökümantasyona ihtiyacınız 
olmayabilir. Dökümantasyon olmadan kurulum yapmak için `--no-document` yapmanız 
yeterli.

{% highlight bash %}`
gem install mysql --no-document
{% endhighlight %}

**Yüklü gemleri güncelleştir**mek için

{% highlight bash %}
gem update
{% endhighlight %}

## Bundler Kurulumu

**Bundler**, **Ruby**'nin paket yönetim amaçlı oluşturulmuş bir **gem**idir.

{% highlight bash %}
gem install bundler
{% endhighlight %}

## Jekyll Kurulumu

**Ruby** ve **RubyGems** kurulumu yaptığımıza göre **Jekyll** kurulumu yapabiliriz.

Kurulumdan önce **gem**leri güncelleyelim.

{% highlight bash %}
gem update
{% endhighlight %}

`jekyll` **gem**i kuralım.

{% highlight bash %}
gem install jekyll
{% endhighlight %}

## Jekyll Başlangıç Projesi Oluşturma

`jekyll` **gem**i ile birlikte  `jekyll`  komutumuz geliyor. Örnek bir proje oluşturmak 
için şu komutu kullanmamız yeterli.

{% highlight bash %}
jekyll new proje_ismi
{% endhighlight %}

## Jekyll Projesini Çalıştırma

Oluşturduğumuz projenin dizinine ulaşarak şu komutla jekyll'i çalıştırabiliriz.

{% highlight bash %}
jekyll serve
{% endhighlight %}

`http://127.0.0.1:4000` adresinden Jekyll projemizi inceleyebiliriz.

## Github Pages Gemlerini Yükleme

Jekyll projemizi Github Pages'e göre yapmamız için Github Pages'ın kullandığı 
**gem**leri kullanmamız gerekiyor. (Tabi ki localde oluşturup _site klasörünü 
yükleyebiliriz fakat saçma olmaz mı?)

Projenin ana dizininde `Gemfile` isminde bir dosya oluşturun ve içeriğini şu şekilde 
düzenleyin.

{% highlight bash %}
source 'https://rubygems.org'
gem 'github-pages'
{% endhighlight %}

`bundle install` komutu ile gerekli gemlerin yüklenmesini sağlayın.

## Ekstra: safe_yaml Psych sorunu

Eğer `uninitialized constant Psych::Nodes (NameError)` şeklinde bir hata alıyorsanız 
bunun sebebi Github-Pages'in belirli bir Psych versiyonu ile çalışmasından 
kaynaklanıyor. Eski bir psych versiyonunu kullanmanız gerekiyor.

Github Pages projenizi şu komut ile çalıştırırsanız bir sorun oluşmayacaktır.

{% highlight bash %}
gem cleanup
bundle exec jekyll serve
{% endhighlight %}
