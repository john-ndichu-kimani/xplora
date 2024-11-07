export interface User {
  id?: string;
  name: string;
  email: string;
  mobile: string;
  role?: string;
  profileImageUrl?: string; 
  password: string;
  
}


export interface login_details {
  email: string;
  password: string;
}

export interface token_details {
  id: string;
  name: string;
  email: string;
}
