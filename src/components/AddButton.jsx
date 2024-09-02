import { db } from "@appwrite/databases";
import { useRef } from "react";
import colors from "@assets/colors";
import Plus from "@assets/icons/Plus";
import { useNotesContext } from "@context/NotesContext";

export const AddButton = () => {
  const { setNotes } = useNotesContext();

  const startingPos = useRef(10);

  const addNote = async () => {
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
  };

  return (
    <div id="add-btn" onClick={addNote}>
      <Plus />
    </div>
  );
};
