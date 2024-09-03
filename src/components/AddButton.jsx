import { db } from "@appwrite/databases";
import { useRef } from "react";
import colors from "@assets/colors";
import Plus from "@assets/icons/Plus";
import { useNotesContext } from "@context/NotesContext";
import toast from "react-hot-toast";

export const AddButton = () => {
  const { setNotes } = useNotesContext();
  const startingPos = useRef(10);

  const addNote = async () => {
    try {
      const payload = {
        position: JSON.stringify({
          x: startingPos.current,
          y: startingPos.current,
        }),
        colors: JSON.stringify(colors[0]),
      };

      startingPos.current += 10;
      const response = await db.notes.create(payload);
      setNotes((prevState) => [response, ...prevState]);
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred.");
    }
  };

  return (
    <div id="add-btn" onClick={addNote}>
      <Plus />
    </div>
  );
};
