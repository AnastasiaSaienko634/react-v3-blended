import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onSearch: (value: string) => void;
  value: string;
}

export default function SearchBox({ onSearch, value }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search posts"
      value={value}
      onChange={(event) => onSearch(event.target.value)}
    />
  );
}
