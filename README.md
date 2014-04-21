### Goangular Todo Example

An example todo app built with GoAngular.

 - [Live Demo](http://goangular-todo-example.herokuapp.com)

### Setup

#### GoInstant

- Create an account at http://goinstant.com
- Set your connect URL
 - in `server.js` replace `YOUR_CONNECT_URL` with your real connect URL

### Running Locally

#### Install

- `npm install`

#### Run

- `npm start`
- `open http://localhost:5000`

### Heroku Deploy

- Install the [Heroku Toolbelt](https://toolbelt.heroku.com/)
- Create an app: `heroku apps:create <name>`
- Configure your connectUrl: `heroku config:set GOINSTANT_CONNECT_URL=https://goinstant.net/ACCOUNT/APP`
- Push to heroku: `git push heroku master`
