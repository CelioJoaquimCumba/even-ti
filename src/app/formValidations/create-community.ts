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
    site: string
  }
}

export const CreateCommunityValidation = ({
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
      site: initialValues?.site || '',
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
      site: Yup.string().matches(
        /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/,
        createCommunityValidationMessages.site,
      ),
    }),
    onSubmit: () => {
      onSubmit && onSubmit()
    },
  }
}
