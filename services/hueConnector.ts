import {v3} from 'node-hue-api'
import {Api} from 'node-hue-api/dist/esm/api/Api'
import {config} from '../config'
const hueApi = v3.api 

export interface Measurement {
    temperature: number;
    lastUpdated: Date;
}

export const connectToHueApi = (): Promise<Api> => {
    if (!config.bridgeIP) {
        throw new Error('HUE Bridge IP address is not set. Please configure HUE_BRIDGE_IP env variable.')
    }

    return hueApi.createLocal(config.bridgeIP).connect(config.userName)
}

export const getTemperatureFromSensor = async (sensorId: string): Promise<Measurement> => {
    const api = await connectToHueApi()

    const sensor = await api.sensors.getSensor(sensorId)
    const currentTemperature = sensor.getStateAttributeValue('temperature') / 100

    return {
        temperature: currentTemperature,
        lastUpdated: sensor.getStateAttributeValue('lastupdated'),
    }
}