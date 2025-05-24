---
layout: page
title: The Rustyll Team
permalink: /team/
---

<div class="mb-16">
  <h2 class="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-2">Core Team</h2>
  
  <p class="text-gray-300 mb-8">
    The Rustyll Core Team's responsibility is to ensure the development and
    community around the Rustyll ecosystem thrive.
  </p>
  
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {% for member in site.data.core_team %}
      <div class="bg-black/20 rounded-lg overflow-hidden border border-gray-800 p-6 flex flex-col">
        <div class="flex items-center mb-4">
          <img src="https://github.com/{{ member.github }}.png" alt="{{ member.name }}" width="60" height="60" class="rounded-full mr-4">
          <div>
            <h3 class="text-lg font-medium text-white">{{ member.name }}</h3>
            <p class="text-sm text-gray-400">@{{ member.github }}</p>
          </div>
        </div>
        {% if member.role %}
          <p class="text-sm text-gray-300 mb-4">{{ member.role }}</p>
        {% endif %}
        <div class="mt-auto flex">
          <a href="https://github.com/{{ member.github }}" class="text-rust hover:text-rust-light transition flex items-center text-sm" target="_blank" rel="noopener">
            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path>
            </svg>
            GitHub
          </a>
        </div>
      </div>
    {% else %}
      <!-- Fallback when data file is not available -->
      <div class="bg-black/20 rounded-lg overflow-hidden border border-gray-800 p-6">
        <div class="flex items-center mb-4">
          <img src="https://github.com/ashmaroli.png" alt="Ashwin" width="60" height="60" class="rounded-full mr-4">
          <div>
            <h3 class="text-lg font-medium text-white">Ashwin</h3>
            <p class="text-sm text-gray-400">@ashmaroli</p>
          </div>
        </div>
      </div>
      <div class="bg-black/20 rounded-lg overflow-hidden border border-gray-800 p-6">
        <div class="flex items-center mb-4">
          <img src="https://github.com/mattr-.png" alt="Matt" width="60" height="60" class="rounded-full mr-4">
          <div>
            <h3 class="text-lg font-medium text-white">Matt</h3>
            <p class="text-sm text-gray-400">@mattr-</p>
          </div>
        </div>
      </div>
    {% endfor %}
  </div>
</div>

<div class="mb-16">
  <h2 class="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-2">Security Team</h2>
  
  <p class="text-gray-300 mb-8">
    The Rustyll Security Team's responsibility is to triage, validate, and 
    patch security vulnerabilities reported to them.
  </p>
  
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    <!-- Replace with data file when available -->
    <div class="bg-black/20 rounded-lg overflow-hidden border border-gray-800 p-6">
      <div class="flex items-center mb-4">
        <img src="https://github.com/parkr.png" alt="Parker" width="60" height="60" class="rounded-full mr-4">
        <div>
          <h3 class="text-lg font-medium text-white">Parker</h3>
          <p class="text-sm text-gray-400">@parkr</p>
        </div>
      </div>
    </div>
    <div class="bg-black/20 rounded-lg overflow-hidden border border-gray-800 p-6">
      <div class="flex items-center mb-4">
        <img src="https://github.com/ashmaroli.png" alt="Ashwin" width="60" height="60" class="rounded-full mr-4">
        <div>
          <h3 class="text-lg font-medium text-white">Ashwin</h3>
          <p class="text-sm text-gray-400">@ashmaroli</p>
        </div>
      </div>
    </div>
    <div class="bg-black/20 rounded-lg overflow-hidden border border-gray-800 p-6">
      <div class="flex items-center mb-4">
        <img src="https://github.com/mattr-.png" alt="Matt" width="60" height="60" class="rounded-full mr-4">
        <div>
          <h3 class="text-lg font-medium text-white">Matt</h3>
          <p class="text-sm text-gray-400">@mattr-</p>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="mb-16">
  <h2 class="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-2">Emeritus Core Team Members</h2>
  
  <p class="text-gray-300 mb-8">
    Emeritus Core Team Members were once members of Rustyll's Core Team.
  </p>
  
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
    <div class="bg-black/10 rounded-lg p-4 border border-gray-800">
      <p class="font-medium text-white">Alfred <span class="text-gray-400">@alfredxing</span></p>
    </div>
    <div class="bg-black/10 rounded-lg p-4 border border-gray-800">
      <p class="font-medium text-white">Ben <span class="text-gray-400">@benbalter</span></p>
    </div>
    <div class="bg-black/10 rounded-lg p-4 border border-gray-800">
      <p class="font-medium text-white">Frank <span class="text-gray-400">@DirtyF</span></p>
    </div>
    <div class="bg-black/10 rounded-lg p-4 border border-gray-800">
      <p class="font-medium text-white">Nick <span class="text-gray-400">@qrush</span></p>
    </div>
    <div class="bg-black/10 rounded-lg p-4 border border-gray-800">
      <p class="font-medium text-white">Olivia</p>
    </div>
    <div class="bg-black/10 rounded-lg p-4 border border-gray-800">
      <p class="font-medium text-white">Parker <span class="text-gray-400">@parkr</span></p>
    </div>
    <div class="bg-black/10 rounded-lg p-4 border border-gray-800">
      <p class="font-medium text-white">Pat <span class="text-gray-400">@pathawks</span></p>
    </div>
    <div class="bg-black/10 rounded-lg p-4 border border-gray-800">
      <p class="font-medium text-white">Tom <span class="text-gray-400">@mojombo</span></p>
    </div>
  </div>
</div>
