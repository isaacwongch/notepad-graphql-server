export default{
    Query:{
        allNotes: async (_, args, {Note}) => {
      
            console.log(args)
            const notes = await Note.find()
            
            return notes 
        }
    },
    Mutation:{
        addNotes: async (_, args, {Note}) =>{
            console.log(args);
            console.log(typeof args.noteid);
            var note = new Note({ noteid: args.noteid, notetype: args.notetype, message: args.message, date: Date.now(), importance: args.importance});
            console.log(note);
            note.save(function (err) {
                if (err) return handleError(err);
                console.log("Save Note done!!!");
            })
            
            return note;
        },

        deleteNotes: async(_, args, {Note}) => {
            console.log("trying to delete the record");
            console.log(args.noteid);

            Note.remove({ noteid: args.noteid }, function(err) {
                if (!err) {
                    return true;
                }
                else {
                    console.log("Failed to delete with error: " + e);
                    return false;
                }
            });

        }

    }
}