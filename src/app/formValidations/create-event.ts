import { createCommunityValidationMessages } from '@/data/messages/errorMessages'
import * as Yup from 'yup'
export interface ICreateCommunity {
  onSubmit?: () => void
  initialValues?: {
    name: string
    logo: string
    background: string
    description: string
    slogan: string
    date: Date | undefined
    location: string
    max_tickets: number
    goals: string[]
    speakers: { id: string; label: string }[]
    sponsors: { id: string; label: string }[]
  }
}

export const CreateEventValidation = ({
  onSubmit,
  initialValues,
}: ICreateCommunity) => {
  return {
    initialValues: {
      name: initialValues?.name || '',
      logo: initialValues?.logo || '',
      background: initialValues?.background || '',
      description: initialValues?.description || '',
      slogan: initialValues?.slogan || '',
      date: initialValues?.date || undefined,
      location: initialValues?.location || '',
      max_tickets: initialValues?.max_tickets || 0,
      goals: initialValues?.goals || [''],
      speakers: initialValues?.speakers || [],
      sponsors: initialValues?.sponsors || [],
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required(createCommunityValidationMessages.required)
        .min(3, 'Minimo 3 caracteres'),
      logo: Yup.string().required(createCommunityValidationMessages.required),
      background: Yup.string().required(
        createCommunityValidationMessages.required,
      ),
      description: Yup.string().required(
        createCommunityValidationMessages.required,
      ),
      slogan: Yup.string(),
      date: Yup.date().required(createCommunityValidationMessages.required),
      location: Yup.string().required(
        createCommunityValidationMessages.required,
      ),
      max_tickets: Yup.number().required(
        createCommunityValidationMessages.required,
      ),
      goals: Yup.array().required(createCommunityValidationMessages.required),
      speakers: Yup.array().required(
        createCommunityValidationMessages.required,
      ),
      sponsors: Yup.array().required(
        createCommunityValidationMessages.required,
      ),
    }),
    onSubmit: () => {
      onSubmit && onSubmit()
    },
  }
}
