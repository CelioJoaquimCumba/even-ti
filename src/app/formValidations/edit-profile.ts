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
      fullName: Yup.string().required('Obrigatório!'),
      profession: Yup.string(),
      phoneNumber: Yup.string(),
      bio: Yup.string().min(10, 'Minimo 10 caracteres'),
    }),
    onSubmit: () => {
      onSubmit && onSubmit()
    },
  }
}
