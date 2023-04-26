import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ProgramState {
  program: {
    programName: string;
    programDescription: string;
    lots?: {
      name: string;
      region: string;
      category: string;
      subLots?: any[];
    }[];

    requirements?: {
      name: string;
      type: string;
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

    status?: {
      name: string;
      isEditable: string;
      isInitial: string;
      color: string;
    }[];
  };
}

const initialState: ProgramState = {
  program: {
    programName: "",
    programDescription: "",
    lots: [],
    requirements: [],

    stages: [],
    uploads: [],
    status: [],
  },
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
          region: string;
          category: string;
          subLots?: { name: string; category: string; subLots: any[] }[];
        }[]
      >
    ) => {
      state.program.lots = action.payload;
    },
    setProgramRequirements: (
      state,
      action: PayloadAction<
        {
          name: string;
          type: string;
        }[]
      >
    ) => {
      state.program.requirements = action.payload;
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
    setProgramSatus: (
      state,
      action: PayloadAction<
        {
          name: string;
          isEditable: string;
          isInitial: string;
          color: string;
        }[]
      >
    ) => {
      state.program.status = action.payload;
    },
    resetProgram: (state) => {
      state.program = initialState.program;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setProgramDesc,
  setProgramLots,
  setProgramName,
  setProgramRequirements,
  setProgramSatus,
  setProgramStages,
  setProgramUploads,
  resetProgram
} = programSlice.actions;

export default programSlice.reducer;
