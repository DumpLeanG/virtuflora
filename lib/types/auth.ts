export interface AuthFormData {
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthFormProps {
  formData: AuthFormData;
  setFormData: (formData: AuthFormData) => void;
}