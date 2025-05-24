---
title: Tutorials
permalink: /tutorials/home/
redirect_from: /tutorials/index.html
---

In contrast to [Docs]({{ '/docs/home/' | relative_url }}), Tutorials provide more detailed, narrative instruction that cover a variety of Rustyll topics and scenarios. Tutorials might contain the following:

* Step-by-step processes through particular scenarios or challenges
* Full walk-throughs using sample data, showing inputs and results from the sample data
* Detailed explanation about the pros and cons for different Rustyll strategies
* End-to-end instruction in developing a complete feature on a Rustyll site
* Instruction that combines various techniques from across the docs

In short, tutorials aren't the core reference information in docs. They walk users through processes from beginning to end.

{: .note .info}
The Tutorials section continues to grow. You can add a tutorial here to help expand this section.

Some of these techniques might even guide you through a supporting tool, script, service, or other hack used with your Rustyll site. Feel free to include tutorials involving external services with Rustyll as well. However, note that Rustyll in no way endorses any third-party tools mentioned in tutorials.

## Performance Focus

Many tutorials include specific performance tips for Rustyll, highlighting how to leverage parallel processing, caching, and other optimization features that make Rustyll 10-100x faster than traditional static site generators.

## How to contribute a tutorial

We welcome your tutorial contributions. To add your tutorial:

1. Fork the Rustyll project by clicking the **Fork** button in the upper-right corner of the [rustyll/rustyll project GitHub repo](https://github.com/rustyll/rustyll/).
2. Add your tutorial in the `_tutorials` collection.
3. Make sure your tutorial has the same front matter items as other tutorial items.
5. Add a reference to your tutorial filename in `_data/tutorials.yml`. This allows your tutorial to appear in the Tutorials sidebar.
6. Follow the regular git workflow to submit the pull request.

When you submit your pull request, the Rustyll documentation team will review your contribution and either merge it or suggest edits.
