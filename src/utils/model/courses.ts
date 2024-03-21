export interface Course {
  id: number;
  name: string;
  thumbnail: string;
  intro_video: string;
  youtube_link: string;
  vimeo_link: string;
  price_vnd: number;
  price_jp: number;
  course_id: string;
  expired_at: number;
  description: string;
  detail: string;
  is_show: string;
  status: number;
  image: string;
  cat_id: string;
  cou_price: number;
  discount_value: number;
  teacher_name: string;
  start_date: string;
  end_date: string;
  teacher_id: string;
}

export interface RegisterCourseParams {
  fullname: string;
  mobile: string;
  email: string;
  promo_code: string;
  payment_method: string;
  note: string;
  course_id: string;
  combo_id: string;
}

export interface CoursePayment {
  id: number;
  name: string;
  type: number;
  country: string;
  description: string;
  account_holder: string;
  account_number: string;
}

export interface Lectures {
  id: number;
  lec_title: string;
  lec_part_id: number;
  lec_active: number;
  video_titile: string;
  video_status: number;
  source_type: string;
  video_id: string;
  youtube_id: string;
  free: number;
  learned: number;
}
export interface CourseLessons {
  id: number;
  course_id: number;
  type: string;
  content_id: number;
  part_title: string;
  has_parent: number;
  parent_id: number;
  has_child: number;
  total_learned: number;
  list_lectures: Lectures[];
}
export interface CourseCats {
  id: number;
  course_id: number;
  type: string;
  content_id: number;
  part_title: string;
  has_parent: number;
  parent_id: number;
  has_child: number;
  total_learned: number;
  lessons: CourseLessons[];
}
export interface CourseContent {
  id: number;
  course_id: number;
  type: string;
  content_id: number;
  part_title: string;
  has_parent: number;
  parent_id: number;
  has_child: number;
  total_learned: number;
  cats: CourseCats[];
}
export interface ListCourseContent {
  courses: CourseContent[];
}

export interface CoursePayments {
  data: CoursePayment[];
}
