export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar?: string;
  status?: string;
  roles?: [];
  reportingUnits?: [];
}
