# Whammy Log

Bugs and issues I ran into while building this project.

# Bug 1: Input switching from uncontrolled to controlled

# The problem:
Console kept showing this warning:

"Warning: A component is changing an uncontrolled input to be controlled."

It showed up on the EditDeck and EditCard pages whenever I tried to load a form.

# The cause:
When the page first loads, the API data hasn't come back yet. So `formData.name` was `undefined` at first. React sees an input with `value={undefined}` as uncontrolled. Then when the API data finally loads and the value becomes a real string, React gets confused because now it's controlled.

# The solution:
Added `|| ""` so the values are always strings from the start:

setFormData({
  name: loadedDeck.name || "",
  description: loadedDeck.description || "",
});

# Bug 2: State update on unmounted component

# The problem:
Sometimes when clicking around fast, I'd get this warning:

"Warning: Can't perform a React state update on an unmounted component."

# The cause:
If you navigate away before an API call finishes, the `.then()` callback still runs and tries to update state. But the component is already gone at that point.

# The solution:
Used AbortController to cancel requests when leaving the page:

useEffect(() => {
  const abortController = new AbortController();

  readDeck(deckId, abortController.signal)
    .then((data) => {
      setDeck(data);
    })
    .catch((error) => {
      if (error.name !== "AbortError") {
        console.error("Error loading deck:", error);
      }
    });

  return () => abortController.abort();
}, [deckId]);

The return function cancels the request if you leave. I also had to check for AbortError in catch so it doesn't log that as a real error.
