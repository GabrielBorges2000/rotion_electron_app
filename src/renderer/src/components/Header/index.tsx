import clsx from 'clsx'
import { Code, CaretDoubleRight, TrashSimple } from 'phosphor-react'
import * as Breadcrumbs from './Breadcrumbs'
import * as Collapsible from '@radix-ui/react-collapsible'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Document } from '~/src/shared/types/ipc'

interface HeaderProps {
  isSideBarOpen: boolean
}

export function Header({ isSideBarOpen }: HeaderProps) {
  const isMacOS = process.platform === 'darwin'
  const isSidebarOpen = isSideBarOpen

  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const { mutateAsync: DeleteDocument, isPending: isDeletingDocument } =
    useMutation({
      mutationFn: async () => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        await window.api.deleteDocument({ id: id! })
      },
      onSuccess: async () => {
        await queryClient.setQueryData(
          ['documents'],
          (documents: Document[]) => {
            return documents.filter((document) => document.id !== id)
          },
        )

        navigate('/')
      },
    })

  const { data } = useQuery({
    queryKey: ['document', id],
    queryFn: async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const response = await window.api.fetchDocument({ id: id! })
      return response.data
    },
    enabled: !!id,
  })

  return (
    <div
      id="header"
      className={clsx(
        'border-b h-14 border-rotion-600 py-[1.125rem] px-6 flex items-center gap-4 leading-tight transition-all duration-250 region-drag fixed top-0 z-10 bg-rotion-900',
        {
          'pl-24': !isSidebarOpen && isMacOS,
          'w-screen': !isSidebarOpen,
          'w-[calc(100vw-240px)]': isSidebarOpen,
        },
      )}
    >
      <Collapsible.Trigger
        className={clsx('h-5 w-5 text-rotion-200 hover:text-rotion-50', {
          hidden: isSidebarOpen,
          block: !isSidebarOpen,
        })}
      >
        <CaretDoubleRight className="h-4 w-4" />
      </Collapsible.Trigger>

      {id && (
        <>
          <Breadcrumbs.Root>
            <Breadcrumbs.Item>
              <Code weight="bold" className="h-4 w-4 text-emerald-300" />
              Document
            </Breadcrumbs.Item>
            <Breadcrumbs.Separator />
            <Breadcrumbs.Item isActive>
              {(data && data.title) ?? ''}
            </Breadcrumbs.Item>
          </Breadcrumbs.Root>

          <div className="inline-flex region-no-drag">
            <button
              onClick={() => DeleteDocument()}
              disabled={isDeletingDocument}
              className="inline-flex items-center gap-1 text-rotion-100 text-sm hover:text-rotion-50 disabled:opacity-60"
            >
              <TrashSimple className="h-4 w-4" />
              Apagar
            </button>
          </div>
        </>
      )}
    </div>
  )
}
