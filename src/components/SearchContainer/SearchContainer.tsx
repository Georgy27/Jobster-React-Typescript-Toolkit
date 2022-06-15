import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { handleChange, clearFilters } from "../../store/Reducers/allJobsSlice";
import FormRow from "../FormRow/FormRow";
import FormRowSelect from "../FormRowSelect/FormRowSelect";
import Wrapper from "./SearchContainer.styles";

const SearchContainer = () => {
  const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
    useAppSelector((store) => store.allJobs);

  const { jobTypeOptions, statusOptions } = useAppSelector(
    (store) => store.job
  );
  const dispatch = useAppDispatch();

  const handleSearch = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const name = e.target.name as
      | "searchStatus"
      | "search"
      | "searchType"
      | "sort";
    const value = e.target.value;
    if (isLoading) return; // to prevent next request until the request is complete
    dispatch(handleChange({ name, value }));
  };
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(clearFilters());
  };
  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="search"
            value={search}
            handleChange={handleSearch}
          />
          {/* search by status */}
          <FormRowSelect
            labelText="status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            list={["all", ...statusOptions]}
          />
          {/* search by type */}
          <FormRowSelect
            labelText="type"
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
            list={["all", ...jobTypeOptions]}
          />
          {/* sort */}
          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
