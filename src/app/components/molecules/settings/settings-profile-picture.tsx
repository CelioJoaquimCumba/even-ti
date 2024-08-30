import { User } from '@/data/types'
import { Button } from '../../atoms/button'
import { Pencil } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'
import { updateUserImage } from '@/app/actions/user'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '@/app/firebaseConfig'

export default function SettingsProfilePicture(props: { user: User }) {
  const { user } = props
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadedUrl, setUploadedUrl] = useState(user?.image)
  const inputRef = useRef<HTMLInputElement>(null)
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    setFile(event.target.files[0])
  }
  const openFileSelection = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!inputRef || !inputRef.current) return

    inputRef.current.click()
  }
  useEffect(() => {
    if (file) {
      handleUpload()
    }
  }, [file])
  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    const storageRef = ref(storage, `users/${user.id}/${file.name}`)

    try {
      await uploadBytes(storageRef, file)
      const url = await getDownloadURL(storageRef)
      setUploadedUrl(url)
      await updateUserImage(user.id, url)
    } catch (error) {
      console.error('Error uploading the file', error)
    } finally {
      setUploading(false)
    }
  }
  return (
    <div
      className="flex flex-shrink-0 size-32 md:size-48 rounded-full border aspect-square bg-cover bg-center items-center justify-center"
      style={{ backgroundImage: `url(${uploadedUrl})` }}
    >
      <span
        className={`flex items-center justify-center ${uploading ? 'opacity-100' : 'opacity-0'} flex-shrink-0 w-full h-full rounded-full px-5 py-1 hover:opacity-100 hover:bg-opacity-20 hover:bg-black`}
      >
        <input
          type="file"
          ref={inputRef}
          onChange={handleFileChange}
          disabled={uploading}
          className="hidden"
        />
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={openFileSelection}
          loading={uploading}
        >
          <Pencil className="w-4 h-4" />
        </Button>
      </span>
    </div>
  )
}
