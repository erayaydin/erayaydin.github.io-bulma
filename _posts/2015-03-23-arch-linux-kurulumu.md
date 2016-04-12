---
layout:     post
title:      Arch Linux Kurulumu
date:       2015-03-23 12:00:00
summary:    Zorlu olacak fakat buna değecek!
categories:
 - Arch Linux
thumbnail: linux
tags:
 - arch-linux
 - linux
---

> Eski bir yazıyı okumaktasınız, tasarım ile ilgili sorun olabilir veya içerik güncel olmayabilir.

# 1. Adım - Arch ISO dosyasını indirmek ve hazırlamak

Öncelikle [buradan](https://www.archlinux.org/download/) uygun olan bir iso dosyasını indirmeniz gerekiyor. Tavsiyem **torrent** yoluyla indirmeniz.

ISO dosyamızı indirdiğimize göre şimdi USB belleğimize kurulum ortamını hazırlayacağız.

USB cihazınızı bilgisayarınıza yerleştirin ve `lsblk` komutunu çalıştırarak ismini öğrenin. Örneğin:

```bash
eray@Eray-Ubuntu:~$ lsblk
NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
sda      8:0    0 119.2G  0 disk
├─sda1   8:1    0  1007K  0 part
├─sda2   8:2    0    40G  0 part /media/swapnil/2050288e-aafc-4453-
sde      8:64   0 931.5G  0 disk
└─sde1   8:65   0 931.5G  0 part
sr0     11:0    1  1024M  0 rom
```

Örnekte görüldüğü üzere **sde** benim USB sürücüm ve **sde1** bu sürücünün bir bölümü.

``dd`` komutu ile bu cihazı boot edilebilir hale getiriyoruz. X ile belirtilen kısım sizin USB sürücünüzün ismi.

```bash
sudo dd if=/arch_iso_dosyasinin_yolu.iso of=/dev/sdX
```

# 2. Adım - Arch Kurulumu

Kurulum sırasında Ethernete ihtiyacınız olacaktır. Wireless işlemi uzun ve yorucu bir işlem.

Hazırladığımız Arch USB sürücümüzü bilgisayara takalım ve sistemi yeniden başlatalım. Hazırladığımız USB sürücüyü boot etmesini sağlayalım.

![Arch Linux Boot Screen](http://www.linuxveda.com/wp-content/uploads/2014/06/arch-linux-install-001.jpg)

Boot ekranında sisteminize uygun olan şekilde Boot seçin.

Başta Ethernet bağlantısına ihtiyacınızın olacağını söylemiştim. İsterseniz **wireless** de tercih edebilirsiniz fakat desteklenip desteklenmeyeceği kesin değil. Wireless ile bağlanmayı düşünüyorsanız şu komut ile wireless bağlantısını gerçekleştirebilirsiniz.

```bash
# wifi-menu
```

Bu komut bir kutu açacaktır ve bir ağ seçmenizi isteyecektir.

![Wireless Networks](http://www.linuxveda.com/wp-content/uploads/2015/02/wifi-menu-arch-1.png)

OK kısmına tıklayın, bir sonraki pencerede seçtiğiniz ağın ismi gözükecektir. Yeniden OK diyerek ilerleyelim. Sizden ağın şifresini isteyecektir. Şifresini girdikten sonra hatırlanıp hatırlanmamasını isteyecektir. 'Yes' diyelim. Artık wireless bağlantınız bulunmakta.

Internet bağlantımızın olup olmadığını kontrol etmek için bir ping denemesi yapalım.

```
ping -c 3 www.google.com
```

Eğer ping sonuçlarını görebiliyorsanız internet bağlantımız gerçekleşmiştir.

# 3. Adım - Sabit Sürücüleri Hazırlama

Kurulumda en zor olan kısımlardan biri de sabit sürücüleri yükleme için hazırlamaktır. Diğer dağıtımlarda bu işlemi kolayca grafik arayüzünden yapabiliyorsunuz fakat Arch Linux'ta bu işi manuel olarak yapmanız gerekiyor.

> Bu işlemde belirttiğiniz sabit sürücüler sıfırlanacaktır. Yani verileriniz kaybolacaktır. Bunun için gerekli yedek işlemleri yaptığınızdan emin olun!

Sabit sürücünüzü bölümlendirmenizin için bir çok araç vardır. Eğer GPT bölümlendirme tablosu kullanıyorsanız **cgdisk** kullanmanız gerekiyor. Eğer MBR bölümlendirme tablosu ile yapacaksanız da **cfdisk** kullanacaksınız. Eğer Microsoft Windows ile dual-booting yapacaksanız MBR sizin tek tercihiniz olacaktır.

İki araç da neredeyse aynı hızdadır.

---

Öncelikle sabit diskimizi bulalım. Bunun için `lsblk` komutunu çalıştırıyoruz.

```bash
sda      8:0    0 119.2G  0 disk
├─sda1   8:1    0  1007K  0 part
├─sda2   8:2    0    40G  0 part
sde      8:64   0 931.5G  0 disk
└─sde1   8:65   0 931.5G  0 part
```

Bu örnekte kurulum yapacağımız disk `sda` ( `sda2` )

### GPT için cgdisk ile sabit sürücüyü ayarlama

Öncelikle komutu çalıştıralım.

```bash
cgdisk /dev/sda
```

Eğer yeni bir sistemi kullanıyorsanız tüm alanın boş olduğunu göreceksiniz.

![New System](http://www.linuxveda.com/wp-content/uploads/2015/02/001-BIOS-arch-linux.jpg)

Eğer `cfdisk` kullanıyorsanız 'boot bölümü' oluşturmanıza gerek yok. Bir sonraki adımı atlayabilirsiniz.

### GPT için BIOS boot bölümü oluşturma

Diskin en başına bir Boot bölümü oluşturmamız gerekiyor. Bunun için

```bash
New -> Enter
First Sector -> Enter
Size in Sector -> 1007KiB -> Enter
Hex Code of GUID (L to show pres, Enter = 8300) -> ef02 ->Enter
Enter partition name – > Enter
```

1007KiB boyutunda bir BIOS boot bölümü oluştuğunu göreceksiniz.

### Root bölümü oluşturma

Eğer MBR bölümlendirmesi yapıyorsanız `cfdisk`, GPT bölümlendirmesi yapıyorsanız `cgdisk` kullanmanız gerekiyor. Cfdisk için bölümü belirtmeniz gerekiyor. `dos` şeklinde belirtebilirsiniz.

Boş olan bölümün üzerine gelerek şu adımları gerçekleştirin.

```bash
New -> Enter
First Sector -> Enter
Size in Sector -> 40GB -> Enter (istediğiniz gibi boyutu değiştirebilirsiniz.)
Hex Code of GUID (L to show pres, Enter = 8300) -> Enter
Enter partition name – > Enter
```

### Swap bölümü oluşturma

Swap alanı oluşturmak için de:

```bash
Hit New -> Enter
First Sector -> Enter
Size in Sector -> 2GB -> Enter
Hex Code of GUID (L to show pres, Enter = 8300) -> Enter
Enter partition name - > swap
```

Bütün bölümlendirme işlemlerini yaptıktan sonra **[write]** seçeneğini seçin. Onay isteyecektir. `yes` yazın ve işleme devam edelim.

### MBR için cfdisk ile sabit sürücüyü ayarlama

```bash
cfdisk /dev/sda
```

![cfdisk](http://www.linuxveda.com/wp-content/uploads/2015/02/cfdisk-arch-manual1.png)

Root bölümünü oluşturalım.

```bash
New -> Enter
Partition Size -> 40G
Primary or Extented -> Select Primary
Bootable -> Enter
Write -> Enter -> Yes
```

### Swap alanı oluşturma

```bash
New -> Enter
Partition Size -> 2G
Primary or Extented -> Select Primary (or extended, if you are going to create more than 3 partitions on this hard drive)
Write -> Enter -> Yes
```

**[write]** seçeneğini seçelim ve onay sorusuna `yes` ile cevaplıyıp işlemi gerçekleştirelim.

---

Durumu kontrol etmek için `lsblk` komutunu çalıştıralım.

# 4. Adım - Dosya Sistemini Oluşturma

Oluşturduğumuz bölümleri formatlamamız gerekiyor. Oluşturduğumuz root bölümünü ext4 dosya sistemini kullanacak şekilde ayarlayacağız.

```bash
mkfs.ext4 /dev/sdaX
```

Şimdi de SWAP alanını ayarlayalım.

```bash
mkswap /dev/sdaY
swapon /dev/sdaY
```

Tekrardan `lsblk` komutu ile oluşturduğumuz alanları kontrol edelim.

# 5. Adım - Bağlama

Arch Linux kurulumuna başlamak üzereyiz. Sabit diskimize kurulum yapmamız için öncelikle onu sisteme bağlamamız gerekiyor.

```bash
mount /dev/sdaX /mnt
```

# 6. Adım - Yansı Seçme

Kurulumun hızlı olması için bize en yakın sunucudan indirme yapmamız gerekiyor.

```bash
nano /etc/pacman.d/mirrorlist
```

Size en yakın sunucuyu bulup, listenin en üstüne taşıyın.

# 7. Adım - Temel Paketlerin Kurulumu

Temel paketlerin kurulumuna geçelim.

```bash
pacstrap -i /mnt base base-devel
```

# 8. Adım - Dosya Sistemi Tablosunu Ayarlama

Dosya sistemi tablosunu ayarlamak için şu komutu gerçekleştirin.

```bash
genfstab -U -p /mnt >> /mnt/etc/fstab
```

Bu komutu sadece 1 kere çalıştırın. Eğer bir sorun oluştursa düzenleme işlemi yapmamız gerekiyor.

İşlemin başarıyla gerçekleşip gerçekleşmediğini kontrol etmek için

```bash
nano /mnt/etc/fstab
```

Açılan dosyada 'root' bölümü için bir kayıt girilmişse, dosya sistemi tablosunu doğru bir şekilde ayarlamışızdır..

Açılan bölümde ayarlama yapmamız için

```bash
arch-chroot /mnt
```

# 9. Adım - Dil ve Bölge Ayarlamaları

Oluşturduğumuz yeni sistemimizin dil ayarlarını yapmamız gerekiyor. Dil listesine ulaşmal için şu komutu çalıştırın.

```bash
nano /etc/locale.gen
```

Açılan listede kullanmak istediğiniz dilin başında bulunan yorum satırını kaldırın.

Gerekli dili belirttiğimize göre sistemden bu dil için gerekli ayarlamaları yapmasını isteyebilirsiniz.

```bash
locale-gen
echo LANG=DİLADI > /etc/locale.conf
export LANG=DİLADI
```

Buradaki `DİLADI` kısmına dil listesinden seçtiğiniz dili belirtin. Örneğin: `en_US.UTF-8`

# 10. Adım - Zamanı Ayarlama

Öncelikle zaman bölgelerini görüntülemek için

```bash
ls /usr/share/zoneinfo/
```

Sizin bölgenizin bulunduğu klasörü bulunu. Ardından şu komutu çalıştırın.

```bash
ln -s /usr/share/zoneinfo/[KITA]/[BÖLGE] > /etc/localtime
```

Örnek komut

```bash
ln -s /usr/share/zoneinfo/America/New_York > /etc/localtime
```

Şimdi de donanıma zaman ayarını haber edelim

```bash
hwclock --systohc --utc
```

### Sunucu Adı

Hostname olarak da belirtebileceğimiz, bilgisayar adı/sunucu adını yazalım.

```bash
echo BİLGİSAYAR_ADI > /etc/hostname
```

# 11. Adım - Depoları Ayarlayalım

Eğer 64-bit bir sistem kullanıyorsanız ona göre uygun depoları aktifleştirmeniz gerekiyor.

Ayar dosyasını düzenlemek için açın.

```bash
nano /etc/pacman.conf
```

'multilib' bölümünün başındaki yorum satırını kaldırın.

```bash
[multilib]
Include = /etc/pacman.d/mirrorlist
```

Şimdi depoları güncelleyelim.

```bash
pacman -Sy
```

# 12. Adım - Kullanıcı Oluşturma

Her zaman 'root' hesabını kullanacak değiliz. Öncelikle 'root' hesabına bir şifre belirleyecek ardından da yeni kullanıcı açacağız. Root hesabına şifre belirlemek için

```bash
passwd
```

Yeni bir kullanıcı oluşturalım

```bash
useradd -m -g users -G wheel,storage,power -s /bin/bash KULLANICI_ADI
```

Bu kullanıcıya bir şifre belirleyelim.

```bash
passwd KULLANICI_ADI
```

Kullanıcıya 'sudo' yetkisi vermek istiyorsanız

```bash
pacman -S sudo
```

Artık sudoers dosyasını düzenlememiz gerekiyor. Normal bir editör ile bu şilemi yapmayın. Aşağıdaki komut ile düzenleme yapamız gerekiyor.

```bash
EDITOR=nano visudo
```

Dosyadaki şu satırın başındaki yorum satırı simgesini kaldırmamız gerekiyor.

```bash
%wheel ALL=(ALL) ALL
```

### Komut ve Paket İsmi Tamamlayıcı

Komutları ve paket isimlerini daha kolay yazmak için şu paketi kurabilirsiniz. Otomatik olarak devamını yazacaktır.

```bash
pacman -S bash-completion
```

# 13. Adım - Boot Yükleyicisini Kurma

Grub kurulumunu ve boot loader ayarlarını yapmamız gerekiyor. Aşağıdaki anlatım **BIOS** içindir. Eğer **UEFI** anakart kullanıyorsanız Arch Linux sayfasından gerekli ayarlamalara bakmalısınız.

Grub kurulumu için;

```bash
pacman -S grub
grub-install --target=i386-pc --recheck /dev/sda
```

Eğer sisteminizde bir başka linux dağıtımı kuruluysa ve grub ekranında onu da göstermek istiyorsanız ayrıca bir paket kurmanız gerekiyor.

```bash
pacman -S os-prober
grub-mkconfig -o /boot/grub/grub.cfg
```

Sistem kurulumunu neredeyse tamamladık, fakat yeniden başlatmadan sonra 'ethernet'i otomatik görmesi için ayarlama yapmamız gerekiyor.

```bash
systemctl enable dhcpcd@_arayuz_ismi_girin.service
```

Buradaki **_arayuz_ismi_girin** kısmına eth0 tarzı arayüz ismini girmeniz gerekiyor. Arayüz ismini öğrenmek istiyorsanız.

```bash
ip link
```

Örnek çıktı şu şekilde olacaktır.

```bash
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group d
efault
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: eno1: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP mode DEFAULT
 group default qlen 1000
    link/ether f4:6d:04:19:2b:bf brd ff:ff:ff:ff:ff:ff
[swapnil@arch ~]$
```

Burada görüldüğü üzere **eno1** arayüz ismi oluyor.

Henüz bitmedi, temel sistem kurulumunu gerçekleştirmek için gerekli ortamları kurduktan sonra yeniden başlatmanız gerekiyor.

Temel sistem kurulumunu tamamlarken tahmin edebileceğiniz gibi Görüntü Yöneticisi(X Server), masaüstü ortamı, ekran kartı gibi yüklemeler yapmamız da gerekiyor.

Öncelikle 'chroot' arayüzünden çıkmamız gerekiyor.

```bash
exit
```

root'u devre dışı bırakalım.

```bash
umount -R /mnt
```

ve yeniden başlatalım.


```bash
reboot
```

Kurulum için kullandığınız USB/DVD diski çıkartın ki tekrardan oradan boot etmeyelim, kurduğumuz temel sistem açılsın.

# 14. Adım - Kurduğumuz Sisteme Geçme

Kurduğumuz sistem boot edilecektir. İlk girişte kullanıcı adı ve şifre istenecektir. Yeni oluşturduğunuz kullanıcıya giriş yapabilirsiniz fakat her komut için 'sudo' yazmanız gerekecek. Bunun için 'root' hesabı ile giriş yapalım.

Öncelikle 'X Server' kurulumunu yapmamız gerekiyor.

```bash
pacman -S xorg-server xorg-server-utils xorg-xinit xorg-twm xorg-xclock xterm
```

3 Boyut desteği için de MESA paketlerini kurmamız gerekiyor.

```bash
pacman -S mesa
```

Mesa kurulumunda 'libgl' dosyasının yerini soracaktır fakat varsayılanı seçmeniz yeterli.

Şimdi ekran kartı sürücüsünü kurmamız gerekiyor.  Ekran kartınızın modelini bildiğinizi varsayarak aşağıdaki tablodan ekran kartınıza uygun paketi seçmenizi istiyorum.

| Marka     | Tür                  | Sürücü                                                    | Multilib(x86-x64)                                                         |
| --------- | -------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------- |
| AMD ATI   | Açık Kaynak / Özel   | xf86-video-ati / catalyst                                 | lib32-mesa-libgl / lib32-catalyst-utils                                   |
| Intel     | Açık Kaynak          | xf86-video-intel                                          | lib32-mesa-libgl                                                          |
| Nvidia    | Açık Kaynak / Özel   | xf86-video-nouveau / nvidia, nvidia-340xx, nvidia-304xx   | lib32-nvidia-libgl / lib32-nvidia-340xx-libgl, lib32-nvidia-304xx-libgl   |

Örneğin şu şekilde kurulum yapabilirsiniz.

```bash
 sudo pacman -S nvidia lib32-nvidia-utils
```

Eğer laptop kullanıyorsanız touch-pad kurulumu yapmanız gerekiyor.

```bash
pacman -S xf86-input-synaptics
```

# 15. Adım - Masaüstü Ortamını Oluşturma

İstediğiniz bir masaüstü ortamının kurulumunu yapabilirsiniz. Örnek amaçlı KDE kurulumunu yapalım.

```bash
sudo pacman -S kde
```

Kurulum sırasında sorular sorulacaktır. İstediğiniz şekilde cevap verebilirsiniz, varsayılan cevapları da kullanabilirsiniz.

Sistem açılışında KDE ile başlaması için

```bash
systemctl enable kdm.service
```

Sistem açılışında 'wireless' desteği için `ip link` komutunu gerçekleştirip 'wireless' desteği yapıp yapamayacağınızı öğrenin. Eğer bir wireless cihazı bulunmuşsa 'wireless manager' kurulumunu yapabiliriz.

```bash
pacman -S kdeplasma-applets-plasma-nm
```

Ağ Yöneticisini başlatalım.

```bash
systemctl enable NetworkManager
systemctl start NetworkManager
```

> Eğer ağ ile ilgili bir sorun yaşıyorsanız büyük ihtimal dhcp hizmetinden kaynaklanıyordur. Dhcp hizmetini sistem başlangıcından kaldıralım. Bunun için
> `systemctl disable dhcpcd.service`

### Plasma ile Ses Yönetimi

Pulseaudio kurulumunu yapalım.

```bash
pacman -S alsa-utils pulseaudio kdemultimedia-kmix
```

# 16. Adım - Paket kurulumu nasıl yapılır ve bir kaç yararlı bilgi

Arch Linux'un en büyük avantajlarından biri hemen hemen bütün GNU/Linux dağıtımlarında bulunan paket ve uygulamalara erişiminizin olması.

Arch User Repository-diğer adıyla AUR- binlerce paketi barındırmaktadır (Steam da dahil). AUR'dan paket kurulumu oldukça basit.  **Yaourt** ile çok daha kolay paket kurulumu yapabilirsiniz.

**pacman.conf** dosyasını açın

```bash
nano /etc/pacman.conf
```

Depoyu belirtin.

```bash
[archlinuxfr]
SigLevel = Never
Server = http://repo.archlinux.fr/$arch
```

Depoları güncelleyelim ve Yaourt'u kuralım

```bash
pacman -Sy
pacman -S yaourt
```

Yaourt'tan kurulum yapmak için şu komutu kullanın.

```bash
yaourt
```

Bu komut size alakalı bütün paketleri gösterecektir. Kurmak istediğiniz paketin 'numarasını' yazın ve gerisini Yaourt halletsin. Yaourt compile etmeye başlayacaktır. Paket dosyasında düzenleme yapmak isteyip istemediğinizi soracak, ne düzenleyeceğinizi bilmiyorsanız 'n' ile cevap verin.

### Bir Kaç Yararlı Arch Komutları

Depoları güncelleme

```bash
sudo pacman -Sy
```

Sistemi güncelleme

```bash
sudo pacman -Syu
```

Paketi kaldırma

```bash
sudo pacman -R
```

AUR'dan paketleri güncelleme

```bash
yaourt -Syua
```

---

> Umarım kurulumu başarıyla tamamlamış ve beğenmişsinizdir.