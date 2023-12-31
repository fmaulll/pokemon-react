import { FC, useState } from "react";
import { FilterTypes, PokemonTypeList } from "../../type";

interface Props {
  total: number;
  typeList: PokemonTypeList[];
  onResetFilter: () => void;
  onSubmitFilter: (filter: FilterTypes) => void;
}

const Filter: FC<Props> = ({ total, typeList, onResetFilter, onSubmitFilter }) => {
  const [isFilterActive, setIsFilterActive] = useState<boolean>(false);
  const [filter, setFilter] = useState<FilterTypes>({
    name: "",
    url: "",
  });
  const handleChange = (key: string, value: string) => {
    setFilter((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };
  const handleApplyFilter = () => {
    if (!filter.name && !filter.url) {
      return;
    }
    setIsFilterActive(true);
    onSubmitFilter(filter);
  };

  const handleResetFilter = () => {
    setIsFilterActive(false);
    setFilter({
      name: "",
      url: "",
    });
    onResetFilter();
  };
  return (
    <div data-testid="filter" className="w-full bg-yellow-500 px-8 py-4 mb-4 fixed left-0 top-0 z-10 flex justify-between items-center">
      <div className="flex items-center">
        <label className="mr-4 font-bold" htmlFor="name">
          Type :
        </label>
        <select
          value={filter.url}
          id="type"
          className="px-4 py-2 rounded-lg"
          onChange={(e) => handleChange("url", e.currentTarget.value)}
        >
          <option value={""}>All</option>
          {typeList.map((type, index) => (
            <option key={index} value={type.url}>
              {type.name[0].toUpperCase() +
                type.name.slice(1, type.name.length)}
            </option>
          ))}
        </select>
      <h3 className="ml-8 text-center text-black">Total pokemon: {total}</h3>
      </div>
      <div>
        {isFilterActive ? (
          <button
            className="p-4 font-bold bg-red-500 text-white rounded-xl hover:bg-red-700 duration-200"
            onClick={handleResetFilter}
          >
            Reset
          </button>
        ) : null}
        <button
          className="ml-4 font-bold p-4 bg-white rounded-xl hover:bg-gray-300 duration-100 active:bg-gray-400"
          onClick={handleApplyFilter}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default Filter;
