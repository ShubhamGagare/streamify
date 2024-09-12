// utils/randomBorderRadius.ts
export const random = (min: number, max: number) =>
  Math.random() * (max - min) + min;

export const getRandomBorderRadius = (): React.CSSProperties => {
  const baseRadii = {
    topLeft: { x: 255, y: 15 },
    topRight: { x: 15, y: 225 },
    bottomRight: { x: 225, y: 5 },
    bottomLeft: { x: 15, y: 255 }
  };
 
  const randomize = (radius: { x: number, y: number }) => ({
    x: Math.max(0, radius.x + random(-4, 5)),
    y: Math.max(0, radius.y + random(-4, 4))
  });

  const topLeft = randomize(baseRadii.topLeft);
  const topRight = randomize(baseRadii.topRight);
  const bottomRight = randomize(baseRadii.bottomRight);
  const bottomLeft = randomize(baseRadii.bottomLeft);

  return {
    borderRadius: `${topLeft.x}px ${topRight.x}px ${bottomRight.x}px ${bottomLeft.x}px / ${topLeft.y}px ${topRight.y}px ${bottomRight.y}px ${bottomLeft.y}px`
  };
};


  
export const getBottomBorderRadius = (): React.CSSProperties => {
  const baseRadii = {
    topLeft: { x: 0, y: 0 },
    topRight: { x: 1, y: 225 },
    bottomRight: { x: 225, y: 5 },
    bottomLeft: { x: 100, y: 1 }
  };
 
  const randomize = (radius: { x: number, y: number }) => ({
    x: Math.max(0, radius.x + random(-4, 5)),
    y: Math.max(0, radius.y + random(-4, 4))
  });

  const topLeft = randomize(baseRadii.topLeft);
  const topRight = randomize(baseRadii.topRight);
  const bottomRight = randomize(baseRadii.bottomRight);
  const bottomLeft = randomize(baseRadii.bottomLeft);

  return {
    borderRadius: `${topLeft.x}px ${topRight.x}px ${bottomRight.x}px ${bottomLeft.x}px / ${topLeft.y}px ${topRight.y}px ${bottomRight.y}px ${bottomLeft.y}px`
  };
};
