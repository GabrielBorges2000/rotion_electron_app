import { useParams } from 'react-router-dom'
import { Editor, OnContentUpdatedParams } from '../components/Editor'
import { ToC } from '../components/ToC'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { Document as IPCDocumentInterface } from '@/shared/types/ipc'
import { title } from 'process'

export function Document() {
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()

  const { data, isFetching } = useQuery({
    queryKey: ['document', id],
    queryFn: async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const response = await window.api.fetchDocument({ id: id! })
      return response.data
    },
    enabled: !!id,
  })

  const initialContent = useMemo(() => {
    if (data) {
      return `<h1>${data.title}</h1>${data.content ?? '<p></p>'}`
    }
    return ''
  }, [data])

  const { mutateAsync: saveDocument } = useMutation({
    mutationFn: async ({ title, content }: OnContentUpdatedParams) => {
      await window.api.saveDocument({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        id: id!,
        title,
        content,
      })
    },
    onSuccess: async (_, { title }) => {
      await queryClient.setQueryData(
        ['documents'],
        (documents: IPCDocumentInterface[]) => {
          return documents?.map((document) => {
            if (document.id === id) {
              return { ...document, title }
            }
            return document
          })
        },
      )
      await queryClient.setQueryData(['document', id], { ...data, title })
    },
  })

  const handleEditorContentUpdated = ({
    title,
    content,
  }: OnContentUpdatedParams) => {
    saveDocument({ title, content })
  }

  // // Texto em Markdown
  // const markdownText = `
  // # Título 1
  // ## Subtítulo 1.1
  // ### Subtítulo 1.1.1
  // ## Subtítulo 1.2
  // # Título 2
  // ## Subtítulo 2.1
  // `

  // // Regex para extrair títulos e subtítulos
  // const regex = /(#{1,6})\s(.+)/g

  // // Extrai títulos e subtítulos
  // let match
  // while ((match = regex.exec(markdownText)) !== null) {
  //   const hashes = match[1]
  //   const title = match[2]

  //   // Determina o nível do título/subtítulo com base no número de hashes
  //   const level = hashes.length

  //   console.log(`Nível ${level}: ${title}`)
  // }

  return (
    <main className="flex-1 flex py-12 px-10 gap-8 ">
      <aside className="hidden lg:block sticky top-0 ">
        <span className="text-rotion-300 font-semibold text-xs">
          TABLE OF CONTENTS
        </span>
        <ToC.Root>
          <ToC.Link>{data && data.title}</ToC.Link>
          <ToC.Section>
            <ToC.Link>Banco de dados</ToC.Link>
            <ToC.Link>Autenticação</ToC.Link>
          </ToC.Section>
        </ToC.Root>
      </aside>

      <section className="flex-1 flex flex-col items-center">
        {!isFetching && data && (
          <Editor
            onContentUpdated={handleEditorContentUpdated}
            content={initialContent}
          />
        )}
      </section>
    </main>
  )
}
