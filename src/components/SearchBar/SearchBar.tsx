import "./SearchBar.css";

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

export default function SearchBar({ value, onChange, placeholder }: Props) {
  return (
    <div className="search">
      <span className="search__icon">🔍</span>
      <input
        className="search__input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "Поиск кроссовок, брендов"}
        autoComplete="off"
        spellCheck={false}
      />
    </div>
  );
}
