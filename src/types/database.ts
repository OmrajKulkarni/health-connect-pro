export interface Doctor {
  id: string;
  user_id: string | null;
  name: string;
  specialty: string;
  experience: number;
  region: string;
  clinic_name: string;
  address: string | null;
  rating: number;
  reviews: number;
  consultation_fee: number;
  availability: string;
  qualifications: string | null;
  about: string | null;
  phone: string | null;
  created_at: string;
}

export interface Appointment {
  id: string;
  patient_id: string;
  doctor_id: string;
  appointment_date: string;
  appointment_time: string;
  reason: string | null;
  status: string;
  created_at: string;
}

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  created_at: string;
}
