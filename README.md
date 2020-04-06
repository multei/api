# Multei! API
[![Travis Build Status](https://travis-ci.org/multei/api.svg?branch=master)](https://travis-ci.org/multei/api)

## Before everything...

We are working to follow [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices).

For more information about Node.js on Heroku, see [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices).

## Tech stack

## Languages, libraries and frameworks

* [express-api-problem](https://www.npmjs.com/package/express-api-problem) to handle API problems with ease.
* JavaScript;

## Platforms

* [Google Cloud Platform](https://console.cloud.google.com)

## Tools

* [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

## Running locally

Make sure you have [Node.js](http://nodejs.org/) and Heroku installed.

```shell script
npm install
npm run develop:heroku
```

## Deploying to Heroku

1. Make sure you have created a bucket with viewing permissions to allUsers and allAuthenticatedUsers on Google Cloud Platform;
2. Make sure you have created a service account only (with key) for production with adequate permissions;
3. Set a config var called `GCP_KEY_FILE` with a path to Google Cloud Platform key file;

```shell script
npm install
npm run deploy:heroku
```

## Google Cloud Storage

This API uploads images to the Google Cloud storage service.
To be able to upload, you need to have a service account on Google Cloud Storage with the adequate permissions.

So you need to:

1. Go to [APIs & Services](https://console.cloud.google.com/apis/dashboard);
2. On the menu on left panel, tap on [Credentials](https://console.cloud.google.com/apis/credentials);
3. At **Service Accounts** section, tap on [Manage Service Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts);
4. Click on [Create Service Account](https://console.cloud.google.com/iam-admin/serviceaccounts/create);
5. Type a name, ID and description for the new Service Account;
6. On **Service account permissions (optional)**, add a role with permissions to view and create objects on storage;
7. Click on **Continue**;
8. On **Create a key (optional)**, click on **+Create Key**;
9. On **Key type**, choose the **JSON (recommended)** option;
10. Click on **Create**. The JSON key file will be downloaded;
11. Put this key file on `config/` directory on repository (create the directory if it does not exist);
    **Never commit this file!**
12. At local development environment, on your .env file, set `GOOGLE_APPLICATION_CREDENTIALS` to `config/multei-{key}.json`, where `multei-{key}.json` is the actual filename;
13. If your application was already running, restart it.
