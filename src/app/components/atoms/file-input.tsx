import { FileUp } from 'lucide-react'
import { ChangeEvent, useRef } from 'react'

export default function FileInput(props: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onDelete: () => void
  label?: string
  required?: boolean
  accept?: string
  image?: boolean
  preview?: string
  aspectRatio?: string
  error?: string
}) {
  const {
    label,
    onChange,
    onDelete,
    required,
    accept = 'image/*',
    preview,
    aspectRatio = '16/9',
    error,
  } = props
  const fileInput = useRef<HTMLInputElement>(null)

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e)
  }
  return (
    <div className="flex flex-col gap-2">
      <p className="text-base font-normal text-black">
        {label} {required && <span className="text-red-500">*</span>}
      </p>
      <div
        onClick={() => fileInput.current && fileInput.current?.click()}
        className={`flex flex-col items-center justify-center min-h-64 aspect-[${aspectRatio}] border-dashed border border-slate-300 rounded-2xl bg-white hover:bg-slate-100 bg-center bg-cover p-4 text-center`}
        style={{ backgroundImage: `url(${preview})` }}
      >
        <input
          type="file"
          className="hidden"
          accept={accept}
          onChange={(e) => handleFileInput(e)}
          ref={fileInput}
        />
        {!preview && (
          <>
            <FileUp className="w-10 h-10 text-gray-600" strokeWidth={1} />
            <p className="text-gray-600">
              Arraste o ficheiro ou escolha o ficheiro
            </p>
          </>
        )}
      </div>
      {preview && (
        <div className="flex gap-2 cursor-pointer">
          <p
            className="text-gray-900 underline hover:text-gray-500"
            onClick={() => fileInput.current && fileInput.current?.click()}
          >
            Substituir ficheiro
          </p>
          <p
            className="text-red-900 underline hover:text-red-500"
            onClick={() => onDelete()}
          >
            Remover ficheiro
          </p>
        </div>
      )}
      <span className="text-sm text-red-500">{error}</span>
    </div>
  )
}
