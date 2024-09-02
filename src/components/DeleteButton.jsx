import Trash from "@assets/icons/Trash";
import { db } from "@appwrite/databases";
import { useNotesContext } from "@context/NotesContext";

export const DeleteButton = ({ noteId }) => {
  const { setNotes } = useNotesContext();
  const handleDelete = async (e) => {
    db.notes.delete(noteId);
    setNotes((prevState) => prevState.filter((note) => note.$id !== noteId));
  };

  return (
    <div onClick={handleDelete}>
      <Trash />
    </div>
  );
};
