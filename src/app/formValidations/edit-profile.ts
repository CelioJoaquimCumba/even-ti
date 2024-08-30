import { editProfileValidationMessages } from '@/data/messages/errorMessages'
import * as Yup from 'yup'
export interface IChangeEmail {
  onSubmit?: () => void
  initialValues?: {
    username: string
    gender: string
    fullName: string
    profession: string
    phoneNumber: string
    bio: string
  }
}

export const EditProfileValidation = ({
  onSubmit,
  initialValues,
}: IChangeEmail) => {
  return {
    initialValues: {
      username: initialValues?.username || '',
      gender: initialValues?.gender || '',
      fullName: initialValues?.fullName || '',
      profession: initialValues?.profession || '',
      phoneNumber: initialValues?.phoneNumber || '',
      bio: initialValues?.bio || '',
    },
    validationSchema: Yup.object({
      username: Yup.string().min(3, 'Minimo 3 caracteres'),
      gender: Yup.string(),
      fullName: Yup.string().required(editProfileValidationMessages.required),
      profession: Yup.string(),
      phoneNumber: Yup.string().matches(
        /^\+?[1-9]\d{1,14}$/,
        editProfileValidationMessages.invalid_phoneNumber,
      ),
      bio: Yup.string().min(10, 'Minimo 10 caracteres'),
    }),
    onSubmit: () => {
      onSubmit && onSubmit()
    },
  }
}
