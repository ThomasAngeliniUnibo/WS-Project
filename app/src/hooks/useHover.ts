import {useState, useMemo} from 'react';

export const useHover = (): [
  boolean,
  {
    onMouseOver(): void;
    onMouseOut(): void;
  },
] => {
  const [hovered, setHovered] = useState(false);

  const eventHandlers = useMemo(
    () => ({
      onMouseOver() {
        setHovered(true);
      },
      onMouseOut() {
        setHovered(false);
      },
    }),
    [],
  );

  return [hovered, eventHandlers];
};
