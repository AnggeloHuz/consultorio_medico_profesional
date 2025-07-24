import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef, useState } from "react";

function TinyEditor2(props) {
  const [value, setValue] = useState("")
  const [text, setText] = useState("");
  let apiKey = "28fj4fgh6xmyttu5w7h5hbg8crfs0hylqp2mtfw44l0cbbsx"
  
  const onEditorInputChange = (newValue, editor) => {
      props.setValue(newValue);
      setValue(newValue)
      setText(editor.getContent({ format: "text" }));
  }
  const editorRef = useRef(null);
  const change = () => {
    if (editorRef.current) {
      setHistory(editorRef.current.getContent());
    }
  };

  return (
    <>
      <Editor
        onInit={(evt, editor) => {
          editorRef.current = editor
          setValue(props.value)
        }}
        initialValue=""
        tinymceScriptSrc={'../../../tinymce/tinymce.min.js'}
        onEditorChange={(newValue, editor) => onEditorInputChange(newValue, editor)}
        value={value}
        init={{
          language: "es",
          menubar: false,
          height: 733,
          plugins:
            "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion",
          toolbar:
            "undo redo | fontfamily fontsize | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent | forecolor backcolor numlist bullist | link image table emoticons"
        }}
      />
    </>
  );
}

export default TinyEditor2;
