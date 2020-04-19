export function getClickPosition(e) {
  const xPosition = e.clientX;
  const yPosition = e.clientY;
  // const posArray = [xPosition, yPosition];

  return [xPosition, yPosition];
}
