import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ProgramState {
  program: {
    programName: string;
    programDescription: string;
    lots?: {
      name: string;
      region: string;
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
      isEditable: boolean;
      isChecked: boolean;
      color: string;
    }[];
  };
}

const initialState: ProgramState = {
  program: {
    programName: "",
    programDescription: "",
    lots: [
      {
        name: "",
        region: "",
        subLots: [],
      },
    ],
    requirements: [
      {
        name: "",
        type: "",
      },
    ],

    stages: [
      {
        name: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    uploads: [
      {
        name: "",
        file: "",
      },
    ],
    status: [
      {
        name: "",
        isEditable: false,
        isChecked: false,
        color: "",
      },
    ],
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
          isEditable: boolean;
          isChecked: boolean;
          color: string;
        }[]
      >
    ) => {
      state.program.status = action.payload;
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
} = programSlice.actions;

export default programSlice.reducer;
