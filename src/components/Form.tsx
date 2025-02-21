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
        <form onSubmit={handleSubmit} className="p-8 bg-white shadow-md rounded-md" style={{background: ' linear-gradient(180deg, #BEB590 0%, #9E946A 100%)', borderRadius: '30px'}}>
            <div style={{fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#3B2608'}}>Get free sample report &<br></br> white paper</div>
            <div className="mb-4">
                <input
                    type="email"
                    id="email"
                    value={email}
                    placeholder='E-mail Address'
                    onChange={handleEmailChange}
                    style={{borderRadius: '20px', paddingLeft: '20px'}}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                />
                {emailError && <span className="text-red-500 text-sm">{emailError}</span>}
            </div>
            <div className="mb-4">
                <input
                    type="tel"
                    id="phone"
                    value={phone}
                    placeholder='Phone Number (Optional)'
                    onChange={handlePhoneChange}
                    style={{borderRadius: '20px', paddingLeft: '20px'}}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                />
                {phoneError && <span className="text-red-500 text-sm">{phoneError}</span>}
            </div>
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                style={{borderRadius: '20px', width: '100%', background: 'linear-gradient(90deg, #664922 0%, #503715 100%)', marginTop: '10px'}}
            >
                Send me PDF
            </button>
            <div style={{fontSize: "12px", marginTop: "10px", marginLeft: "6px", marginRight: "6px"}}>You consent to receive communications from Generation Lab. You can<br></br>unsubscribe anytime.</div>
            {message && <p className={`mt-4 ${message.includes('success')? 'text-green-500' : 'text-red-500'} text-sm`}>{message}</p>}
        </form>
    );
};

export default Form;