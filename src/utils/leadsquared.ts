export interface LeadData {
  name: string;
  email: string;
  phone: string;
  course: string;
  message: string;
}

export async function submitLeadToLeadSquared(data: LeadData): Promise<any> {
  const url = '/api/contact';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // If Vercel functions are not running locally (e.g. running 'npm run dev' directly, returning a 404),
    // and we are in local development environment, fallback to simulated success.
    if (response.status === 404 && import.meta.env.DEV) {
      console.warn(
        'Vercel Serverless Function not detected at /api/contact. ' +
        'Falling back to simulated demo submission.'
      );
      return new Promise((resolve) =>
        setTimeout(() => resolve({ Status: 'Success', Message: 'Simulated Demo' }), 800)
      );
    }

    if (!response.ok) {
      let errorMsg = 'Submission failed.';
      try {
        const errJson = await response.json();
        errorMsg = errJson.error || errorMsg;
      } catch {
        const errText = await response.text();
        errorMsg = errText || errorMsg;
      }
      throw new Error(errorMsg);
    }

    return await response.json();
  } catch (error: any) {
    // Catch fetch/connection errors in local development if backend isn't up
    if (
      import.meta.env.DEV &&
      (error.message?.includes('Failed to fetch') || error.name === 'TypeError')
    ) {
      console.warn(
        'Failed to connect to local /api/contact endpoint. ' +
        'Falling back to simulated demo submission.'
      );
      return new Promise((resolve) =>
        setTimeout(() => resolve({ Status: 'Success', Message: 'Simulated Demo' }), 800)
      );
    }
    throw error;
  }
}
