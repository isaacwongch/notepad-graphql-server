export default `
    type Note {
        _id: String
        noteid: String
        notetype: String
        message: String
        date: String
    }

    type Query {
        allNotes: [Note]!
      
    }

    type Mutation {
        addNotes
            (
            noteid: String
            notetype: String
            message: String
            date: String
            ):Note!
    }
`
