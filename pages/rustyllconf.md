---
layout: page
title: Talks and community learning
permalink: /rustyllconf/
description: Learn from guides and share talks about building with Rustyll.
---
{% assign talks = site.data.rustyllconf-talks | where: 'verified', true %}
{% if talks.size > 0 %}
<div class="talk-grid">{% for talk in talks %}<article class="talk-card"><span class="eyebrow">{{ talk.year }} / COMMUNITY TALK</span><h2>{{ talk.topic }}</h2><p>{{ talk.speaker }}</p><div class="videoWrapper"><iframe title="{{ talk.topic | escape }}" src="https://www.youtube-nocookie.com/embed/{{ talk.youtube_id }}" loading="lazy" allowfullscreen></iframe></div></article>{% endfor %}</div>
{% else %}
<section class="editorial-intro"><span class="eyebrow">LEARN AND SHARE</span><h2>Start with something you can build.</h2><p>Use the guides below to learn Rustyll. This collection will grow as talks and walkthroughs are verified.</p></section>
<div class="learning-paths">
  <a href="{{ '/docs/step-by-step/01-setup/' | relative_url }}"><span>01 / HANDS ON</span><h2>Build your first site</h2><p>Follow ten practical steps from setup to deployment.</p><strong>Start the tutorial ↗</strong></a>
  <a href="{{ '/docs/migrating/' | relative_url }}"><span>02 / BRING A PROJECT</span><h2>Move an existing site</h2><p>Find a platform guide and review what changes when you migrate.</p><strong>Explore migrations ↗</strong></a>
</div>
<div class="editorial-callout"><div><span class="eyebrow">COMMUNITY VOICES</span><h2>Have a talk to share?</h2><p>Send the original link, title and speaker so the resource can be reviewed before publication.</p></div><a class="site-button site-button--primary" href="https://github.com/betterwebinit/rustyll-website/issues/new">Suggest a talk ↗</a></div>
{% endif %}
