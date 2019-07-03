/**
 * Social activity Model
 */
export interface Socialactivity {
  id: string;
  source: string;
  content: string;
  createdOn: Date;
  comments: string[];
}
