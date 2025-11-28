export interface User {
  id: string
  fullName: string
  dateOfBirth: string
  email: string
  phone: string
}

export interface UserFormData {
  fullName: string
  dateOfBirth: string
  email: string
  phone: string
}

export interface UserTableProps {
  users: User[]
  loading?: boolean
}

export interface UserFormProps {
  user?: User
  isEdit?: boolean
  loading?: boolean
}

export interface DataTableHeader {
  title: string
  key: string
  sortable?: boolean
}