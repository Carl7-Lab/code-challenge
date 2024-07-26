export interface FamilyProps {
  name: string;
  lastName: string;
  ci: string;
}

export interface ObjectProps {
  name: string;
  lastName: string;
  ci: string;
  dateOfBirth: Date | undefined;
  hasRUC: boolean | undefined;
  rucNumber: string;
  gender: 'male' | 'female' | undefined;
  hasFarm: boolean | undefined;
  farmHa: number | undefined;
  farmName: string;
  crops: string[];
  family: FamilyProps[] | [];
  hasWorkers: boolean | undefined;
  totalWorkers: number | undefined;
  menWorkers: number | undefined;
  womanWorkers: number | undefined;
  over18Workers: number | undefined;
  under18Workers: number | undefined;
  minorWorkersOcuppacion: string;
  hasPregnandWorkers: boolean | undefined;
  pregnandWorkers: number | undefined;
  pregnandWorkersOcuppacion: string;
}
