# GameTimer

A countdown timer component for games. Displays remaining time and a progress bar.

## Props
- `totalSeconds` — total duration in seconds
- `running` — whether the timer is ticking
- `warningThreshold` — seconds remaining at which the warning style is applied (default 10)

## Events
- `tick` — emitted every second with the current `timeLeft` value
- `expire` — emitted when the timer reaches zero
