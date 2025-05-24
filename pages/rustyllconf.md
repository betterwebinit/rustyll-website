---
layout: page
title: RustyllConf
permalink: /rustyllconf/
---

[RustyllConf](https://rustyllconf.com) is a free, online conference for all things Rustyll hosted by [CloudCannon](https://cloudcannon.com). Each year members of the Rustyll community speak about interesting use cases, tricks they've learned, or meta Rustyll topics.

## Featured

{% assign random = site.time | date: "%s%N" | modulo: site.data.rustyllconf-talks.size %}
{% assign featured = site.data.rustyllconf-talks[random] %}

**{{ featured.topic }}** - [*{{ featured.speaker }}*](https://twitter.com/{{ featured.twitter_handle }})
<div class="videoWrapper">
    <iframe width="420" height="315" src="https://www.youtube.com/embed/{{ featured.youtube_id }}" frameborder="0" allowfullscreen></iframe>
</div>

{% assign talks = site.data.rustyllconf-talks | group_by: 'year' %}
{% for year in talks reversed %}
## {{ year.name }}
{% for talk in year.items %}
 * [**{{ talk.topic }}**](https://youtu.be/{{ talk.youtube_id }}) - [*{{ talk.speaker }}*](https://twitter.com/{{ talk.twitter_handle }})
{% endfor %}
{% endfor %} 