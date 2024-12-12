import { useEffect } from "react";
import { auth } from "./firebase-config";
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { Texteditor } from "./components/texteditor";
import "./App.css";

function App() {
  useEffect(() => {
    signInAnonymously(auth);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(`user signed in:`, user.uid);
      }
    });
  }, []);

  return (
    <div>
      <Texteditor />
    </div>
  );
}

export default App;
