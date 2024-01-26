import React, { useEffect, useState } from "react";
import { sortOptions, statusOptions, typeOptions } from "../constant";
import { useDispatch } from "react-redux";
import {
  clearFilters,
  filterBySearch,
  sortJobs,
} from "../redux/slices/jobSlice";

const Filter = ({ jobs }) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  // kullanıcı yazmayı bitirdiğinde filtreleme yapma => debounce
  useEffect(() => {
    // sayaç başlat ve işlemi sayaç durduğunda yap
    const timer = setTimeout(() => {
      dispatch(filterBySearch({ field: "position", text }));
    }, 500);

    // eğer süre bitmeden useEffect çalışırsa sayacı sıfırla
    return () => clearTimeout(timer);
  }, [text]);

  return (
    <section className="filter-sec">
      <h2>Filter</h2>
      <form>
        <div>
          <label>Search by jobs name</label>
          <input type="text" onChange={(e) => setText(e.target.value)} />
        </div>

        <div>
          <label>Status</label>
          <select
            onChange={(e) =>
              dispatch(
                filterBySearch({ field: "status", text: e.target.value })
              )
            }
            name="status"
          >
            <option value="" hidden>
              Pick
            </option>
            {statusOptions.map((i, index) => (
              <option key={index} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Type</label>
          <select
            onChange={(e) =>
              dispatch(filterBySearch({ field: "type", text: e.target.value }))
            }
            name="type"
          >
            <option value={""} hidden>
              Pick
            </option>
            {typeOptions.map((i, index) => (
              <option key={index} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Sort</label>
          <select
            onChange={(e) => dispatch(sortJobs(e.target.value))}
            name="type"
          >
            <option value={""} hidden>
              Pick
            </option>
            {sortOptions.map((i, index) => (
              <option key={index} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button
            onClick={() => dispatch(clearFilters())}
            type="reset"
            class="btn"
          >
            Filter
          </button>
        </div>
      </form>
    </section>
  );
};

export default Filter;
