import Trash from "@assets/icons/Trash";
import { db } from "@appwrite/databases";
import { useNotesContext } from "@context/NotesContext";
import toast from "react-hot-toast";

export const DeleteButton = ({ noteId }) => {
  const { setNotes } = useNotesContext();
  const handleDelete = async (e) => {
    try {
      await db.notes.delete(noteId);
      setNotes((prevState) => prevState.filter((note) => note.$id !== noteId));
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred.");
    }
  };

  return (
    <div onClick={handleDelete}>
      <Trash />
    </div>
  );
};
