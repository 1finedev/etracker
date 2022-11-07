//general actions for API calls
export const ACTIONS = {
  MAKE_REQUEST: "make-request",
  GET_DATA: "get-data",
  ERROR: "error",
};

// reducer function
export function reducer(state, action) {
  switch (action.type) {
    //outputs loader to the page and await API request response
    case ACTIONS.MAKE_REQUEST:
      return { ...state, loading: true };

    //collect data from response and pass it page, remove loader and output data
    case ACTIONS.GET_RESPONSE:
      return { ...state, loading: false, ...action.payload };

    //if error is found, output error message, return empty array back to page
    case ACTIONS.ERROR:
      return { ...state, loading: false, error: action.payload.error };

    default:
      break;
  }
}

export function useMakeRequest() {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    error: false,
  });
  const { token } = useContext(AuthContext);

  const config = { Authorization: `Bearer ${token}` };

  const axiosRequest = (method, endpoint, values = {}, headers = {}) => {
    console.log(PROXY + endpoint);
    dispatch({ type: ACTIONS.MAKE_REQUEST });

    console.log(config);
    let response = axios({
      method,
      url: `${PROXY}${endpoint}`,
      data: { ...values },
      headers: { ...headers, ...config },
    })
      .then(function (res) {
        dispatch({ type: ACTIONS.GET_RESPONSE });
        return { response: res.data, status: res.status };
      })
      .catch(function (err) {
        dispatch({ type: ACTIONS.ERROR, payload: { error: err } });
        return {
          message: err.response.data.message,
          error: err.response.status,
        };
      });

    return response;
  };

  const getRequest = (endpoint, values) => {
    console.log(PROXY + endpoint + "/" + values);
    dispatch({ type: ACTIONS.MAKE_REQUEST });

    let response = axios
      .get(`${PROXY}${endpoint}/${values}`)
      .then(function (res) {
        dispatch({ type: ACTIONS.GET_RESPONSE });
        return { response: res.data, status: res.status };
      })
      .catch(function (err) {
        dispatch({ type: ACTIONS.ERROR, payload: { error: err } });
        return {
          message: err.response.data.message,
          error: err.response.status,
        };
      });

    return response;
  };

  const postRequest = (endpoint, values = {}, headers = {}) => {
    dispatch({ type: ACTIONS.MAKE_REQUEST });

    let response = axios
      .post(
        `${PROXY}${endpoint}`,
        { ...values },
        { headers: { ...headers, ...config } }
      )
      .then(function (res) {
        dispatch({ type: ACTIONS.GET_RESPONSE });
        return { response: res.data, status: res.status };
      })
      .catch(function (err) {
        console.log(err);
        dispatch({ type: ACTIONS.ERROR, payload: { error: err } });
        return {
          response: err.response.data.message,
          status: err.response.status,
        };
      });

    return response;
  };

  const patchRequest = (endpoint, id = "", values = {}, headers = {}) => {
    dispatch({ type: ACTIONS.MAKE_REQUEST });

    let response = axios
      .patch(
        `${PROXY}${endpoint}/${id}`,
        { ...values },
        { headers: { ...headers, ...config } }
      )
      .then(function (res) {
        dispatch({ type: ACTIONS.GET_RESPONSE });
        return { response: res.data, status: res.status };
      })
      .catch(function (err) {
        console.log(err);
        dispatch({ type: ACTIONS.ERROR, payload: { error: err } });
        return {
          response: err.response.data.message,
          status: err.response.status,
        };
      });

    return response;
  };

  const deleteRequest = (endpoint, id = "", values = {}, headers = {}) => {
    dispatch({ type: ACTIONS.MAKE_REQUEST });

    let response = axios
      .delete(
        `${PROXY}${endpoint}/${id}`,
        { ...values },
        { headers: { ...headers, ...config } }
      )
      .then(function (res) {
        dispatch({ type: ACTIONS.GET_RESPONSE });
        return { response: res.data, status: res.status };
      })
      .catch(function (err) {
        console.log(err);
        dispatch({ type: ACTIONS.ERROR, payload: { error: err } });
        return {
          response: err.response.data.message,
          status: err.response.status,
        };
      });

    return response;
  };

  return {
    axiosRequest,
    postRequest,
    getRequest,
    deleteRequest,
    patchRequest,
    ...state,
  };
}
