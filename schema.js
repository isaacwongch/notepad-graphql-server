export default `
    type Note {
        _id: String
        noteid: Int
        notetype: String
        message: String
        date: String
        importance: Int
    }

    type Query {
        allNotes: [Note]!
      
    }

    type Mutation {
        addNotes
            (
            noteid: Int!
            notetype: String
            message: String
            date: String
            importance: Int
            ):Note!

        deleteNotes
            (
            noteid: Int
            ): Boolean
    }
`
