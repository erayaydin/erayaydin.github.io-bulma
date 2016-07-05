---
layout: default
title: Açık Kaynak Projeler
menu: open-source
css: ['open-source.css']
javascript: ['underscore-min.js']
---

{% assign sorted_repos = (site.github.public_repositories | sort: 'stargazers_count') | reverse | where: "fork", "false" %}
<div id="container-open-source">
    <section class="jumbotron geopattern" data-pattern-id="{{ page.title }}">
        <div class="container">
            <div id="jumbotron-meta-info">
                <h1>Açık Kaynak Projeler</h1>
                <span class="meta-info">
                    Github'ta toplam <span class="repo-count badge">{{ sorted_repos.size }}</span> açık kaynak proje bulunuyor
                </span>
            </div>
        </div>
    </section>

    <section class="container">
        <div class="repo-list row">
            <!-- Check here for github metadata -->
            {% for repo in sorted_repos %}
            <div class="col-md-4 card text-center">
                <div class="thumbnail">
                    <div class="card-image geopattern" data-pattern-id="{{ repo.name }}">
                        <div class="card-image-cell">
                            <h3 class="card-title">
                                <a href="{{ repo.html_url }}" target="_blank">{{ repo.name }}</a>
                            </h3>
                        </div>
                    </div>
                    <div class="caption">
                        <div class="card-description">
                            <p class="card-text">{{ repo.description }}</p>
                        </div>
                        <div class="card-text">
                            <span data-toggle="tooltip" class="meta-info" title="{{ repo.stargazers_count }} yıldız">
                                <span class="octicon octicon-star"></span> {{ repo.stargazers_count }}
                            </span>
                            <span data-toggle="tooltip" class="meta-info" title="{{ repo.forks_count }} fork">
                                <span class="octicon octicon-git-branch"></span> {{ repo.forks_count }}
                            </span>
                            <span data-toggle="tooltip" class="meta-info" title="Son Güncellenme: {{ repo.updated_at }}">
                                <span class="octicon octicon-clock"></span>
                                <time datetime="{{ repo.updated_at }}" title="{{ repo.updated_at | date: '' }}">{{ repo.updated_at | date: "%d.%m.%Y - %R" }}</time>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {% endfor %}
        </div>
    </section>

</div>
<script>
    $(document).ready(function(){

        // Enable bootstrap tooltip
        $("body").tooltip({ selector: '[data-toggle=tooltip]' });

        $('.geopattern').each(function(){
            $(this).geopattern($(this).data('pattern-id'));
        });

    });
</script>