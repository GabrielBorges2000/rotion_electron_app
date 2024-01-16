import Store from 'electron-store'
import { Document } from '@/shared/types/ipc'

interface StoreTypes {
  documents: Record<string, Document>
}

export const store = new Store<StoreTypes>({
  defaults: {
    documents: {},
  },
})
