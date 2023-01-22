export function AutoTextArea() {

function handleKeyDown(e) {
    e.target.style.height = 'inherit'
    e.target.style.height = `${e.target.scrollHeight}px`
  }

  return (
      <textarea
      onKeyDown={handleKeyDown}
        rows={1}
      ></textarea>
  );
}
