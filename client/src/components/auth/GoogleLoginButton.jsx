import { GoogleLogin } from "@react-oauth/google";

export default function GoogleLoginButton({ onSuccess, onError }) {
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        onSuccess?.(credentialResponse.credential);
      }}
      onError={() => {
        onError?.();
      }}
      useOneTap={false}
    />
  );
}