
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define supported languages
export type Language = 'en' | 'hi' | 'mr' | 'ta' | 'te' | 'bn';

// Define language names for display
export const languageNames: Record<Language, string> = {
  en: 'English',
  hi: 'हिन्दी',
  mr: 'मराठी',
  ta: 'தமிழ்',
  te: 'తెలుగు',
  bn: 'বাংলা',
};

// Define type for translations
type TranslationsType = Record<Language, Record<string, string>>;

// Initial translations (we'll add more later)
export const translations: TranslationsType = {
  en: {
    // Navigation
    'nav.products': 'Products',
    'nav.farmers': 'Farmers',
    'nav.blog': 'Blog',
    'nav.login': 'Login',
    'nav.myFarm': 'My Farm',
    'nav.myAccount': 'My Account',
    
    // Footer
    'footer.title': 'AgroConnect',
    'footer.description': 'Directly connecting farmers with customers for fresh, local produce without middlemen.',
    'footer.forFarmers': 'For Farmers',
    'footer.joinAsFarmer': 'Join as Farmer',
    'footer.farmerLogin': 'Farmer Login',
    'footer.farmingResources': 'Farming Resources',
    'footer.successStories': 'Success Stories',
    'footer.forCustomers': 'For Customers',
    'footer.createAccount': 'Create Account',
    'footer.customerLogin': 'Customer Login',
    'footer.browseProducts': 'Browse Products',
    'footer.howItWorks': 'How It Works',
    'footer.contact': 'Contact & Support',
    'footer.contactUs': 'Contact Us',
    'footer.helpCenter': 'Help Center',
    'footer.faqs': 'FAQs',
    'footer.terms': 'Terms & Conditions',
    'footer.copyright': '© 2025 AgroConnect. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.termsOfService': 'Terms of Service',
    'footer.language': 'Language',
    
    // Product Upload Steps
    'productUpload.step1.title': 'Step 1: Navigate to Add Product',
    'productUpload.step1.description': 'Click on the "Add Product" button at the top right of your dashboard',
    'productUpload.step2.title': 'Step 2: Fill Basic Product Details',
    'productUpload.step2.description': 'Enter your product name, price per unit, and select the appropriate unit (kg, piece, etc.)',
    'productUpload.step3.title': 'Step 3: Add Stock Information',
    'productUpload.step3.description': 'Enter the quantity available and select the product category',
    'productUpload.step4.title': 'Step 4: Add Description',
    'productUpload.step4.description': 'Write a clear, detailed description of your product including quality, freshness, and other relevant details',
    'productUpload.step5.title': 'Step 5: Add Product Image',
    'productUpload.step5.description': 'Add an image URL for your product - high quality images increase sales',
    'productUpload.step6.title': 'Step 6: Submit Product',
    'productUpload.step6.description': 'Review all information and click the "Add Product" button to list your product',
    'productUpload.previous': 'Previous',
    'productUpload.next': 'Next',
    'productUpload.step': 'Step',
    'productUpload.of': 'of',
  },
  hi: {
    // Navigation
    'nav.products': 'उत्पाद',
    'nav.farmers': 'किसान',
    'nav.blog': 'ब्लॉग',
    'nav.login': 'लॉगिन',
    'nav.myFarm': 'मेरा खेत',
    'nav.myAccount': 'मेरा खाता',
    
    // Footer
    'footer.title': 'एग्रोकनेक्ट',
    'footer.description': 'बिना बिचौलियों के किसानों को ग्राहकों से सीधे जोड़कर ताजा, स्थानीय उत्पाद प्रदान करना।',
    'footer.forFarmers': 'किसानों के लिए',
    'footer.joinAsFarmer': 'किसान के रूप में जुड़ें',
    'footer.farmerLogin': 'किसान लॉगिन',
    'footer.farmingResources': 'खेती संसाधन',
    'footer.successStories': 'सफलता की कहानियां',
    'footer.forCustomers': 'ग्राहकों के लिए',
    'footer.createAccount': 'खाता बनाएं',
    'footer.customerLogin': 'ग्राहक लॉगिन',
    'footer.browseProducts': 'उत्पाद ब्राउज़ करें',
    'footer.howItWorks': 'यह कैसे काम करता है',
    'footer.contact': 'संपर्क और सहायता',
    'footer.contactUs': 'हमसे संपर्क करें',
    'footer.helpCenter': 'सहायता केंद्र',
    'footer.faqs': 'अक्सर पूछे जाने वाले प्रश्न',
    'footer.terms': 'नियम और शर्तें',
    'footer.copyright': '© 2025 एग्रोकनेक्ट। सभी अधिकार सुरक्षित।',
    'footer.privacy': 'गोपनीयता नीति',
    'footer.termsOfService': 'सेवा की शर्तें',
    'footer.language': 'भाषा',
    
    // Product Upload Steps
    'productUpload.step1.title': 'चरण 1: उत्पाद जोड़ें पर नेविगेट करें',
    'productUpload.step1.description': 'अपने डैशबोर्ड के ऊपरी दाएं भाग में \'उत्पाद जोड़ें\' बटन पर क्लिक करें',
    'productUpload.step2.title': 'चरण 2: बुनियादी उत्पाद विवरण भरें',
    'productUpload.step2.description': 'अपना उत्पाद नाम, प्रति इकाई मूल्य दर्ज करें और उपयुक्त इकाई (किलोग्राम, टुकड़ा, आदि) का चयन करें',
    'productUpload.step3.title': 'चरण 3: स्टॉक जानकारी जोड़ें',
    'productUpload.step3.description': 'उपलब्ध मात्रा दर्ज करें और उत्पाद श्रेणी का चयन करें',
    'productUpload.step4.title': 'चरण 4: विवरण जोड़ें',
    'productUpload.step4.description': 'अपने उत्पाद का स्पष्ट, विस्तृत विवरण लिखें, जिसमें गुणवत्ता, ताजगी और अन्य प्रासंगिक विवरण शामिल हों',
    'productUpload.step5.title': 'चरण 5: उत्पाद छवि जोड़ें',
    'productUpload.step5.description': 'अपने उत्पाद के लिए एक छवि URL जोड़ें - उच्च गुणवत्ता वाली छवियां बिक्री बढ़ाती हैं',
    'productUpload.step6.title': 'चरण 6: उत्पाद जमा करें',
    'productUpload.step6.description': 'सभी जानकारी की समीक्षा करें और अपना उत्पाद सूचीबद्ध करने के लिए \'उत्पाद जोड़ें\' बटन पर क्लिक करें',
    'productUpload.previous': 'पिछला',
    'productUpload.next': 'अगला',
    'productUpload.step': 'चरण',
    'productUpload.of': 'का',
  },
  mr: {
    // Navigation
    'nav.products': 'उत्पादने',
    'nav.farmers': 'शेतकरी',
    'nav.blog': 'ब्लॉग',
    'nav.login': 'लॉगिन',
    'nav.myFarm': 'माझे शेत',
    'nav.myAccount': 'माझे खाते',
    
    // Footer
    'footer.title': 'एग्रोकनेक्ट',
    'footer.description': 'शेतकऱ्यांना ग्राहकांशी थेट जोडून, ताजी, स्थानिक उत्पादने मध्यस्थांशिवाय पुरवणे.',
    'footer.forFarmers': 'शेतकऱ्यांसाठी',
    'footer.joinAsFarmer': 'शेतकरी म्हणून सामील व्हा',
    'footer.farmerLogin': 'शेतकरी लॉगिन',
    'footer.farmingResources': 'शेतीविषयक संसाधने',
    'footer.successStories': 'यशोगाथा',
    'footer.forCustomers': 'ग्राहकांसाठी',
    'footer.createAccount': 'खाते तयार करा',
    'footer.customerLogin': 'ग्राहक लॉगिन',
    'footer.browseProducts': 'उत्पादने ब्राउझ करा',
    'footer.howItWorks': 'हे कसे काम करते',
    'footer.contact': 'संपर्क आणि सहाय्य',
    'footer.contactUs': 'आमच्याशी संपर्क साधा',
    'footer.helpCenter': 'मदत केंद्र',
    'footer.faqs': 'वारंवार विचारले जाणारे प्रश्न',
    'footer.terms': 'नियम आणि अटी',
    'footer.copyright': '© 2025 एग्रोकनेक्ट. सर्व हक्क राखीव.',
    'footer.privacy': 'गोपनीयता धोरण',
    'footer.termsOfService': 'सेवेच्या अटी',
    'footer.language': 'भाषा',
    
    // Product Upload Steps
    'productUpload.step1.title': 'टप्पा 1: उत्पाद जोडा कडे नेव्हिगेट करा',
    'productUpload.step1.description': 'आपल्या डॅशबोर्डच्या वरच्या उजव्या बाजूला \'उत्पाद जोडा\' बटणावर क्लिक करा',
    'productUpload.step2.title': 'टप्पा 2: मूलभूत उत्पाद तपशील भरा',
    'productUpload.step2.description': 'आपले उत्पादन नाव, प्रति युनिट किंमत प्रविष्ट करा आणि योग्य युनिट (किलो, नग, इत्यादी) निवडा',
    'productUpload.step3.title': 'टप्पा 3: स्टॉक माहिती जोडा',
    'productUpload.step3.description': 'उपलब्ध प्रमाण प्रविष्ट करा आणि उत्पादन श्रेणी निवडा',
    'productUpload.step4.title': 'टप्पा 4: वर्णन जोडा',
    'productUpload.step4.description': 'आपल्या उत्पादनाचे स्पष्ट, तपशीलवार वर्णन लिहा ज्यामध्ये गुणवत्ता, ताजेपणा आणि इतर संबंधित तपशील समाविष्ट आहेत',
    'productUpload.step5.title': 'टप्पा 5: उत्पादन प्रतिमा जोडा',
    'productUpload.step5.description': 'आपल्या उत्पादनासाठी एक प्रतिमा URL जोडा - उच्च गुणवत्तेच्या प्रतिमा विक्री वाढवतात',
    'productUpload.step6.title': 'टप्पा 6: उत्पादन सबमिट करा',
    'productUpload.step6.description': 'सर्व माहितीचे पुनरावलोकन करा आणि आपले उत्पादन सूचीबद्ध करण्यासाठी \'उत्पादन जोडा\' बटणावर क्लिक करा',
    'productUpload.previous': 'मागील',
    'productUpload.next': 'पुढील',
    'productUpload.step': 'टप्पा',
    'productUpload.of': 'पैकी',
  },
  ta: {
    // Navigation
    'nav.products': 'பொருட்கள்',
    'nav.farmers': 'விவசாயிகள்',
    'nav.blog': 'வலைப்பதிவு',
    'nav.login': 'உள்நுழைவு',
    'nav.myFarm': 'எனது பண்ணை',
    'nav.myAccount': 'எனது கணக்கு',
    
    // Footer
    'footer.title': 'அக்ரோகனெக்ட்',
    'footer.description': 'இடைத்தரகர்கள் இல்லாமல் விவசாயிகளை நுகர்வோருடன் நேரடியாக இணைத்து, புதிய, உள்ளூர் விளைபொருட்களை வழங்குதல்.',
    'footer.forFarmers': 'விவசாயிகளுக்கு',
    'footer.joinAsFarmer': 'விவசாயியாக இணையவும்',
    'footer.farmerLogin': 'விவசாயி உள்நுழைவு',
    'footer.farmingResources': 'விவசாய வளங்கள்',
    'footer.successStories': 'வெற்றிக் கதைகள்',
    'footer.forCustomers': 'வாடிக்கையாளர்களுக்கு',
    'footer.createAccount': 'கணக்கை உருவாக்கவும்',
    'footer.customerLogin': 'வாடிக்கையாளர் உள்நுழைவு',
    'footer.browseProducts': 'பொருட்களை உலாவவும்',
    'footer.howItWorks': 'இது எப்படி செயல்படுகிறது',
    'footer.contact': 'தொடர்பு & ஆதரவு',
    'footer.contactUs': 'எங்களை தொடர்பு கொள்ளவும்',
    'footer.helpCenter': 'உதவி மையம்',
    'footer.faqs': 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
    'footer.terms': 'விதிமுறைகள் & நிபந்தனைகள்',
    'footer.copyright': '© 2025 அக்ரோகனெக்ட். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
    'footer.privacy': 'தனியுரிமைக் கொள்கை',
    'footer.termsOfService': 'சேவை விதிமுறைகள்',
    'footer.language': 'மொழி',
    
    // Product Upload Steps
    'productUpload.step1.title': 'படி 1: பொருள் சேர்க்க வழிசெல்லவும்',
    'productUpload.step1.description': 'உங்கள் டாஷ்போர்டின் மேல் வலது பகுதியில் உள்ள \'பொருள் சேர்\' பொத்தானைக் கிளிக் செய்யவும்',
    'productUpload.step2.title': 'படி 2: அடிப்படை பொருள் விவரங்களை நிரப்பவும்',
    'productUpload.step2.description': 'உங்கள் பொருளின் பெயர், அலகு விலை மற்றும் பொருத்தமான அலகு (கிலோ, துண்டு போன்றவை) ஆகியவற்றை உள்ளிடவும்',
    'productUpload.step3.title': 'படி 3: இருப்பு தகவலைச் சேர்க்கவும்',
    'productUpload.step3.description': 'கிடைக்கும் அளவை உள்ளிட்டு, பொருள் வகையைத் தேர்ந்தெடுக்கவும்',
    'productUpload.step4.title': 'படி 4: விளக்கம் சேர்க்கவும்',
    'productUpload.step4.description': 'தரம், புதுமை மற்றும் பிற தொடர்புடைய விவரங்கள் உள்ளிட்ட உங்கள் பொருளின் தெளிவான, விரிவான விளக்கத்தை எழுதவும்',
    'productUpload.step5.title': 'படி 5: பொருள் படத்தைச் சேர்க்கவும்',
    'productUpload.step5.description': 'உங்கள் பொருளுக்கான பட URL ஐச் சேர்க்கவும் - உயர் தர படங்கள் விற்பனையை அதிகரிக்கும்',
    'productUpload.step6.title': 'படி 6: பொருளைச் சமர்ப்பிக்கவும்',
    'productUpload.step6.description': 'அனைத்து தகவல்களையும் சரிபார்த்து, உங்கள் பொருளை பட்டியலிட \'பொருள் சேர்\' பொத்தானைக் கிளிக் செய்யவும்',
    'productUpload.previous': 'முந்தைய',
    'productUpload.next': 'அடுத்து',
    'productUpload.step': 'படி',
    'productUpload.of': 'இல்',
  },
  te: {
    // Navigation
    'nav.products': 'ఉత్పత్తులు',
    'nav.farmers': 'రైతులు',
    'nav.blog': 'బ్లాగు',
    'nav.login': 'లాగిన్',
    'nav.myFarm': 'నా వ్యవసాయం',
    'nav.myAccount': 'నా ఖాతా',
    
    // Footer
    'footer.title': 'అగ్రోకనెక్ట్',
    'footer.description': 'మధ్యవర్తులు లేకుండా తాజా, స్థానిక ఉత్పత్తుల కోసం రైతులను వినియోగదారులతో నేరుగా కలిపే.',
    'footer.forFarmers': 'రైతుల కోసం',
    'footer.joinAsFarmer': 'రైతుగా చేరండి',
    'footer.farmerLogin': 'రైతు లాగిన్',
    'footer.farmingResources': 'వ్యవసాయ వనరులు',
    'footer.successStories': 'విజయ కథలు',
    'footer.forCustomers': 'వినియోగదారుల కోసం',
    'footer.createAccount': 'ఖాతాను సృష్టించండి',
    'footer.customerLogin': 'వినియోగదారు లాగిన్',
    'footer.browseProducts': 'ఉత్పత్తులను బ్రౌజ్ చేయండి',
    'footer.howItWorks': 'ఇది ఎలా పని చేస్తుంది',
    'footer.contact': 'సంప్రదింపులు & మద్దతు',
    'footer.contactUs': 'మమ్మల్ని సంప్రదించండి',
    'footer.helpCenter': 'సహాయ కేంద్రం',
    'footer.faqs': 'తరచుగా అడిగే ప్రశ్నలు',
    'footer.terms': 'నియమాలు & షరతులు',
    'footer.copyright': '© 2025 అగ్రోకనెక్ట్. అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి.',
    'footer.privacy': 'గోప్యతా విధానం',
    'footer.termsOfService': 'సేవా నియమాలు',
    'footer.language': 'భాష',
    
    // Product Upload Steps
    'productUpload.step1.title': 'దశ 1: ఉత్పత్తిని జోడించడానికి నావిగేట్ చేయండి',
    'productUpload.step1.description': 'మీ డాష్‌బోర్డ్ పైన కుడి వైపున \'ఉత్పత్తిని జోడించు\' బటన్‌పై క్లిక్ చేయండి',
    'productUpload.step2.title': 'దశ 2: ప్రాథమిక ఉత్పత్తి వివరాలను నింపండి',
    'productUpload.step2.description': 'మీ ఉత్పత్తి పేరు, యూనిట్ ధర మరియు సరైన యూనిట్ (కిలో, ముక్క, మొదలైనవి) ఎంచుకోండి',
    'productUpload.step3.title': 'దశ 3: స్టాక్ సమాచారాన్ని జోడించండి',
    'productUpload.step3.description': 'అందుబాటులో ఉన్న మొత్తాన్ని నమోదు చేసి, ఉత్పత్తి వర్గాన్ని ఎంచుకోండి',
    'productUpload.step4.title': 'దశ 4: వివరణను జోడించండి',
    'productUpload.step4.description': 'నాణ్యత, తాజాదనం మరియు ఇతర సంబంధిత వివరాలతో సహా మీ ఉత్పత్తి యొక్క స్పష్టమైన, వివరణాత్మక వివరణను వ్రాయండి',
    'productUpload.step5.title': 'దశ 5: ఉత్పత్తి చిత్రాన్ని జోడించండి',
    'productUpload.step5.description': 'మీ ఉత్పత్తికి చిత్రం URL జోడించండి - ఉన్నత నాణ్యత చిత్రాలు అమ్మకాలను పెంచుతాయి',
    'productUpload.step6.title': 'దశ 6: ఉత్పత్తిని సమర్పించండి',
    'productUpload.step6.description': 'అన్ని సమాచారాన్ని సమీక్షించి, మీ ఉత్పత్తిని జాబితా చేయడానికి \'ఉత్పత్తి జోడించు\' బటన్‌పై క్లిక్ చేయండి',
    'productUpload.previous': 'మునుపటి',
    'productUpload.next': 'తదుపరి',
    'productUpload.step': 'దశ',
    'productUpload.of': 'లో',
  },
  bn: {
    // Navigation
    'nav.products': 'পণ্য',
    'nav.farmers': 'কৃষকগণ',
    'nav.blog': 'ব্লগ',
    'nav.login': 'লগইন',
    'nav.myFarm': 'আমার খামার',
    'nav.myAccount': 'আমার অ্যাকাউন্ট',
    
    // Footer
    'footer.title': 'অ্যাগ্রোকানেক্ট',
    'footer.description': 'মধ্যস্থতাকারী ছাড়া কৃষকদের ক্রেতাদের সাথে সরাসরি সংযোগ করে তাজা, স্থানীয় উত্পাদন সরবরাহ করা।',
    'footer.forFarmers': 'কৃষকদের জন্য',
    'footer.joinAsFarmer': 'কৃষক হিসাবে যোগদান করুন',
    'footer.farmerLogin': 'কৃষক লগইন',
    'footer.farmingResources': 'কৃষি সম্পদ',
    'footer.successStories': 'সাফল্যের গল্প',
    'footer.forCustomers': 'ক্রেতাদের জন্য',
    'footer.createAccount': 'অ্যাকাউন্ট তৈরি করুন',
    'footer.customerLogin': 'ক্রেতা লগইন',
    'footer.browseProducts': 'পণ্য ব্রাউজ করুন',
    'footer.howItWorks': 'এটি কিভাবে কাজ করে',
    'footer.contact': 'যোগাযোগ এবং সহায়তা',
    'footer.contactUs': 'আমাদের সাথে যোগাযোগ করুন',
    'footer.helpCenter': 'সাহায্য কেন্দ্র',
    'footer.faqs': 'সচরাচর জিজ্ঞাস্য',
    'footer.terms': 'শর্তাবলী',
    'footer.copyright': '© 2025 অ্যাগ্রোকনেক্ট। সর্বস্বত্ব সংরক্ষিত।',
    'footer.privacy': 'গোপনীয়তা নীতি',
    'footer.termsOfService': 'পরিষেবার শর্তাবলী',
    'footer.language': 'ভাষা',
    
    // Product Upload Steps
    'productUpload.step1.title': 'ধাপ 1: পণ্য যোগ করুন-এ যান',
    'productUpload.step1.description': 'আপনার ড্যাশবোর্ডের উপরের ডানদিকে \'পণ্য যোগ করুন\' বোতামে ক্লিক করুন',
    'productUpload.step2.title': 'ধাপ 2: প্রাথমিক পণ্যের বিবরণ পূরণ করুন',
    'productUpload.step2.description': 'আপনার পণ্যের নাম, প্রতি একক মূল্য লিখুন এবং উপযুক্ত একক (কেজি, টুকরা, ইত্যাদি) নির্বাচন করুন',
    'productUpload.step3.title': 'ধাপ 3: স্টক তথ্য যোগ করুন',
    'productUpload.step3.description': 'উপলব্ধ পরিমাণ লিখুন এবং পণ্য বিভাগ নির্বাচন করুন',
    'productUpload.step4.title': 'ধাপ 4: বিবরণ যোগ করুন',
    'productUpload.step4.description': 'আপনার পণ্যের একটি পরিষ্কার, বিস্তারিত বিবরণ লিখুন যাতে গুণমান, তাজা এবং অন্যান্য প্রাসঙ্গিক বিবরণ অন্তর্ভুক্ত থাকে',
    'productUpload.step5.title': 'ধাপ 5: পণ্যের ছবি যোগ করুন',
    'productUpload.step5.description': 'আপনার পণ্যের জন্য একটি ছবি URL যোগ করুন - উচ্চ মানের ছবি বিক্রয় বাড়ায়',
    'productUpload.step6.title': 'ধাপ 6: পণ্য জমা দিন',
    'productUpload.step6.description': 'সমস্ত তথ্য পর্যালোচনা করুন এবং আপনার পণ্য তালিকাভুক্ত করতে \'পণ্য যোগ করুন\' বোতামে ক্লিক করুন',
    'productUpload.previous': 'পূর্ববর্তী',
    'productUpload.next': 'পরবর্তী',
    'productUpload.step': 'ধাপ',
    'productUpload.of': 'এর',
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Create the context with default values
export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || 'en';
  });

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Translation function
  const t = (key: string) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook for easy usage of the language context
export const useLanguage = () => useContext(LanguageContext);
