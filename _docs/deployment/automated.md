---
title: Automated Deployment
permalink: /docs/deployment/automated/
---
There are a number of ways to easily automate the deployment of a Rustyll site.

## Continuous Integration Service

One of the easiest ways to set up an automated deployment flow is by using a
CI service.

These services run a script when there's a commit on your Git repository.
You might want this script to build the site, run tests over the output then deploy it to the
service of your choice.

We have guides for the following providers:

* [GitHub Actions]({{ '/docs/continuous-integration/github-actions/' | relative_url }})
* [Travis CI]({{ '/docs/continuous-integration/travis-ci/' | relative_url }})
* [CircleCI]({{ '/docs/continuous-integration/circleci/' | relative_url }})
* [Buddy]({{ '/docs/continuous-integration/buddyworks/' | relative_url }})
* [Razorops CI/CD]({{ '/docs/continuous-integration/razorops/' | relative_url }})

## Git post-receive hook

To have a remote server handle the deploy for you every time you push changes using Git, you can create a user account which has all the public keys that are authorized to deploy in its `authorized_keys` file. With that in place, setting up the post-receive hook is done as follows:

```sh
laptop$ ssh deployer@example.com
server$ mkdir myrepo.git
server$ cd myrepo.git
server$ git --bare init
server$ cp hooks/post-receive.sample hooks/post-receive
server$ mkdir /var/www/myrepo
```

Next, add the following lines to hooks/post-receive and be sure Rustyll and Rust are
installed on the server:

```bash
#!/bin/bash -l

# Use Cargo-installed binaries
export PATH=$HOME/.cargo/bin:$PATH

TMP_GIT_CLONE=$HOME/tmp/myrepo
PUBLIC_WWW=/var/www/myrepo

git clone $GIT_DIR $TMP_GIT_CLONE
cd $TMP_GIT_CLONE
rustyll build -d $PUBLIC_WWW
rm -Rf $TMP_GIT_CLONE
exit
```

Finally, run the following command on any users laptop that needs to be able to
deploy using this hook:

```sh
laptops$ git remote add deploy deployer@example.com:~/myrepo.git
```

Deploying is now as easy as telling nginx or Apache to look at
`/var/www/myrepo` and running the following:

```sh
laptops$ git push deploy master
```
