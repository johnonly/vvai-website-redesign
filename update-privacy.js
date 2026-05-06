const fs = require('fs');
const path = require('path');

// Update English privacy policy
const enPath = path.join(__dirname, 'messages', 'en.json');
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

enData.privacy = {
  "meta": {
    "title": "Privacy Policy — V V AI",
    "description": "V V Technology Pte. Ltd. Privacy Policy. Learn how we collect, use, and protect your personal information."
  },
  "hero": {
    "badge": "Legal",
    "title": "Privacy Policy",
    "lastUpdated": "Last updated: July 2025"
  },
  "toc": "Contents",
  "sections": [
    {
      "id": "important-notice",
      "heading": "Important Notice",
      "body": "Your trust is of paramount importance to us. We understand the importance of your personal information, and we will take appropriate security measures in accordance with laws and regulations to safeguard the security and controllability of your personal information. Therefore, V V Technology Pte. Ltd. (hereinafter \"V V\" or \"we\") has formulated this Privacy Policy (hereinafter \"this Policy\") and will continue to improve and update it.\n\nWhen you interact with V V products and services, we are responsible for processing your personal information. This Policy describes how we collect, receive, use, store, share, transfer and process your personal information, and your rights in determining how we process information we collect or hold about you.\n\nThis Policy does not apply to third-party applications or software integrated with V V products or services (collectively, \"Third-Party Services\"). Before choosing to use any Third-Party Services, please read and fully understand the product features, terms of service and privacy policy of such Third-Party Services.\n\nPlease note that depending on the country in which you use V V products or services, specific national regulations may apply to you, and such regulations may be incorporated into this Policy in the form of appendices.\n\nThis Policy applies to users of V V products and services.\n\nBefore using V V products or services, please be sure to read and thoroughly understand this Policy, and use the relevant products or services only after confirming your full understanding and agreement. Once you start using V V products or services, it means that you have fully understood and agreed to this Policy."
    },
    {
      "id": "collection-and-use",
      "heading": "I. How We Collect and Use Your Information",
      "body": "When you use V V products or services, we may need to collect and use your personal information, including the following two types:\n\n1. To provide you with the basic functions of V V products or services, you must authorize us to collect and use necessary information. If you refuse to provide the corresponding information, you will not be able to use our products or services normally;\n\n2. To provide you with additional functions of our products or services, you may choose to authorize us to collect and use certain information. If you refuse to provide such information, you will not be able to use the relevant additional functions or achieve the intended functional results, but this will not affect your normal use of the basic functions of our products or services.\n\nWe collect information you actively provide when registering and using V V services, information you authorize us to provide, information provided at the request of your enterprise/organization user, and information generated based on your use of V V products or services."
    },
    {
      "id": "cookies",
      "heading": "II. How We Use Cookies and Similar Technologies",
      "body": "To ensure normal operation of products, provide you with a more relaxed access experience, recommend content that may interest you, and improve our services, we may store or retrieve small data files on your device (such data files are sometimes referred to as \"Cookies\" or similar technologies).\n\nWe use Cookies and similar technologies to: record your preference settings, analyze website traffic, provide and measure advertising effectiveness, evaluate and improve your experience using our services, etc.\n\nYou can refuse or manage Cookies through your browser settings; however, please note that if you do so, you may not be able to use all features of V V products or services that rely on Cookies."
    },
    {
      "id": "disclosure",
      "heading": "III. How We Disclose Your Information",
      "body": "We may disclose your information in the following circumstances:\n\n1. With your prior consent, we may share your personal information with third parties.\n\n2. We may share your personal information with our affiliated companies to provide, improve and personalize our services.\n\n3. We may share your personal information with service providers who provide services on our behalf, such as data processing, sending emails or communications, providing customer service, providing advertising or analytics services.\n\n4. We may disclose your information as required by law or where we reasonably believe it is necessary to respond to legal process.\n\n5. If we believe it is necessary to protect the rights, property or safety of V V, our users or the public, we may disclose your information.\n\n6. In the event of a merger, acquisition or asset sale, we may transfer your personal information."
    },
    {
      "id": "protection",
      "heading": "IV. How We Protect Your Information",
      "body": "We take various security measures to protect your personal information, including but not limited to:\n\n1. We use encryption technology (such as SSL) to protect data transmission.\n\n2. We use various security technologies to protect your information from unauthorized access, use or disclosure.\n\n3. We restrict access to personal information, and only employees who need the information to provide services and comply with the law can access it.\n\n4. We regularly review our information collection, storage and processing practices to ensure we use reasonable security measures.\n\nPlease note that although we have taken the above reasonable measures to protect your information, the Internet is not a completely secure environment, and we may not always be able to guarantee the security of information."
    },
    {
      "id": "management",
      "heading": "V. How You Manage Your Information",
      "body": "You can access and manage your information in the following ways:\n\n(1) Query, correct and supplement your information\nAs an administrator of an enterprise/organization user, you have the right to query, correct or supplement information about your enterprise/organization. As an individual user, you have the right to query, correct or supplement your information.\n\n(2) Delete your information\nIn the following circumstances, you may submit a request to us to delete your personal information: (a) If our processing of personal information violates laws and regulations; (b) If we collect and use your personal information without your explicit consent; (c) If our processing of personal information seriously violates our agreement with you; (d) If you no longer use our products or services, or you have voluntarily cancelled your account; (e) If we permanently cease to provide products or services to you.\n\nWhen you or we assist you in deleting relevant information, due to applicable laws and security technologies, we may not be able to immediately delete corresponding information from backup systems. We will securely store your personal information and isolate it from any further processing until backups can be cleared or anonymized.\n\n(3) Cancel your account\nWhen you leave your organization, are processed for offboarding by an administrator, or your organization dissolves the team, you can cancel your organizational identity account. After your account is cancelled, we will stop providing you with products or services, and will delete or anonymize your personal information in accordance with applicable legal requirements.\n\n(4) Responding to your above requests\nFor security purposes, you may need to provide a written request or otherwise prove your identity. We may require you to verify your identity before processing your request.\n\nFor your reasonable requests, we generally do not charge fees, but for repeatedly duplicated, excessively unreasonable requests, we will charge appropriate fees. We may refuse requests for information not directly related to your identity, groundlessly repeated information, or requests requiring excessive technical means, creating risks to others' legitimate rights, or that are impractical."
    },
    {
      "id": "children",
      "heading": "VI. How We Handle Children's Information",
      "body": "In digital office, communication and collaboration activities, we presume that you have corresponding civil capacity. If you are a child, we require you to ask your parents or other guardians to carefully read this Privacy Policy and use our services or provide information to us only with the consent of your parents or other guardians.\n\nFor situations where children's personal information is collected based on the consent of parents or other guardians to use our products or services, we will only use, share, transfer or disclose such information where permitted by laws and regulations, with explicit consent of parents or other guardians, or as necessary to protect children.\n\nIf you are the parent or other guardian of a child, please pay attention to whether the child under your guardianship uses our services after obtaining your authorized consent. If you have questions about the personal information of the child under your guardianship, please contact us."
    },
    {
      "id": "global-transfer",
      "heading": "VII. How Your Information Is Transferred Globally",
      "body": "International data transfer is necessary for us to provide V V products or services and fulfill our contractual obligations regarding V V products or services to you. We will share your personal data globally with companies in our business group for the activities specified in this Policy. We may also subcontract data processing related to V V products or services to third parties in other countries, or share your personal data with third parties in other countries.\n\nOur servers are currently located in Singapore, and your information may be processed on servers outside your country of residence. Data protection laws vary by country, and some countries provide more protection than others. Regardless of where your information is processed, we will apply the same protective measures described in this Policy. Where required by applicable law, we will provide adequate protection for your personal data through various means.\n\nIf you are an enterprise/organization user, your enterprise/organization will determine which servers will process and store your information. Your enterprise/organization may also choose to share your information with parties located outside your country of residence. Your enterprise/organization will protect your personal data and comply with applicable laws regarding such transfers."
    },
    {
      "id": "policy-updates",
      "heading": "VIII. How This Privacy Policy Is Updated",
      "body": "We reserve the right to update or modify this Policy from time to time. If our privacy policy changes, we will publish the latest version of the privacy policy on V V products or services or through other appropriate means, with the effective date indicated. You should proactively review the contents of this Policy. If we make significant changes to the privacy policy, we may also send change notifications to you individually through your contact information, and you should pay attention to receiving them.\n\nSignificant changes referred to in this Policy include but are not limited to: (1) Significant changes in our service model, such as the purpose of processing personal information, the types of personal information processed, and the manner of using personal information; (2) Significant changes in our control, organizational structure, etc., such as controller changes caused by mergers, acquisitions and reorganizations; (3) Changes in the main objects of personal information sharing, transfer or public disclosure; (4) Significant changes in your rights regarding personal information processing and the exercise methods thereof; (5) Changes in the responsible department, contact information and complaint channels for handling user information security; (6) User information security impact assessment reports indicating high risk."
    },
    {
      "id": "contact",
      "heading": "IX. Contact Us",
      "body": "If you have any questions, feedback or inquiries about this Policy or the use of personal information, please contact us through the contact information provided on our official website (vvai.com)."
    },
    {
      "id": "language-versions",
      "heading": "X. Language Versions",
      "body": "This Policy is written in English and may be translated into multiple languages other than English. If there is any inconsistency between the English text and any translation, the English text shall prevail to the maximum extent permitted by applicable law, unless expressly stated otherwise in the applicable translation."
    }
  ]
};

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');
console.log('✓ Updated en.json');

// The script will be expanded to update zh.json and zh-tw.json as well
console.log('\nPrivacy policy updated successfully!');
