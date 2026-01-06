// auth.js — Unified Auth + Realtime Database profile (ESM)
// Load this with: <script type="module" src="auth.js"></script>

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js';
import { getFirestore, doc, setDoc, getDoc, serverTimestamp, updateDoc } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js';

// --- Firebase config (from your message) ---
const firebaseConfig = {
  apiKey: 'AIzaSyC1pq4VorsisWdqzDT5M3XQ-E6MtCHPqxU',
  authDomain: 'fit-f7f49.firebaseapp.com',
  projectId: 'fit-f7f49',
  storageBucket: 'fit-f7f49.appspot.com',
  messagingSenderId: '161201752814',
  appId: '1:161201752814:web:dd3bb14a98e9f8fde041ff',
  measurementId: 'G-JVQMLQWD1J',
  databaseURL: 'https://fit-f7f49-default-rtdb.firebaseio.com'
};

// --- Initialize ---
const app = initializeApp(firebaseConfig);
try { getAnalytics(app); } catch (_) {}
const auth = getAuth(app);
const fs = getFirestore(app);

// --- Helpers ---
function setLoading(btn, text){ if(btn){ btn.disabled = true; btn.textContent = text; } }
function clearLoading(btn, text){ if(btn){ btn.disabled = false; btn.textContent = text; } }
function toast(msg){ alert(msg); }
function isValidEmail(email){
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}
function isStrongPassword(pw){
  if (!pw || pw.length < 8) return { ok:false, reason:'Password must be at least 8 characters long' };
  if (!/[A-Z]/.test(pw)) return { ok:false, reason:'Password must contain at least one uppercase letter' };
  if (!/[0-9]/.test(pw)) return { ok:false, reason:'Password must contain at least one number' };
  return { ok:true };
}

async function writeUserProfile(uid, data){
  await setDoc(doc(fs, 'users', uid), { ...data, updatedAt: serverTimestamp() }, { merge: true });
}

async function shouldOnboard(uid){
  try{
    const d = await getDoc(doc(fs, 'users', uid));
    const val = d.exists() ? d.data() : null;
    // Need questionnaire before dashboard
    return !val || !val.questionnaireCompleted === true ? true : !val.questionnaireCompleted;
  }catch(e){
    console.warn('onboard check failed', e);
    return true;
  }
}

// ========== SIGN UP FLOW ==========
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(signupForm);
    const name = (fd.get('name') || '').toString().trim();
    const email = (fd.get('email') || '').toString().trim();
    const password = (fd.get('password') || '').toString();
    const confirm = (fd.get('confirmPassword') || '').toString();
    const btn = signupForm.querySelector('button[type="submit"]');

    // Basic field checks
    if (!name || !email || !password || !confirm) return toast('Please fill all fields');
    if (!isValidEmail(email)) return toast('Please enter a valid email address');
    const pwCheck = isStrongPassword(password);
    if (!pwCheck.ok) return toast(pwCheck.reason);
    if (password !== confirm) return toast('Passwords do not match');

    try {
      setLoading(btn, 'Creating account…');
      console.log('[signup] creating user…');
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const user = cred.user;
      await updateProfile(user, { displayName: name }).catch(()=>{});

      // Create/merge Firestore user doc with defaults
      await writeUserProfile(user.uid, {
        displayName: name,
        email,
        createdAt: serverTimestamp(),
        questionnaireCompleted: false,
        onboarded: false,
        calorieGoal: 2000,
        burnGoal: 500,
      });

      // Go straight to onboarding for brand-new accounts (no email verification required)
      window.location.replace('questionnaire.html');
      return;
    } catch (err) {
      console.error(err); toast(`Firebase: ${err?.code || ''} ${err?.message || ''}`);
    } finally {
      clearLoading(btn, 'Create Account');
    }
  });

  // Google sign up (popup)
  const googleBtn = document.getElementById('googleSignUp');
  if (googleBtn) {
    googleBtn.addEventListener('click', async () => {
      try {
        setLoading(googleBtn, 'Signing in…');
        const provider = new GoogleAuthProvider();
        const res = await signInWithPopup(auth, provider);
        const u = res.user;
        await writeUserProfile(u.uid, {
          displayName: u.displayName || '',
          email: u.email || '',
          createdAt: serverTimestamp(),
        });
        const goOnboard = await shouldOnboard(u.uid);
        window.location.href = goOnboard ? 'questionnaire.html' : 'dashboard.html';
      } catch (e) {
        console.error(e); toast(`Firebase: ${e?.code || ''} ${e?.message || ''}`);
      } finally {
        clearLoading(googleBtn, 'Continue with Google');
      }
    });
  }
}

// ========== SIGN IN FLOW ==========
const signinForm = document.getElementById('signinForm');
if (signinForm) {
  signinForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(signinForm);
    const email = (fd.get('email') || '').toString().trim();
    const password = (fd.get('password') || '').toString();
    const btn = signinForm.querySelector('button[type="submit"]');

    // Basic field checks
    if (!email || !password) return toast('Please enter your email and password');
    if (!isValidEmail(email)) return toast('Please enter a valid email address');

    try {
      setLoading(btn, 'Signing in…');
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const user = cred.user;
      // No email verification required for sign-in
      // ensure Firestore doc exists/updates
      await writeUserProfile(user.uid, { displayName: user.displayName || '', email: user.email || '' });
      const profSnap = await getDoc(doc(fs, 'users', user.uid));
      const prof = profSnap.exists() ? profSnap.data() : null;
      const isBrandNew = prof && prof.onboarded === false; // only users created by our new flow
      window.location.replace(isBrandNew ? 'questionnaire.html' : 'dashboard.html');
      return;
    } catch (err) {
      console.error(err); toast(`Firebase: ${err?.code || ''} ${err?.message || ''}`);
    } finally {
      clearLoading(btn, 'Sign In');
    }
  });

  const googleIn = document.getElementById('googleSignIn');
  if (googleIn) {
    googleIn.addEventListener('click', async () => {
      try {
        setLoading(googleIn, 'Signing in…');
        const provider = new GoogleAuthProvider();
        const res = await signInWithPopup(auth, provider);
        const u = res.user;
        await writeUserProfile(u.uid, { displayName: u.displayName || '', email: u.email || '' });
        const profSnap = await getDoc(doc(fs, 'users', u.uid));
        const prof = profSnap.exists() ? profSnap.data() : null;
        const isBrandNew = prof && prof.onboarded === false;
        window.location.href = isBrandNew ? 'questionnaire.html' : 'dashboard.html';
      } catch (e) {
        console.error(e); toast(`Firebase: ${e?.code || ''} ${e?.message || ''}`);
      } finally {
        clearLoading(googleIn, 'Continue with Google');
      }
    });
  }
}

// Optional: expose handles for debugging
export { app, auth, fs };
window.firebaseAuth = auth; window.firestore = fs;