// get your ip and username by running `node retrieve-user.js`;
const ip = '-> your ip';
const user = '-> your username';

const nodeHueApi = require('node-hue-api').v3;
const LightState = nodeHueApi.lightStates.LightState;

let api = null;

function lightOn() {
  const state = new LightState()
    .on()
    .transition(0)

  api.lights.setLightState(19, state);
}

function lightOff() {
  const state = new LightState()
    .off()
    .transition(0)

  api.lights.setLightState(19, state);
}

function startLightShow() {
  setInterval(lightOn, 500);
  setTimeout(() => {
    setInterval(lightOff, 500);
  }, 250)
}

nodeHueApi.api.createLocal(ip).connect(user).then(apiResponse => {
    api = apiResponse;

    // get all light ids
    /*
    api.lights.getAll()
      .then(allLights => {
        // Display the lights from the bridge
        console.log(JSON.stringify(allLights));
      });
      */

  startLightShow();
})
