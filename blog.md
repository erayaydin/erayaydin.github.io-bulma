---
layout: page
title: Blog
subtitle: <span class="mega-octicon octicon-clippy"></span>&nbsp;&nbsp; Her gelişmeyi kaydet
menu: blog
css: ['blog-page.css']
---

<div class="row">

    <div class="col-md-8">

        <!-- Blog list -->
        <ul id="posts-list">
            {% for post in site.posts %}
            <li class="posts-list-item">
                <div class="posts-content">
                    <span class="posts-list-meta">{{ post.date | date: "%d.%m.%Y" }}</span>
                    <a class="posts-list-name bubble-float-left" href="{{ site.url }}{{ post.url }}">{{ post.title }}</a>
                    <span class='circle'></span>
                </div>
            </li>
            {% endfor %}
        </ul>

        <!-- Pagination -->
        {% include pagination.html %}

        <!-- Comments -->
        {% include disqus-comments.html %}

    </div>

    <div class="col-md-4">
        {% include sidebar-post-tag.html %}
    </div>

</div>
<script>
    $(document).ready(function(){

        // Enable bootstrap tooltip
        $("body").tooltip({ selector: '[data-toggle=tooltip]' });

    });
</script>