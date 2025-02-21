"use client";

import React, { useState } from'react';

const Form: React.FC = () => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [message, setMessage] = useState('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);
        if (!inputEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            setEmailError('Invalid email format');
        } else {
            setEmailError('');
        }
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputPhone = e.target.value;
        setPhone(inputPhone);
        if (inputPhone &&!inputPhone.match(/^\+?1?\d{10}$/)) {
            setPhoneError('Invalid phone number');
        } else {
            setPhoneError('');
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (emailError || phoneError) return;

        try {
            const response = await fetch('/api/v1/demo/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, phone })
            });
            const data = await response.json();

            if (data.status ==='success') {
                setMessage(data.message);
            } else {
                setMessage(data.message);
                if (data.errors) {
                    if (data.errors.email) setEmailError(data.errors.email);
                    if (data.errors.phone) setPhoneError(data.errors.phone);
                }
            }
        } catch (error) {
            setMessage('Internal server error');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-8 bg-white shadow-md rounded-md">
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                    E-mail Address
                </label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                />
                {emailError && <span className="text-red-500 text-sm">{emailError}</span>}
            </div>
            <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
                    Phone Number (Optional)
                </label>
                <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={handlePhoneChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                />
                {phoneError && <span className="text-red-500 text-sm">{phoneError}</span>}
            </div>
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
            >
                Send me PDF
            </button>
            {message && <p className={`mt-4 ${message.includes('success')? 'text-green-500' : 'text-red-500'} text-sm`}>{message}</p>}
        </form>
    );
};

export default Form;