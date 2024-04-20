import { ChangeEvent } from "react";

interface FilterFormProps {
  tags: string[];
  categories: string[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onReset: () => void;
}

const FilterForm = ({ tags, categories, onChange, onReset }:FilterFormProps) => {
  return (
    <form className="flex justify-between">
      <select
        name="tags"
        id="tags"
        onChange={onChange}
        className="p-1 border text-black w-full"
      >
        <option value="" disabled selected hidden>
          Select Tag
        </option>
        {tags?.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>

      <select
        name="category"
        id="category"
        onChange={onChange}
        className="p-1 border text-black w-full"
      >
        <option value="" disabled selected hidden>
          Select Category
        </option>
        {categories?.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <button onClick={onReset} className="p-2 bg-secondary w-full">
        Remove Filters
      </button>
    </form>
  );
};

export default FilterForm;