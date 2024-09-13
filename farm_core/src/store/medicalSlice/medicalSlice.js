import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  medicalData: {
    name: "",
    phone: "",
    address: "",
    barnType: "",
    numberOfAnimals: "",
    symptoms: "",
    affectedAnimals: "",
    fever: false,
    temperature: "",
    cough: false,
    coughFrequency: "",
    diarrhea: false,
    diarrheaFrequency: "",
    ventilation: "",
    lighting: "",
    feed: "",
  },
};

const medicalSlice = createSlice({
  name: "medical",
  initialState,
  reducers: {
    updateMedicalData(state, action) {
      state.medicalData = { ...state.medicalData, ...action.payload };
    },
  },
});

export const { updateMedicalData } = medicalSlice.actions;
export default medicalSlice.reducer;
