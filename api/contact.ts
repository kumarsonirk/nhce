// Declare Node.js process global for TypeScript compiler in non-Node contexts
declare const process: {
  env: {
    LEADSQUARED_ACCESS_KEY?: string;
    LEADSQUARED_SECRET_KEY?: string;
    LEADSQUARED_REGION_HOST?: string;
    [key: string]: string | undefined;
  };
};

// Self-contained interfaces for Vercel Request and Response to avoid Node.js http dependencies in the editor
interface VercelRequest {
  method?: string;
  body?: {
    name?: string;
    email?: string;
    phone?: string;
    course?: string;
    message?: string;
  };
}

interface VercelResponse {
  status: (statusCode: number) => VercelResponse;
  json: (body: any) => void;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, phone, course, message } = req.body || {};

  if (!name || !email || !phone || !course) {
    return res.status(400).json({ error: 'Missing required fields: name, email, phone, and course' });
  }

  const accessKey = process.env.LEADSQUARED_ACCESS_KEY;
  const secretKey = process.env.LEADSQUARED_SECRET_KEY;
  const regionHost = process.env.LEADSQUARED_REGION_HOST || 'api-in21.leadsquared.com';

  if (!accessKey || !secretKey) {
    console.warn('LeadSquared credentials (LEADSQUARED_ACCESS_KEY or LEADSQUARED_SECRET_KEY) are not set on the server.');
    return res.status(500).json({ error: 'LeadSquared CRM credentials are not configured on the hosting server.' });
  }

  const url = `https://${regionHost}/v2/LeadManagement.svc/Lead.CreateOrUpdate?accessKey=${accessKey}&secretKey=${secretKey}`;

  const payload = [
    { Attribute: 'FirstName', Value: name },
    { Attribute: 'EmailAddress', Value: email },
    { Attribute: 'Phone', Value: phone },
    { Attribute: 'mx_College', Value: 'New Horizon College Of Engineering' },
    { Attribute: 'mx_Courses_Offered', Value: course },
    { Attribute: 'mx_Message', Value: message || '' },
  ];

  try {
    const lsqResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!lsqResponse.ok) {
      const errorText = await lsqResponse.text();
      return res.status(lsqResponse.status).json({
        error: `LeadSquared API Error: ${errorText || lsqResponse.statusText}`,
      });
    }

    const data = await lsqResponse.json();

    if (data?.Status === 'Error' || data?.ExceptionType) {
      return res.status(400).json({
        error: data?.Message || 'Failed to submit lead to LeadSquared.',
      });
    }

    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Serverless submission error:', error);
    return res.status(500).json({
      error: error.message || 'Internal Server Error',
    });
  }
}
