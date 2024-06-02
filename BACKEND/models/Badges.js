const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    badges: [
        {
            title: { type: String, required: true },
            completed: { type: Boolean, required: true },
            date: { type: Date, required: true },
        }
    ]
});

const Badge = mongoose.model('Badge', badgeSchema);
module.exports = Badge;
