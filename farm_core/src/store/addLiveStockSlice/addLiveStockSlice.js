import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDatas, db, updateDatas } from "../../firebase";
import { collection, doc, writeBatch } from "firebase/firestore";

const initialState = {
  farmName: "",
  farmId: "",
  farmAddress: "",
  farmScale: "",
  farm_stockType: "",
  farmBuild: "",
  farmCondition: "",
  facilities: "",
  insuranceDetail: "",
  note: "",
  isLoading: false,
  error: null,
  docId: null,
};

const AddLiveStockSlice = createSlice({
  name: "liveStcok",
  initialState,
  reducers: {
    addField: (state, action) => {
      const { fieldName, fieldValue } = action.payload;
      state[fieldName] = fieldValue;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addFarmData.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addFarmData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.docId = action.payload.docId;
        const {
          farmName,
          farmId,
          farmAddress,
          farmScale,
          farm_stockType,
          farmBuild,
          farmCondition,
          facilities,
          insuranceDetail,
          note,
        } = action.payload;
        state.farmName = farmName;
        state.farmId = farmId;
        state.farmAddress = farmAddress;
        state.farmScale = farmScale;
        state.farm_stockType = farm_stockType;
        state.farmBuild = farmBuild;
        state.farmCondition = farmCondition;
        state.facilities = facilities;
        state.insuranceDetail = insuranceDetail;
        state.note = note;
      })
      .addCase(addFarmData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

const addFarmData = createAsyncThunk(
  "livestock/addFarmData",
  async ({ collectionName, addObj }, { rejectWithValue }) => {
    try {
      const resultData = await addDatas(collectionName, addObj);
      console.log("Farm data added, docId:", resultData.docId); // 로그 추가
      await createSubCollection(resultData.docId); // 하위 컬렉션 생성
      return { docId: resultData.docId, ...addObj };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export async function createSubCollection(docId) {
  try {
    const farmDocRef = doc(db, "farm", docId);
    const batch = writeBatch(db);
    const subCollections = ["farmCureList", "ruinInfo", "vaccine", "disease"];

    subCollections.forEach((subCollection) => {
      const subCollectionRef = collection(farmDocRef, subCollection);
      const newDocRef = doc(subCollectionRef);
      batch.set(newDocRef, {}); // 빈 객체로 하위 컬렉션 문서 생성
    });

    await batch.commit();
    console.log("Sub-collections created successfully.");
  } catch (error) {
    console.error("Error creating sub-collections: ", error);
  }
}
export default AddLiveStockSlice.reducer;
export const { addField } = AddLiveStockSlice.actions;
export { addFarmData };
