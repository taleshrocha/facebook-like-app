export function AutoTextArea({ className, placeholder }) {
  function handleKeyDown(e) {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  return (
    <textarea
      className={className}
      placeholder={placeholder}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyDown}
      rows={1}
    ></textarea>
  );
}
