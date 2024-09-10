import mongoose from 'mongoose'
import _ from 'lodash'

let connectionObject

export const dbConnect = async () => {
    if (!_.isEmpty(connectionObject)) return connectionObject
    try {
        const connection = await mongoose.createConnection(
            'mongodb+srv://sriramteja04:teqMuhxTBxfACY85@cluster0.uuxj1uh.mongodb.net/',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                bufferCommands: false,
            }
        )
        console.log('DB connection established', connection)
        connectionObject = connection
        return connectionObject
    } catch (error) {
        console.log('Error connecting to DB: ', error)
    }
}

mongoose.connection.on('error', error => {
    confirm('Error connecting to Mongo', error)
})

mongoose.connection.on('disconnected', () => {
    console.log('disconnected')
})

mongoose.set('debug', true)
