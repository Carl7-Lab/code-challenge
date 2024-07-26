import { z } from 'zod';

const validateCI = (ci: string) => {
  if (ci.length !== 10) {
    return false;
  }

  const provinceCode = parseInt(ci.substring(0, 2), 10);
  if (provinceCode < 1 || provinceCode > 24) {
    return false;
  }

  const thirdDigit = parseInt(ci.charAt(2), 10);
  if (thirdDigit >= 6) {
    return false;
  }

  const coefficients = [2, 1, 2, 1, 2, 1, 2, 1, 2];
  const digits = ci.split('').map(Number);
  let total = 0;

  for (let i = 0; i < coefficients.length; i++) {
    let product = coefficients[i] * digits[i];
    if (product >= 10) {
      product -= 9;
    }
    total += product;
  }

  const checkDigit = parseInt(ci.charAt(9), 10);
  const calculatedCheckDigit = total % 10 === 0 ? 0 : 10 - (total % 10);

  return checkDigit === calculatedCheckDigit;
};

const validateRUC = (ruc: string) => {
  if (!/^\d{13}$/.test(ruc)) {
    return false;
  }

  const ciPart = ruc.slice(0, 10);

  if (!validateCI(ciPart)) {
    return false;
  }

  const lastThreeDigits = ruc.slice(10);

  if (lastThreeDigits !== '001') {
    return false;
  }

  return true;
};

const isAdult = (dateOfBirth: Date) => {
  const today = new Date();
  const age = today.getFullYear() - dateOfBirth.getFullYear();
  return age >= 18;
};

export const familySchema = z.object({
  name: z.string().trim().min(1, { message: 'El nombre es obligatorio' }),
  lastName: z.string().trim().min(1, { message: 'El apellido es obligatorio' }),
  ci: z
    .string()
    .trim()
    .min(1, { message: 'La Cédula de Identidad es obligatoria' })
    .refine(validateCI, {
      message: 'Cédula de Identidad inválida',
    }),
});

export const objectSchema = z
  .object({
    name: z.string().trim().min(1, { message: 'El nombre es obligatorio' }),
    lastName: z
      .string()
      .trim()
      .min(1, { message: 'El apellido es obligatorio' }),
    ci: z
      .string()
      .trim()
      .min(1, { message: 'La Cédula de Identidad es obligatoria' })
      .refine(validateCI, {
        message: 'Cédula de Identidad inválida',
      }),
    dateOfBirth: z
      .date({
        required_error: 'La fecha de nacimiento es obligatoria',
      })
      .refine((dateOfBirth) => isAdult(dateOfBirth), {
        message: 'Debes ser mayor de 18 años',
      }),
    hasRUC: z.boolean({ required_error: 'El campo de RUC es obligatorio' }),
    rucNumber: z
      .string()
      .trim()
      .optional()
      .refine((ruc) => !ruc || validateRUC(ruc), {
        message: 'RUC inválido',
      }),
    gender: z.enum(['male', 'female'], {
      required_error: 'El género es obligatorio',
    }),
    hasFarm: z.boolean({ required_error: 'El campo de finca es obligatorio' }),
    farmHa: z.number().optional(),
    farmName: z.string().trim().optional(),
    crops: z.array(z.string()).optional(),

    family: z
      .array(familySchema)
      .nonempty({ message: 'La familia es obligatoria' }),
    hasWorkers: z.boolean({
      required_error: 'El campo de trabajadores es obligatorio',
    }),
    totalWorkers: z.number().optional(),
    menWorkers: z.number().optional(),
    womanWorkers: z.number().optional(),
    over18Workers: z.number().optional(),
    under18Workers: z.number().optional(),
    minorWorkersOcuppacion: z.string().trim().optional(),
    hasPregnandWorkers: z.boolean({
      required_error: 'El campo de trabajadoras embarazadas es obligatorio',
    }),
    pregnandWorkers: z.number().optional(),
    pregnandWorkersOcuppacion: z.string().trim().optional(),
  })
  .refine(
    (data) => {
      if (data.hasFarm) {
        return data.farmHa !== undefined && data.farmHa > 0;
      }
      return true;
    },
    {
      message: 'Si tiene finca las hectáreas es obligatorio',
      path: ['farmHa'],
    }
  )
  .refine(
    (data) => {
      if (data.hasFarm) {
        return data.farmName!.trim() !== '';
      }
      return true;
    },
    {
      message: 'Si tiene finca el nombre es obligatorio',
      path: ['farmName'],
    }
  )
  .refine(
    (data) => {
      if (data.hasFarm) {
        return Array.isArray(data.crops) && data.crops.length > 0;
      }
      return true;
    },
    {
      message: 'Si tiene finca, debe proporcionar al menos un cultivo.',
      path: ['crops'],
    }
  )
  .refine(
    (data) => {
      if (data.hasWorkers) {
        return data.totalWorkers! > 0;
      }
      return true;
    },
    {
      message: 'Número total de trabajadores es obligatorio.',
      path: ['totalWorkers'],
    }
  )
  .refine(
    (data) => {
      if (data.totalWorkers) {
        return data.menWorkers! + data.womanWorkers! === data.totalWorkers;
      }
      return true;
    },
    {
      message:
        'La suma de hombres y mujeres no coincide con el número total de trabajadores.',
      path: ['menWorkers'],
    }
  )
  .refine(
    (data) => {
      if (data.totalWorkers) {
        return data.menWorkers! + data.womanWorkers! === data.totalWorkers;
      }
      return true;
    },
    {
      message:
        'La suma de hombres y mujeres no coincide con el número total de trabajadores.',
      path: ['womanWorkers'],
    }
  )
  .refine(
    (data) => {
      if (data.totalWorkers) {
        return data.over18Workers! + data.under18Workers! === data.totalWorkers;
      }
      return true;
    },
    {
      message:
        'La suma de mayores y menores de edad no coincide con el número total de trabajadores.',
      path: ['over18Workers'],
    }
  )
  .refine(
    (data) => {
      if (data.totalWorkers) {
        return data.over18Workers! + data.under18Workers! === data.totalWorkers;
      }
      return true;
    },
    {
      message:
        'La suma de mayores y menores de edad no coincide con el número total de trabajadores.',
      path: ['under18Workers'],
    }
  )
  .refine(
    (data) => {
      if (data.hasPregnandWorkers) {
        return data.pregnandWorkers! > 0;
      }
      return true;
    },
    {
      message: 'Si tiene embarazadas, el número debe ser mayor que cero.',
      path: ['pregnandWorkers'],
    }
  )
  .refine(
    (data) => {
      if (data.hasPregnandWorkers) {
        return data.pregnandWorkers! <= data.womanWorkers!;
      }
      return true;
    },
    {
      message:
        'El número de embarazadas debe ser menor o igual que las trabajadoras.',
      path: ['pregnandWorkers'],
    }
  )
  .refine(
    (data) => {
      if (data.pregnandWorkers! > 0) {
        return data.minorWorkersOcuppacion !== '';
      }
      return true;
    },
    {
      message: 'Ocupacion debe ser obligatorio',
      path: ['minorWorkersOcuppacion'],
    }
  )
  .refine(
    (data) => {
      if (data.under18Workers! > 0) {
        return data.pregnandWorkersOcuppacion !== '';
      }
      return true;
    },
    {
      message: 'Ocupacion debe ser obligatorio',
      path: ['pregnandWorkersOcuppacion'],
    }
  );
