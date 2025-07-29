export type profile ={
  id: string
  dateOfBirth: string
  name: string
  created: string
  lastActive: string
  gender: string
  description?: string
  city: string
  country: string
  user: any
  imgUrl?: string
}
export type Photos= {
  id: number
  url: string
  publicId?: any
  profileId?: any
  memberId: string
}
