import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { db } from "@appwrite/databases";
import {
  autoGrow,
  bodyParser,
  setNewOffset,
  setZIndex,
} from "@utils/common.utils";
import Spinner from "@assets/icons/Spinner";
import { DeleteButton } from "./DeleteButton";
import { useNotesContext } from "@context/NotesContext";

export const NoteCard = ({ note }) => {
  const { setSelectedNote } = useNotesContext();
  const [saving, setSaving] = useState(false);
  const keyUpTimer = useRef(null);

  const body = bodyParser(note.body);
  const [position, setPosition] = useState(JSON.parse(note.position));
  const colors = JSON.parse(note.colors);

  let mouseStartPos = { x: 0, y: 0 };
  const textAreaRef = useRef(null);
  const cardRef = useRef(null);

  const mouseDown = (e) => {
    if (e.target.className === "card-header") {
      setZIndex(cardRef.current);

      mouseStartPos.x = e.clientX;
      mouseStartPos.y = e.clientY;

      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);
      setSelectedNote(note);
    }
  };

  const mouseMove = (e) => {
    let mouseMoveDir = {
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY,
    };

    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    const newPosition = setNewOffset(cardRef.current, mouseMoveDir);

    setPosition(newPosition);
  };

  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);

    const newPosition = setNewOffset(cardRef.current);
    saveData("position", newPosition);
  };

  const saveData = async (key, value) => {
    const payload = { [key]: JSON.stringify(value) };
    try {
      await db.notes.update(note.$id, payload);
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred.");
    } finally {
      setSaving(false);
    }
  };

  const handleKeyUp = async () => {
    setSaving(true);
    if (keyUpTimer.current) {
      clearTimeout(keyUpTimer.current);
    }
    keyUpTimer.current = setTimeout(() => {
      saveData("body", textAreaRef.current.value);
    }, 2000);
  };

  useEffect(() => {
    autoGrow(textAreaRef);
    setZIndex(cardRef.current);
  }, []);

  return (
    <article
      className="card"
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      ref={cardRef}
    >
      <div
        className="card-header"
        style={{
          backgroundColor: colors.colorHeader,
        }}
        onMouseDown={mouseDown}
      >
        <DeleteButton noteId={note.$id} />
        {saving && (
          <div className="card-saving">
            <Spinner color={colors.colorText} />
            <span style={{ color: colors.colorText }}>Saving...</span>
          </div>
        )}
      </div>
      <div className="card-body">
        <textarea
          style={{ color: colors.colorText }}
          defaultValue={body}
          ref={textAreaRef}
          onInput={() => autoGrow(textAreaRef)}
          onFocus={() => {
            setZIndex(cardRef.current);
            setSelectedNote(note);
          }}
          onKeyUp={handleKeyUp}
        ></textarea>
      </div>
    </article>
  );
};
