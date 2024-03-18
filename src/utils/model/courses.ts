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

export interface CoursePayments {
  data: CoursePayment[];
}
