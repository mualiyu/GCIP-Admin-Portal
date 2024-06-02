import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ProgramState {
  program: {
    programName: string;
    programDescription: string;
    lots?: {
      name: string;
    }[];
    stages?: {
      name: string;
      startDate: string;
      endDate: string;
      description: string;
    }[];

    uploads?: {
      name: string;
      file: string;
    }[];

  };
  id?: string;
}

const initialState: ProgramState = {
  program: {
    programName: "",
    programDescription: "",
    lots: [],
    stages: [],
    uploads: [],
  },
  id: "",
};

export const programSlice = createSlice({
  name: "program",
  initialState,
  reducers: {
    setProgramName: (state, action: PayloadAction<string>) => {
      state.program.programName = action.payload;
    },
    setProgramDesc: (state, action: PayloadAction<string>) => {
      state.program.programDescription = action.payload;
    },
    setProgramLots: (
      state,
      action: PayloadAction<
        {
          name: string;
        }[]
      >
    ) => {
      state.program.lots = action.payload;
    },
    setProgramStages: (
      state,
      action: PayloadAction<
        {
          name: string;
          startDate: string;
          endDate: string;
          description: string;
        }[]
      >
    ) => {
      state.program.stages = action.payload;
    },
    setProgramUploads: (
      state,
      action: PayloadAction<
        {
          name: string;
          file: string;
        }[]
      >
    ) => {
      state.program.uploads = action.payload;
    },
    resetProgram: (state) => {
      state.program = initialState.program;
    },
    setProgram: (state, action: PayloadAction<ProgramState>) => {
      state.program = action.payload.program;
    },
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setProgramDesc,
  setProgramLots,
  setProgramName,
  setProgramStages,
  setProgramUploads,
  resetProgram,
  setProgram,
  setId
} = programSlice.actions;

export default programSlice.reducer;
