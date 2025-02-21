/*
 * @Author: Albert
 * @Date: 2025-02-20 12:35:42
 * @LastEditors: Albert
 * @LastEditTime: 2025-02-20 12:35:49
 * @FilePath:/workspace/GL_Task_1/src/pages/index.tsx
 * @Description: 
 * 
 */
import type { NextPage } from 'next';
import Form from '../components/Form';

const Home: NextPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Form />
    </div>
  );
};

export default Home;