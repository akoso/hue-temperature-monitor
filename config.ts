import dotenv from 'dotenv'
dotenv.config()

export const config = {
    bridgeIP: process.env.HUE_BRIDGE_IP,
    appName: process.env.APP_NAME ?? 'hue-temperature-measure',
    deviceName: process.env.DEVICE_NAME ?? 'hue-temperature-measure-monitor',
    userName: process.env.HUE_USERNAME,
    sensorId: process.env.HUE_TEMPERATURE_SENSOR_ID,
    mongoUri: process.env.MONGO_URI,
    updateIntervalMinutes: process.env.UPDATE_INTERVAL_MIN ?? 5,
}