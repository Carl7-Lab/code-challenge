'use server';
import { objectSchema } from '../schema/objectSchema';

export type FormState = {
  message: string;
};

export async function onSubmitAction(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data);

  const convertedData = {
    ...formData,
    dateOfBirth: new Date(formData.dateOfBirth as string),
    crops: JSON.parse(formData.crops as string),
    family: JSON.parse(formData.family as string),
    hasRUC: formData.hasRUC === 'true',
    hasFarm: formData.hasFarm === 'true',
    farmHa: Number(formData.farmHa),
    hasWorkers: formData.hasWorkers === 'true',
    hasPregnandWorkers: formData.hasPregnandWorkers === 'true',
    totalWorkers: Number(formData.totalWorkers),
    menWorkers: Number(formData.menWorkers),
    womanWorkers: Number(formData.womanWorkers),
    over18Workers: Number(formData.over18Workers),
    under18Workers: Number(formData.under18Workers),
    pregnandWorkers: Number(formData.pregnandWorkers),
  };

  const parsed = objectSchema.safeParse(convertedData);

  console.log('formData: ', formData);
  console.log('parsed: ', parsed.error);

  if (!parsed.success) {
    return {
      message: 'Invalid form data',
    };
  }

  return { message: 'Objeto creado.' };
}
