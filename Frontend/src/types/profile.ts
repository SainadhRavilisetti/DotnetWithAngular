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
export type EditableMember={
Name:string;
description?:string;
city:string;
country:string;
}

export class memberParams{
  gender?:string;
  minAge=18;
  maxAge=100;
  pageNumber=1;
  pageSize=10;
  orderBy='lastActive';
}
