import { Schema, model } from 'mongoose'

// strict: false — שולפים את כל השדות מה-DB כמו שהם
const profileSchema = new Schema({}, { strict: false, collection: 'profiles' })

export const Profile = model('Profile', profileSchema)
