
"use client";

import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
type FieldName = 'name' | 'email' | 'phone' | 'subject';

const Contact = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
        },
        validationSchema: yup.object({
            name: yup.string().required('Name is required'),
            email: yup.string().email('Invalid email').required('Email is required'),
            phone: yup.string().matches(/^\d{10}$/, 'Phone must be 10 digits').required('Phone number is required'),
            subject: yup.string().required('Subject is required'),
            message: yup.string().required('Message is required'),
        }),
        onSubmit: (values, { resetForm }) => {
            const message = `*Name:* ${values.name}\n*Email:* ${values.email}\n*Phone:* ${values.phone}\n*Subject:* ${values.subject}\n*Message:* ${values.message}`;
            const phoneNumber = '917218143845';
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
            resetForm();
        },
    });

    const contactInfo = [
        {
            icon: <MapPin className="h-6 w-6" />,
            title: 'Address',
            details: ['Near Post Office', 'Tq Phulambri Dist Chhatrapati Sambhajinagar - 431111', 'Maharashtra, India'],
        },
        {
            icon: <Phone className="h-6 w-6" />,
            title: 'Phone',
            details: ['+91 98765 43210', '+91 98765 43211'],
        },
        {
            icon: <Mail className="h-6 w-6" />,
            title: 'Email',
            details: ['info@excellenceacademy.com', 'admissions@excellenceacademy.com'],
        },
        {
            icon: <Clock className="h-6 w-6" />,
            title: 'Office Hours',
            details: ['Monday - Friday: 9:00 AM - 6:00 PM', 'Saturday: 9:00 AM - 4:00 PM', 'Sunday: Closed'],
        },
    ];

    return (
        <div className="min-h-screen pt-16 bg-white">
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white text-center">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact Us</h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                        Get in touch with us for any inquiries or to learn more about our programs
                    </p>
                </div>
            </section>

            {/* Contact Form and Info */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                        <form onSubmit={formik.handleSubmit} className="space-y-6">
                            {(['name', 'email', 'phone', 'subject'] as FieldName[]).map((field) => (
                                <div key={field}>
                                    <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                                        {field} *
                                    </label>
                                    <input
                                        type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                                        id={field}
                                        name={field}
                                        value={formik.values[field]}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${formik.touched[field] && formik.errors[field]
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                            }`}
                                        placeholder={`Enter your ${field}`}
                                    />
                                    {formik.touched[field] && formik.errors[field] && (
                                        <p className="text-sm text-red-600 mt-1">{formik.errors[field]}</p>
                                    )}
                                </div>
                            ))}

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    value={formik.values.message}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${formik.touched.message && formik.errors.message
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                        }`}
                                    placeholder="Enter your message"
                                />
                                {formik.touched.message && formik.errors.message && (
                                    <p className="text-sm text-red-600 mt-1">{formik.errors.message}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                            >
                                <Send className="h-5 w-5 mr-2" />
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                        <p className="text-gray-600 text-lg mb-8">
                            We&rsquo;d love to hear from you! Whether you have questions about our courses, need guidance on admissions, or want to discuss your educational goals, our team is here to help.
                        </p>

                        {contactInfo.map((info, index) => (
                            <div key={index} className="flex items-start space-x-4">
                                <div className="text-blue-600 mt-1">{info.icon}</div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-2">{info.title}</h3>
                                    <div className="space-y-1 text-gray-600">
                                        {info.details.map((detail, idx) => (
                                            <p key={idx}>{detail}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Find Us</h2>
                    <p className="text-xl text-gray-600 mb-10">
                        Visit our campus and experience our learning environment
                    </p>

                    <div className="h-96 rounded-lg overflow-hidden shadow-lg">
                        <iframe
                            title="Google Map"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2893.373123639682!2d75.41429687384648!3d20.082446619609993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdbbf3763251eb7%3A0x1d1c10cc479479b!2sCoaching%20classes!5e1!3m2!1smr!2sin!4v1753604630604!5m2!1smr!2sin"
                        ></iframe>
                    </div>



                    <div className="mt-6">
                        <MapPin className="h-6 w-6 text-blue-600 inline-block mr-2" />
                        <span className="text-gray-700 text-lg">
                            Near Post Office Phulambri, Tq Phulambri, Dist. Chhatrapati Sambhajinagar, Maharashtra 431111
                        </span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
