import {connectToHueApi} from '../services/hueConnector'

const listAllSensors = async (): Promise<void> => {
    const api = await connectToHueApi()

    const sensors = await api.sensors.getAll()
    console.log(sensors)
}

listAllSensors()