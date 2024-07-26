import mongoose from 'mongoose';

interface FamilyProps {
  name: string;
  lastName: string;
  ci: string;
}

interface ObjectProps extends Document {
  name: string;
  lastName: string;
  ci: string;
  dateOfBirth: Date;
  hasRUC: Boolean;
  rucNumber: string;
  gender: 'male' | 'female';
  hasFarm: Boolean;
  farmHa: number;
  farmName: string;
  crops: string[];
  family: FamilyProps[];
  hasWorkers: boolean;
  totalWorkers: number;
  menWorkers: number;
  womanWorkers: number;
  over18Workers: number;
  under18Workers: number;
  minorWorkersOcuppacion: string;
  hasPregnandWorkers: boolean;
  pregnandWorkers: number;
  pregnandWorkersOcuppacion: string;
}

const objectSchema = new mongoose.Schema<ObjectProps>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    ci: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    hasRUC: {
      type: Boolean,
      required: true,
    },
    rucNumber: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female'],
    },
    hasFarm: {
      type: Boolean,
      required: true,
    },
    farmHa: {
      type: Number,
    },
    farmName: {
      type: String,
      trim: true,
    },
    crops: [
      {
        type: String,
        trim: true,
      },
    ],
    family: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        lastName: {
          type: String,
          required: true,
          trim: true,
        },
        ci: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
    hasWorkers: {
      type: Boolean,
      required: true,
    },
    totalWorkers: {
      type: Number,
    },
    menWorkers: {
      type: Number,
    },
    womanWorkers: {
      type: Number,
    },
    over18Workers: {
      type: Number,
    },
    under18Workers: {
      type: Number,
    },
    minorWorkersOcuppacion: {
      type: String,
      trim: true,
    },
    hasPregnandWorkers: {
      type: Boolean,
      required: true,
    },
    pregnandWorkers: {
      type: Number,
    },
    pregnandWorkersOcuppacion: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const ObjectModel =
  mongoose.models?.Object || mongoose.model('Object', objectSchema);
