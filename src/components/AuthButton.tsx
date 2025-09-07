"use client";
import { useIsSignedIn, useSignInWithEmail, useSignOut } from "@coinbase/cdp-hooks";

export function AuthButton() {
  const { isSignedIn } = useIsSignedIn();
  const { signInWithEmail } = useSignInWithEmail();
  const { signOut } = useSignOut();

  const onSignIn = async () => {
    const email = typeof window !== 'undefined' ? window.prompt('Enter email to sign in') : '';
    if (!email) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please enter a valid email address');
      return;
    }
    try { 
      await signInWithEmail({ email }); 
    } catch (error) {
      console.error('Sign-in failed:', error);
      alert('Sign-in failed. Please try again.');
    }
  };

  if (isSignedIn) {
    return <button className="px-3 py-2 rounded bg-gray-100" onClick={() => signOut()}>Sign out</button>;
  }
  return (
    <button className="px-4 py-2 rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold hover:opacity-90" onClick={onSignIn}>
      Drip It Now
    </button>
  );
}

export default AuthButton;
