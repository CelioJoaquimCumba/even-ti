import { Button } from '@/app/components/atoms/button'
import SettingsProfilePicture from '@/app/components/molecules/settings/settings-profile-picture'
import { Pencil } from 'lucide-react'
import { User } from '@/data/types'
import { useState } from 'react'
import { Input } from '@/app/components/atoms/input'
import { useFormik } from 'formik'
import { EditProfileValidation } from '@/app/formValidations/edit-profile'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../atoms/select'
import { genders } from '@/data'
import { updateUser } from '@/app/actions/user'

export default function SettingsProfileCard(props: { user: User }) {
  const { user: userData } = props
  const [loading, setLoading] = useState<boolean>(false)
  const [user, setUser] = useState(userData)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const formik = useFormik(
    EditProfileValidation({
      initialValues: {
        username: user.username || '',
        gender: user.gender || '',
        bio: user.bio || '',
        profession: user.profession || '',
        fullName: user.name || '',
        phoneNumber: user.phone || '',
      },
      onSubmit: async () => {
        try {
          setLoading(true)
          const data: User = {
            ...user,
            name: formik.values.fullName,
            username: formik.values.username,
            gender: genders.find(
              (gender) => gender.value === formik.values.gender,
            )?.label,
            phone: formik.values.phoneNumber,
            profession: formik.values.profession,
            bio: formik.values.bio,
          }
          const updatedUser = await updateUser(data)
          if (!updatedUser) return
          setIsEdit(false)
          setUser(updatedUser)
        } finally {
          setLoading(false)
        }
      },
    }),
  )
  const handleEdit = () => {
    setIsEdit(true)
  }
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex items-end flex-col gap-3 p-8 rounded-md md:gap-6 border border-gray-200"
    >
      <header className="flex justify-start w-full">
        <h4 className="text-lg font-medium text-black">
          Perfil {isEdit ? 'Edit' : 'View'}
        </h4>
      </header>
      <section className="flex flex-col md:items-center md:flex-row gap-16 w-full">
        <SettingsProfilePicture user={user} />
        <div className="flex items-end flex-col-reverse gap-3 md:flex-row md:gap-8 md:items-start w-full">
          <div className="flex flex-col md:flex-row gap-3 md:gap-8 w-full">
            <div className="flex flex-col gap-4 w-full">
              <div>
                <h3 className="text-lg font-light text-gray-600">Username</h3>
                {!isEdit ? (
                  <p className="text-lg text-black">
                    {user?.username || '...'}
                  </p>
                ) : (
                  <Input
                    value={formik.values.username}
                    onChange={formik.handleChange('username')}
                    error={formik.errors.username}
                  />
                )}
              </div>
              <div>
                <h3 className="text-lg font-light text-gray-600">
                  Nome completo
                </h3>
                {!isEdit ? (
                  <p className="text-lg text-black">{user?.name || '...'}</p>
                ) : (
                  <Input
                    value={formik.values.fullName}
                    onChange={formik.handleChange('fullName')}
                    error={formik.errors.fullName}
                  />
                )}
              </div>
              <div>
                <h3 className="text-lg font-light text-gray-600">Telefone</h3>
                {!isEdit ? (
                  <p className="text-lg text-black">{user?.phone || '...'}</p>
                ) : (
                  <Input
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange('phoneNumber')}
                    error={formik.errors.phoneNumber}
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full">
              <div>
                <h3 className="text-lg font-light text-gray-600">Género</h3>
                {!isEdit ? (
                  <p className="text-lg text-black">{user?.gender || '...'}</p>
                ) : (
                  <Select
                    onValueChange={formik.handleChange('gender')}
                    defaultValue={formik.values.gender}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={'Género'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>{'Género'}</SelectLabel>
                        {genders.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              </div>
              <div>
                <h3 className="text-lg font-light text-gray-600">Profissão</h3>
                {!isEdit ? (
                  <p className="text-lg text-black">
                    {user?.profession || '...'}
                  </p>
                ) : (
                  <Input
                    value={formik.values.profession}
                    onChange={formik.handleChange('profession')}
                    error={formik.errors.profession}
                  />
                )}
              </div>
            </div>
          </div>
          {!isEdit && (
            <Button
              type="button"
              variant={'outline'}
              className="rounded-full aspect-square p-3 size-12"
              onClick={() => handleEdit()}
            >
              <Pencil strokeWidth={1} />
            </Button>
          )}
        </div>
      </section>
      <section className="w-full">
        <h3 className="text-lg font-light text-gray-600">Bio</h3>
        {!isEdit ? (
          <p className="text-lg">{user?.bio || '...'}</p>
        ) : (
          <Input
            value={formik.values.bio}
            onChange={formik.handleChange('bio')}
            error={formik.errors.bio}
          />
        )}
      </section>
      {isEdit && (
        <Button type="submit" className="w-fit" loading={loading}>
          Salvar
        </Button>
      )}
    </form>
  )
}
