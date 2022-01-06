const initialState = {
  listJobs: [],
  listCompanies: [],
  listRecommendJobs: [],
  listSavedJobs: [],
  searchTerm: "",
  keyBoard: false,
  infoUser: null,
  chartFilter: null,
  searchFilter:null
};
const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_JOBS": {
      return {
        ...state,
        listJobs: action.payload,
      };
    }
    case "SET_COMPANIES": {
      return {
        ...state,
        listCompanies: action.payload,
      };
    }
    case "OPEN_KEYBOARD": {
      return {
        ...state,
        keyBoard: true,
      };
    }
    case "CLOSE_KEYBOARD": {
      return {
        ...state,
        keyBoard: false,
      };
    }
    case "SET_SAVED_JOBS": {
      console.log("come to save job");
      const newList = state.listJobs.map(
        (item) => {
          if (item.Id === action.payload.Id) {
            if (item.saved == true) item.saved = false; else item.saved = true;
          } 
          return item;
        }
      );
      
      return {
        ...state,
        listJobs: newList,
      };
    }
    case "SET_INFO_PROFILE": {
      console.log("info", action.payload);
      return {
        ...state,
        infoUser: action.payload,
      };
    }
    case "CHART_FILTER": {
      return {
        ...state,
        chartFilter: action.payload
      }
    }
      
    case "SET_SEARCH_FILTER": {
      return {
        ...state,
        searchFilter: action.payload
      }
    }
    default:
      return state;
  }
};
export default jobReducer;
