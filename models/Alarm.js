const mongoose = require('mongoose');

const alarmSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Alarm', alarmSchema);