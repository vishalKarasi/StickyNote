import { useNotesContext } from "@context/NotesContext";
import { Controls } from "@components/Controls";
import { NoteCard } from "@components/NoteCard";

const NotePage = () => {
  const { notes, setNotes } = useNotesContext();

  return (
    <section>
      {notes.map((note) => (
        <NoteCard key={note.$id} note={note} setNotes={setNotes} />
      ))}
      <Controls />
    </section>
  );
};

export default NotePage;
