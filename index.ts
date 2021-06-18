import {getTemperatureFromSensor} from './services/hueConnector'
import {config} from './config'

console.log(`Running with config:`)
console.log(`HUE bridge IP: ${config.bridgeIP}`)
console.log(`HUE temperature sensor ID: ${config.sensorId}`)

const getTemperatureMeasurement = async (): Promise<void> => {
    if (!config.sensorId) {
        throw new Error('sensor ID is not configured. Please set HUE_TEMPERATURE_SENSOR_ID env variable.')
    }

    const temperature = await getTemperatureFromSensor(config.sensorId)
    console.log(temperature)
}

getTemperatureMeasurement()