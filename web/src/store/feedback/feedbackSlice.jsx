import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import FeedbackService from '../../services/FeedbackService';

const ERROR_CREATING_FEEDBACK = 'Erro ao criar feedback. Tente novamente.';
const ERROR_FILTERING_FEEDBACK = 'Erro ao filtrar feedbacks. Tente novamente.';
const ERROR_UPDATING_FEEDBACK = 'Erro ao atualizar feedback. Tente novamente.';

const updateArray = (array, updatedFeedback, uuidToUpdate) => {
  const indexToUpdate = array.findIndex((fb) => fb.uuid === uuidToUpdate);
  if (indexToUpdate !== -1) {
    array[indexToUpdate] = updatedFeedback;
  }
};

export const createFeedbackAula = createAsyncThunk(
  'feedback/createFeedbackAula',
  async (feedback, { rejectWithValue }) => {
    try {
      return await new FeedbackService().createFeedbackAula(feedback);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const filtrarFeedbackAula = createAsyncThunk(
  'feedback/filtrarFeedbackAula',
  async (params) => {
    return await new FeedbackService().filtrarFeedbackAula(params);
  },
);

export const meFeedbackAula = createAsyncThunk(
  'feedback/meFeedbackAula',
  async (param) => {
    return await new FeedbackService().filtrarFeedbackAula({
      ...param,
      me: true,
    });
  },
);

export const summaryFeedbackAula = createAsyncThunk(
  'feedback/summaryFeedbackAula',
  async (uuid) => {
    return await new FeedbackService().summaryFeedbackAula(uuid);
  },
);

export const removeFeedbackAula = createAsyncThunk(
  'feedback/deleteFeedbackAula',
  async (uuid) => {
    return await new FeedbackService().deleteFeedbackAula(uuid);
  },
);

export const updateFeedbackAula = createAsyncThunk(
  'feedback/updateFeedbackAula',
  async (params) => {
    return await new FeedbackService().updateFeedbackAula(
      params.uuid,
      params.feedback,
    );
  },
);

const initialState = {
  feedback: null,
  filteredFeedback: [],
  meFilteredFeedback: [],
  summary: null,
  error: null,
};

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createFeedbackAula.fulfilled, (state, action) => {
      state.feedback = action.payload;
      state.filteredFeedback = [action.payload, ...state.filteredFeedback];
    });
    builder.addCase(createFeedbackAula.rejected, (state, action) => {
      state.error = action.payload.message || ERROR_CREATING_FEEDBACK;
    });

    builder.addCase(filtrarFeedbackAula.fulfilled, (state, action) => {
      state.filteredFeedback = action.payload.resultados;
    });
    builder.addCase(filtrarFeedbackAula.rejected, (state) => {
      state.error = 'Erro ao filtrar feedbacks. Tente novamente.';
      state.filteredFeedback = [];
    });

    builder.addCase(meFeedbackAula.fulfilled, (state, action) => {
      state.meFilteredFeedback = action.payload.resultados;
    });
    builder.addCase(meFeedbackAula.rejected, (state) => {
      state.error = ERROR_FILTERING_FEEDBACK;
      state.meFilteredFeedback = [];
    });

    builder.addCase(summaryFeedbackAula.fulfilled, (state, action) => {
      state.summary = action.payload;
    });
    builder.addCase(summaryFeedbackAula.rejected, (state) => {
      state.error = 'Erro ao obter resumo do feedback. Tente novamente.';
      state.summary = null;
    });

    builder.addCase(removeFeedbackAula.fulfilled, (state, action) => {
      const uuidToRemove = action.meta.arg; // O uuid passado para o thunk
      state.filteredFeedback = state.filteredFeedback.filter(
        (fb) => fb.uuid !== uuidToRemove,
      );
      state.meFilteredFeedback = state.meFilteredFeedback.filter(
        (fb) => fb.uuid !== uuidToRemove,
      );
    });
    builder.addCase(removeFeedbackAula.rejected, (state) => {
      state.error = ERROR_FILTERING_FEEDBACK;
    });

    builder.addCase(updateFeedbackAula.fulfilled, (state, action) => {
      const updatedFeedback = action.payload;
      const uuidToUpdate = action.meta.arg.uuid;

      updateArray(state.filteredFeedback, updatedFeedback, uuidToUpdate);
      updateArray(state.meFilteredFeedback, updatedFeedback, uuidToUpdate);
    });
    builder.addCase(updateFeedbackAula.rejected, (state) => {
      state.error = ERROR_UPDATING_FEEDBACK;
    });
  },
});

export default feedbackSlice.reducer;
