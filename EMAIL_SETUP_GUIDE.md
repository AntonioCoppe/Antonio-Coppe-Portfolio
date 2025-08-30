# Contact Form Email Setup Guide

Your portfolio contact form is now ready to send emails! Follow these steps to complete the setup using EmailJS.

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account (200 emails/month free)
3. Verify your email address

## Step 2: Create Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose **Gmail** (recommended) or your preferred email provider
4. Follow the connection steps to link your email account
5. **Copy the Service ID** (you'll need this)

## Step 3: Create Email Template

1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template content:

```text
Subject: New Contact Form Message from {{from_name}}

Hello {{to_name}},

You have received a new message from your portfolio website:

From: {{from_name}} ({{from_email}})

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. **Copy the Template ID** (you'll need this)

## Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key**
3. **Copy the Public Key**

## Step 5: Update Your Code

Replace the placeholder values in `/assets/js/script.js`:

```javascript
// Line 193: Replace 'YOUR_PUBLIC_KEY' with your actual public key
emailjs.init('YOUR_ACTUAL_PUBLIC_KEY');

// Line 227: Replace these with your actual IDs
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
```

## Step 6: Test Your Form

1. Open your portfolio website
2. Navigate to the Contact page
3. Fill out the form and submit
4. Check your email for the message
5. Verify the form shows success message

## Example Configuration

Here's what your configuration should look like:

```javascript
// Initialize EmailJS
emailjs.init('user_abc123def456'); // Your public key

// Send email
emailjs.send('service_gmail123', 'template_xyz789', templateParams)
```

## Security Notes

- Your EmailJS public key is safe to include in client-side code
- EmailJS handles all the secure email sending
- No sensitive credentials are exposed

## Troubleshooting

**Form not sending emails?**

- Check browser console for error messages
- Verify all IDs are correctly replaced
- Ensure EmailJS service is connected properly

**Emails going to spam?**

- This is normal initially
- Mark the first few as "Not Spam" to improve deliverability
- Consider upgrading to EmailJS paid plan for better deliverability

**Rate limits exceeded?**

- Free plan: 200 emails/month
- Upgrade to paid plan if needed

## Alternative Services

If you prefer other options:

1. **Resend** - More professional, requires backend
2. **Formspree** - Simple form backend service
3. **Netlify Forms** - If hosting on Netlify
4. **Sendgrid** - Enterprise-grade email service

Your contact form is now fully functional! 🎉
