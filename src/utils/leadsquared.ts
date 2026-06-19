export interface LeadData {
  name: string;
  email: string;
  phone: string;
  course: string;
  message: string;
}

export async function submitLeadToLeadSquared(data: LeadData): Promise<any> {
  const accessKey = import.meta.env.VITE_LEADSQUARED_ACCESS_KEY;
  const secretKey = import.meta.env.VITE_LEADSQUARED_SECRET_KEY;
  const regionHost = import.meta.env.VITE_LEADSQUARED_REGION_HOST || 'api-in21.leadsquared.com';

  if (!accessKey || !secretKey) {
    console.warn(
      'LeadSquared VITE_LEADSQUARED_ACCESS_KEY or VITE_LEADSQUARED_SECRET_KEY is missing. ' +
      'Submitting in fallback demo mode.'
    );
    // In local development without credentials, let the UI transition to success
    return new Promise((resolve) => setTimeout(() => resolve({ Status: 'Success', Message: 'Demo Submission' }), 800));
  }

  const url = `https://${regionHost}/v2/LeadManagement.svc/Lead.CreateOrUpdate?accessKey=${accessKey}&secretKey=${secretKey}`;

  // Mapping based on user WordPress fields schemas:
  // - Name: FirstName
  // - Email: EmailAddress
  // - Phone: Phone
  // - College: mx_College (static value: "New Horizon College Of Engineering")
  // - Courses Offered: mx_Courses_Offered
  // - Message: mx_Message
  const payload = [
    { Attribute: 'FirstName', Value: data.name },
    { Attribute: 'EmailAddress', Value: data.email },
    { Attribute: 'Phone', Value: data.phone },
    { Attribute: 'mx_College', Value: 'New Horizon College Of Engineering' },
    { Attribute: 'mx_Courses_Offered', Value: data.course },
    { Attribute: 'mx_Message', Value: data.message || '' },
  ];

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`LeadSquared API Error (${response.status}): ${errorText}`);
  }

  const responseData = await response.json();
  
  if (responseData?.Status === 'Error' || responseData?.ExceptionType) {
    throw new Error(responseData?.Message || 'Failed to submit lead to LeadSquared.');
  }

  return responseData;
}
