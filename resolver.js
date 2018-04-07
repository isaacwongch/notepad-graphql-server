export default{
    Query:{
        allNotes: async (_, args, {Note}) => {
      
            console.log(args)
            const notes = await Note.find()

            return notes.map(note =>{note._id = note._id.toString})
        }
    },
    Mutation:{
        addNotes: async (_, args, {Note}) =>{
            console.log(args);
            var note = new Note({ noteid: args.noteid, notetype: args.notetype, message: args.message, date: Date.now()});
            note.save(function (err) {
                if (err) return handleError(err);
                console.log("Save Note done!!!");
            })
            
            return note;
        }
    }
}