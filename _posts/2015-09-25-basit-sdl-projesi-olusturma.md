---
layout:     post
title:      Basit Bir SDL Projesi Oluşturma
date:       2015-09-25 17:52:00
summary:    SDL2 kurulumundan sonra bir SDL projesi oluşturuyoruz.
series: "SDL 2"
categories:
 - C++
 - Game Development
 - SDL 2
thumbnail: linux
tags:
 - C++
 - SDL 2
 - Linux
 - Game Development
---

Öncelikle C++ ile basit bir SDL kodu yazmamız gerekiyor.

```c++
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
```

Projemizi derlemede  kullanacağım bir `Makefile` dosyası oluşturalım.

```make
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
```

Projemizi `Make` ile derleyelim.

```bash
make
```

Projemizi çalıştıralım.

```bash
./main
```