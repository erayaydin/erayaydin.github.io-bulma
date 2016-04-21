---
layout:     post
title:      Laravel - Hataları Viewde Gösterme
date:       2016-04-12 19:20:00
summary:    Request sonrası dönen hata mesajlarını gösterme
categories:
 - Laravel
 - PHP
thumbnail: exclamation
tags:
 - Laravel
 - PHP
 - Validation
---

Validation benzeri işlemlerden sonra hata mesajı göstermek için döndürdüğünüz sayfada hata mesajlarını göstermek için aşağıdaki kodu kullanabilirsiniz.

```php
@if($errors->has())
	@foreach ($errors->all() as $error)
		<div>{{ $error }}</div>
	@endforeach
@endif
```

**Bootstrap Framework** kullanıyorsanız aşağıdaki _snippet_'i kullanabilirsiniz.

```php
@if($errors->has())
	<div class="alert alert-danger">
	@foreach ($errors->all() as $error)
		<p>{{ $error }}</p>
	@endforeach
	</div>
@endif
```

**Zurb Foundation Framework** kullanıyorsanız aşağıdaki _snippet_'i kullanabilirsiniz.

```php
@if($errors->has())
	<div class="callout alert">
	@foreach ($errors->all() as $error)
		<p>{{ $error }}</p>
	@endforeach
	</div>
@endif
```

**Semantic UI** kullanıyorsanız aşağıdaki _snippet_'i kullanabilirsiniz.

```php
@if($errors->has())
	<div class="ui negative message">
	@foreach ($errors->all() as $error)
		<p>{{ $error }}</p>
	@endforeach
	</div>
@endif
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