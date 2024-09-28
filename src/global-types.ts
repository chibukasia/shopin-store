export interface Store {
    id: string
    store_name: string
    country: string
    documents: string[]
    logo: string
    description: string
    user_id: string
    createdAt: string
    updatedAt: string
    user: User
  }
  
  export interface User {
    id: string
    name: string
    email: string
    role: string
    password: string
    createdAt: string
    updatedAt: string
    creater_id: string
  }
  