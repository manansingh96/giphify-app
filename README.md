This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Giphify

Search images from Giphy and Imgur because we can.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Requirements

For development, you will only need Node.js installed on your environement.
And please use the appropriate [Editorconfig](http://editorconfig.org/) plugin for your Editor (not mandatory).

### Node

[Node](http://nodejs.org/) is really easy to install & now include [NPM](https://npmjs.org/).
You should be able to run the following command after the installation procedure
below.

    $ node --version
    v0.10.24

    $ npm --version
    1.3.21

#### Node installation on OS X

You will need to use a Terminal. On OS X, you can find the default terminal in
`/Applications/Utilities/Terminal.app`.

Please install [Homebrew](http://brew.sh/) if it's not already done with the following command.

    $ ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"

If everything when fine, you should run

    brew install node

#### Node installation on Linux

    sudo apt-get install python-software-properties
    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs

#### Node installation on Windows

Just go on [official Node.js website](http://nodejs.org/) & grab the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it.

---

## Install

    $ git clone https://github.com/manansingh96/giphify-app
    $ cd PROJECT
    $ npm install

## Configure app

## Generate API Keys

###### Giphy

Go to [Giphy Developers](https://developers.giphy.com/) and create an account.
[Click here](https://developers.giphy.com/dashboard/?create=true) to create an app and generate your key.

###### Imgur

Go to [Imgur]() and create an account [here](https://imgur.com/register?redirect=%2F).
Register your application [here](https://api.imgur.com/oauth2/addclient).

### Environement Variables

Create `.env` in the project directory
Add these line to your `.env` file and replace relevent fields with your keys.

    REACT_APP_GIPHY=<YourGiphyAPIKeyHere>
    REACT_APP_IMGUR=Client-ID <YourClientSecretHere>

## Start & watch

    $ npm start

## How to use

Type your search query in the text field.
Click on the client button which are `Giphy` and `Imgur`
Click `Load More` to load more searches and keep scrolling.

You can hot-switch the client by clicking the client buttons for the same search query.

## Built With

- [React](https://reactjs.org/)

## Authors

- **Manan Singh**
