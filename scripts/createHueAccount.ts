import {v3} from 'node-hue-api'
import {config} from '../config'
const hueApi = v3.api 

const createAccount = async (): Promise<void> => {
    if (!config.bridgeIP) {
        throw new Error('HUE Bridge IP address is not set. Please configure HUE_BRIDGE_IP env variable.')
    }

    const unauthenticatedApi = await hueApi.createLocal(config.bridgeIP).connect()

    let createdUser
    try {
        createdUser = await unauthenticatedApi.users.createUser(config.appName, config.deviceName)
        console.log('*******************************************************************************\n')
        console.log('User has been created on the Hue Bridge. The following username can be used to\n' +
                    'authenticate with the Bridge and provide full local access to the Hue Bridge.\n' +
                    'YOU SHOULD TREAT THIS LIKE A PASSWORD\n')
        console.log(`Hue Bridge User: ${createdUser.username}`)
        console.log(`Hue Bridge User Client Key: ${createdUser.clientkey}`)
        console.log('*******************************************************************************\n')
    } catch(err) {
        if (err.getHueErrorType() === 101) {
            console.error('The Link button on the bridge was not pressed. Please press the Link button and try again.')
        } else {
            console.error(`Unexpected Error: ${err.message}`)
        }
    }

}

createAccount()