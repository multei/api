# Multei! API
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
[![Travis Build Status](https://travis-ci.org/multei/api.svg?branch=master)](https://travis-ci.org/multei/api)

## Before everything...

### Check out [project board](https://github.com/orgs/multei/projects/1)

You can find it at https://github.com/orgs/multei/projects/1

### Check our guidelines & code of conduct

- [Contributing Guidelines](https://github.com/multei/.github/blob/master/CONTRIBUTING.md);
- [Code of Conduct](https://github.com/multei/.github/blob/master/CODE_OF_CONDUCT.md);

### Check the best practices

We are working to follow [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices).

For more information about Node.js on Heroku, see [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices).

### Check our Tech Stack

We have [our own Tech Radar](https://radar.thoughtworks.com/?sheetId=https://raw.githubusercontent.com/multei/.github/master/Multei!%20Tech%20Radar.csv)

#### Languages, libraries and frameworks

- Express;
- [express-api-problem](https://www.npmjs.com/package/express-api-problem) to handle API problems with ease.
- Google Cloud Storage JavaScript SDK;
- JavaScript;
- Multer;

#### Platforms

- [Google Cloud Platform](https://www.thoughtworks.com/pt/radar/platforms/google-cloud-platform)
- [Node.js](https://www.thoughtworks.com/pt/radar/platforms/node-js)

#### Tools

- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

## Configure your local dev environment

### Install these requirements

Make sure you have installed the following dependencies:

- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli);
- [Node.js](http://nodejs.org/);
- [Postgres](https://postgresapp.com/).

### Provide a local database

1. Install [Knex CLI](http://knexjs.org/#Migrations-CLI) (and all the other dependencies);
   ```shell script
   npm install
   ```

2. Make sure you have created the Multei database on Postgres. To create, you can use [psql](https://www.postgresql.org/docs/9.3/app-psql.html) to run:
   ```shell script
   psql -U postgres -h localhost -c "create database multei"
   ```

3. Run all migrations
   ```shell script
   knex migrate:latest
   ```

4. Run seed files
   ```shell script
   knex seed:run
   ```

### Define the local `.env` variables
Make sure you have created your own `.env` file based on `.env.example` with your credentials.

### Start developing

```shell script
npm install && npm run develop:heroku
```

The port exposed by the API depends on the start command executed
* Port `3000` if you run `npm start` or `npm run debug`
* Port `5000` if you run `npm run develop:heroku`

## Deploying to Heroku

1. Make sure you have created a bucket with viewing permissions to allUsers and allAuthenticatedUsers on Google Cloud Platform;
2. Make sure you have created a service account only (with key) for production with adequate permissions;
3. Set a config var called `GCP_KEY_FILE` with a path to Google Cloud Platform key file;

```shell script
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
    <td align="center"><a href="http://jimmyandrade.com"><img src="https://avatars3.githubusercontent.com/u/2307245?v=4" width="100px;" alt=""/><br /><sub><b>Jimmy Andrade</b></sub></a><br /><a href="https://github.com/multei/api/issues?q=author%3Ajimmyandrade" title="Bug reports">🐛</a> <a href="#projectManagement-jimmyandrade" title="Project Management">📆</a> <a href="https://github.com/multei/api/pulls?q=is%3Apr+reviewed-by%3Ajimmyandrade" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/multei/api/commits?author=jimmyandrade" title="Code">💻</a> <a href="https://github.com/multei/api/commits?author=jimmyandrade" title="Documentation">📖</a> <a href="#example-jimmyandrade" title="Examples">💡</a></td>
    <td align="center"><a href="http://tuliooassis.github.io"><img src="https://avatars1.githubusercontent.com/u/17442350?v=4" width="100px;" alt=""/><br /><sub><b>Túlio Assis</b></sub></a><br /><a href="https://github.com/multei/api/commits?author=tuliooassis" title="Code">💻</a> <a href="https://github.com/multei/api/commits?author=tuliooassis" title="Documentation">📖</a> <a href="#maintenance-tuliooassis" title="Maintenance">🚧</a> <a href="#projectManagement-tuliooassis" title="Project Management">📆</a></td>
    <td align="center"><a href="https://github.com/hpsmatheus"><img src="https://avatars2.githubusercontent.com/u/29740936?v=4" width="100px;" alt=""/><br /><sub><b>hpsmatheus</b></sub></a><br /><a href="#ideas-hpsmatheus" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
