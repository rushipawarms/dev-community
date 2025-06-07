const mongoose = require('mongoose')

const connectDb = async () => {
    await mongoose.connect('mongodb+srv://rushipawar:VFp6Zw94EGedXBLI@cluster0.nwitnhg.mongodb.net/devCommunity')
}

module.exports = connectDb

// connectDb()
//     .then(() => {
//         console.log("Database Connection establish...")
//     })
//     .catch((err) => {
//         console.log("Failed to Connect DB...")
//     })