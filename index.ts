import {getTemperatureFromSensor} from './services/hueConnector'
import {saveMeasurementToDb} from './services/mongoDbStore'
import {config} from './config'

const updateIntervalInMs = Number(config.updateIntervalMinutes) * 60 * 1000

console.log(`Running with config:`)
console.log(`HUE bridge IP: ${config.bridgeIP}`)
console.log(`HUE temperature sensor ID: ${config.sensorId}`)
console.log(`Update interval: ${config.updateIntervalMinutes} min`)

const getTemperatureMeasurement = async (): Promise<void> => {
    if (!config.sensorId) {
        throw new Error('sensor ID is not configured. Please set HUE_TEMPERATURE_SENSOR_ID env variable.')
    }

    const temperature = await getTemperatureFromSensor(config.sensorId)

    await saveMeasurementToDb(temperature)

    console.log(`[${new Date()}] ${temperature.temperature} C`)
}

getTemperatureMeasurement()

setInterval(async () => {
    await getTemperatureMeasurement()
}, updateIntervalInMs)