---
layout:     post
title:      "Arch Linux Kurulumu"
subtitle:   "Zorlu olacak fakat buna değecek!"
date:       2015-03-23 12:00:00
author:     "Eray Aydın"
header-img: "media/arch-linux-kurulumu.jpg"
tags: [arch-linux]
---

<div class="alert alert-warning">
	Eski bir yazıyı okumaktasınız, tasarım ile ilgili bazı sorunlar oluşabilir.
</div>

# 1. Adım - Arch ISO dosyasını indirmek ve hazırlamak

Öncelikle [buradan](https://www.archlinux.org/download/) uygun olan bir iso dosyasını indirmeniz gerekiyor. Tavsiyem **torrent** yoluyla indirmeniz. 

ISO dosyamızı indirdiğimize göre şimdi USB belleğimize kurulum ortamını hazırlayacağız.

USB cihazınızı bilgisayarınıza yerleştirin ve `lsblk` komutunu çalıştırarak ismini öğrenin. Örneğin:

{% highlight bash %}
eray@Eray-Ubuntu:~$ lsblk
NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
sda      8:0    0 119.2G  0 disk 
├─sda1   8:1    0  1007K  0 part 
├─sda2   8:2    0    40G  0 part /media/swapnil/2050288e-aafc-4453-
sde      8:64   0 931.5G  0 disk 
└─sde1   8:65   0 931.5G  0 part 
sr0     11:0    1  1024M  0 rom  
{% endhighlight %}

Örnekte görüldüğü üzere **sde** benim USB sürücüm ve **sde1** bu sürücünün bir bölümü. 

``dd`` komutu ile bu cihazı boot edilebilir hale getiriyoruz. X ile belirtilen kısım sizin USB sürücünüzün ismi.

{% highlight bash %}
sudo dd if=/arch_iso_dosyasinin_yolu.iso of=/dev/sdX
{% endhighlight %}

# 2. Adım - Arch Kurulumu

Kurulum sırasında Ethernete ihtiyacınız olacaktır. Wireless işlemi uzun ve yorucu bir işlem. 

Hazırladığımız Arch USB sürücümüzü bilgisayara takalım ve sistemi yeniden başlatalım. Hazırladığımız USB sürücüyü boot etmesini sağlayalım. 

![Arch Linux Boot Screen](http://www.linuxveda.com/wp-content/uploads/2014/06/arch-linux-install-001.jpg)

Boot ekranında sisteminize uygun olan şekilde Boot seçin.

Başta Ethernet bağlantısına ihtiyacınızın olacağını söylemiştim. İsterseniz **wireless** de tercih edebilirsiniz fakat desteklenip desteklenmeyeceği kesin değil. Wireless ile bağlanmayı düşünüyorsanız şu komut ile wireless bağlantısını gerçekleştirebilirsiniz.

{% highlight bash %}
# wifi-menu
{% endhighlight %}

Bu komut bir kutu açacaktır ve bir ağ seçmenizi isteyecektir.

![Wireless Networks](http://www.linuxveda.com/wp-content/uploads/2015/02/wifi-menu-arch-1.png)

OK kısmına tıklayın, bir sonraki pencerede seçtiğiniz ağın ismi gözükecektir. Yeniden OK diyerek ilerleyelim. Sizden ağın şifresini isteyecektir. Şifresini girdikten sonra hatırlanıp hatırlanmamasını isteyecektir. 'Yes' diyelim. Artık wireless bağlantınız bulunmakta.

Internet bağlantımızın olup olmadığını kontrol etmek için bir ping denemesi yapalım.

{% highlight bash %}
ping -c 3 www.google.com
{% endhighlight %}

Eğer ping sonuçlarını görebiliyorsanız internet bağlantımız gerçekleşmiştir.

# 3. Adım - Sabit Sürücüleri Hazırlama

Kurulumda en zor olan kısımlardan biri de sabit sürücüleri yükleme için hazırlamaktır. Diğer dağıtımlarda bu işlemi kolayca grafik arayüzünden yapabiliyorsunuz fakat Arch Linux'ta bu işi manuel olarak yapmanız gerekiyor.

> Bu işlemde belirttiğiniz sabit sürücüler sıfırlanacaktır. Yani verileriniz kaybolacaktır. Bunun için gerekli yedek işlemleri yaptığınızdan emin olun!

Sabit sürücünüzü bölümlendirmenizin için bir çok araç vardır. Eğer GPT bölümlendirme tablosu kullanıyorsanız **cgdisk** kullanmanız gerekiyor. Eğer MBR bölümlendirme tablosu ile yapacaksanız da **cfdisk** kullanacaksınız. Eğer Microsoft Windows ile dual-booting yapacaksanız MBR sizin tek tercihiniz olacaktır.

İki araç da neredeyse aynı hızdadır. 

---

Öncelikle sabit diskimizi bulalım. Bunun için `lsblk` komutunu çalıştırıyoruz.

{% highlight bash %}
sda      8:0    0 119.2G  0 disk 
├─sda1   8:1    0  1007K  0 part 
├─sda2   8:2    0    40G  0 part
sde      8:64   0 931.5G  0 disk 
└─sde1   8:65   0 931.5G  0 part 
{% endhighlight %}

Bu örnekte kurulum yapacağımız disk `sda` ( `sda2` )

### GPT için cgdisk ile sabit sürücüyü ayarlama

Öncelikle komutu çalıştıralım.

{% highlight bash %}
cgdisk /dev/sda
{% endhighlight %}

Eğer yeni bir sistemi kullanıyorsanız tüm alanın boş olduğunu göreceksiniz.

![New System](http://www.linuxveda.com/wp-content/uploads/2015/02/001-BIOS-arch-linux.jpg)

Eğer `cfdisk` kullanıyorsanız 'boot bölümü' oluşturmanıza gerek yok. Bir sonraki adımı atlayabilirsiniz.

### GPT için BIOS boot bölümü oluşturma

Diskin en başına bir Boot bölümü oluşturmamız gerekiyor. Bunun için

{% highlight bash %}
New -> Enter
First Sector -> Enter
Size in Sector -> 1007KiB -> Enter
Hex Code of GUID (L to show pres, Enter = 8300) -> ef02 ->Enter
Enter partition name – > Enter
{% endhighlight %}

1007KiB boyutunda bir BIOS boot bölümü oluştuğunu göreceksiniz.

### Root bölümü oluşturma 

Eğer MBR bölümlendirmesi yapıyorsanız `cfdisk`, GPT bölümlendirmesi yapıyorsanız `cgdisk` kullanmanız gerekiyor. Cfdisk için bölümü belirtmeniz gerekiyor. `dos` şeklinde belirtebilirsiniz.

Boş olan bölümün üzerine gelerek şu adımları gerçekleştirin.

{% highlight bash %}
New -> Enter
First Sector -> Enter
Size in Sector -> 40GB -> Enter (istediğiniz gibi boyutu değiştirebilirsiniz.)
Hex Code of GUID (L to show pres, Enter = 8300) -> Enter
Enter partition name – > Enter
{% endhighlight %}

### Swap bölümü oluşturma

Swap alanı oluşturmak için de:

{% highlight bash %}
Hit New -> Enter
First Sector -> Enter
Size in Sector -> 2GB -> Enter
Hex Code of GUID (L to show pres, Enter = 8300) -> Enter
Enter partition name - > swap
{% endhighlight %}

Bütün bölümlendirme işlemlerini yaptıktan sonra **[write]** seçeneğini seçin. Onay isteyecektir. `yes` yazın ve işleme devam edelim.

### MBR için cfdisk ile sabit sürücüyü ayarlama

{% highlight bash %}
cfdisk /dev/sda
{% endhighlight %}

![cfdisk](http://www.linuxveda.com/wp-content/uploads/2015/02/cfdisk-arch-manual1.png)

Root bölümünü oluşturalım.

{% highlight bash %}
New -> Enter
Partition Size -> 40G
Primary or Extented -> Select Primary
Bootable -> Enter
Write -> Enter -> Yes
{% endhighlight %}

### Swap alanı oluşturma

{% highlight bash %}
New -> Enter
Partition Size -> 2G
Primary or Extented -> Select Primary (or extended, if you are going to create more than 3 partitions on this hard drive)
Write -> Enter -> Yes
{% endhighlight %}

**[write]** seçeneğini seçelim ve onay sorusuna `yes` ile cevaplıyıp işlemi gerçekleştirelim.

---

Durumu kontrol etmek için `lsblk` komutunu çalıştıralım. 

# 4. Adım - Dosya Sistemini Oluşturma

Oluşturduğumuz bölümleri formatlamamız gerekiyor. Oluşturduğumuz root bölümünü ext4 dosya sistemini kullanacak şekilde ayarlayacağız.

{% highlight bash %}
mkfs.ext4 /dev/sdaX
{% endhighlight %}

Şimdi de SWAP alanını ayarlayalım. 

{% highlight bash %}
mkswap /dev/sdaY
swapon /dev/sdaY
{% endhighlight %}

Tekrardan `lsblk` komutu ile oluşturduğumuz alanları kontrol edelim.

# 5. Adım - Bağlama

Arch Linux kurulumuna başlamak üzereyiz. Sabit diskimize kurulum yapmamız için öncelikle onu sisteme bağlamamız gerekiyor. 

{% highlight bash %}
mount /dev/sdaX /mnt
{% endhighlight %}

# 6. Adım - Yansı Seçme

Kurulumun hızlı olması için bize en yakın sunucudan indirme yapmamız gerekiyor.

{% highlight bash %}
nano /etc/pacman.d/mirrorlist
{% endhighlight %}

Size en yakın sunucuyu bulup, listenin en üstüne taşıyın.

# 7. Adım - Temel Paketlerin Kurulumu

Temel paketlerin kurulumuna geçelim.

{% highlight bash %}
pacstrap -i /mnt base base-devel
{% endhighlight %}

# 8. Adım - Dosya Sistemi Tablosunu Ayarlama

Dosya sistemi tablosunu ayarlamak için şu komutu gerçekleştirin.

{% highlight bash %}
genfstab -U -p /mnt >> /mnt/etc/fstab
{% endhighlight %}

Bu komutu sadece 1 kere çalıştırın. Eğer bir sorun oluştursa düzenleme işlemi yapmamız gerekiyor. 

İşlemin başarıyla gerçekleşip gerçekleşmediğini kontrol etmek için

{% highlight bash %}
nano /mnt/etc/fstab
{% endhighlight %}

Açılan dosyada 'root' bölümü için bir kayıt girilmişse, dosya sistemi tablosunu doğru bir şekilde ayarlamışızdır..

Açılan bölümde ayarlama yapmamız için

{% highlight bash %}
arch-chroot /mnt
{% endhighlight %}

# 9. Adım - Dil ve Bölge Ayarlamaları

Oluşturduğumuz yeni sistemimizin dil ayarlarını yapmamız gerekiyor. Dil listesine ulaşmal için şu komutu çalıştırın.

{% highlight bash %}
nano /etc/locale.gen
{% endhighlight %}

Açılan listede kullanmak istediğiniz dilin başında bulunan yorum satırını kaldırın.

Gerekli dili belirttiğimize göre sistemden bu dil için gerekli ayarlamaları yapmasını isteyebilirsiniz.

{% highlight bash %}
locale-gen
echo LANG=DİLADI > /etc/locale.conf
export LANG=DİLADI
{% endhighlight %}

Buradaki `DİLADI` kısmına dil listesinden seçtiğiniz dili belirtin. Örneğin: `en_US.UTF-8`

# 10. Adım - Zamanı Ayarlama

Öncelikle zaman bölgelerini görüntülemek için

{% highlight bash %}
ls /usr/share/zoneinfo/
{% endhighlight %}

Sizin bölgenizin bulunduğu klasörü bulunu. Ardından şu komutu çalıştırın.

{% highlight bash %}
ln -s /usr/share/zoneinfo/[KITA]/[BÖLGE] > /etc/localtime
{% endhighlight %}

Örnek komut

{% highlight bash %}
ln -s /usr/share/zoneinfo/America/New_York > /etc/localtime
{% endhighlight %}

Şimdi de donanıma zaman ayarını haber edelim

{% highlight bash %}
hwclock --systohc --utc
{% endhighlight %}

### Sunucu Adı

Hostname olarak da belirtebileceğimiz, bilgisayar adı/sunucu adını yazalım.

{% highlight bash %}
echo BİLGİSAYAR_ADI > /etc/hostname
{% endhighlight %}

# 11. Adım - Depoları Ayarlayalım

Eğer 64-bit bir sistem kullanıyorsanız ona göre uygun depoları aktifleştirmeniz gerekiyor.

Ayar dosyasını düzenlemek için açın.

{% highlight bash %}
nano /etc/pacman.conf
{% endhighlight %}

'multilib' bölümünün başındaki yorum satırını kaldırın.

{% highlight bash %}
[multilib]
Include = /etc/pacman.d/mirrorlist
{% endhighlight %}

Şimdi depoları güncelleyelim.

{% highlight bash %}
pacman -Sy
{% endhighlight %}

# 12. Adım - Kullanıcı Oluşturma

Her zaman 'root' hesabını kullanacak değiliz. Öncelikle 'root' hesabına bir şifre belirleyecek ardından da yeni kullanıcı açacağız. Root hesabına şifre belirlemek için

{% highlight bash %}
passwd
{% endhighlight %}

Yeni bir kullanıcı oluşturalım

{% highlight bash %}
useradd -m -g users -G wheel,storage,power -s /bin/bash KULLANICI_ADI
{% endhighlight %}

Bu kullanıcıya bir şifre belirleyelim.

{% highlight bash %}
passwd KULLANICI_ADI
{% endhighlight %}

Kullanıcıya 'sudo' yetkisi vermek istiyorsanız

{% highlight bash %}
pacman -S sudo
{% endhighlight %}

Artık sudoers dosyasını düzenlememiz gerekiyor. Normal bir editör ile bu şilemi yapmayın. Aşağıdaki komut ile düzenleme yapamız gerekiyor.

{% highlight bash %}
EDITOR=nano visudo
{% endhighlight %}

Dosyadaki şu satırın başındaki yorum satırı simgesini kaldırmamız gerekiyor.

{% highlight bash %}
%wheel ALL=(ALL) ALL
{% endhighlight %}

### Komut ve Paket İsmi Tamamlayıcı

Komutları ve paket isimlerini daha kolay yazmak için şu paketi kurabilirsiniz. Otomatik olarak devamını yazacaktır.

{% highlight bash %}
pacman -S bash-completion
{% endhighlight %}

# 13. Adım - Boot Yükleyicisini Kurma

Grub kurulumunu ve boot loader ayarlarını yapmamız gerekiyor. Aşağıdaki anlatım **BIOS** içindir. Eğer **UEFI** anakart kullanıyorsanız Arch Linux sayfasından gerekli ayarlamalara bakmalısınız. 

Grub kurulumu için;

{% highlight bash %}
pacman -S grub
grub-install --target=i386-pc --recheck /dev/sda
{% endhighlight %}

Eğer sisteminizde bir başka linux dağıtımı kuruluysa ve grub ekranında onu da göstermek istiyorsanız ayrıca bir paket kurmanız gerekiyor.

{% highlight bash %}
pacman -S os-prober
grub-mkconfig -o /boot/grub/grub.cfg
{% endhighlight %}

Sistem kurulumunu neredeyse tamamladık, fakat yeniden başlatmadan sonra 'ethernet'i otomatik görmesi için ayarlama yapmamız gerekiyor.

{% highlight bash %}
systemctl enable dhcpcd@_arayuz_ismi_girin.service
{% endhighlight %}

Buradaki **_arayuz_ismi_girin** kısmına eth0 tarzı arayüz ismini girmeniz gerekiyor. Arayüz ismini öğrenmek istiyorsanız.

{% highlight bash %}
ip link
{% endhighlight %}

Örnek çıktı şu şekilde olacaktır.

{% highlight bash %}
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group d
efault  
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00 
2: eno1: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP mode DEFAULT
 group default qlen 1000 
    link/ether f4:6d:04:19:2b:bf brd ff:ff:ff:ff:ff:ff 
[swapnil@arch ~]$
{% endhighlight %}

Burada görüldüğü üzere **eno1** arayüz ismi oluyor.

Henüz bitmedi, temel sistem kurulumunu gerçekleştirmek için gerekli ortamları kurduktan sonra yeniden başlatmanız gerekiyor. 

Temel sistem kurulumunu tamamlarken tahmin edebileceğiniz gibi Görüntü Yöneticisi(X Server), masaüstü ortamı, ekran kartı gibi yüklemeler yapmamız da gerekiyor.

Öncelikle 'chroot' arayüzünden çıkmamız gerekiyor.

{% highlight bash %}
exit
{% endhighlight %}

root'u devre dışı bırakalım.

{% highlight bash %}
umount -R /mnt
{% endhighlight %}

ve yeniden başlatalım.


{% highlight bash %}
reboot
{% endhighlight %}

Kurulum için kullandığınız USB/DVD diski çıkartın ki tekrardan oradan boot etmeyelim, kurduğumuz temel sistem açılsın.

# 14. Adım - Kurduğumuz Sisteme Geçme

Kurduğumuz sistem boot edilecektir. İlk girişte kullanıcı adı ve şifre istenecektir. Yeni oluşturduğunuz kullanıcıya giriş yapabilirsiniz fakat her komut için 'sudo' yazmanız gerekecek. Bunun için 'root' hesabı ile giriş yapalım.

Öncelikle 'X Server' kurulumunu yapmamız gerekiyor. 

{% highlight bash %}
pacman -S xorg-server xorg-server-utils xorg-xinit xorg-twm xorg-xclock xterm
{% endhighlight %}

3 Boyut desteği için de MESA paketlerini kurmamız gerekiyor.

{% highlight bash %}
pacman -S mesa
{% endhighlight %}

Mesa kurulumunda 'libgl' dosyasının yerini soracaktır fakat varsayılanı seçmeniz yeterli.

Şimdi ekran kartı sürücüsünü kurmamız gerekiyor.  Ekran kartınızın modelini bildiğinizi varsayarak aşağıdaki tablodan ekran kartınıza uygun paketi seçmenizi istiyorum.

| Marka     | Tür                  | Sürücü                                                    | Multilib(x86-x64)                                                         |
| --------- | -------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------- |
| AMD ATI   | Açık Kaynak / Özel   | xf86-video-ati / catalyst                                 | lib32-mesa-libgl / lib32-catalyst-utils                                   |
| Intel     | Açık Kaynak          | xf86-video-intel                                          | lib32-mesa-libgl                                                          |
| Nvidia    | Açık Kaynak / Özel   | xf86-video-nouveau / nvidia, nvidia-340xx, nvidia-304xx   | lib32-nvidia-libgl / lib32-nvidia-340xx-libgl, lib32-nvidia-304xx-libgl   |

Örneğin şu şekilde kurulum yapabilirsiniz.

{% highlight bash %}
 sudo pacman -S nvidia lib32-nvidia-utils
{% endhighlight %}

Eğer laptop kullanıyorsanız touch-pad kurulumu yapmanız gerekiyor.

{% highlight bash %}
pacman -S xf86-input-synaptics
{% endhighlight %}

# 15. Adım - Masaüstü Ortamını Oluşturma

İstediğiniz bir masaüstü ortamının kurulumunu yapabilirsiniz. Örnek amaçlı KDE kurulumunu yapalım.

{% highlight bash %}
sudo pacman -S kde
{% endhighlight %}

Kurulum sırasında sorular sorulacaktır. İstediğiniz şekilde cevap verebilirsiniz, varsayılan cevapları da kullanabilirsiniz.

Sistem açılışında KDE ile başlaması için

{% highlight bash %}
systemctl enable kdm.service
{% endhighlight %}

Sistem açılışında 'wireless' desteği için `ip link` komutunu gerçekleştirip 'wireless' desteği yapıp yapamayacağınızı öğrenin. Eğer bir wireless cihazı bulunmuşsa 'wireless manager' kurulumunu yapabiliriz.

{% highlight bash %}
pacman -S kdeplasma-applets-plasma-nm
{% endhighlight %}

Ağ Yöneticisini başlatalım.

{% highlight bash %}
systemctl enable NetworkManager
systemctl start NetworkManager
{% endhighlight %}

> Eğer ağ ile ilgili bir sorun yaşıyorsanız büyük ihtimal dhcp hizmetinden kaynaklanıyordur. Dhcp hizmetini sistem başlangıcından kaldıralım. Bunun için
> `systemctl disable dhcpcd.service`

### Plasma ile Ses Yönetimi

Pulseaudio kurulumunu yapalım.

{% highlight bash %}
pacman -S alsa-utils pulseaudio kdemultimedia-kmix
{% endhighlight %}

# 16. Adım - Paket kurulumu nasıl yapılır ve bir kaç yararlı bilgi

Arch Linux'un en büyük avantajlarından biri hemen hemen bütün GNU/Linux dağıtımlarında bulunan paket ve uygulamalara erişiminizin olması.

Arch User Repository-diğer adıyla AUR- binlerce paketi barındırmaktadır (Steam da dahil). AUR'dan paket kurulumu oldukça basit.  **Yaourt** ile çok daha kolay paket kurulumu yapabilirsiniz.

**pacman.conf** dosyasını açın

{% highlight bash %}
nano /etc/pacman.conf
{% endhighlight %}

Depoyu belirtin.

{% highlight bash %}
[archlinuxfr]
SigLevel = Never
Server = http://repo.archlinux.fr/$arch
{% endhighlight %}

Depoları güncelleyelim ve Yaourt'u kuralım

{% highlight bash %}
pacman -Sy
pacman -S yaourt
{% endhighlight %}

Yaourt'tan kurulum yapmak için şu komutu kullanın.

{% highlight bash %}
yaourt
{% endhighlight %}

Bu komut size alakalı bütün paketleri gösterecektir. Kurmak istediğiniz paketin 'numarasını' yazın ve gerisini Yaourt halletsin. Yaourt compile etmeye başlayacaktır. Paket dosyasında düzenleme yapmak isteyip istemediğinizi soracak, ne düzenleyeceğinizi bilmiyorsanız 'n' ile cevap verin.

### Bir Kaç Yararlı Arch Komutları

Depoları güncelleme

{% highlight bash %}
sudo pacman -Sy
{% endhighlight %}

Sistemi güncelleme

{% highlight bash %}
sudo pacman -Syu
{% endhighlight %}

Paketi kaldırma

{% highlight bash %}
sudo pacman -R
{% endhighlight %}

AUR'dan paketleri güncelleme

{% highlight bash %}
yaourt -Syua
{% endhighlight %}

---

> Umarım kurulumu başarıyla tamamlamış ve beğenmişsinizdir.
