import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [FormsModule, TranslatePipe],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class SupportComponent {

  // Contact Information
  contactInfo = {
    email: 'johnwagihsaber@gmail.com',
    phone: '+20 1206687412',
    whatsapp: '201206687412',
    location: 'Cairo, Egypt',
  };

  // Social Media
  socialLinks = [
    {
      name: 'Instagram',
      icon: 'fa-brands fa-instagram',
      link: 'https://www.instagram.com/john.wagih_',
    },
    {
      name: 'Facebook',
      icon: 'fa-brands fa-facebook-f',
      link: 'https://www.facebook.com/john.waghi.5',
    },
    {
      name: 'LinkedIn',
      icon: 'fa-brands fa-linkedin-in',
      link: 'https://www.linkedin.com/in/john-wagih-926451437',
    },
    {
      name: 'GitHub',
      icon: 'fa-brands fa-github',
      link: 'https://github.com/johnwagih/kanban-To-Do.git',
    },
  ];

  // Contact Form
  contactForm = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  // FAQ
  activeFaq = signal<number | null>(0);

  faqs = [
    {
      question: 'How can I track my order?',
      answer:
        'You can track your order through your account dashboard. Simply open your orders section to view the latest updates.',
    },
    {
      question: 'Can I return or exchange a product?',
      answer:
        'Yes! You can contact our support team with your order details, and we will help you with the return or exchange process.',
    },
    {
      question: 'How long does delivery take?',
      answer:
        'Delivery times depend on your location. Our team can help you with more specific delivery information.',
    },
    {
      question: 'How can I contact NOVA?',
      answer:
        'You can reach us through WhatsApp, email, phone, or any of our social media channels.',
    },
  ];

  toggleFaq(index: number): void {
    this.activeFaq.update(current => current === index ? null : index);
  }

  sendMessage(): void {

    const { name, email, subject, message } = this.contactForm;

    if (
      !name.trim() ||
      !email.trim() ||
      !subject.trim() ||
      !message.trim()
    ) {
      return;
    }

    if (
      name.length > 100 ||
      email.length > 254 ||
      subject.length > 150 ||
      message.length > 2000
    ) {
      return;
    }

    const whatsappMessage = `
Hello NOVA Support!

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
  `;

    const url = `https://wa.me/${this.contactInfo.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(url, '_blank', 'noopener,noreferrer');
  }

}