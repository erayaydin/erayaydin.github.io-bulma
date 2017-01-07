---
title: "Linux - SDL2 Kurulumu"
categories:
    - Linux
    - SDL2
    - Game-Development
date: 2015-09-24 01:00:00
---

{% include toc title="Başlıklar" icon="anchor" %}

### Yum Paket Yöneticisi ile Kurulum

```bash
yum install SDL2-devel
```

### Apt Paket Yöneticisi ile Kurulum

```bash
apt-get install libsdl2-dev
```

### Pacman Paket Yöneticisi ile Kurulum

```bash
pacman -S sdl2
```

### Kaynaktan Derleme

> Kaynaktan derlemek için `base-devel` paketinin yüklü olduğundan emin olunuz.

Kaynak kodu tar.gz olarak [buradan](https://www.libsdl.org/download-2.0.php) indirin.

İndirdiğiniz tar.gz dosyasını açın.

```bash
tar -xf SDL2-X.x.x.tar.gz
```

Açılan klasörün içeriğine gidelim. (`cd SDL2-X.x.x`)

```bash
./configure
make
make install
```