---
layout: page
title: Hakkımda
menu: about
subtitle:   <h3>CV İndir</h3>
            <a role="button" class="btn btn-primary hvr-grow-shadow" href="/assets/files/cv.pdf" target="_blanks">
                <span class="flag-icon flag-icon-tr"></span> Türkçe
            </a>

css: ['about.css', 'sidebar-popular-repo.css', '../../bower_components/flag-icon-css/css/flag-icon.min.css']
---

<div class="about row">

    <div class="col-md-8">

        <h2>Hakkımda</h2>

        <p>Merhaba, Ben <strong>Eray Aydın</strong>. Çeşitli programlama dilleriyle web projeleri geliştirmekteyim. PHP, HTML5, CSS3, Javascript, jQuery ve NodeJS ile web projeleri yapıyorum. Web geliştirmeyle beraber eskiden Game Maker, Unity3D, UDK, SFML, SDL gibi framework ve motorlarla oyun geliştirmeye de başladım fakat başarılı olamadım. İşletim sistemi olarak <strong>Linux</strong> dağıtımı olan <strong>Arch Linux</strong> kullanmaktayım. Yani bir  <strong>Archy</strong> topluluğundanım. İş dışında <strong>yabancı dizi</strong>, <strong>film</strong>, <strong>satranç</strong> ve <strong>video oyunları</strong>yla vakit geçirmekteyim. Pek okula gitmesem de <strong>bilgisayar mühendisliği öğrencisiyim</strong>.</p>

        <h2>İletişim</h2>

        <ul>
            <li>Email: <a href="mailto:{{ site.email }}" target="_top">{{ site.email }}</a></li>
            <li>Website: <a href="{{ site.github_url }}">{{ site.github_url }}</a></li>
        </ul>

        <h2>Yetenekler</h2>

        {% if site.skill_web_keywords %}
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Web</h3>
            </div>
            <div class="panel-body">
                {% for keyword in site.skill_web_keywords %}
                <button class="btn btn-default" type="button">{{ keyword }}</button>
                {% endfor %}
            </div>
        </div>
        {% endif %}

        {% if site.skill_software_keywords %}
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Yazılım</h3>
            </div>
            <div class="panel-body">
                {% for keyword in site.skill_software_keywords %}
                <button class="btn btn-default" type="button">{{ keyword }}</button>
                {% endfor %}
            </div>
        </div>
        {% endif %}

    </div>

    <div class="col-md-4">
        {% include sidebar-popular-repo.html %}
    </div>

</div>
