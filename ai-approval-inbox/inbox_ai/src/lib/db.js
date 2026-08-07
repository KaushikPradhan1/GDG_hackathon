// src/lib/db.js
export let mockRequests = [
  {
    request_id: 'REQ-8891-ALPHA',
    status: 'pending_review',
    details: 'User identity verification missing secondary ID.',
    timestamp: '10:42 AM - SYS.LOG'
  },
  {
    request_id: 'REQ-9022-BETA',
    status: 'flagged_suspicious',
    details: 'Multiple login attempts from different geographical regions.',
    timestamp: '11:05 AM - SEC.ALERT'
  },
  {
    request_id: 'REQ-7741-GAMMA',
    status: 'pending_review',
    details: 'Address mismatch in the provided utility bill.',
    timestamp: '11:30 AM - SYS.LOG'
  }
];