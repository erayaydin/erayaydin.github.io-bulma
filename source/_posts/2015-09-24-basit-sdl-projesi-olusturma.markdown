---
layout: post
title: "Basit Bir SDL Projesi Oluşturma"
description: "SDL2 kurulumundan sonra bir SDL projesi oluşturuyoruz."
date: 2015-08-24 17:52:00
comments: true
keywords: "sdl, sdl2, project, c++"
category: sdl
tags:
- sdl
- cpp
---

[SDL Kurulumu](http://erayaydin.github.io/blog/2015/linux-sdl2-kurulumu/) yaptıktan sonra, çok basit bir düzeyde SDL projesi oluşturacağız.

Öncelikle C++ ile basit bir SDL kodu yazmamız gerekiyor.

{% highlight c++ %}
#include <SDL2/SDL.h>
#include <stdio.h>

int main(int argc, char* args[])	
{
    if(SDL_Init(SDL_INIT_VIDEO) < 0){
		printf("SDL baslatilamadi! SDL Hatasi: %s\n", SDL_GetError());
	} else {
		printf("SDL baslatildi!\n");
	}
}
{% endhighlight %}

Projemizi derlemede  kullanacağım bir `Makefile` dosyası oluşturalım.

{% highlight make %}
#OBJS derlenecek dosyalar
OBJS = main.cpp
#CC kullanacağımız derleyici
CC = g++

#CFLAGS derleyiciye özel değerlerimiz, -w = Uyarıları gizle
CFLAGS = -w -Wall

#LFLAGS kütüphane linkleyicileri
LFLAGS = -lSDL2

#OBJ çalıştırılabilir dosyamızın adı olacak
OBJ = main

#sadece `make` kullanıldığında çalışacak olan komutumuz
all : $(OBJS)
	$(CC) $(OBJS) $(CFLAGS) $(LFLAGS) -o $(OBJ)
{% endhighlight %}

Projemizi `Make` ile derleyelim.

{% highlight bash %}
make
{% endhighlight %}

Projemizi çalıştıralım.

{% highlight bash %}
./main
{% endhighlight %}