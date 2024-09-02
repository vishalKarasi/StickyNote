import { db } from "@appwrite/databases";
import { useNotesContext } from "@context/NotesContext";
import toast from "react-hot-toast";

export const Color = ({ color }) => {
  const { notes, setNotes, selectedNote } = useNotesContext();

  const changeColor = () => {
    try {
      const currentNoteIndex = notes.findIndex(
        (note) => note.$id === selectedNote.$id
      );

      const updatedNote = {
        ...notes[currentNoteIndex],
        colors: JSON.stringify(color),
      };

      const newNotes = [...notes];
      newNotes[currentNoteIndex] = updatedNote;
      setNotes(newNotes);

      db.notes.update(selectedNote.$id, {
        colors: JSON.stringify(color),
      });
    } catch (error) {
      toast.error("You must select a note before changing colors");
    }
  };

  return (
    <div
      onClick={changeColor}
      className="color"
      style={{ backgroundColor: color.colorHeader }}
    ></div>
  );
};
