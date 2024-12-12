import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { setDoc, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase-config";
import "react-quill/dist/quill.snow.css";
import "../App.css";
import { throttle } from "lodash";

// type Props = {};

export const Texteditor = () => {
  const [editing, setEditing] = useState<boolean>(false);
  const quillReff = useRef<any>(null);

  const isLocalChange = useRef(false);

  const documentRef = doc(db, "documents", "sample-doc");

  const saveContent = throttle(() => {
    if (quillReff.current && isLocalChange) {
      const content = quillReff.current.getEditor().getContents();
      console.log(` saving content to db:`, content);

      setDoc(documentRef, { content: content.ops }, { merge: true })
        .then(() => {
          console.log("content saved");
        })
        .catch(console.error);
      isLocalChange.current = false;
    }
  }, 1000);

  useEffect(() => {
    if (quillReff.current) {
      getDoc(documentRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const savedContent = docSnap.data().content;
            if (savedContent) {
              quillReff.current.getEditor().setContents(savedContent);
            }
          } else {
            console.log("no doc found");
          }
        })
        .catch(console.error);

      const unSubscribe = onSnapshot(documentRef, (snapshot) => {
        if (snapshot.exists()) {
          const newContent = snapshot.data().content;

          if (!editing) {
            const editor = quillReff.current.getEditor();
            const currentCursorPosition = editor.getSelection()?.index || 0;

            editor.setContents(newContent, "silent");
            editor.setSelection(currentCursorPosition);
          }
        }
      });

      const editor = quillReff.current.getEditor();
      editor.on("text-change", (delta: any, oldDelta: any, source: any) => {
        if (source === "user") {
          isLocalChange.current = true;
          setEditing(true);
          saveContent();
          setTimeout(() => setEditing(false), 5000);
        }
      });
      return () => {
        unSubscribe();
        editor.off("text-change ");
      };
    }
  }, []);
  return (
    <div>
      <ReactQuill ref={quillReff} />
    </div>
  );
};
