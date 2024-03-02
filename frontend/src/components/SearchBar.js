import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export default function SearchBar() {
  const difficultyDropdownRef = useRef(null);
  const tagsDropdownRef = useRef(null);
  const statusDropdownRef = useRef(null);
  const [tagsDropdown, setTagsDropdown] = useState(false);
  const [difficultyDropdown, setDifficultyDropdown] = useState(false);
  const [statusDropdown, setStatusDropdown] = useState(false);

  let query = useQuery();
  let tags = query.get("tags") ? query.get("tags").split(",") : [];
  let difficulty = query.get("difficulty") ? query.get("difficulty") : "";
  let status = query.get("status") ? query.get("status") : "";
  let keyword = query.get("keyword") ? query.get("keyword") : "";

  useEffect(() => {
    function handleClickOutside(setDropdown, dropdownRef) {
      return (event) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          setDropdown(false);
        }
      };
    }

    const handleTagsClickOutside = handleClickOutside(
      setTagsDropdown,
      tagsDropdownRef
    );
    const handleDifficultyClickOutside = handleClickOutside(
      setDifficultyDropdown,
      difficultyDropdownRef
    );
    const handleStatusClickOutside = handleClickOutside(
      setStatusDropdown,
      statusDropdownRef
    );

    document.addEventListener("mousedown", handleTagsClickOutside);
    document.addEventListener("mousedown", handleDifficultyClickOutside);
    document.addEventListener("mousedown", handleStatusClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleTagsClickOutside);
      document.removeEventListener("mousedown", handleDifficultyClickOutside);
    };
  }, []);

  const navigate = useNavigate();

  const callNavigate = () => {
    let queryToNavigate = "";
    if (tags.length > 0) {
      queryToNavigate += `tags=${tags.join(",")}`;
    }
    if (difficulty) {
      if (queryToNavigate.length > 0) {
        queryToNavigate += "&";
      }
      queryToNavigate += `difficulty=${difficulty}`;
    }
    if (status) {
      if (queryToNavigate.length > 0) {
        queryToNavigate += "&";
      }
      queryToNavigate += `status=${status}`;
    }
    if (keyword) {
      if (queryToNavigate.length > 0) {
        queryToNavigate += "&";
      }
      queryToNavigate += `keyword=${keyword}`;
    }

    navigate(`/?${queryToNavigate}`);
  };

  const handleTagsSearch = (tag) => {
    if (tags.includes(tag)) {
      tags = tags.filter((t) => t !== tag);
    } else {
      tags.push(tag);
    }

    callNavigate();
  };

  const handleDifficultySearch = (difficultyLevel) => {
    if (difficulty === difficultyLevel) {
      difficulty = "";
    } else {
      difficulty = difficultyLevel;
    }
    callNavigate();
  };

  const handleStatusSearch = (statusType) => {
    if (status === statusType) {
      status = "";
    } else {
      status = statusType;
    }

    callNavigate();
  };

  const handleKeywordSearch = (e) => {
    e.preventDefault();
    keyword = e.target.elements.searchDropdown.value;

    callNavigate();
  };

  const removeField = (value) => {
    if (tags.includes(value)) {
      tags = tags.filter((tag) => tag !== value);
    } else if (difficulty === value) {
      difficulty = "";
    } else if (status === value) {
      status = "";
    } else if (keyword === value) {
      keyword = "";
    }

    callNavigate();
  };

  const allTags = [
    "Arrays",
    "Graphs",
    "Hashing",
    "Binary Search",
    "Linked List",
    "Greedy",
    "Backtracking",
  ];
  const allDifficulties = ["Easy", "Medium", "Hard"];
  const allStatus = ["Unsolved", "Solved", "Liked", "Disliked"];

  const dropDownBtnClass =
    "relative flex-shrink-0 z-20 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600 flex flex-row justify-between w-36";
  const dropDownBtnArrowClass =
    "w-3 h-3 ms-2.5 transform transition-transform duration-500";
  const dropDownListItemClass =
    "inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white";
  return (
    <div className="flex flex-col">
      <form className="mx-5" onSubmit={handleKeywordSearch}>
        <div className="flex">
          <div ref={tagsDropdownRef} className="relative inline-block">
            <button
              id="dropdown-button"
              data-dropdown-toggle="dropdown"
              className={`${dropDownBtnClass} rounded-s-lg`}
              type="button"
              onClick={() => {
                setTagsDropdown((prevState) => !prevState);
              }}
            >
              Tags{" "}
              <svg
                className={`${dropDownBtnArrowClass} ${
                  tagsDropdown ? "rotate-180" : ""
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            {tagsDropdown && (
              <div className="absolute z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdown-button"
                >
                  {allTags.map((tag) => (
                    !tags.includes(tag) && (
                    <li key={tag}>
                      <button
                        type="button"
                        className={`${dropDownListItemClass}`}
                        onClick={() => handleTagsSearch(tag)}
                      >
                        {tag}
                      </button>
                    </li>
                    )
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div ref={difficultyDropdownRef} className="relative inline-block">
            <button
              id="dropdown-button"
              data-dropdown-toggle="dropdown"
              className={`${dropDownBtnClass}`}
              type="button"
              onClick={() => {
                setDifficultyDropdown((prevState) => !prevState);
              }}
            >
              Difficulty{" "}
              <svg
                className={`${dropDownBtnArrowClass} ${
                  difficultyDropdown ? "rotate-180" : ""
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            {difficultyDropdown && (
              <div className="absolute z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdown-button"
                >
                  {allDifficulties.map((diff) => (
                    <li key={diff}>
                      <button
                        type="button"
                        className={`${dropDownListItemClass}`}
                        onClick={() => handleDifficultySearch(diff)}
                      >
                        {diff}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div ref={statusDropdownRef} className="relative inline-block">
            <button
              id="dropdown-button"
              data-dropdown-toggle="dropdown"
              className={`${dropDownBtnClass}`}
              type="button"
              onClick={() => {
                setStatusDropdown((prevState) => !prevState);
              }}
            >
              Status{" "}
              <svg
                className={`${dropDownBtnArrowClass} ${
                  statusDropdown ? "rotate-180" : ""
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            {statusDropdown && (
              <div className="absolute z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdown-button"
                >
                  {allStatus.map((statusType) => (
                    <li key={statusType}>
                      <button
                        type="button"
                        className={`${dropDownListItemClass}`}
                        onClick={() => handleStatusSearch(statusType)}
                      >
                        {statusType}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="relative w-full">
            <input
              type="search"
              id="searchDropdown"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="Search questions..."
              required
            />
            <button
              type="submit"
              className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>
      <div className="flex flex-row flex-wrap mt-5 mb-[-10px] bg-dark-1 text-white">
        {[...tags, difficulty, status, keyword]
          .filter(Boolean)
          .map((value, index) => (
            <div
              key={index}
              className="text-xs mx-5 border border-gray-300 rounded-xl h-[40px] flex items-center flex-row justify-between bg-dark px-2"
            >
              <div className="mx-1">{value}</div>
              <div
                className="p-1 px-2 font-sans text-gray-200 rounded-lg cursor-pointer hover:bg-gray-600"
                onClick={() => removeField(value)}
              >
                X
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
