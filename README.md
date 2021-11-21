# eth-react-app
A playground repository with proper connection between smart contracts and a React application

## Useful Commands
`truffle compile`
Compile smart contracts. Change directory (cd) to smart_contracts folder first.

`truffle migrate`
Second step after compiling contracts. Again, you want to be in the smart_contracts folder. You must also be running Ganache.

`truffle migrate --reset`
Same as above but with --reset tag. This is good for when you want to re-migrate your contracts after making changes while Ganache is still running.

`npm start`
Run the frontend. Change directory (cd) back to eth-react-app folder first.

## Getting Started
I will simply be listing the steps here. Details on each step will follow below.
1. Clone the repository
2. Install stuff
3. Compile and migrate smart contracts
4. Integrate smart contracts to React app
5. Run the app

### Clone the repository
Choose the directory you want to add eth-react-app to, then...
```
git clone https://github.com/justin-zhu1018/eth-react-app.git
```

### Install stuff
There are a lot of things to install, so bear with me. I have split this section up into 2 main parts: General Installations and Node Dependencies. I have also included an extra part for if you want to use VSCode's powershell terminal.

* General Installations
  * MetaMask Chrome Extension <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en">link</a>
  * Ganache by Truffle Suite <a href="https://www.trufflesuite.com/ganache">link</a>
  * Node.js <a href="https://nodejs.org/en/download/">link</a>
  * VSCode <a href="https://code.visualstudio.com/">link</a>
  * VSCode Solidity Extension <a href="https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity">link</a>

* Node Dependencies
  * cd to smart_contracts folder and `npm install`
  * cd to eth-react-app folder and `npm install`
  * In any directory, `npm install -g truffle`
    * Note: honestly not sure if it's needed. You can try without it first and see what happens.

* If you want to use VSCode's powershell terminal...
  * You will need to add code to the IDE's settings.json file. This can be found by going to VCCode, pressing CTRL + SHIFT + P to open the command palette, and typing `Preferences: Open Settings (JSON)`. You will then add the following code block:
  ```
  "terminal.integrated.profiles.windows": {
    "PowerShell": {
      "source": "PowerShell",
      "icon": "terminal-powershell",
      "args": ["-ExecutionPolicy", "Bypass"]
    }
  },
  "terminal.integrated.defaultProfile.windows": "PowerShell",
  ```

### Compile and migrate smart contracts
You are going to cd to smart_contracts folder to compile and migrate your smart contracts. All smart contract files (.sol) are developed/located in the `eth-react-app/smart_contracts/contracts` directory. This will be done with truffle on command line. You can test if you have truffle installed correctly by typing `truffle version` into the command line.

Now we want to first compile the smart contracts. This is done with `truffle compile`. What we're essentially doing here is converting those contracts from .sol files into .json files. These JSON files will be found under `eth-react-app/smart_contracts/build/contracts`. Our main contract here is TodoList.json, Migrations.json can be ignored for now. 

After compilation, we want to migrate those compiled contracts into the blockchain. This will be done with a local blockchain, hence the use of Ganache. Open up the downloaded Ganache and start up your private blockchain. You can either select the Quickstart option or create a new workspace. With the blockchain up and running, we can verify this by going back to our command line and typing `truffle console`. This will open up the console for the blockchain. We can exit the console by pressing CTRL + C. To migrate, we will use `truffle migrate`. This updates the .json smart contract files to add information that we will need to integrate the contracts with the React app. As a preface, these parameters will be added in the config.json file found under `eth-react-app/src`. Note that if you migrated once, made changes to the contracts, and want remigrate your contracts you may want to use `truffle migrate --reset`. 

### Integrate smart contracts to React app
As stated in the previous section, we will want to add the "abi" and "address" data from `TodoList.json` into `eth-react-app/src/config.json`. There is preexisting data there, simply replace it. Since the "abi" is really long, make use of VSCode to minimize it. This can be done by hovering over the line numbers on the left, which shows a bunch of arrows, and clicking on the arrow next to "abi". This will shrink the "abi" into two lines. Copy from one bracket to the other to copy the entire "abi". As for the "address", simply find it and copy it. It's a one-liner. Assuming you have copied over everything correctly, you are ready to run the app.

### Run the app
To run the app, cd to the main directory `eth-react-app` and type `npm start`. There are three sections to the app: General Information, Create Task, and List of Tasks. General Information will show the Ethereum network you're connected to and the MetaMask account you're using. This is assuming you've successfully downloaded MetaMask's chrome extension and created an account. If you have not done so already, please go ahead and do that first. With that out of the way, we need to do two things: connect to the local network that Ganache's private blockchain is running on and import one of Ganache's accounts to MetaMask.

To connect to the local network, you will want to navigate to the top of the extension. To the right of the fox icon in the popup, you should see the network you are currently connected to. Click on that and add a new network by clicking on Custom RPC. Network name can be whatever you want, New RPC URL can be found in Ganache (default is `HTTP://127.0.0.1:7545`), and Chain ID should also be the default 1337. Once created, click on that network to connect to it. Now, if you refresh the page, you should see the Network switch to private.

To connect a test account with test Ethereum you can use, go to Ganache's app. That table of addresses is a table of accounts. Pick any one of them and click on the key to the right of the table row. This will show the private key that you can copy over to MetaMask to create your account. With the key copied, go back to MetaMask and click on the icon to the top-right of the popup. This will show your accounts. Click import account and paste the private key. After importing, you should see there is ETH you can use (assuming you are on the private network already. Now we have to connect that account to the app. This can be done by navigating to the app (localhost:3000), clicking on the three dots in the MetaMask popup, Connected sites, and Manually connect to the current site. Once done, refresh the page, and you should see the Account update to the one you connected the app to. Now you can use the app to create tasks and mark them as complete.

To create a task, type the task into the input and click submit. A popup should come up from MetaMask to verify the transaction. Proceed as normal and you should see the List of Tasks update with the task you added. To mark a task as complete, simply click on the task in the List of Tasks, proceed with the transaction via MetaMask, and you should see the task marked.

That's it! If any problems come up, good luck solving them 👍
