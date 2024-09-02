import { createContext, useContext, useEffect, useState } from "react";
import { db } from "@appwrite/databases";
import Spinner from "@assets/icons/Spinner";

export const NotesContext = createContext();

export const useNotesContext = () => {
  return useContext(NotesContext);
};

const NotesProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState();
  const [selectedNote, setSelectedNote] = useState();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const response = await db.notes.list();
    setNotes(response.documents);
    setLoading(false);
  };

  const contextData = { notes, setNotes, selectedNote, setSelectedNote };

  return (
    <NotesContext.Provider value={contextData}>
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Spinner size="100" />
        </div>
      ) : (
        children
      )}
    </NotesContext.Provider>
  );
};
export default NotesProvider;
