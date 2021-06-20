import {MongoClient, Db} from 'mongodb'
import {config} from '../config'
import {Measurement} from './hueConnector'

const connectToDb = async (): Promise<{db: Db, client: MongoClient}> => {
    if (!config.mongoUri) {
        throw new Error('Mongo URI is not configured. Set env variable MONGO_URI')
    }

    const client = new MongoClient(config.mongoUri)
    await client.connect()

    const db = client.db()

    return {
        db,
        client,
    }
}

const closeConnection = async (client?: MongoClient) => {
    if (client) {
        await client.close()
    }
}

export const saveMeasurementToDb = async (temperatureReading: Measurement): Promise<void> => {
    let mongoClient
    try {
        const {client, db} = await connectToDb()
        mongoClient = client

        db.collection('readings').insertOne({
            time: new Date(),
            temperature: temperatureReading.temperature,
            lastUpdated: temperatureReading.lastUpdated,
        })

    } finally {
        await closeConnection(mongoClient)
    }
}