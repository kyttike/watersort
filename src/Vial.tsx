import './Vial.css';
import { VialState } from './App';

type Props = {
  vialState: VialState;
  selected: boolean;
  onClick: () => void;
  size: number;
};

const Vial = ({ vialState, selected, onClick, size }: Props) => {
  const emptySlotsCount = size - vialState.length;
  const emptySlots = emptySlotsCount > 0 ? Array(emptySlotsCount).fill(null) : [];
  return (
    <div className={`vial ${selected ? 'vial--selected' : ''}`} onClick={onClick}>
      {emptySlots.map((_, index: number) => (
        <div className="vial-liquid" key={`${index}-empty`} />
      ))}
      {vialState
        .slice()
        .reverse()
        .map((item: string, index: number) => (
          <div className="vial-liquid" style={{ backgroundColor: item }} key={`${index}-${item}`} />
        ))}
    </div>
  );
};

export default Vial;
