---
title: Manual Deployment
permalink: /docs/deployment/manual/
---

Rustyll generates your static site to the `_site` directory by default. You can
transfer the contents of this directory to almost any hosting provider to get
your site live. Here are some manual ways of achieving this:

## rsync

Rsync is similar to scp except it can be faster as it will only send changed
parts of files as opposed to the entire file. You can learn more about using
rsync in the [Digital Ocean tutorial](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories-on-a-vps).

```sh
rsync -avz --delete _site/ username@remote.server:/path/to/website/
```

## Amazon S3

If you want to host your site in Amazon S3, you can do so by
using the AWS CLI client and pushing your rendered `_site` directory directly to
your S3 bucket:

```sh
aws s3 sync _site s3://<YOUR DOMAIN>.com --size-only --storage-class REDUCED_REDUNDANCY
```

For even better performance, you can use Rustyll's built-in S3 deployment:

```sh
rustyll deploy s3 --bucket <YOUR DOMAIN>.com
```

## FTP

Most traditional web hosting providers let you upload files to their servers over FTP. To upload a Rustyll site to a web host using FTP, run the `rustyll build` command and copy the contents of the generated `_site` folder to the root folder of your hosting account. This is most likely to be the `httpdocs` or `public_html` folder on most hosting providers.

```sh
# Build the site
rustyll build

# Then use an FTP client to upload the _site directory
# Or use a command-line FTP tool
ncftpput -R -v -u "username" ftp.example.com /public_html _site/*
```

## scp

If you have direct access to the deployment web server, the process is essentially the same, except you might have other methods available to you (such as `scp`) for transferring the files:

```sh
scp -r _site/* username@remote.server:/path/to/website/
```

Remember to make sure the contents of the generated `_site` folder get placed in the appropriate web root directory for your web server.
