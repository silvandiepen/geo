# MultipleChoice

A grid of selectable answer buttons for multiple-choice questions.

## Props
- `options` — array of `{ value, label, icon? }`
- `correctValue` — the correct answer value (used for post-answer highlighting)
- `answered` — disables buttons and shows correct/wrong state

## Events
- `select` — emitted with the chosen value
