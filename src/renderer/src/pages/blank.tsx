import { useQuery } from '@tanstack/react-query'
import * as Navigation from '../components/Sidebar/Navigation'

export function Blank() {
  const { data } = useQuery({
    queryKey: ['documents'],
    queryFn: async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const response = await window.api.fetchDocuments()
      return response.data
    },
  })

  console.log(data)
  return (
    <main className="w-full p-6 text-rotion-400 mt-10">
      <h4 className="mb-4 font-sans font-bold text-rotion-50 text-4xl">
        Meus Documentos
      </h4>
      <Navigation.Root className="group max-h-screen grid grid-cols-4 gap-4 relative rounded-lg">
        {data?.map((document) => {
          return (
            <Navigation.Link
              iconsRemove
              to={`/documents/${document.id}`}
              key={document.id}
              className="border-zinc-700 text- border-2 min-w-16 min-h-32 text-rotion-100 p-4 rounded-lg"
            >
              <p className="truncate">{document.title}</p>
            </Navigation.Link>
          )
        })}
      </Navigation.Root>
    </main>
  )
}
