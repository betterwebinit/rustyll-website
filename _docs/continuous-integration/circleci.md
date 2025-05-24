---
title: "CircleCI"
---

Building, testing, and deploying your Rustyll-generated website can quickly be done with [CircleCI][0], a continuous integration & delivery tool. CircleCI supports [GitHub][1] and [Bitbucket][2], and you can get started for free using an open-source or private repository.

[0]: https://circleci.com/
[1]: https://github.com/
[2]: https://bitbucket.org/

## 1. Follow Your Project on CircleCI

To start building your project on CircleCI, all you need to do is 'follow' your project from CircleCI's website:

1. Visit the 'Add Projects' page
2. From the GitHub or Bitbucket tab on the left, choose a user or organization
3. Find your project in the list and click 'Build project' on the right
4. The first build will start on its own. You can start telling CircleCI how to build your project by creating a [.circleci/config.yml][3] file in the root of your repository

[3]: https://circleci.com/docs/2.0/configuration-reference/

## 2. Setting Up Rust and Rustyll

For Rustyll projects, you'll need to use a CircleCI configuration that installs Rust and Rustyll. Since Rustyll is written in Rust, the setup process is different from Jekyll's Ruby-based setup. Here's how to configure CircleCI for Rustyll:

```yaml
    - step:
        run:
          name: Install Rust
          command: |
            curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
            source $HOME/.cargo/env
            rustc --version
    - step:
        run:
          name: Install Rustyll
          command: |
            source $HOME/.cargo/env
            cargo install rustyll
            rustyll --version
```

## 3. Building Your Site

With Rustyll installed, you can now build your site:

```yaml
    - step:
        run: 
          name: Build Rustyll Site
          command: |
            source $HOME/.cargo/env
            rustyll build
```

### Testing Your Site

After building your site, you can run tests on the generated HTML. [HTML Proofer][5] is a popular tool for this purpose:

[5]: https://github.com/gjtorikian/html-proofer

```yaml
    - step:
        run: 
          name: Install HTML Proofer
          command: gem install html-proofer
    - step:
        run:
          name: Test Generated HTML
          command: htmlproofer ./_site --check-html --disable-external
```

## Complete Example .circleci/config.yml File

The example `.circleci/config.yml` below demonstrates how to build and deploy your Rustyll project to AWS S3. In order for this to work, you would first have to set the `S3_BUCKET_NAME` [environment variable](https://circleci.com/docs/2.0/env-vars/).

```yaml
workflows:
  test-deploy:
    jobs:
      - build
      - deploy:
          requires:
            - build
          filters:
            branches:
              only: master
version: 2.1
jobs:
  build:
    docker:
      - image: cimg/base:2023.03
    steps:
      - checkout
      
      # Cache cargo installations
      - restore_cache:
          keys:
            - rustyll-cache-v1-{% raw %}{{ checksum "Cargo.lock" }}{% endraw %}
            - rustyll-cache-v1-
      
      # Install Rust and Rustyll
      - run:
          name: Install Rust
          command: |
            curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
            echo 'source $HOME/.cargo/env' >> $BASH_ENV
            source $BASH_ENV
            rustc --version
      
      - run:
          name: Install Rustyll
          command: |
            cargo install rustyll || true
            rustyll --version
      
      # Save cargo cache
      - save_cache:
          key: rustyll-cache-v1-{% raw %}{{ checksum "Cargo.lock" }}{% endraw %}
          paths:
            - ~/.cargo
      
      # Build site
      - run:
          name: Build Rustyll Site
          command: rustyll build
      
      # Install and run HTML Proofer
      - run:
          name: Install HTML Proofer
          command: sudo gem install html-proofer
      
      - run:
          name: Test Site
          command: |
            htmlproofer ./_site \
              --allow-hash-href \
              --check-favicon  \
              --check-html \
              --disable-external
      
      - persist_to_workspace:
          root: ./
          paths:
            - _site
  
  deploy:
    docker:
      - image: cimg/python:3.9.1
    environment:
      S3_BUCKET_NAME: <<YOUR BUCKET NAME HERE>>
    steps:
      - attach_workspace:
          at: ./
      - run:
          name: Install AWS CLI
          command: pip install awscli --upgrade --user
      - run:
          name: Upload to S3
          command: ~/.local/bin/aws s3 sync ./_site s3://$S3_BUCKET_NAME/ --delete --acl public-read
```

## Performance Benefits

Using Rustyll with CircleCI provides significant advantages:

- **Faster Builds**: Rustyll's Rust-based architecture builds sites 10-20x faster than Jekyll
- **Lower Memory Usage**: Your CircleCI jobs will use less memory and complete faster
- **Parallel Processing**: Rustyll automatically utilizes all available CPU cores
- **Reduced CI Minutes**: Faster builds mean you'll use fewer CircleCI build minutes

## Questions?

If you need help with setting up CircleCI for your Rustyll site, you can visit CircleCI's [online community][9] for support.

[9]: https://discuss.circleci.com
