<div align=center>
  <img src="https://pass.culture.fr/wp-content/uploads/2020/11/RVB_PASS_CULTURE_HD.png" style="width: 360px">
  <br />
  <a href="https://apps.apple.com/fr/app/pass-culture/id1557887412">
    <img src="https://upload.wikimedia.org/wikipedia/commons/4/40/Download_on_the_App_Store_Badge_FRCA_RGB_blk.svg" style="height: 50px">
  </a>

  <a href="https://play.google.com/store/apps/details?id=app.passculture.webapp&hl=fr">
    <img src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Google_Play_Store_badge_FR.svg" style="height: 50px; padding-left: 12px">
  </a>
</div>

---

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=pass-culture_pass-culture-app-native&metric=alert_status)](https://sonarcloud.io/summary/overall?id=pass-culture_pass-culture-app-native) [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=pass-culture_pass-culture-app-native&metric=coverage)](https://sonarcloud.io/summary/overall?id=pass-culture_pass-culture-app-native)

![Current tests](https://img.shields.io/github/checks-status/pass-culture/pass-culture-app-native/master?label=Master%20tests)
[![Testing Environement](https://img.shields.io/github/deployments/pass-culture/pass-culture-app-native/testing?label=Testing%20Environment)](https://github.com/pass-culture/pass-culture-app-native/deployments/activity_log?environment=testing)
[![Staging Environement](https://img.shields.io/github/deployments/pass-culture/pass-culture-app-native/staging?label=Staging%20Environment)](https://github.com/pass-culture/pass-culture-app-native/deployments/activity_log?environment=staging)

[![Tag](https://img.shields.io/github/v/tag/pass-culture/pass-culture-app-native)](https://github.com/pass-culture/pass-culture-app-native/tags)

This project has been generated by [react-native-make](https://github.com/bamlab/react-native-make).

## Getting Started

To be able to install and run the iOS and Android mobile apps, you first need to :

- Install `node`
- Install `yarn`
- Configure Sentry through [this tutorial](https://github.com/pass-culture/pass-culture-app-native/blob/master/doc/standards/sentry.md#-configure-sentry-cli)
- Run `yarn install` to install all the dependencies

#### 📱 Mobile

To run the mobile app on Android or iOS, you will need to follow the installation steps:

- [setup](./doc/installation/setup.md) to setup your environment
- install the [Android](./doc/installation/Android.md) or [iOS](./doc/installation/iOS.md) app

#### 💻 Web

To run the web app on your browser, follow the steps [here](./doc/installation/web.md)

#### 💄 Storybook

Access to the [storybook](https://master--61fd537ecf081f003a135235.chromatic.com/).

To run the storybook on your browser, follow the steps [here](./doc/storybook.md)

---

## Development

### Debugging

We use [Flipper](https://fbflipper.com/) to debug the network logs, `react-query` usage, layout, perfs... More info [here](./doc/development/debugging.md).

### Standards

In the `doc/` folder you will find the `dev standards` the team members follow:

- [code structure](./doc/standards/codeStructure.md).
- [error and crash management](./doc/standards/errorManagement.md).
- [variable naming](./doc/standards/naming.md).
- [testing strategy](./doc/standards/testStrategy.md).
- [PR title format](./doc/standards/pr-title.md).

<details>
  <summary>To add a dev standard</summary>
  
Standards can of course be improved and new ones can be added.

1.  Create a pull request with the standard modification/addition (use `TEMPLATE.md` for addition)
2.  Ask **all** team members to read your PR

> Why: so that the team is aligned on how to code, and the best way to do something is shared within all members

3.  Make sure you got the approval of every member of the team
4.  You can merge :)
</details>

### Testing

You can run the tests with `yarn test`. This command will:

- Run `eslint` on your project
- Check the typescript types
- Run the `jest` tests

You can run the jest tests in watch mode with:

```bash
yarn jest --watch
```

You can also get the coverage with:

```bash
yarn jest --coverage
```

### Local development

<details>
  <summary>📝 Update the API schema</summary>
If the backend changes the api schema, you will need to update it:

- pull the `swagger-codegen-cli-v3` image: `docker pull swaggerapi/swagger-codegen-cli-v3`
- run: `yarn generate:api:client`
- or run `yarn generate:api:client:silicon` on Apple Silicon chips

If the file `src/api/gen/.swagger-codegen/VERSION` changes, make sure you locally have the desired version of `swagger-codegen-cli`, otherwise run `docker pull swaggerapi/swagger-codegen-cli-v3:3.0.24`

</details>

<details>
  <summary>To develop with a local API</summary>
  
See [the docs](./doc/development/localApi.md) to learn how to develop with a local API "superficially".

The other option, more complex, is to create a specific scheme 'Development' with a `.env.development` file :
copy the `.env.testing` configuration and update the `API_BASE_URL` setting with you local server address.

Make sure you also overload the `BATCH_API_KEY_ANDROID` and `BATCH_API_KEY_IOS` variables with the _dev_ values of the _testing_ [batch project](https://dashboard.batch.com/).

Then copy `testing.keystore` into `development.keystore` and `testing.keystore.properties` into `development.keystore.properties`. Replace the `storeFile` value in `development.keystore.properties`.

</details>

<details>
  <summary>Test login credentials</summary>

See in [1password][1] for all testing accounts.

</details>

### ⬇️ Download

To download the **testing** app, visit Appcenter for [iOS][2] and [Android][3].
For the **staging** app, use these links for [iOS][4] and [Android][5].

⚠️ Make sure your device is registered in the [device list][6].

---

## Deployment

See doc about deployment process [here](./doc/deployment/deployment.md) for the mobile application.

[1]: https://start.1password.com/signin
[2]: https://appcenter.ms/orgs/pass-Culture/apps/passculture-testing-ios
[3]: https://appcenter.ms/orgs/pass-Culture/apps/passculture-testing-android
[4]: https://appcenter.ms/orgs/pass-Culture/apps/passculture-staging-ios
[5]: https://appcenter.ms/orgs/pass-Culture/apps/passculture-staging-android
[6]: https://www.notion.so/passcultureapp/d1b6c73219ad4784af8769243f0339f3?v=8c038f65ec4d45e59e5d7fe0d744dffe
