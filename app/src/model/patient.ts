export type PatientBasicInfo = {
  firstName: string;
  lastName: string;
  fiscalCode: string;
}

export type Patient = PatientBasicInfo & {
  birthDate: Date;
  relatives: PatientBasicInfo[];
  city?: string;
};
