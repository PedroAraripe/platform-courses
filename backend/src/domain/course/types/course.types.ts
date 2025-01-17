 export type CourseProps = {
  id: string,
  title: string,
  description: string,
  hours: number,
  createdAt: Date,
  wasUpserted?: boolean;
}