# Pause & Resume Call Recording Flex Plugin

## Flex Plugin

Twilio Flex Plugins allow you to customize the appearance and behavior of [Twilio Flex](https://www.twilio.com/flex). If you want to learn more about the capabilities and how to use the API, check out our [Flex documentation](https://www.twilio.com/docs/flex).

## How it works
This Flex plugin adds a Pause/Resume Recording button to the call canvas to allow the agent to temporarily pause the call recording before the customer provides payment information (Credit Card details, Bank account) to the agent and to resume regular call recording afterwards. 

This plugin leverages Twilio functions to perform the actual Pause and Resume action on the call resource.

The application repo contains both a Flex Plugin project as well as a Twilio Serverless project.  Deploy the Serverless functions before deploying the Flex plugin.

This plugin incorporates the base Dual Channel Recording functionality from https://github.com/twilio-professional-services/flex-dual-channel-recording.
The call recordings are started from the plugin, leveraging a server side Twilio Function to call the Twilio Recordings API. The task attribute conversations.media is updated with the recording metadata so Flex Insights can play the recording.  Call recordings are dual-channel, capturing customer and agent audio in their own audio channels. This solution works for both inbound and outbound calls.

After deploying this plugin, you can disable the Call Recording setting in [Flex Settings](https://www.twilio.com/console/flex/settings) on the Twilio Console.  This is the default single-channel (mono) Conference Call Recording which is now no longer required.


# Configuration

## Setup

Make sure you have [Node.js](https://nodejs.org) as well as [`npm`](https://npmjs.com). We support Node >= 10.12 (and recommend the _even_ versions of Node). Afterwards, install the dependencies by running `npm install`:

```bash
cd pause-recording-plugin
npm install
cd ..
cd serverless
npm install
```

Next, please install the [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart) by running:

```bash
brew tap twilio/brew && brew install twilio
```
or
```bash
npm install twilio-cli -g
```
See https://www.twilio.com/docs/twilio-cli/quickstart for additional details.

Install the [Flex Plugin extension](https://github.com/twilio-labs/plugin-flex/tree/v1-beta) for the Twilio CLI:

```bash
twilio plugins:install @twilio-labs/plugin-flex@beta
```

Install the [Serverless toolkit](https://www.twilio.com/docs/labs/serverless-toolkit) for the Twilio CLI:

```bash
twilio plugins:install @twilio-labs/plugin-serverless
```

## Serverless Functions

### Deployment

```bash
cd serverless
twilio serverless:deploy
```
After successfull deployment you should see at least the following:
```bash
✔ Serverless project successfully deployed
Functions:
   https://<your base url>/call-recording/create-recording
   https://<your base url>/call-recording/list-recordings
   https://<your base url>/call-recording/pause-recording
   https://<your base url>/call-recording/resume-recording
```

Your functions will now be present in the Twilio Functions Console and part of the "pause-recording" service. Copy the URL from one of the functions. 

## Flex Plugin

### Development

Create the plugin config file by copying `.env.example` to `.env` 

```bash
cd pause-recording-plugin
cp .env.example .env
```

Edit `.env` and set the REACT_APP_SERVICE_BASE_URL variable to your Twilio Functions base url (this will be available after you deploy your functions). In local development environment, it could be your localhost base url.

In order to develop locally, you can use the Twilio CLI to run the plugin locally. Using your commandline run the following from the root dirctory of the plugin.

```bash
cd pause-recording-plugin
twilio flex:plugins:start
```

This will automatically start up the Webpack Dev Server and open the browser for you. Your app will run on `http://localhost:3000`.

When you make changes to your code, the browser window will be automatically refreshed.


### Deploy Plugin

Once you are happy with your plugin, you have to deploy then release the plugin for it to take affect on Twilio hosted Flex.

Run the following command to start the deployment:

```bash
twilio flex:plugins:deploy --major --changelog "Notes for this version" --description "Functionality of the plugin"
```

After your deployment runs you will receive instructions for releasing your plugin from the bash prompt. You can use this or skip this step and release your plugin from the Flex plugin dashboard here https://flex.twilio.com/admin/plugins

For more details on deploying your plugin, refer to the [deploying your plugin guide](https://www.twilio.com/docs/flex/plugins#deploying-your-plugin).

Note: Common packages like `React`, `ReactDOM`, `Redux` and `ReactRedux` are not bundled with the build because they are treated as external dependencies so the plugin will depend on Flex to provide them globally.


## Disclaimer