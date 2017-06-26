# Apollo + Graphcool Subscription Book App

![](http://i.imgur.com/MqcDHTn.jpg)

### To get started:

1. Clone the repository

```
git clone https://github.com/dabit3/apollo-subscriptions-book-club.git
```

2. `cd` into directory
   
```
cd apollo-subscriptions-book-club
```

3. Install dependencies   

```
yarn
# or npm install
```

4. Install [Graphcool CLI](https://github.com/graphcool/graphcool-cli)

```
npm install -g graphcool
```

5. Create GraphQL server

```
graphcool init --schema ./schema.graphql --name BookClub
```

From the terminal output, you need to grab the project ID and use it in the next step. This ID is also available in the generated [project file](https://www.graph.cool/docs/reference/cli/project-files-ow2yei7mew/) `project.graphcool`.

![](http://imgur.com/fp5zsPN.png)

> **Note:** If you need to find out the available endpoints for your project, you can simply use the `graphcool endpoints` command (in the directory where `project.graphcool` is located) or grab them from the [Graphcool Console](https://console.graph.cool).

6. Configure endpoints

Open `app/index.js` and set the `projectId` variable to your project ID from the previous step. The project ID will be used to configure the endpoints for the GraphQL API as well as for the subscriptions:

```js
// Add your own project ID here
const projectId = '__YOUR_PROJECT_ID__'

// Endpoint for the Subscriptions API
const wsClient = new SubscriptionClient(`wss://subscriptions.graph.cool/v1/${projectId}`, {
  reconnect: true
});

// Endpoint for the regular GraphQL API
const networkInterface = createNetworkInterface({
  uri: `https://api.graph.cool/simple/v1/${projectId}`
});
``` 


