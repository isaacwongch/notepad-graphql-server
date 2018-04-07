const mongoose = require('mongoose')

const Note = mongoose.model('Note', {
    id: Number,
    notetype: String,
    message: String,
    date: Date
})

export default Note;