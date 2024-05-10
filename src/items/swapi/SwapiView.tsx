import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchPeopleRequest } from "./SwapiSlice";
import { Link } from "react-router-dom";
import SearchView from "../search/SearchView";

const SwapiView: React.FC = () => {
  const { loading, data, error, currentPage } = useAppSelector((state) => state.swapi);
  const searchTerm = useAppSelector((state) => state.search.searchTerm); // Get search term from Redux store
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPeopleRequest({ currentPage, searchTerm }));
  }, [dispatch, currentPage, searchTerm]);

  const prevPage = () => {
    if (currentPage > 1) {
      dispatch(fetchPeopleRequest({ currentPage: currentPage - 1, searchTerm }));
    }
  };

  const nextPage = () => {
    if (currentPage < 9) {
      dispatch(fetchPeopleRequest({ currentPage: currentPage + 1, searchTerm }));
    }
  };

  return (
    <div>
      <h2>Star Wars Characters</h2>
      <SearchView />
      &nbsp;
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Height</th>
            <th>Eye Color</th>
          </tr>
        </thead>
        <tbody>
          {data.map((person, index) => (
            <tr key={index}>
              <td>{person.name}</td>
              <td>{person.gender}</td>
              <td>{person.height}</td>
              <td>{person.eye_color}</td>
              <td>
                <div className="pagination2">
                  <Link to={`/details/${person.url.split("/").slice(-2, -1)}`}>
                    <button>Details</button>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button id="prevBtn" onClick={prevPage}>
          Previous
        </button>
        <span id="pageInfo">PAGE {currentPage}</span>
        <button id="nextBtn" onClick={nextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default SwapiView;
