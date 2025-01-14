 export type CourseProps = {
  id: string,
  title: string,
  description: string,
  hours: number,
  createdAt: Date,
}

export type CoursePublicDto = CourseProps;

export class Course {
  private constructor(private readonly props: CourseProps) {
    this.validate();
  }

  public static create(title: string, description: string, hours: number) {
    return new Course({
      id: crypto.randomUUID().toString(),
      title,
      description: description,
      createdAt: new Date(),
      hours
    })
  }

  public static with(props: CourseProps) {
    return new Course(props);
  }

  public get title() {
    return this.props.title;
  }

  public get description() {
    return this.props.description;
  }

  public get hours() {
    return this.props.hours;
  }

  public get id() {
    return this.props.id;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public publicDto(): CoursePublicDto {
    return {
      id: this.id,
      title: this.title,
      createdAt: this.createdAt,
      description: this.description,
      hours: this.hours,
    };
  }

  private validate() {}
}