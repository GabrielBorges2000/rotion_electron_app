import Store from 'electron-store'
import { Document } from '@/shared/types/ipc'
import { is } from '@electron-toolkit/utils'

interface StoreTypes {
  documents: Record<string, Document>
}

export const store = new Store<StoreTypes>({
  name: is.dev ? 'development' : 'production',
  defaults: {
    documents: {},
  },
})
