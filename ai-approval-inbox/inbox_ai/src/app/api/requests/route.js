// src/app/api/requests/route.js
import { NextResponse } from 'next/server';

let cachedRequests = null;

export async function GET() {
  if (!cachedRequests || cachedRequests.length === 0) {
    try {
      const res = await fetch('https://randomuser.me/api/?results=5&inc=name,email,picture,location,login');
      const data = await res.json();
      
      cachedRequests = data.results.map((user, index) => {
        const isSuspicious = index % 2 !== 0; 
        
        // Generate realistic timestamps for the audit trail
        const now = new Date();
        const t1 = new Date(now.getTime() - 15 * 60000).toLocaleTimeString('en-US', { hour12: false });
        const t2 = new Date(now.getTime() - 14 * 60000).toLocaleTimeString('en-US', { hour12: false });
        const t3 = new Date(now.getTime() - 12 * 60000).toLocaleTimeString('en-US', { hour12: false });
        const t4 = now.toLocaleTimeString('en-US', { hour12: false });

        return {
          request_id: `REQ-${user.login.salt.toUpperCase()}`,
          user_name: `${user.name.first} ${user.name.last}`,
          email: user.email,
          avatar: user.picture.large,
          location: `${user.location.city}, ${user.location.country}`,
          status: isSuspicious ? 'flagged_suspicious' : 'pending_review',
          
          // NEW: Professional context and auditing data
          category: isSuspicious ? 'FRAUD_PREVENTION' : 'ROUTINE_KYC',
          purpose: isSuspicious 
            ? 'Automated security trigger due to anomalous login velocity and geolocation mismatch.'
            : 'Standard regulatory compliance check for new account onboarding.',
          history: [
            { time: t1, event: 'User initiated account authentication.' },
            { time: t2, event: 'System requested primary identification.' },
            { time: t3, event: isSuspicious ? 'WARN: IP address mismatch detected in headers.' : 'Documents parsed and verified by OCR.' },
            { time: t4, event: 'Routed to Nexus Engine for final review.' }
          ],
          
          timestamp: t4,
          risk_score: isSuspicious ? Math.floor(Math.random() * 25) + 75 : Math.floor(Math.random() * 15) + 5
        };
      });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch external API' }, { status: 500 });
    }
  }
  
  return NextResponse.json(cachedRequests, { status: 200 });
}

export async function POST(request) {
  try {
    const { id, action } = await request.json(); 
    const index = cachedRequests.findIndex((req) => req.request_id === id);
    if (index === -1) return NextResponse.json({ error: 'Request not found' }, { status: 404 });

    cachedRequests.splice(index, 1);
    return NextResponse.json({ message: `Success` }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}