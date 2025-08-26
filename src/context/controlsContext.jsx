import { useCallback } from "react";
import { useContext, useReducer, createContext, useSyncExternalStore } from "react";

const initialState = {
  speed: 50,
  arraySize: 500,
  backgroundColor: "#008080",
  arrayColor: ["#C0C0C0"],
  sortAlgorithm: "l-quick",
  windowRef: null,
  restartValue: 0,
};

const controlReducer = (state, action) => {
  switch (action.type) {
    case "SET_SPEED":
      return { ...state, speed: action.payload };
    case "SET_ARRAY_SIZE":
      return { ...state, arraySize: action.payload };
    case "SET_BACKGROUND_COLOR":
      return { ...state, backgroundColor: action.payload };
    case "SET_COLOR_ARRAY":
      return { ...state, arrayColor: action.payload };
    case "SET_SORT":
      return { ...state, sortAlgorithm: action.payload };
    case "SET_WINDOW_REF":
      return { ...state, windowRef: action.payload };
    case "SET_RESTART_VALUE":
      return { ...state, restartValue: action.payload };
    default:
      throw new Error("Cannot match action.type in controlReducer.");
  }
};

const СontrolContext = createContext();

const useControlContext = () => {
  const context = useContext(СontrolContext);

  if (context === undefined) {
    throw new Error("useControlContext must be used within ShopContext");
  }

  return context;
};

const ControlProvider = ({ children }) => {
  const [state, dispatch] = useReducer(controlReducer, initialState);

  const setSpeed = (newSpeed) => {
    dispatch({ type: "SET_SPEED", payload: parseInt(newSpeed) });
  };

  const setArraySize = useCallback((newArraySize) => {
    dispatch({ type: "SET_ARRAY_SIZE", payload: parseInt(newArraySize) });
  }, []);

  const setBackgroundColor = (newBackgroundColor) => {
    dispatch({ type: "SET_BACKGROUND_COLOR", payload: newBackgroundColor });
  };

  const setColorArray = (newColorArray) => {
    dispatch({ type: "SET_COLOR_ARRAY", payload: newColorArray });
  };

  const setSort = useCallback((newSort) => {
    dispatch({ type: "SET_SORT", payload: newSort });
  }, []);

  const setWindowRef = (newRef) => {
    dispatch({ type: "SET_WINDOW_REF", payload: newRef });
  };

  const increaseRestartValue = () => {
    dispatch({ type: "SET_RESTART_VALUE", payload: state.restartValue + 1 });
  };

  const value = {
    state,
    setSpeed,
    setArraySize,
    setBackgroundColor,
    setColorArray,
    setSort,
    setWindowRef,
    increaseRestartValue,
  };

  return (
    // Передача значення контексту через Provider
    <СontrolContext.Provider value={value}>{children}</СontrolContext.Provider>
  );
};

export { useControlContext, ControlProvider };
