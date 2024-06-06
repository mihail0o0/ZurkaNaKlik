import { ChangeEvent, useState } from "react";
import style from "./style.module.css";
import HomeImage from "@/components/HomeImage";
import { useSelector } from "react-redux";
import {
  selectFilters,
  selectFiltersData,
  selectPaginationData,
  selectSortData,
} from "@/store/filters";
import { useAppDispatch } from "@/store";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { stringToEnum } from "@/utils/enumMappings";
import { FilteredOglasObjektaRequest, tipProslavaMap } from "@/store/api/endpoints/oglas/types";
import { Filters, Sort, mapStringToSort } from "@/store/filters/types";
import { useGetFilteredOglasesQuery } from "@/store/api/endpoints/oglas";
import OglasKartica from "@/components/OglasKartica";

const Home = () => {
  const filters = useSelector(selectFilters);
  const filtersSort = useSelector(selectSortData);
  const filtersPagination = useSelector(selectPaginationData);
  const dispatch = useAppDispatch();

  const [selectedSort, setSelectedSort] = useState(filtersSort);
  const [selectedPageNumber, setSelectedPageNumber] = useState(
    filtersPagination.pageNumber
  );
  const [selectedPageSize, setSelectedPageSize] = useState(
    filtersPagination.pageSize
  );


  const paginationValues = [12, 20, 30, 40, 50, 100];

  const handleSortChange = (event: SelectChangeEvent) => {
    if (!event) return;
    const str = mapStringToSort(event.target.value);
    if (str == undefined) return;

    setSelectedSort(str);
  };

  const requestFilters: FilteredOglasObjektaRequest = {
    ...filters,
    filtersData: {
      ...filters.filtersData,
      dodatnaOprema: (filters.filtersData.dodatnaOprema.length > 0) ? filters.filtersData.dodatnaOprema : undefined,
      grejanje: (filters.filtersData.grejanje.length > 0) ? filters.filtersData.grejanje : undefined,
      tipProslava: (filters.filtersData.tipProslava.length > 0) ? filters.filtersData.tipProslava : undefined,
      tipProstora: (filters.filtersData.tipProstora.length > 0) ? filters.filtersData.tipProstora : undefined,
    }
  };

  const { data: oglasi } = useGetFilteredOglasesQuery(requestFilters);

  return (
    <>
      <HomeImage />
      <div className={style.resultWrapper}>
        <div className={style.filtersTop}>
          <Select
            id="selectSorting"
            value={selectedSort}
            onChange={handleSortChange}
            sx={{
              borderRadius: "12px",
              color: "black",
            }}
          >
            {Object.values(Sort).map((value) => {
              return (
                <MenuItem key={`Select-${value}`} value={value}>
                  {value}
                </MenuItem>
              );
            })}
          </Select>
          <Select
            id="selectSize"
            value={String(selectedPageSize)}
            onChange={handleSortChange}
            sx={{
              borderRadius: "12px",
              color: "black",
            }}
          >
            {paginationValues.map((value) => {
              return (
                <MenuItem key={`Select-${value}`} value={value}>
                  {value}
                </MenuItem>
              );
            })}
          </Select>
        </div>
        <div  className={style.resultContainer}>
          {oglasi &&
            oglasi.response.map((oglas) => {
              return (
                <OglasKartica key={oglas.id} oglas={oglas} onClick={() => {}} />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Home;
