# Multei! API
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
[![Travis Build Status](https://travis-ci.org/multei/api.svg?branch=master)](https://travis-ci.org/multei/api)

## Before everything...

We are working to follow [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices).

For more information about Node.js on Heroku, see [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices).

## Tech stack

### Languages, libraries and frameworks

* [express-api-problem](https://www.npmjs.com/package/express-api-problem) to handle API problems with ease.
* JavaScript;

### Platforms

* [Google Cloud Platform](https://console.cloud.google.com)

### Tools

* [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

## Running locally

### Database
Make sure you have [Postgres](https://postgresapp.com/) and [Knex CLI](http://knexjs.org/#Migrations-CLI) installed.

1. Make sure you have created the Multei database on Postgres
1. Run all migrations
2. Run seed files

```shell script
psql -U postgres -h localhost -c "create database {DATABASE_NAME}"
knex migrate:latest
knex seed:run
```

### Environment Variables
Make sure you have created your own `.env` file based on `.env.example` with your credentials.

### API
Make sure you have [Node.js](http://nodejs.org/) and Heroku installed.

```shell script
npm install
npm run develop:heroku
```

The port exposed by the API depends on the start command executed
* Port `3000` if you run `npm start` or `npm run debug`
* Port `5000` if you run `npm run develop:heroku`

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

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://jimmyandrade.com"><img src="https://avatars3.githubusercontent.com/u/2307245?v=4" width="100px;" alt=""/><br /><sub><b>Jimmy Andrade</b></sub></a><br /><a href="https://github.com/multei/api/issues?q=author%3Ajimmyandrade" title="Bug reports">🐛</a> <a href="#projectManagement-jimmyandrade" title="Project Management">📆</a> <a href="https://github.com/multei/api/pulls?q=is%3Apr+reviewed-by%3Ajimmyandrade" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/multei/api/commits?author=jimmyandrade" title="Code">💻</a></td>
    <td align="center"><a href="http://tuliooassis.github.io"><img src="https://avatars1.githubusercontent.com/u/17442350?v=4" width="100px;" alt=""/><br /><sub><b>Túlio Assis</b></sub></a><br /><a href="https://github.com/multei/api/commits?author=tuliooassis" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
