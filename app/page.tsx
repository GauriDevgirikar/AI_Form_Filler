"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Upload,
  FileText,
  Mic,
  Languages,
  AlertCircle,
  Eye,
  ArrowRight,
  Edit3,
  ArrowLeft,
  AlertTriangle,
  Globe,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Translations {
  [key: string]: {
    [key: string]: string
  }
}

const translations: Translations = {
  en: {
    appName: "Seva Sahayak",
    appSubtitle: "AI Form Filling Assistant",
    heroTitle: "Government Form Filling Made Easy",
    heroSubtitle: "सरकारी फॉर्म भरना अब हुआ आसान",
    heroDescription:
      "Upload your documents like Aadhaar, PAN, Voter ID and let AI automatically fill your government forms. Save time and reduce errors at Seva Kendras.",
    uploadDocuments: "Upload Documents",
    uploadDescription: "Upload your identity documents (PDF, JPG, PNG)",
    dragDropText: "Drag and drop files here",
    browseFiles: "or click to browse files",
    chooseFiles: "Choose Files",
    alternativeInput: "Alternative Input Methods",
    alternativeDescription: "Use camera or voice input for convenience",
    capturePhoto: "Capture Document Photo",
    voiceInput: "Voice Input (Hindi/English)",
    comingSoon: "Coming Soon",
    processing: "Processing Documents",
    processingDescription: "AI is extracting information from your documents...",
    processComplete: "Complete - Using OCR and AI to extract data",
    uploadedDocuments: "Uploaded Documents",
    documentsReady: "ready for processing",
    processDocuments: "Process Documents with AI",
    extractedInfo: "Extracted Information",
    extractedDescription: "AI has successfully extracted the following information from your documents",
    confidence: "Confidence",
    continueToForms: "Continue to Form Selection",
    supportedDocs: "Supported Documents",
    supportedDescription: "We can extract information from these Indian identity documents",
    selectForm: "Select Government Form",
    selectFormDescription: "Choose the form you want to fill using your extracted data",
    searchPlaceholder: "Search forms... (e.g., birth certificate, आय प्रमाण पत्र)",
    allCategories: "All Categories",
    popular: "Popular",
    selectFormButton: "Select Form",
    noFormsFound: "No forms found",
    adjustSearch: "Try adjusting your search terms or category filter",
    backToUpload: "Back to Document Upload",
    reviewEdit: "Review & Edit Form Details",
    reviewDescription: "AI has pre-filled the form with your document data. Please review and edit as needed.",
    verifyInfo: "Please verify all information carefully before submission. Fields marked with * are required.",
    autoFilled: "Auto-filled from your",
    formSubmission: "Form Submission",
    submissionDescription: "Review your information and submit the form",
    verifyDetails: "Your form has been automatically filled using AI. Please verify all details before submitting.",
    submitApplication: "Submit Application",
    saveDraft: "Save Draft",
    submitting: "Submitting...",
    backToSelection: "Back to Form Selection",
    language: "Language",
  },
  hi: {
    appName: "सेवा सहायक",
    appSubtitle: "एआई फॉर्म भरने वाला सहायक",
    heroTitle: "सरकारी फॉर्म भरना अब हुआ आसान",
    heroSubtitle: "Government Form Filling Made Easy",
    heroDescription:
      "अपने आधार, पैन, वोटर आईडी जैसे दस्तावेज अपलोड करें और एआई को अपने सरकारी फॉर्म अपने आप भरने दें। सेवा केंद्रों में समय बचाएं और गलतियां कम करें।",
    uploadDocuments: "दस्तावेज अपलोड करें",
    uploadDescription: "अपने पहचान दस्तावेज अपलोड करें (PDF, JPG, PNG)",
    dragDropText: "फाइलें यहां खींचें और छोड़ें",
    browseFiles: "या फाइलें ब्राउज़ करने के लिए क्लिक करें",
    chooseFiles: "फाइलें चुनें",
    alternativeInput: "वैकल्पिक इनपुट तरीके",
    alternativeDescription: "सुविधा के लिए कैमरा या वॉयस इनपुट का उपयोग करें",
    capturePhoto: "दस्तावेज़ की फोटो लें",
    voiceInput: "वॉयस इनपुट (हिंदी/अंग्रेजी)",
    comingSoon: "जल्द आ रहा है",
    processing: "दस्तावेज़ प्रोसेसिंग",
    processingDescription: "एआई आपके दस्तावेजों से जानकारी निकाल रहा है...",
    processComplete: "पूर्ण - OCR और AI का उपयोग करके डेटा निकाला जा रहा है",
    uploadedDocuments: "अपलोड किए गए दस्तावेज़",
    documentsReady: "प्रोसेसिंग के लिए तैयार",
    processDocuments: "AI के साथ दस्तावेज़ प्रोसेस करें",
    extractedInfo: "निकाली गई जानकारी",
    extractedDescription: "AI ने आपके दस्तावेजों से निम्नलिखित जानकारी सफलतापूर्वक निकाली है",
    confidence: "विश्वास",
    continueToForms: "फॉर्म चयन पर जारी रखें",
    supportedDocs: "समर्थित दस्तावेज़",
    supportedDescription: "हम इन भारतीय पहचान दस्तावेजों से जानकारी निकाल सकते हैं",
    selectForm: "सरकारी फॉर्म चुनें",
    selectFormDescription: "अपने निकाले गए डेटा का उपयोग करके भरने के लिए फॉर्म चुनें",
    searchPlaceholder: "फॉर्म खोजें... (जैसे, जन्म प्रमाण पत्र, income certificate)",
    allCategories: "सभी श्रेणियां",
    popular: "लोकप्रिय",
    selectFormButton: "फॉर्म चुनें",
    noFormsFound: "कोई फॉर्म नहीं मिला",
    adjustSearch: "अपने खोज शब्दों या श्रेणी फिल्टर को समायोजित करने का प्रयास करें",
    backToUpload: "दस्तावेज़ अपलोड पर वापस जाएं",
    reviewEdit: "फॉर्म विवरण की समीक्षा और संपादन करें",
    reviewDescription: "AI ने आपके दस्तावेज़ डेटा के साथ फॉर्म को पहले से भर दिया है। कृपया आवश्यकतानुसार समीक्षा और संपादन करें।",
    verifyInfo: "कृपया सबमिशन से पहले सभी जानकारी को सावधानीपूर्वक सत्यापित करें। * से चिह्नित फ़ील्ड आवश्यक हैं।",
    autoFilled: "आपके से स्वचालित रूप से भरा गया",
    formSubmission: "फॉर्म सबमिशन",
    submissionDescription: "अपनी जानकारी की समीक्षा करें और फॉर्म सबमिट करें",
    verifyDetails: "आपका फॉर्म AI का उपयोग करके स्वचालित रूप से भरा गया है। कृपया सबमिट करने से पहले सभी विवरणों को सत्यापित करें।",
    submitApplication: "आवेदन सबमिट करें",
    saveDraft: "ड्राफ्ट सेव करें",
    submitting: "सबमिट कर रहे हैं...",
    backToSelection: "फॉर्म चयन पर वापस जाएं",
    language: "भाषा",
  },
}

interface ExtractedData {
  name?: string
  fatherName?: string
  dateOfBirth?: string
  address?: string
  aadhaarNumber?: string
  panNumber?: string
  voterIdNumber?: string
  phoneNumber?: string
  email?: string
  gender?: string
  documentType?: string
  confidence?: number
}

interface ProcessedDocument {
  file: File
  extractedData: ExtractedData
  status: "processing" | "completed" | "error"
  confidence: number
}

interface FormTemplate {
  id: string
  name: string
  nameHindi: string
  category: string
  description: string
  requiredDocuments: string[]
  estimatedTime: string
  fields: FormField[]
  popularity: number
}

interface FormField {
  id: string
  label: string
  labelHindi: string
  type: "text" | "date" | "select" | "number" | "textarea"
  required: boolean
  mappedTo?: keyof ExtractedData
  options?: string[]
  placeholder?: string
  placeholderHindi?: string
}

const formTemplates: FormTemplate[] = [
  {
    id: "birth-certificate",
    name: "Birth Certificate Application",
    nameHindi: "जन्म प्रमाण पत्र आवेदन",
    category: "Certificates",
    description: "Apply for birth certificate from municipal corporation",
    requiredDocuments: ["Aadhaar Card", "Hospital Records"],
    estimatedTime: "5 minutes",
    popularity: 95,
    fields: [
      {
        id: "applicant_name",
        label: "Applicant Name",
        labelHindi: "आवेदक का नाम",
        type: "text",
        required: true,
        mappedTo: "name",
        placeholder: "Enter applicant name",
        placeholderHindi: "आवेदक का नाम दर्ज करें",
      },
      {
        id: "father_name",
        label: "Father's Name",
        labelHindi: "पिता का नाम",
        type: "text",
        required: true,
        mappedTo: "fatherName",
        placeholder: "Enter father's name",
        placeholderHindi: "पिता का नाम दर्ज करें",
      },
      {
        id: "date_of_birth",
        label: "Date of Birth",
        labelHindi: "जन्म तिथि",
        type: "date",
        required: true,
        mappedTo: "dateOfBirth",
      },
      {
        id: "address",
        label: "Address",
        labelHindi: "पता",
        type: "textarea",
        required: true,
        mappedTo: "address",
        placeholder: "Enter address",
        placeholderHindi: "पता दर्ज करें",
      },
      {
        id: "gender",
        label: "Gender",
        labelHindi: "लिंग",
        type: "select",
        required: true,
        mappedTo: "gender",
        options: ["Male", "Female", "Other"],
        placeholder: "Select gender",
        placeholderHindi: "लिंग का चयन करें",
      },
    ],
  },
  {
    id: "income-certificate",
    name: "Income Certificate Application",
    nameHindi: "आय प्रमाण पत्र आवेदन",
    category: "Certificates",
    description: "Apply for income certificate for government schemes",
    requiredDocuments: ["Aadhaar Card", "PAN Card", "Salary Slips"],
    estimatedTime: "7 minutes",
    popularity: 88,
    fields: [
      {
        id: "applicant_name",
        label: "Applicant Name",
        labelHindi: "आवेदक का नाम",
        type: "text",
        required: true,
        mappedTo: "name",
        placeholder: "Enter applicant name",
        placeholderHindi: "आवेदक का नाम दर्ज करें",
      },
      {
        id: "father_name",
        label: "Father's Name",
        labelHindi: "पिता का नाम",
        type: "text",
        required: true,
        mappedTo: "fatherName",
        placeholder: "Enter father's name",
        placeholderHindi: "पिता का नाम दर्ज करें",
      },
      {
        id: "address",
        label: "Address",
        labelHindi: "पता",
        type: "textarea",
        required: true,
        mappedTo: "address",
        placeholder: "Enter address",
        placeholderHindi: "पता दर्ज करें",
      },
      {
        id: "pan_number",
        label: "PAN Number",
        labelHindi: "पैन नंबर",
        type: "text",
        required: true,
        mappedTo: "panNumber",
        placeholder: "Enter PAN number",
        placeholderHindi: "पैन नंबर दर्ज करें",
      },
    ],
  },
  {
    id: "ration-card",
    name: "Ration Card Application",
    nameHindi: "राशन कार्ड आवेदन",
    category: "Welfare Schemes",
    description: "Apply for new ration card or update existing one",
    requiredDocuments: ["Aadhaar Card", "Address Proof", "Income Certificate"],
    estimatedTime: "10 minutes",
    popularity: 92,
    fields: [
      {
        id: "head_of_family",
        label: "Head of Family",
        labelHindi: "परिवार के मुखिया",
        type: "text",
        required: true,
        mappedTo: "name",
        placeholder: "Enter head of family name",
        placeholderHindi: "परिवार के मुखिया का नाम दर्ज करें",
      },
      {
        id: "address",
        label: "Address",
        labelHindi: "पता",
        type: "textarea",
        required: true,
        mappedTo: "address",
        placeholder: "Enter address",
        placeholderHindi: "पता दर्ज करें",
      },
      {
        id: "aadhaar_number",
        label: "Aadhaar Number",
        labelHindi: "आधार नंबर",
        type: "text",
        required: true,
        mappedTo: "aadhaarNumber",
        placeholder: "Enter Aadhaar number",
        placeholderHindi: "आधार नंबर दर्ज करें",
      },
    ],
  },
  {
    id: "driving-license",
    name: "Driving License Application",
    nameHindi: "ड्राइविंग लाइसेंस आवेदन",
    category: "Licenses",
    description: "Apply for new driving license or renewal",
    requiredDocuments: ["Aadhaar Card", "Address Proof", "Medical Certificate"],
    estimatedTime: "12 minutes",
    popularity: 85,
    fields: [
      {
        id: "applicant_name",
        label: "Applicant Name",
        labelHindi: "आवेदक का नाम",
        type: "text",
        required: true,
        mappedTo: "name",
        placeholder: "Enter applicant name",
        placeholderHindi: "आवेदक का नाम दर्ज करें",
      },
      {
        id: "father_name",
        label: "Father's Name",
        labelHindi: "पिता का नाम",
        type: "text",
        required: true,
        mappedTo: "fatherName",
        placeholder: "Enter father's name",
        placeholderHindi: "पिता का नाम दर्ज करें",
      },
      {
        id: "date_of_birth",
        label: "Date of Birth",
        labelHindi: "जन्म तिथि",
        type: "date",
        required: true,
        mappedTo: "dateOfBirth",
      },
      {
        id: "address",
        label: "Address",
        labelHindi: "पता",
        type: "textarea",
        required: true,
        mappedTo: "address",
        placeholder: "Enter address",
        placeholderHindi: "पता दर्ज करें",
      },
    ],
  },
  {
    id: "voter-id",
    name: "Voter ID Registration",
    nameHindi: "मतदाता पहचान पत्र पंजीकरण",
    category: "Licenses",
    description: "Register for new voter ID card",
    requiredDocuments: ["Aadhaar Card", "Address Proof", "Age Proof"],
    estimatedTime: "8 minutes",
    popularity: 78,
    fields: [
      {
        id: "applicant_name",
        label: "Applicant Name",
        labelHindi: "आवेदक का नाम",
        type: "text",
        required: true,
        mappedTo: "name",
        placeholder: "Enter applicant name",
        placeholderHindi: "आवेदक का नाम दर्ज करें",
      },
      {
        id: "father_name",
        label: "Father's Name",
        labelHindi: "पिता का नाम",
        type: "text",
        required: true,
        mappedTo: "fatherName",
        placeholder: "Enter father's name",
        placeholderHindi: "पिता का नाम दर्ज करें",
      },
      {
        id: "address",
        label: "Address",
        labelHindi: "पता",
        type: "textarea",
        required: true,
        mappedTo: "address",
        placeholder: "Enter address",
        placeholderHindi: "पता दर्ज करें",
      },
      {
        id: "date_of_birth",
        label: "Date of Birth",
        labelHindi: "जन्म तिथि",
        type: "date",
        required: true,
        mappedTo: "dateOfBirth",
      },
    ],
  },
]

export default function AIFormFiller() {
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "hi">("en")
  const t = translations[currentLanguage]

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [processedDocuments, setProcessedDocuments] = useState<ProcessedDocument[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [showFormSelection, setShowFormSelection] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedForm, setSelectedForm] = useState<FormTemplate | null>(null)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [showFormFilling, setShowFormFilling] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [isListening, setIsListening] = useState(false)
  const [activeVoiceField, setActiveVoiceField] = useState<string | null>(null)
  const [recognition, setRecognition] = useState<any>(null)

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

      if (SpeechRecognitionAPI) {
        const recognitionInstance = new SpeechRecognitionAPI()

        recognitionInstance.continuous = false
        recognitionInstance.interimResults = false
        recognitionInstance.lang = currentLanguage === "en" ? "en-IN" : "hi-IN"

        recognitionInstance.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript
          if (activeVoiceField) {
            updateFormField(activeVoiceField, transcript)
          }
          setIsListening(false)
          setActiveVoiceField(null)
        }

        recognitionInstance.onerror = () => {
          setIsListening(false)
          setActiveVoiceField(null)
        }

        recognitionInstance.onend = () => {
          setIsListening(false)
          setActiveVoiceField(null)
        }

        setRecognition(recognitionInstance)
      }
    }
  }, [currentLanguage, activeVoiceField])

  const startVoiceInput = (fieldId: string) => {
    if (recognition) {
      setActiveVoiceField(fieldId)
      setIsListening(true)
      recognition.lang = currentLanguage === "en" ? "en-IN" : "hi-IN"
      recognition.start()
    }
  }

  const stopVoiceInput = () => {
    if (recognition) {
      recognition.stop()
    }
    setIsListening(false)
    setActiveVoiceField(null)
  }

  const toggleLanguage = () => {
    setCurrentLanguage((prev) => (prev === "en" ? "hi" : "en"))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles((prev) => [...prev, ...files])
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    const files = Array.from(event.dataTransfer.files)
    setUploadedFiles((prev) => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const processDocuments = async () => {
    setIsProcessing(true)
    setProcessingProgress(0)
    const processed: ProcessedDocument[] = []

    for (let i = 0; i < uploadedFiles.length; i++) {
      const file = uploadedFiles[i]
      setProcessingProgress(((i + 1) / uploadedFiles.length) * 100)

      try {
        await new Promise((resolve) => setTimeout(resolve, 1500))
        const extractedData = await extractDataFromDocument(file)
        processed.push({
          file,
          extractedData,
          status: "completed",
          confidence: extractedData.confidence || 85,
        })
      } catch (error) {
        processed.push({
          file,
          extractedData: {},
          status: "error",
          confidence: 0,
        })
      }
    }

    setProcessedDocuments(processed)
    setIsProcessing(false)
    setUploadedFiles([])
  }

  const extractDataFromDocument = async (file: File): Promise<ExtractedData> => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simulate reading file content for better data extraction
    const fileName = file.name.toLowerCase()
    const fileType = file.type

    // Enhanced data extraction based on file content simulation
    if (fileName.includes("aadhaar") || fileName.includes("aadhar") || fileType.includes("image")) {
      // Simulate OCR extraction from Aadhaar card
      const sampleNames = [
        "राज कुमार / Raj Kumar",
        "प्रिया शर्मा / Priya Sharma",
        "अमित गुप्ता / Amit Gupta",
        "सुनीता देवी / Sunita Devi",
      ]
      const sampleFathers = [
        "श्याम कुमार / Shyam Kumar",
        "राम शर्मा / Ram Sharma",
        "विकास गुप्ता / Vikas Gupta",
        "मोहन देव / Mohan Dev",
      ]
      const sampleAddresses = [
        "123, गांधी नगर, नई दिल्ली - 110001",
        "456, नेहरू कॉलोनी, मुंबई - 400001",
        "789, अशोक विहार, बैंगलोर - 560001",
        "321, लक्ष्मी नगर, चेन्नई - 600001",
      ]

      const randomIndex = Math.floor(Math.random() * sampleNames.length)

      return {
        documentType: "Aadhaar Card",
        name: sampleNames[randomIndex],
        fatherName: sampleFathers[randomIndex],
        dateOfBirth: `19${80 + Math.floor(Math.random() * 20)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
        address: sampleAddresses[randomIndex],
        aadhaarNumber: `${Math.floor(Math.random() * 9000) + 1000} ${Math.floor(Math.random() * 9000) + 1000} ${Math.floor(Math.random() * 9000) + 1000}`,
        gender: Math.random() > 0.5 ? "Male" : "Female",
        phoneNumber: `+91-${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        confidence: 88 + Math.floor(Math.random() * 10),
      }
    } else if (fileName.includes("pan")) {
      return {
        documentType: "PAN Card",
        name: "RAJ KUMAR",
        fatherName: "SHYAM KUMAR",
        dateOfBirth: "1985-08-15",
        panNumber: `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 9000) + 1000}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
        confidence: 85 + Math.floor(Math.random() * 10),
      }
    } else if (fileName.includes("voter")) {
      return {
        documentType: "Voter ID",
        name: "Raj Kumar",
        fatherName: "Shyam Kumar",
        address: "123, Gandhi Nagar, New Delhi - 110001",
        voterIdNumber: `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 9000000) + 1000000}`,
        confidence: 82 + Math.floor(Math.random() * 10),
      }
    }

    // For unknown documents, try to extract basic info
    return {
      documentType: "Document",
      name: "राज कुमार / Raj Kumar",
      confidence: 60 + Math.floor(Math.random() * 20),
    }
  }

  const proceedToFormSelection = () => {
    setShowFormSelection(true)
  }

  const filteredForms = formTemplates.filter((form) => {
    const matchesSearch =
      form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.nameHindi.includes(searchTerm) ||
      form.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || form.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = Array.from(new Set(formTemplates.map((form) => form.category)))

  const [listeningField, setListeningField] = useState<string | null>(null)

  const isFormValid = () => {
    if (!selectedForm) return false

    return selectedForm.fields.every((field) => {
      if (field.required) {
        const value = formData[field.id]
        return value && value.trim() !== ""
      }
      return true
    })
  }

  const autoFillFormFromDocuments = () => {
    if (!selectedForm || processedDocuments.length === 0) return

    // Combine all extracted data from all documents with priority
    const combinedData = processedDocuments
      .filter((doc) => doc.status === "completed")
      .reduce((acc, doc) => {
        // Give priority to higher confidence documents
        Object.keys(doc.extractedData).forEach((key) => {
          const typedKey = key as keyof ExtractedData
          if (doc.extractedData[typedKey] && (!acc[typedKey] || doc.confidence > 80)) {
            acc[typedKey] = doc.extractedData[typedKey]
          }
        })
        return acc
      }, {} as ExtractedData)

    const updatedFormData: Record<string, string> = { ...formData }
    let fieldsAutoFilled = 0

    selectedForm.fields.forEach((field) => {
      let value = ""

      // Direct mapping first
      if (field.mappedTo && combinedData[field.mappedTo]) {
        value = String(combinedData[field.mappedTo])
      } else {
        // Enhanced smart field mapping
        const fieldName = field.label.toLowerCase()
        const fieldNameHindi = field.labelHindi?.toLowerCase() || ""
        const fieldId = field.id.toLowerCase()

        // Name field mapping
        if (
          (fieldName.includes("name") || fieldNameHindi.includes("नाम") || fieldId.includes("name")) &&
          !fieldName.includes("father") &&
          !fieldNameHindi.includes("पिता") &&
          combinedData.name
        ) {
          value = combinedData.name.split(" / ")[1] || combinedData.name.split(" / ")[0] || combinedData.name
        }
        // Father's name mapping
        else if (
          (fieldName.includes("father") || fieldNameHindi.includes("पिता") || fieldId.includes("father")) &&
          combinedData.fatherName
        ) {
          value =
            combinedData.fatherName.split(" / ")[1] ||
            combinedData.fatherName.split(" / ")[0] ||
            combinedData.fatherName
        }
        // Date of birth mapping
        else if (
          (fieldName.includes("birth") ||
            fieldName.includes("dob") ||
            fieldNameHindi.includes("जन्म") ||
            fieldId.includes("dob")) &&
          combinedData.dateOfBirth
        ) {
          value = combinedData.dateOfBirth
        }
        // Address mapping
        else if (
          (fieldName.includes("address") || fieldNameHindi.includes("पता") || fieldId.includes("address")) &&
          combinedData.address
        ) {
          value = combinedData.address
        }
        // Phone mapping
        else if (
          (fieldName.includes("phone") ||
            fieldName.includes("mobile") ||
            fieldNameHindi.includes("फोन") ||
            fieldId.includes("phone")) &&
          combinedData.phoneNumber
        ) {
          value = combinedData.phoneNumber
        }
        // Email mapping (generate if not available)
        else if ((fieldName.includes("email") || fieldId.includes("email")) && !combinedData.email) {
          if (combinedData.name) {
            const nameForEmail =
              combinedData.name.split(" / ")[1] || combinedData.name.split(" / ")[0] || combinedData.name
            value = `${nameForEmail.toLowerCase().replace(/\s+/g, ".")}@gmail.com`
          }
        }
        // Gender mapping
        else if (
          (fieldName.includes("gender") || fieldNameHindi.includes("लिंग") || fieldId.includes("gender")) &&
          combinedData.gender
        ) {
          value = combinedData.gender
        }
        // Document number mappings
        else if ((fieldName.includes("aadhaar") || fieldId.includes("aadhaar")) && combinedData.aadhaarNumber) {
          value = combinedData.aadhaarNumber
        } else if ((fieldName.includes("pan") || fieldId.includes("pan")) && combinedData.panNumber) {
          value = combinedData.panNumber
        } else if ((fieldName.includes("voter") || fieldId.includes("voter")) && combinedData.voterIdNumber) {
          value = combinedData.voterIdNumber
        }
      }

      if (value && value.trim() !== "") {
        updatedFormData[field.id] = value.trim()
        fieldsAutoFilled++
      }
    })

    setFormData(updatedFormData)

    // Show success message
    if (fieldsAutoFilled > 0) {
      console.log(`[v0] Auto-filled ${fieldsAutoFilled} fields from uploaded documents`)
    }
  }

  const selectForm = (form: FormTemplate) => {
    setSelectedForm(form)
    const extractedData = processedDocuments.reduce((acc, doc) => ({ ...acc, ...doc.extractedData }), {})
    const initialFormData: Record<string, string> = {}

    form.fields.forEach((field) => {
      initialFormData[field.id] = ""
    })

    setFormData(initialFormData)
    setShowFormFilling(true)

    setTimeout(() => {
      autoFillFormFromDocuments()
    }, 100)
  }

  const updateFormField = (fieldId: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }))
  }

  const submitForm = async () => {
    if (!selectedForm || !isFormValid()) {
      alert(
        currentLanguage === "en"
          ? "Please fill all required fields before submitting."
          : "कृपया सबमिट करने से पहले सभी आवश्यक फ़ील्ड भरें।",
      )
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create submission data
      const submissionData = {
        formId: selectedForm.id,
        formName: selectedForm.name,
        submittedData: formData,
        documentsUsed: processedDocuments.map((doc) => ({
          fileName: doc.file.name,
          documentType: doc.extractedData.documentType,
          confidence: doc.confidence,
        })),
        submissionTime: new Date().toISOString(),
        language: currentLanguage,
      }

      console.log("[v0] Form submitted successfully:", submissionData)

      // Show success message
      alert(
        currentLanguage === "en"
          ? `Form "${selectedForm.name}" submitted successfully! Reference ID: ${Math.random().toString(36).substr(2, 9).toUpperCase()}`
          : `फॉर्म "${selectedForm.nameHindi}" सफलतापूर्वक सबमिट किया गया! संदर्भ आईडी: ${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      )

      // Reset form state
      setSelectedForm(null)
      setShowFormFilling(false)
      setShowFormSelection(false)
      setFormData({})
      setProcessedDocuments([])
    } catch (error) {
      console.error("[v0] Form submission error:", error)
      alert(
        currentLanguage === "en" ? "Form submission failed. Please try again." : "फॉर्म सबमिशन विफल। कृपया पुनः प्रयास करें।",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const goBackToFormSelection = () => {
    setShowFormFilling(false)
    setSelectedForm(null)
  }

  const goBackToDocuments = () => {
    setShowFormSelection(false)
    setShowFormFilling(false)
    setSelectedForm(null)
  }

  const renderVoiceInputButton = () => (
    <Button
      variant="outline"
      className="w-full justify-start bg-transparent"
      onClick={() => alert(t.comingSoon)}
      disabled
    >
      <Mic className="w-4 h-4 mr-2" />
      {t.voiceInput}
      <Badge variant="secondary" className="ml-auto">
        {t.comingSoon}
      </Badge>
    </Button>
  )

  const getFieldValidationStatus = (field: FormField) => {
    if (!field.required) return "optional"
    const value = formData[field.id]
    if (!value || value.trim() === "") return "required"

    // Additional validation based on field type
    if (field.type === "date" && value) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/
      return dateRegex.test(value) ? "valid" : "invalid"
    }

    if (field.id.includes("email") && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(value) ? "valid" : "invalid"
    }

    if (field.id.includes("phone") && value) {
      const phoneRegex = /^[+]?[0-9\-\s$$$$]{10,}$/
      return phoneRegex.test(value) ? "valid" : "invalid"
    }

    return "valid"
  }

  const getCompletionPercentage = () => {
    if (!selectedForm) return 0
    const totalRequired = selectedForm.fields.filter((f) => f.required).length
    const filledRequired = selectedForm.fields.filter(
      (f) => f.required && formData[f.id] && formData[f.id].trim() !== "",
    ).length
    return totalRequired > 0 ? Math.round((filledRequired / totalRequired) * 100) : 100
  }

  const [listening, setListening] = useState(false)

  const startListening = (fieldId: string) => {
    setListeningField(fieldId)
    setListening(true)
    if (recognition) {
      recognition.start()
    }
  }

  const stopListening = () => {
    setListening(false)
    if (recognition) {
      recognition.stop()
    }
  }

  useEffect(() => {
    if (recognition) {
      recognition.onstart = () => console.log("Speech recognition service has started")
      recognition.onend = () => {
        console.log("Speech recognition service disconnected")
        setListening(false)
      }
      recognition.onerror = (event) => console.error("Speech recognition error detected: " + event.error)

      recognition.onresult = (event) => {
        console.log("Speech recognition result", event.results[0][0].transcript)
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("")
        setFormData({ ...formData, [listeningField!]: transcript })
        setListening(false)
        setListeningField(null)
      }
    }
  }, [recognition, listeningField, formData])

  if (showFormFilling && selectedForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-orange-500 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{t.appName}</h1>
                  <p className="text-sm text-gray-600">{t.appSubtitle}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleLanguage}
                  className="flex items-center space-x-2 bg-transparent"
                >
                  <Globe className="w-4 h-4" />
                  <span>{currentLanguage === "en" ? "हिंदी" : "English"}</span>
                </Button>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <Languages className="w-3 h-3 mr-1" />
                  {currentLanguage === "en" ? "हिंदी/English" : "English/हिंदी"}
                </Badge>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <Button variant="outline" onClick={goBackToFormSelection} className="mb-4 bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.backToSelection}
            </Button>

            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {currentLanguage === "en" ? selectedForm.name : selectedForm.nameHindi}
              </h2>
              <p className="text-lg text-gray-600 mb-1">
                {currentLanguage === "en" ? selectedForm.nameHindi : selectedForm.name}
              </p>
              <p className="text-gray-500">{selectedForm.description}</p>
            </div>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Edit3 className="w-5 h-5 text-blue-600" />
                <span>{t.reviewEdit}</span>
              </CardTitle>
              <CardDescription>{t.reviewDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-6">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{t.verifyInfo}</AlertDescription>
              </Alert>

              <div className="grid md:grid-cols-2 gap-6">
                {selectedForm.fields.map((field) => (
                  <div key={field.id} className="flex flex-col">
                    <Label htmlFor={field.id}>{currentLanguage === "en" ? field.label : field.labelHindi}</Label>
                    {field.type === "text" || field.type === "number" ? (
                      <Input
                        id={field.id}
                        value={formData[field.id]}
                        onChange={(e) => updateFormField(field.id, e.target.value)}
                        placeholder={currentLanguage === "en" ? field.placeholder : field.placeholderHindi}
                        className={`mt-1 ${getFieldValidationStatus(field) === "invalid" ? "border-red-500" : ""}`}
                      />
                    ) : field.type === "textarea" ? (
                      <Textarea
                        id={field.id}
                        value={formData[field.id]}
                        onChange={(e) => updateFormField(field.id, e.target.value)}
                        placeholder={currentLanguage === "en" ? field.placeholder : field.placeholderHindi}
                        className={`mt-1 ${getFieldValidationStatus(field) === "invalid" ? "border-red-500" : ""}`}
                      />
                    ) : field.type === "date" ? (
                      <Input
                        id={field.id}
                        type="date"
                        value={formData[field.id]}
                        onChange={(e) => updateFormField(field.id, e.target.value)}
                        className={`mt-1 ${getFieldValidationStatus(field) === "invalid" ? "border-red-500" : ""}`}
                      />
                    ) : field.type === "select" ? (
                      <Select
                        value={formData[field.id]}
                        onValueChange={(value) => updateFormField(field.id, value)}
                        className="mt-1"
                      >
                        <SelectTrigger
                          className={`mt-1 ${getFieldValidationStatus(field) === "invalid" ? "border-red-500" : ""}`}
                        >
                          <SelectValue
                            placeholder={currentLanguage === "en" ? field.placeholder : field.placeholderHindi}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options?.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : null}
                    {field.required && <span className="text-red-500 text-sm mt-1">*</span>}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={goBackToFormSelection} className="bg-transparent">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t.backToSelection}
                </Button>
                <Button variant="default" onClick={submitForm} disabled={!isFormValid()}>
                  {t.submitApplication}
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-orange-500 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{t.appName}</h1>
                <p className="text-sm text-gray-600">{t.appSubtitle}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="flex items-center space-x-2 bg-transparent"
              >
                <Globe className="w-4 h-4" />
                <span>{currentLanguage === "en" ? "हिंदी" : "English"}</span>
              </Button>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Languages className="w-3 h-3 mr-1" />
                {currentLanguage === "en" ? "हिंदी/English" : "English/हिंदी"}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.heroTitle}</h1>
          <p className="text-lg text-gray-600 mb-4">{t.heroSubtitle}</p>
          <p className="text-gray-500">{t.heroDescription}</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Upload className="w-5 h-5 text-blue-600" />
              <span>{t.uploadDocuments}</span>
            </CardTitle>
            <CardDescription>{t.uploadDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Input type="file" onChange={handleFileUpload} className="hidden" />
              <div
                className="border-dashed border-2 border-gray-300 p-4 rounded-lg text-center cursor-pointer"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <p className="text-gray-600 mb-2">{t.dragDropText}</p>
                <p className="text-gray-600">{t.browseFiles}</p>
              </div>
            </div>

            <div className="mb-4">
              <Button variant="outline" onClick={processDocuments} disabled={uploadedFiles.length === 0}>
                {t.processDocuments}
              </Button>
            </div>

            {isProcessing && (
              <div className="mb-4">
                <Progress value={processingProgress} />
                <p className="text-sm text-gray-600 mt-2">{t.processingDescription}</p>
              </div>
            )}

            {processedDocuments.length > 0 && (
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{t.extractedInfo}</h2>
                <p className="text-gray-600 mb-4">{t.extractedDescription}</p>
                <div className="grid md:grid-cols-2 gap-6">
                  {processedDocuments.map((doc, index) => (
                    <div key={index} className="flex flex-col">
                      <p className="text-gray-600 mb-2">{doc.file.name}</p>
                      <p className="text-gray-600 mb-2">
                        {t.confidence}: {doc.confidence}%
                      </p>
                      {Object.keys(doc.extractedData).map((key) => (
                        <div key={key} className="flex flex-col mb-2">
                          <span className="text-gray-600 font-semibold">{key}</span>
                          <span className="text-gray-600">{doc.extractedData[key as keyof ExtractedData]}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <Button variant="outline" onClick={proceedToFormSelection} className="mt-6 bg-transparent">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  {t.continueToForms}
                </Button>
              </div>
            )}

            {uploadedFiles.length > 0 && (
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{t.uploadedDocuments}</h2>
                <p className="text-gray-600 mb-4">{t.documentsReady}</p>
                <ul className="list-disc list-inside mb-4">
                  {uploadedFiles.map((file, index) => (
                    <li key={index} className="flex justify-between items-center">
                      {file.name}
                      <Button variant="outline" onClick={() => removeFile(index)} className="bg-transparent">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-blue-600" />
                  <span>{t.supportedDocs}</span>
                </CardTitle>
                <CardDescription>{t.supportedDescription}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Input
                    type="text"
                    placeholder={t.searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div className="mb-4">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t.allCategories} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t.allCategories}</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {filteredForms.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {filteredForms.map((form) => (
                      <div key={form.id} className="flex flex-col">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {currentLanguage === "en" ? form.name : form.nameHindi}
                        </h3>
                        <p className="text-gray-600 mb-2">{currentLanguage === "en" ? form.nameHindi : form.name}</p>
                        <p className="text-gray-500 mb-2">{form.description}</p>
                        <p className="text-gray-600 mb-2">
                          {t.requiredDocuments}: {form.requiredDocuments.join(", ")}
                        </p>
                        <p className="text-gray-600 mb-2">
                          {t.estimatedTime}: {form.estimatedTime}
                        </p>
                        <Button variant="default" onClick={() => selectForm(form)}>
                          {t.selectFormButton}
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-gray-600 mb-4">{t.noFormsFound}</p>
                    <p className="text-gray-500">{t.adjustSearch}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
