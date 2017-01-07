---
title: "Laravel - Hataları Viewde Gösterme"
categories:
    - Laravel
    - PHP
tags:
    - Blade Template Engine
date: 2016-04-12 19:20:00
---

Laravel'de `withError()` ile veya _Request Validation_ sonucu döndürdüğünüz hataları göstermek için aşağıdaki kodu kullanabilirsiniz.

```php
{% raw %}
@if($errors->has())
	@foreach ($errors->all() as $error)
		<div>{{ $error }}</div>
	@endforeach
@endif
{% endraw %}
```

**Bootstrap Framework** kullanıyorsanız aşağıdaki _snippet_'i kullanabilirsiniz.

```php
{% raw %}
@if($errors->has())
	<div class="alert alert-danger">
	@foreach ($errors->all() as $error)
		<p>{{ $error }}</p>
	@endforeach
	</div>
@endif
{% endraw %}
```

**Zurb Foundation Framework** kullanıyorsanız aşağıdaki _snippet_'i kullanabilirsiniz.

```php
{% raw %}
@if($errors->has())
	<div class="callout alert">
	@foreach ($errors->all() as $error)
		<p>{{ $error }}</p>
	@endforeach
	</div>
@endif
{% endraw %}
```

**Semantic UI** kullanıyorsanız aşağıdaki _snippet_'i kullanabilirsiniz.

```php
{% raw %}
@if($errors->has())
	<div class="ui negative message">
	@foreach ($errors->all() as $error)
		<p>{{ $error }}</p>
	@endforeach
	</div>
@endif
{% endraw %}
```

**UIKit** kullanıyorsanız aşağıdaki _snippet_'i kullanabilirsiniz.

```php
@if($errors->has())
<div class="uk-alert uk-alert-danger">
	@foreach ($errors->all() as $error)
		<p>{{ $error }}</p>
	@endforeach
</div>
@endif
```

Yukarıdaki snippetleri olduğu gibi kullanabilirsiniz.