import { useState, useEffect, useRef } from "react";

export function AutoTextArea(props) {
  const textAreaRef = useRef(null);
  const [text, setText] = useState("");
  const [textAreaHeight, setTextAreaHeight] = useState("auto");
  const [parentHeight, setParentHeight] = useState("auto");

  useEffect(() => {
    setParentHeight(`${textAreaRef.current.scrollHeight}px`);
    setTextAreaHeight(`${textAreaRef.current.scrollHeight}px`);
  }, [text]);

  const onChangeHandler = (event) => {
    setTextAreaHeight("auto");
    setParentHeight(`${textAreaRef.current.scrollHeight}px`);
    setText(event.target.value);

    if (props.onChange) {
      props.onChange(event);
    }
  };

  return (
    <div style={{ minHeight: parentHeight }}>
      <textarea
        {...props}
        onChange={onChangeHandler}
        style={{ height: textAreaHeight }}
        ref={textAreaRef}
        rows={1}
      ></textarea>
    </div>
  );
}
