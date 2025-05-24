---
layout: page
title: Philosophy
permalink: /philosophy/
---

<div class="max-w-3xl mx-auto">
  <div class="mb-12">
    <p class="text-xl text-gray-300">
      Rustyll offers a unique philosophy when approaching the problem of static
      site generation. This core philosophy drives development and product
      decisions. When a contributor, maintainer, or user asks herself what Rustyll
      is about, the following principles should come to mind:
    </p>
  </div>

  <div class="space-y-12">
    <div class="bg-black/20 rounded-lg p-6 border border-gray-800">
      <h3 class="text-2xl font-bold text-white mb-4 flex items-center">
        <span class="bg-rust rounded-full h-8 w-8 flex items-center justify-center text-white mr-3 flex-shrink-0">1</span>
        No Magic
      </h3>
      <p class="text-gray-300">
        Rustyll is not magic. A user should be able to understand the underlying
        processes that make up the Rustyll build without much reading. It should
        do only what you ask it to and nothing more. When a user takes a certain
        action, the outcome should be easily understandable and focused.
      </p>
    </div>

    <div class="bg-black/20 rounded-lg p-6 border border-gray-800">
      <h3 class="text-2xl font-bold text-white mb-4 flex items-center">
        <span class="bg-rust rounded-full h-8 w-8 flex items-center justify-center text-white mr-3 flex-shrink-0">2</span>
        It "Just Works"
      </h3>
      <p class="text-gray-300">
        The out-of-the-box experience should be that it "just works." Run
        <code class="bg-black/30 px-2 py-1 rounded text-rust">cargo install rustyll</code> and it should build any Rustyll site that it's given.
        Features like auto-regeneration and settings like the markdown renderer
        should represent sane defaults that work perfectly for the vast majority of
        cases. The burden of initial configuration should not be placed on the user.
      </p>
    </div>

    <div class="bg-black/20 rounded-lg p-6 border border-gray-800">
      <h3 class="text-2xl font-bold text-white mb-4 flex items-center">
        <span class="bg-rust rounded-full h-8 w-8 flex items-center justify-center text-white mr-3 flex-shrink-0">3</span>
        Content is King
      </h3>
      <p class="text-gray-300">
        Why is Rustyll so loved by content creators? It focuses on content first and
        foremost, making the process of publishing content on the Web easy. Users
        should find the management of their content enjoyable and simple.
      </p>
    </div>

    <div class="bg-black/20 rounded-lg p-6 border border-gray-800">
      <h3 class="text-2xl font-bold text-white mb-4 flex items-center">
        <span class="bg-rust rounded-full h-8 w-8 flex items-center justify-center text-white mr-3 flex-shrink-0">4</span>
        Stability
      </h3>
      <p class="text-gray-300">
        If a user's site builds today, it should build tomorrow.
        Backwards-compatibility should be strongly preferred over breaking changes.
        Breaking changes should be made to support a strong practical goal, and
        breaking changes should never be made to drive forward "purity" of the
        codebase, or other changes purely to make the maintainers' lives easier.
        Breaking changes provide a significant amount of friction between upgrades
        and reduce the confidence of users in this software, and should thus be
        avoided unless absolutely necessary.
        Upon breaking changes, provide a clear path for users to upgrade.
      </p>
    </div>

    <div class="bg-black/20 rounded-lg p-6 border border-gray-800">
      <h3 class="text-2xl font-bold text-white mb-4 flex items-center">
        <span class="bg-rust rounded-full h-8 w-8 flex items-center justify-center text-white mr-3 flex-shrink-0">5</span>
        Small & Extensible
      </h3>
      <p class="text-gray-300">
        The core of Rustyll should be simple and small, and extensibility should be
        a first-class feature to provide added functionality from community
        contributors. The core should be kept to features used by at least 90% of
        users–everything else should be provided as a plugin. New features should
        be shipped as plugins and focus should be put on creating extensible core
        API's to support rich plugins.
      </p>
    </div>
  </div>
</div>
