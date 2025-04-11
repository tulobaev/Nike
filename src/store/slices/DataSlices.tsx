import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialStateType {
  _id: number;
  name: string;
  price: number;
  photoURL: string;
  description: string;
  category: string;
  brand: string;
  size: string;
  color: string;
}

interface DataState {
  data: IInitialStateType[];
  oneProduct: IInitialStateType[];
  searchValue: string;
}

const initialState: DataState = {
  data: [],
  oneProduct: [],
  searchValue: "",
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    oneProduct: (state, action: PayloadAction<IInitialStateType>) => {
      state.oneProduct = [action.payload];
    },
    setData: (state, action: PayloadAction<IInitialStateType[]>) => {
      state.data = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
});

export const { oneProduct, setData, setSearch } = dataSlice.actions;
export default dataSlice.reducer;
