const mongoose = require('mongoose')

const Note = mongoose.model('Note', {
    noteid: Number,
    notetype: String,
    message: String,
    date: Date,
    importance: {type: Number, default: 1},
})

export default Note;