const store = {};

const OTP_TTL_MS = 5 * 60 * 1000; // 5 minutes

function set(email, otp) {
  store[email] = { otp, expiresAt: Date.now() + OTP_TTL_MS };
}

function verify(email, otp) {
  const record = store[email];
  if (!record) return { valid: false, reason: "No OTP found for this email" };
  if (Date.now() > record.expiresAt) {
    delete store[email];
    return { valid: false, reason: "OTP has expired" };
  }
  if (record.otp !== String(otp).trim()) {
    return { valid: false, reason: "Incorrect OTP" };
  }
  delete store[email];
  return { valid: true };
}

module.exports = { set, verify };
