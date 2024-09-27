import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDatas, deleteDatas, getDatas, updateDatas } from "../../firebase";

const initialState = {
  schedules: [],
  loading: false,
  error: null,
};

const scheduleSlice = createSlice({
  name: "schedules",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchedules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSchedules.fulfilled, (state, action) => {
        state.schedules = action.payload;
        state.loading = false;
      })
      .addCase(fetchSchedules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSchedule.fulfilled, (state, action) => {
        state.schedules.push(action.payload); // 새 스케줄 추가
        state.loading = false;
      })
      .addCase(addSchedule.rejected, (state, action) => {
        console.error("Error adding schedule:", action.payload);
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSchedule.fulfilled, (state, action) => {
        console.log("State before update:", state); // 상태 업데이트 전
        const updatedSchedules = state.schedules.map((schedule) =>
          schedule.id === action.payload.id ? action.payload : schedule
        );
        state.schedules = updatedSchedules;
        console.log("Updated schedules:", state.schedules); // 업데이트된 상태 로그
      })
      .addCase(updateSchedule.rejected, (state, action) => {
        console.error("Error updating schedule:", action.payload); // 에러 로그
        state.error = action.payload;
      })
      .addCase(deleteSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSchedule.fulfilled, (state, action) => {
        state.schedules = state.schedules.filter(
          (schedule) => schedule.id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const fetchSchedules = createAsyncThunk(
  "schedule/fetchSchedules",
  async ({ collectionName, queryOptions }, { rejectWithValue }) => {
    try {
      const result = await getDatas(collectionName, queryOptions);
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addSchedule = createAsyncThunk(
  "schedule/addSchedule",
  async ({ collectionName, scheduleObj }, { rejectWithValue }) => {
    if (!scheduleObj) {
      console.error("scheduleObj is undefined");
      return rejectWithValue("scheduleObj is missing");
    }

    const email = localStorage.getItem("email");
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newScheduleData = {
      title: scheduleObj.content[0].title || "", // content 배열에서 값 가져오기
      description: scheduleObj.content[0].description || "", // content 배열에서 값 가져오기
      time: scheduleObj.content[0].time || "", // content 배열에서 값 가져오기
      createdAt: createdAt,
      updatedAt: updatedAt,
    };

    console.log("newScheduleData:", newScheduleData);
    try {
      // Firestore에서 동일한 이메일로 문서 조회
      console.log("Fetching existing schedules for email:", email);
      const querySnapshot = await getDatas(collectionName, {
        conditions: [{ field: "email", operator: "==", value: email }],
      });
      console.log("Firestore query result:", querySnapshot);

      if (querySnapshot.length > 0) {
        // 기존 문서가 있을 때, 해당 문서의 content 배열에 새 일정 추가
        const docId = querySnapshot[0].docId;
        console.log("Existing document ID:", docId);
        const existingContent = querySnapshot[0].content || [];
        const updatedContent = [...existingContent, newScheduleData];

        console.log("Updated content for existing schedule:", updatedContent);

        await updateDatas(collectionName, docId, { content: updatedContent });

        return { email, content: updatedContent }; // 상태 업데이트에 반영될 데이터
      } else {
        // 기존 문서가 없을 때, 새로운 문서 생성
        const newDoc = {
          email,
          content: [newScheduleData],
        };

        console.log("Creating new schedule document:", newDoc);

        await addDatas(collectionName, newDoc);

        return newDoc;
      }
    } catch (error) {
      console.error("Error in addSchedule:", error); // 여기서 발생한 오류를 제대로 로깅
      return rejectWithValue(error?.message || "Unknown error occurred");
    }
  }
);

// 스케줄 업데이트
export const updateSchedule = createAsyncThunk(
  "schedule/updateSchedule",
  async ({ collectionName, docId, updatedData }, { rejectWithValue }) => {
    try {
      const result = await updateDatas(collectionName, docId, updatedData);
      console.log("Update result:", result); // 여기서 결과 로그
      return result;
    } catch (error) {
      console.error("Error updating schedule:", error); // 오류 로그
      return rejectWithValue(error.message);
    }
  }
);
// 스케줄 삭제
export const deleteSchedule = createAsyncThunk(
  "schedule/deleteSchedule",
  async ({ collectionName, docId }, { rejectWithValue }) => {
    try {
      await deleteDatas(collectionName, docId);
      return docId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export default scheduleSlice.reducer;
