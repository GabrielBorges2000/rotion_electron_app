import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'phosphor-react'
import { Document } from '@/shared/types/ipc'
import { ButtonHTMLAttributes, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function CreatePage({ ...props }: ButtonProps) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { isPending: isCreatingNewDocument, mutateAsync: createDocument } =
    useMutation({
      mutationFn: async () => {
        const response = await window.api.createDocument()
        return response.data
      },
      onSuccess: async (data) => {
        await queryClient.setQueryData(
          ['documents'],
          (documents: Document[]) => {
            if (documents && documents?.length >= 0) {
              return [...documents, data]
            } else {
              return [data]
            }
          },
        )
        navigate(`/documents/${data.id}`)
      },
    })

  useEffect(() => {
    function onNewDocument() {
      createDocument()
    }

    const unsubscribe = window.api.onNewDocumentRequest(onNewDocument)

    return () => {
      unsubscribe()
    }
  }, [createDocument])

  return (
    <button
      onClick={() => createDocument()}
      disabled={isCreatingNewDocument}
      className="flex w-[240px] px-5 items-center text-sm gap-2 absolute bottom-0 left-0 right-0 py-4 border-t border-rotion-600 hover:bg-rotion-700 disabled:opacity-60"
      {...props}
    >
      <Plus className="h-4 w-4" /> Novo Documento
    </button>
  )
}
