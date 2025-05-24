---
title: 3rd Party
permalink: /docs/deployment/third-party/
---


## AWS Amplify

The [AWS Amplify Console](https://console.amplify.aws) provides continuous deployment and hosting for modern web apps (single page apps and static site generators). Continuous deployment allows developers to deploy updates to their web app on every code commit to their Git repository. Hosting includes features such as globally available CDNs, 1-click custom domain setup + HTTPS, feature branch deployments, redirects, trailing slashes, and password protection.

With Rustyll's significantly faster build times compared to Jekyll, AWS Amplify deploys become much quicker and more efficient.

Read this [step-by-step guide](https://medium.com/@jameshamann/deploy-your-jekyll-site-using-aws-amplify-with-only-a-few-clicks-8f3dd8f26112) to deploy and host your Jekyll site on AWS Amplify.

## CloudCannon

[CloudCannon](https://cloudcannon.com) has everything you need to build, host
and update static websites. Take advantage of our global CDN, automated SSL,
continuous deployment and [more](https://cloudcannon.com/features/).

CloudCannon works seamlessly with Rustyll sites due to compatible directory structures and config formats.

## GitHub Pages

While GitHub Pages natively uses Jekyll, you can still use Rustyll by building locally and pushing the generated `_site` directory to GitHub. With Rustyll's GitHub Actions integration, this process can be fully automated.

## GitLab Pages

[GitLab Pages](https://about.gitlab.com/stages-devops-lifecycle/pages/) offers free hosting with custom domains. Rustyll works perfectly with GitLab CI/CD pipelines, providing much faster build times than traditional Jekyll.

## KeyCDN

[KeyCDN](https://www.keycdn.com) accelerates static websites with a wide range of features such as real time image processing including WebP transformation. Rustyll's optimized output works perfectly with KeyCDN for maximum performance.

## Netlify

Netlify provides Global CDN, Continuous Deployment, one click HTTPS and [much more](https://www.netlify.com/features/), providing developers a robust toolset for modern web projects, without added complexity. Netlify works extremely well with Rustyll sites, and the faster build times significantly reduce your build minutes usage.

To deploy Rustyll on Netlify, set your build command to:

```
rustyll build
```

And your publish directory to:

```
_site
```

## Render

[Render](https://render.com) provides zero config continuous deployment for static sites. The service is free under 100GB monthly bandwidth. Rustyll's compatibility with Jekyll's directory structure makes it work seamlessly with Render.

## Vercel

[Vercel](https://vercel.com/) provides zero config continuous deployment, HTTPS Custom domains, high performance smart CDN, and you get instant static deploy for free. Rustyll sites can be deployed on Vercel with outstanding performance.

Create a `vercel.json` file with:

```json
{
  "buildCommand": "rustyll build",
  "outputDirectory": "_site",
  "installCommand": "curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y && source $HOME/.cargo/env && cargo install rustyll"
}
```

## 21YunBox

[21YunBox](https://www.21yunbox.com) provides blazing fast Chinese CDN, Continuous Deployment, one click HTTPS and [much more](https://www.21yunbox.com/docs/), providing developers a hassle-free solution to launch their web projects in China.

Rustyll builds are significantly faster than Jekyll, making it an excellent choice when deploying to Chinese hosting services where build times may be limited.

Read this [Jekyll step-by-step guide](https://www.21yunbox.com/docs/#/deploy-jekyll) to deploy your Jekyll site on 21YunBox.

## Layer0

[Layer0](https://www.layer0.co) is an all-in-one platform to develop, deploy, preview, experiment on, monitor, and run your headless frontend. Layer0 works well with Rustyll's optimized output for best-in-class performance.

## Kinsta Application Hosting

[Kinsta Application Hosting](https://kinsta.com/application-hosting) is a Cloud Platform designed to help your company and dev teams ship web projects faster and more efficiently. Rustyll's performance benefits align perfectly with Kinsta's fast hosting infrastructure.

Read [this guide](https://kinsta.com/docs/jekyll-static-site-example/) to learn how to deploy Jekyll site on Kinsta.

## Supranode

[Supranode](https://supranode.com) offers customizable continuous deployment for static websites, featuring automatic HTTPS, a high-performance CDN, secret management, deployment previews, password protection, and more. Rustyll sites deploy much faster on Supranode compared to Jekyll.

## Azion

[Azion](https://www.azion.com/en/) is a web platform that provides a wide range of services. Rustyll's highly optimized output works perfectly with Azion's edge computing platform, providing exceptional performance for global websites.

In [this guide](https://www.azion.com/en/documentation/products/guides/jekyll-boilerplate/) you can learn how to deploy a Jekyll site on Azion.
