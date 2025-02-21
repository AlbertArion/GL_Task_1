/*
 * @Author: Albert
 * @Date: 2025-02-20 12:35:14
 * @LastEditors: Albert
 * @LastEditTime: 2025-02-20 12:35:25
 * @FilePath:/workspace/GL_Task_1/src/page/api/submit.ts
 * @Description: 
 * 
 */
import type { NextApiRequest, NextApiResponse } from 'next';

type RequestBody = {
  email: string;
  phone?: string;
};

type SuccessResponse = {
  status:'success';
  message: string;
};

type ValidationErrorResponse = {
  status: 'error';
  message: string;
  errors: {
    email?: string;
    phone?: string;
  };
};

type ServerErrorResponse = {
  status: 'error';
  message: string;
};

const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePhone = (phone: string): boolean => {
  return /^\+?1?\d{10}$/.test(phone);
};

export default function handler(req: NextApiRequest, res: NextApiResponse<SuccessResponse | ValidationErrorResponse | ServerErrorResponse>) {
  if (req.method!== 'POST') {
    return res.status(405).end();
  }

  const { email, phone } = req.body as RequestBody;

  const errors: { [key: string]: string } = {};
  if (!validateEmail(email)) {
    errors.email = 'Invalid email format';
  }
  if (phone &&!validatePhone(phone)) {
    errors.phone = 'Invalid phone number';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation error',
      errors
    });
  }

  try {
    // 模拟成功响应
    return res.status(200).json({
      status:'success',
      message: 'Form submitted successfully.'
    });
  } catch (error) {
    // 模拟服务器错误响应
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
}