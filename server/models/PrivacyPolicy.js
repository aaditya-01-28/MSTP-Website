const mongoose = require('mongoose');

const privacyPolicySchema = new mongoose.Schema({
  title: { type: String, default: 'Privacy Policy' },
  subtitle: { type: String, default: 'Your data. Your consent. Your Privacy Matters.' },
  introText: { type: String, default: 'At White Circle Group, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or use our services. Please read it carefully to understand how we handle your information.' },
  sections: [
    {
      number: { type: Number },
      iconName: { type: String }, // e.g. 'FileText', 'Database', 'Settings', 'Shield', 'Folder', 'Cookie', 'Link', 'User', 'RotateCw', 'Mail'
      title: { type: String },
      content: { type: String },
      col1Title: { type: String },
      col1Content: { type: String },
      col2Title: { type: String },
      col2Content: { type: String }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('PrivacyPolicy', privacyPolicySchema);
