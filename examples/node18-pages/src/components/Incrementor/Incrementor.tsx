type IncrementorProps = {
  onIncrement: () => void;
};

export function Incrementor({ onIncrement }: IncrementorProps): JSX.Element {
  return (
    <button onClick={onIncrement} type="button">
      Increment!
    </button>
  );
}
