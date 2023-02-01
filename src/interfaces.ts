export interface IBuddy {
  ix: number;
  isActive: boolean;
  picture: string;
  dob: string;
  age: string;
  name: string;
  gender: string;
  department: string;
  id: string;
  email: string;
  username: string;
}

export interface InitialState {
  buddy: IBuddy | null;
  department: string;
  fetching: boolean;
  success: boolean;
  error: boolean;
  team: IBuddy[];
}