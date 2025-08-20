export type User={
  id:string;
  name:string;
  email:string;
  token:string;
  imgUrl?:string;
}

export type login={
  email:string;
  password:string;
}

export type register={
  email:string;
  password:string;
  name:string;
  gender:string;
  city:string;
  country:string;
  dateOfBirth:string;
}
