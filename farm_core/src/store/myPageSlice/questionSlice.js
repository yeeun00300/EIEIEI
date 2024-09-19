import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDatas,
  updateDatas,
  deleteDatas,
  uploadImage,
  getDatas,
} from "../../firebase";
import kroDate from "../../utils/korDate";

const initialState = {
  questions: [],
  isEditing: false,
  editingQuestion: null,
  status: "idle",
  error: null,
};

export const fetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async () => {
    const queryOptions = {
      conditions: [
        { field: "communityType", operator: "==", value: "question" },
      ],
    };
    const fetchedQuestions = await getDatas("community", queryOptions);
    return fetchedQuestions.map((question) => ({
      ...question,
      id: question.docId,
    }));
  }
);

export const addQuestion = createAsyncThunk(
  "questions/addQuestion",
  async (newQuestion) => {
    const { file, ...rest } = newQuestion;
    let fileUrl = rest.imageUrl;

    if (file) {
      fileUrl = await uploadImage(`images/${file.name}`, file);
    }

    const questionData = {
      ...rest,
      createdAt: kroDate(),
      imageUrl: fileUrl,
      communityType: "question", // Ensure this field is set
    };

    await addDatas("community", questionData);
    return questionData;
  }
);

export const updateQuestion = createAsyncThunk(
  "questions/updateQuestion",
  async (updatedQuestion) => {
    const { file, id, ...rest } = updatedQuestion;
    let fileUrl = rest.imageUrl;

    if (file) {
      fileUrl = await uploadImage(`images/${file.name}`, file);
    }

    const questionData = {
      ...rest,
      imageUrl: fileUrl,
    };

    await updateDatas("community", id, questionData);
    return { id, ...questionData };
  }
);

export const deleteQuestion = createAsyncThunk(
  "questions/deleteQuestion",
  async (id) => {
    await deleteDatas("community", id);
    return id;
  }
);

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    startEditing(state, action) {
      state.isEditing = true;
      state.editingQuestion = action.payload;
    },
    stopEditing(state) {
      state.isEditing = false;
      state.editingQuestion = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addQuestion.fulfilled, (state, action) => {
        state.questions.push(action.payload);
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        const index = state.questions.findIndex(
          (q) => q.id === action.payload.id
        );
        if (index !== -1) {
          state.questions[index] = action.payload;
        }
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.questions = state.questions.filter(
          (q) => q.id !== action.payload
        );
      });
  },
});

export const { startEditing, stopEditing } = questionsSlice.actions;

export default questionsSlice.reducer;
